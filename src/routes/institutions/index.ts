import { Elysia } from "elysia";

import { institutionService } from "./institutionService";
import { institutionModel } from "./institutionModel";

const institutions = new Elysia({ prefix: "/institutions" })
    .use(institutionModel)
    .use(institutionService)
    .post(
        "/create",
        async ({ create, body }) => {
            return await create(body);
        },
        { body: "createInstitutionSchema" }
    );

export default institutions;
