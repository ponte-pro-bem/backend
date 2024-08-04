import Elysia from "elysia";
import { jwt } from "@elysiajs/jwt";

import { store } from "../../../libs/store";

import { createUser, getUserByName, getUsers } from "../../crud/user";
import { SignupInput, LoginInput, SignupResponse, LoginResponse } from "../../types";
import { CustomError } from "../../crud/errors";

import { JWT_SECRET } from "../../../libs/constants";
import { comparePassword, hashPassword } from "../../../libs/auth";

export const userService = new Elysia({ name: "userService" })
    .use(store)
    .use(jwt({ name: "jwt", secret: JWT_SECRET }))
    .derive({ as: "global" }, ({ jwt, store }) => ({
        signup: async (data: SignupInput): Promise<SignupResponse> => {
            const { name, password } = data;
            const nameIsAlreadyTaken = await getUserByName(name);
            
            if (nameIsAlreadyTaken) {
                return { error: true, code: 409, message: CustomError.USER_NAME_ALREADY_EXISTS };
            }
            
            if (password.length < 8) {
                return { error: true, code: 400, message: CustomError.BAD_PASSWORD };
            }
            
            const { hash, salt } = await hashPassword(password);

            const user = await createUser({ name, hash, salt });
            store.users.push(user);

            // Seconds since epoch + 60 days
            const expirationDate = (Date.now() / 1000) + 60 * 86400;
            
            const access = await jwt.sign({ userId: user.id });
            const refresh = await jwt.sign({ userId: user.id, exp: expirationDate });

            return { access, refresh, code: 201 };
        },
        login: async (data: LoginInput): Promise<LoginResponse> => {
            const { name, password } = data;
            const user = await getUserByName(name);

            if (!user) {
                return { error: true, code: 404, message: CustomError.USER_NOT_FOUND };
            }

            const match = await comparePassword(password, user.salt, user.hash);

            if (!match) {
                return { error: true, code: 400, message: CustomError.WRONG_PASSWORD };
            }
            
            // Seconds since epoch + 60 days
            const expirationDate = (Date.now() / 1000) + 60 * 86400;

            const access = await jwt.sign({ userId: user.id });
            const refresh = await jwt.sign({ userId: user.id, exp: expirationDate });
            
            return { access, refresh, code: 200 };
        },
        read: async () => {
            const users = await getUsers();

            return users;
        }
    }));
