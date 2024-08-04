import { Elysia, t } from "elysia";

export const userModel = new Elysia().model({
    signupSchema: t.Object({
        name: t.String(),
        password: t.String(),
    }),
    loginSchema: t.Object({
        name: t.String(),
        password: t.String(),
    }),
});
