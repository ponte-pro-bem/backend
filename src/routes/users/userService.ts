import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateUserInput } from "../../types";
import { createUser } from "../../crud/user";

export const userService = new Elysia({ name: "userService" })
    .use(store)
    .derive(({ store }) => ({
        create: async (userInputData: CreateUserInput) => {
            const user = await createUser(userInputData);
            store.users.push(user);
            return user;
        },
    }));
