import { Elysia } from "elysia";

import { donationService } from "./donationService";
import { donationModel } from "./donationModel";
import { auth } from "../../plugins";
import logger from "../../../libs/logger";

const donations = new Elysia({ prefix: "/donations" })
  .use(donationModel)
  .use(donationService)
  .get("/", ({ read }) => read)
  .post(
    "/create",
    async ({ create, body }) => {
      console.log(body);
      logger.debug(body);

      return await create(body);
    },
    { body: "createDonationSchema" }
  )
// .delete(
//   ":id",
//   async ({ params, delete: deleteInstitution }) => {
//     return await deleteInstitution(params.id);
//   },
//   { params: "deleteInstitutionSchema" }
// );

export default donations;
