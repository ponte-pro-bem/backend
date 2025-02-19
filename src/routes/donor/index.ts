import Elysia from "elysia";
import { donorService } from "./donorService";

export const donorRouter = new Elysia({ prefix: "/donors" })
  .use(donorService)
  .get("/", async ({ read }) => {
    return await read();
  }); 