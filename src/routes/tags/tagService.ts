import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateTagInput } from "../../types";
import { createTag, getTags } from "../../crud/tag";
import logger from "../../../libs/logger";

export const tagService = new Elysia({ name: "tagService" })
  .use(store)
  .derive({ as: "global" }, ({ store }) => ({
    create: async (createTagInput: CreateTagInput) => {
      const {
        data,
        error: isError,
        code,
        message,
      } = await createTag(createTagInput);

      logger.info({
        data,
        isError,
        code,
        message,
      });

      if (data) store.tags.push(data);

      return {
        data,
        error: isError,
        code,
        message,
      };
    },
    read: () => getTags(),
  }));
