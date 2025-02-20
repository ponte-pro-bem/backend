import { Elysia } from "elysia";
import { tagModel } from "./tagModel";
import { tagService } from "./tagService";
import logger from "../../../libs/logger";
import { t } from "elysia";

const tags = new Elysia({ prefix: "/tags" })
  .use(tagModel)
  .use(tagService)
  .get("/", async ({ read }) => {
    return await read();
  })
  .get("/:id", async ({ params: { id }, readById }) => {
    return await readById(id);
  }, { params: t.Object({ id: t.String() }) })
  .post("/", async ({ body, create }) => {
    return await create(body);
  }, { body: "createTagSchema" })
  .delete("/:id", async ({ params: { id }, delete: deleteTag }) => {
    return await deleteTag(id);
  }, { params: t.Object({ id: t.String() }) })
  .patch("/:id", async ({ params: { id }, body, update }) => {
    return await update(id, body);
  }, { 
    params: t.Object({ id: t.String() }),
    body: "updateTagSchema"
  });

export default tags;
