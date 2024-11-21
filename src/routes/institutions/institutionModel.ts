import { Elysia, t } from "elysia";

export const institutionModel = new Elysia().model({
    createInstitutionSchema: t.Object({
        name: t.String(),
        description: t.String(),
        pixQRCodeRaw: t.String(),
        files: t.Files(),
        tags: t.Array(t.String({
            name: t.String(),
            icon: t.String(),
            iconLibrary: t.String()
        }))
    }),
    deleteInstitutionSchema: t.Object({
        id: t.String()
    })
});

