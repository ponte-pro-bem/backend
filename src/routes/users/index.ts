import { Elysia } from "elysia";

import { userService } from "./userService";
import { userModel } from "./userModel";
import { store } from "../../../libs/store";

const users = new Elysia({ prefix: "/users" })
    .use(userModel)
    .use(userService)
    .get("/",  async ({read}) => {
        return read()
    })
    .post(
        "/signup",
        async ({ set, signup, body, cookie: { accessToken, refreshToken }, error }) => {
            try {
                const { error: isError, message: errorMessage, code: statusCode, access, refresh } = await signup(body);

                if (isError) {
                    return error(statusCode, errorMessage);
                }
                
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
                return { access, refresh };
            } catch (e) {
                set.status = 500;
                return e;
            }
        },
        { body: "signupSchema" }
    )
    .post(
        "/login",
        async ({ set, login, body, cookie: { accessToken, refreshToken }, error }) => {
            const { access, refresh, code, error: isError, message } = await login(body);

            if (isError) {
                return error(code, message);
            }
            
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
            return { access, refresh };
        },
        { body: "loginSchema" }
    );

export default users;
