import dotenv from "dotenv"
import path from "path"
import { InitOptions } from "payload/config";
import payload from "payload";
import type { Payload } from "payload";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

/* Create  a transporter with nodemailer to be able to send emails */
/*
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY
  }
})
*/

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  secure: true,
  port: 465,
  auth: {
    user: "professor-oats@webwizard.design",
    pass: process.env.ZOHO_MAIL_PASS
  }
})



let cached = (global as any).payload;

if(!cached) {       /* Handle cache if not cached */
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({initOptions, }: Args = {}): Promise<Payload> => {
  if(!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if(cached.client) {
    return cached.client
  }

  if(!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "professor-oats@webwizard.design",   /* Add your domain email here - onboarding@resend.dev*/
        fromName: "DigitalHippo",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  }

  catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}

