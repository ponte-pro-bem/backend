import { Elysia, t } from "elysia";
import { createCampaign } from "../../crud/campaign";

export const campaignModel = new Elysia().model({
    createCampaignSchema: t.Object({
        name: t.String(),
        institutionId: t.String()
    }),
});
