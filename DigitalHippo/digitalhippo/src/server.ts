/* Entry point for the express server that also enables self host */

import express from "express"
import { getPayloadClient } from "./get-payload";
import { nextHandler } from "./next-utils";
import { nextApp } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

var cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

/* enable trpcExpress server handling requests and responses */

const createContext = ({
  req, res
  }: trpcExpress.CreateExpressContextOptions) => ({
  req, res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

export type WebhookRequest = IncomingMessage & {rawBody: Buffer}

/* We will be using the payload template for our admin board */

const start = async () => {

  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer
    }
  });

  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
      },
    },
  });

  /* Create a middleware for cart route so it only renders
      for signed in users */

  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if(!request.user) {
      return res.redirect("/sign-in?origin=cart");
    }

    const parsedUrl = parse(req.url, true);

    return nextApp.render(req, res, "/cart", parsedUrl.query);
  })

  app.use("/cart", cartRouter);

  if(process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");

      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    })

    return;
  }

  /* Forward requests coming to the /api/trpc and create a trpcExpress backend handler */

  app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }));

  /* Forward requests and responses from webapp to our handler for deployment */
  /* For example websockets */
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
  });

  });

   /* Enable cross site requests */
/*
  app.use(cors());

    app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
*/

}

start();