import { Elysia, t } from "elysia";

export const imageModel = new Elysia().model({
    uploadImageSchema: t.Object({
        key: t.String(),
        file: t.File(),
        institutionId: t.Nullable(t.String()),
        campaignId: t.Nullable(t.String()),

    }),
});
