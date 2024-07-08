import { prisma } from "../../libs/prisma";
import { CreateUserInput } from "../types";

export const getUsers = async () => {
    return await prisma.user.findMany();
};

export const createUser = async (userInputData: CreateUserInput) => {
    return await prisma.user.create({
        data: userInputData,
    });
};
