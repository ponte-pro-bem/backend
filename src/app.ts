import { Elysia } from "elysia";
import logger from "../libs/logger";
import users from "./routes/users";
import institutions from "./routes/institutions";
import campaigns from "./routes/campaigns";
import cors from "@elysiajs/cors";

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
  .use(cors())
  .get("/", () => "OK")
  .use(users)
  .use(institutions)
  .use(campaigns);

export default app;
