import { Elysia } from "elysia";

import { imageService } from "./imageService";
import { imageModel } from "./imageModel";
import { auth } from "../../plugins";

const images = new Elysia({ prefix: "/images" })
    .use(imageModel)
    .use(imageService)
    .get("/", ({ read }) => read)
    .post(
        "/create",
        async ({ create, body, set }) => {
            const {code, data} = await create({
                key: body.key,
                campaignId: body.campaignId ?? undefined,
                institutionId: body.institutionId ?? undefined
                }, await body.file.text());
            
            set.status = code;
            return {
                data
            }
        },
        { body: "uploadImageSchema" }
    );

export default images;