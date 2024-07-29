import Elysia from "elysia";
import { store } from "../../../libs/store";
import { createUser, getUserByName, getUsers } from "../../crud/user";
import { CreateUserInput } from "../../types";
import { CustomError } from "../../crud/errors";

export const userService = new Elysia({ name: "userService" })
    .use(store)
    .derive(({ store, set }) => ({
        create: async (data: CreateUserInput) => {
            
            const nameIsAlreadyTaken = await getUserByName(data.name)
            
            if (nameIsAlreadyTaken){
                set.status = 409
        
                return { message: CustomError.USER_NAME_ALREADY_EXISTS  }
            }
        
            
            const user = await createUser(data);
            store.users.push(user);
            
            return user;
        },
        read: () => getUsers()
    }));
