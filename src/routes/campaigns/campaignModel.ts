import { Elysia, t } from "elysia";

export const campaignModel = new Elysia().model({
    createCampaignSchema: t.Object({
        name: t.String(),
        institutionId: t.String(),
        description: t.String(),
        pixQRCodeRaw: t.String(),
        startDate: t.String(),
        endDate: t.String(),
    }),
});
