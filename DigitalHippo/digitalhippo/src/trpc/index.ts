import { publicProcedure, router } from "./trpc";
import { authRouter } from "./auth-router";

/* imported router lets us define customised typesafe api endpoints */
/* This is our backend for auth */

export const appRouter = router({
  auth: authRouter,
})

export type AppRouter = typeof appRouter