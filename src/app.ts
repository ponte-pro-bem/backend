import { Elysia } from "elysia";
import logger from "../libs/logger";

import users from "./routes/users";
import institutions from "./routes/institutions";
import campaigns from "./routes/campaigns";
import images from "./routes/images";

import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { JWT_SECRET } from "../libs/constants";

const app = new Elysia()
  .onRequest(({ request }) => {
    logger.debug({
      method: request.method,
      url: request.url,
      body: request.body,
    });
  })
  .onError(({ set, code, error }) => {
    let statusCode: number = 500;
    set.status = statusCode;
    return {
      message: error.toString(),
    };
  })
  .use(jwt({ name: "jwt", secret: JWT_SECRET }))
  .use(cookie())
  .use(cors())
  .get("/", () => "OK")
  .use(users)
  .use(institutions)
  .use(campaigns)
  .use(images);

export default app;
