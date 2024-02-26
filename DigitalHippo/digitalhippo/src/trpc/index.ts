import { z } from "zod"
import { publicProcedure, router } from "./trpc";
import { authRouter } from "./auth-router";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";

/* imported router lets us define customised typesafe api endpoints */
/* This is our backend for auth */

export const appRouter = router({
  auth: authRouter,

  getInfiniteProducts: publicProcedure.input(z.object({
    limit: z.number().min(1).max(100),
    cursor: z.number().nullish(),
    query: QueryValidator,
  })).query(async ({ input }) => {
    const { query, cursor } = input
    const { sort, limit, ...queryOpts} = query

    const payload = await getPayloadClient()

    const parsedQueryOpts: Record<string, {equals: string}> = {}

    /* This allows user to query wih options added so take in all queryOpts
    and parse it to where the passed queryOpts key equals to value */
    /* Essentially this transmutes the queryOpts into the type recognized by payload to
    use in the find. */

    Object.entries(queryOpts).forEach(([key, value]) => {
      parsedQueryOpts[key] = {
        equals: value,
      }
    })

    const page = cursor || 1

    const { docs: items, hasNextPage, nextPage } = await payload.find({
      collection: "products",
      where: {
        approvedForSale: {
          equals: "approved",
        },

        ...parsedQueryOpts
      },

      sort,
      depth: 1,
      limit,
      page,
    })

    return {
      items,
      nextPage: hasNextPage ? nextPage : null
    }
  }),
})

export type AppRouter = typeof appRouter