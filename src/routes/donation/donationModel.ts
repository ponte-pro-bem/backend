import { Elysia, t } from "elysia";

export const donationModel = new Elysia().model({
    createDonationSchema: t.Object({
        name: t.String(),
        value: t.String(),
        cpf: t.String(),
        campaignId: t.Optional(t.String()),
        institutionId: t.Optional(t.String()),
    }),
    deleteCampaignSchema: t.Object({
        id: t.String()
    })
});

