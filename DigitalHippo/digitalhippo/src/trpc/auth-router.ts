/* Auth api endpoint here */

import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
  .input(AuthCredentialsValidator)
  .mutation(async ({input}) => {
    const {email, password} = input
    const payload = await getPayloadClient()

    // check if user already exists

    const {docs: users} = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,  /* Find a user that correspond to the signed email */
        }
      }
    })

    if(users.length !== 0) {
      throw new TRPCError({code: "CONFLICT"})
    }

    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "user",
      },
    })

    return{ success:true, sentToEmail: email }

  }),   /* publicProcedure means that anyone can call this endpoint, to create user in this case */
})