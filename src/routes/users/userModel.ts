import { Elysia, t } from "elysia";

export const userModel = new Elysia().model({
    signupSchema: t.Object({
        name: t.String(),
        password: t.String(),
        isAdmin: t.Boolean(),
    }),
    loginSchema: t.Object({
        name: t.String(),
        password: t.String(),
    }),
});
