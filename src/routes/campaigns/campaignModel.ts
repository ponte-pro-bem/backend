import { Elysia, t } from "elysia";

export const campaignModel = new Elysia().model({
    createCampaignSchema: t.Object({
        name: t.String(),
        institutionId: t.Optional(t.String()),
        description: t.String(),
        pixQRCodeRaw: t.String(),
        files: t.Files(),
        tags: t.Array(t.String())
    }),
    deleteCampaignSchema: t.Object({
        id: t.String()
    })
});
