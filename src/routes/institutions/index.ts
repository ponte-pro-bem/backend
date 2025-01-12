import { Elysia } from "elysia";

import { institutionService } from "./institutionService";
import { institutionModel } from "./institutionModel";
import { auth } from "../../plugins";
import logger from "../../../libs/logger";

const institutions = new Elysia({ prefix: "/institutions" })
  .use(institutionModel)
  .use(institutionService)
  .get("/", ({ read }) => read)
  // .use(auth)
  .post(
    "/create",
    async ({ create, body }) => {
      console.log("oi", body);
      
      console.log(body);
      logger.debug(body);

      return await create(body);
    },
    { body: "createInstitutionSchema" }
  )
  .delete(
    ":id",
    async ({ params, delete: deleteInstitution }) => {
      return await deleteInstitution(params.id);
    },
    { params: "deleteInstitutionSchema" }
  );

export default institutions;
