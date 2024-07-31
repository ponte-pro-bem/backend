import Elysia from "elysia";
import { jwt } from "@elysiajs/jwt";

import { store } from "../../../libs/store";

import { createUser, getUserByName, getUsers } from "../../crud/user";
import { SignupInput, LoginInput } from "../../types";
import { CustomError } from "../../crud/errors";

import { JWT_SECRET } from "../../../libs/constants";
import { comparePassword, hashPassword } from "../../../libs/auth";


export const userService = new Elysia({ name: "userService" })
    .use(store)
    .use(jwt({ name: "jwt", secret: JWT_SECRET }))
    .derive({ as: "global" }, ({ jwt, store, set }) => ({
        signup: async (data: SignupInput) => {
            const { name, password, isAdmin } = data;
            const nameIsAlreadyTaken = await getUserByName(name)
            
            if (nameIsAlreadyTaken){
                set.status = 409;
                return { message: CustomError.USER_NAME_ALREADY_EXISTS  }
            }

            if (password.length < 12) {
                set.status = 400;
                return { message: CustomError.BAD_PASSWORD }
            }
            
            const { hash, salt } = await hashPassword(password);

            const user = await createUser({ ...data, hash, salt });
            store.users.push(user);

            //                     Seconds since epoch + 60 days
            const expirationDate = (Date.now() / 1000) + 60 * 86400;
            
            const access = await jwt.sign({ userId: user.id })
            const refresh = await jwt.sign({ userId: user.id, exp: expirationDate })
            return { access, refresh };
        },
        login: async (data: LoginInput) => {
            const { name, password } = data;

            const user = await getUserByName(name);

            if (!user) {
                set.status = 404;
                return { message: CustomError.USER_NOT_FOUND }
            }

            const match = await comparePassword(password, user.salt, user.hash);

            if (!match) {
                set.status = 400;
                return { message: CustomError.WRONG_PASSWORD }
            }
            //                     Seconds since epoch + 60 days
            const expirationDate = (Date.now() / 1000) + 60 * 86400;

            const access = await jwt.sign({ userId: user.id })
            const refresh = await jwt.sign({ userId: user.id, exp: expirationDate })
            return { access, refresh };
        },
        read: () => getUsers()
    }));
