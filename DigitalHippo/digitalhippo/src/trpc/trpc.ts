import { User } from "@/payload-types";
import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";
import { PayloadRequest } from "payload/types";
import { TRPCError } from "@trpc/server";

/* Defining our trpc router here and set it to our endpoints */
/* The context().create() from initTRPC makes a router app from their template */

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ctx, next}) => {
  const req = ctx.req as PayloadRequest;

  const { user } = req as {user: User | null}

  if(!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED"})
  }

  return next({
    ctx: {
      user,
    },
  })
})


export const router = t.router
export const publicProcedure = t.procedure  /* Makes a public endpoint for our route */
export const privateProcedure = t.procedure.use(isAuth)