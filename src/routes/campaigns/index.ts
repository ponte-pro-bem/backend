import { Elysia } from "elysia";

import { campaignService } from "./campaignService";
import { campaignModel } from "./campaignModel";
import { auth } from "../../plugins";

const campaigns = new Elysia({ prefix: "/campaigns" })
    .use(campaignModel)
    .use(campaignService)
    .get("/", ({ read }) => read)
    .use(auth)
    .post(
        "/create",
        async ({ create, body, error }) => {
            const {error: isError,code, message, data} = await create(body);

            if(isError) {
                error(code,message);
            }

            return {
                data
            }
        },
        { body: "createCampaignSchema" }
    );

export default campaigns;
