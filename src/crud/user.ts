import { prisma } from "../../libs/prisma";
import { CreateUserInput } from "../types";

export const getUsers = async () => {
  return await prisma.user.findMany();
};


export const getUserByName = async (name: string) => {
  const user = await prisma.user.findUnique({ where: { name } });

  return user
}

export const createUser = async (data: CreateUserInput) => {
  return await prisma.user.create({ data });
};
