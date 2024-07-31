import { Elysia } from "elysia";

import { userService } from "./userService";
import { userModel } from "./userModel";
import { store } from "../../../libs/store";

const users = new Elysia({ prefix: "/users" })
    .use(userModel)
    .use(userService)
    .get("/",  (read) => read )
    .post(
        "/create",
        ({ create, body }) => create(body),
        { body: "createUserSchema" }
    );

export default users;
