import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateTagInput } from "../../types";
import { createTag, getTags, deleteTag, updateTag, getTagById } from "../../crud/tag";
import logger from "../../../libs/logger";

export const tagService = new Elysia({ name: "tagService" })
  .use(store)
  .derive({ as: "global" }, ({ store }) => ({
    create: async (createTagInput: CreateTagInput) => {
      const result = await createTag(createTagInput);
      if (result.data) store.tags.push(result.data);
      return result;
    },
    read: () => getTags(),
    readById: async (id: string) => {
      const result = await getTagById(id);
      return result;
    },
    delete: async (id: string) => {
      const result = await deleteTag(id);
      if (result.data) {
        store.tags = store.tags.filter(tag => tag.id !== id);
      }
      return result;
    },
    update: async (id: string, data: CreateTagInput) => {
      return await updateTag(id, data);
    }
  }));
