import { Elysia, t } from "elysia";

export const institutionModel = new Elysia().model({
    createInstitutionSchema: t.Object({
        name: t.String(),
        description: t.String(),
        images: t.Array(t.String()),
        pixQRCodeRaw: t.String(),
    }),
});

