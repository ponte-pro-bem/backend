import { Elysia, t } from "elysia";

export const campaignModel = new Elysia().model({
    createCampaignSchema: t.Object({
        name: t.String(),
        institutionId: t.String(),
        description: t.String(),
        images: t.Array(t.String()),
        pixQRCodeRaw: t.String(),
    }),
});
