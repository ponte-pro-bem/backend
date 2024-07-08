import { Elysia, t } from "elysia";

export const userModel = new Elysia().model({
    createUserSchema: t.Object({
        name: t.String(),
        password: t.String(),
        isAdmin: t.Boolean()
    }),
});
