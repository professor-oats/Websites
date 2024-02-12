import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";

dotenv.config({   /* Set the environment variables */
  path: path.resolve(__dirname, "../env")
});

export default buildConfig ({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users],
  routes: {
    admin: '/sell'
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    }
  },

  rateLimit: {
    max: 2000,
  },

  editor: slateEditor({}),

  db: mongooseAdapter({
    url: process.env.MONGODB_URL!, /* Make it so the admin url connects to our MongoDB */
  }),

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  }
})