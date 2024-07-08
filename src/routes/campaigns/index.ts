import { Elysia } from "elysia";

import { campaignService } from "./campaignService";
import { campaignModel } from "./campaignModel";

const campaigns = new Elysia({ prefix: "/campaigns" })
    .use(campaignModel)
    .use(campaignService)
    .post(
        "/create",
        async ({ create, body }) => {
            return await create(body);
        },
        { body: "createCampaignSchema" }
    );

export default campaigns;
