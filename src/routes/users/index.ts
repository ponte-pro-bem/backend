import { Elysia } from "elysia";

import { userService } from "./userService";
import { userModel } from "./userModel";
import { store } from "../../../libs/store";

const users = new Elysia({ prefix: "/users" })
    .use(userModel)
    .use(userService)
    .get("/",  (read) => read )
    .post(
        "/signup",
        async ({ set, signup, body, cookie: { accessToken, refreshToken } }) => {
            const { access, refresh } = await signup(body);
            
            accessToken.set({
                value: access,
                httpOnly: true,
                path: "/"
            });
            
            refreshToken.set({
                value: refresh,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 86400
            })

            set.status = 200;
            return access;
        },
        { body: "signupSchema" }
    )
    .post(
        "/login",
        async ({ set, login, body, cookie: { accessToken, refreshToken } }) => {
            const { access, refresh } = await login(body);
            
            accessToken.set({
                value: access,
                httpOnly: true,
                path: "/"
            });
            
            refreshToken.set({
                value: refresh,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 86400
            })

            set.status = 200;
            return access;
        },
        { body: "loginSchema" }
    );

export default users;
