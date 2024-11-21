import { Elysia } from "elysia";

import { tagModel } from "./tagModel";
import { tagService } from "./tagService";
import logger from "../../../libs/logger";

const tags = new Elysia({ prefix: "/tags" })
  .use(tagModel)
  .use(tagService)
  .get("/", ({ read }) => read)
  .post(
    "/create",
    async ({ create, body, error }) => {
      const { error: isError, code, message, data } = await create(body);

      if (isError) {
        return error(code, message);
      }

      return {
        data,
      };
    },
    { body: "createTagSchema" }
  );

export default tags;
