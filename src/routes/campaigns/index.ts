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
        async ({ create, body }) => {
            return await create(body);
        },
        { body: "createCampaignSchema" }
    );

export default campaigns;
