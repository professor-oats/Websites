import { initTRPC } from "@trpc/server";

/* Defining our trpc router here and set it to our endpoints */
/* The context().create() from initTRPC makes a router app from their template */

const t = initTRPC.context().create();

export const router = t.router

export const publicProcedure = t.procedure  /* Makes a public endpoint for our route */