/* Auth api endpoint here */

import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import z from "zod"

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

    /* payload.create will also send an verify email to the email */

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


  verifyEmail: publicProcedure.input(z.object({token: z.string()}))
    .query( async ({input}) => {
      const {token} = input

      const payload = await getPayloadClient()

      /* Verify the email by the token and checking it against the users*/

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token, 
      })

      if(!isVerified) throw new TRPCError({ code: "UNAUTHORIZED"})

      return { success: true }

    }),

    signIn: publicProcedure
      .input(AuthCredentialsValidator)
      .mutation( async ({input, ctx}) => {
      const {email, password} = input
      const { res } = ctx  /* Response here is the cookie token from our server app */

      const payload = await getPayloadClient()

      /* Define a login/sign-in procedure for the user and catch errors */

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      }
      catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

    })

})