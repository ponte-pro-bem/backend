import logger from "../../libs/logger";
import { prisma } from "../../libs/prisma";
import { CreateTagInput } from "../types";
import { CustomError } from "./errors";

export const getTags = async () => {
  return await prisma.tag.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTagById = async (id: string) => {
  return await prisma.tag.findUnique({
    where: { id },
  });
};

export const createTag = async (createTagInput: CreateTagInput) => {
  try {
    // const tag = await prisma.tag.findFirst({
    //   where: {
    //     name: createTagInput.name,
    //   },
    // });

    // if (tag) {
    //   return {
    //     error: true,
    //     code: 409,
    //     message: CustomError.TAG_ALREADY_EXISTS,
    //   };
    // }

      const createdTag = await prisma.tag.create({
        data: {
          name: createTagInput.name,
          icon: createTagInput.icon,
          iconLibrary: createTagInput.iconLibrary,
        },
      });

      return { data: createdTag, code: 201 };

  

  } catch (e) {
    logger.error(e);
    return {
      error: true,
      code: 500,
      message: CustomError.UNEXPECTED_ERROR,
    };
  }
};

export const deleteTag = async (id: string) => {
  try {
    const tag = await prisma.tag.delete({
      where: { id },
    });
    return { data: tag, code: 200 };
  } catch (e) {
    logger.error(e);
    throw CustomError.UNEXPECTED_ERROR;
  }
};

export const updateTag = async (id: string, data: CreateTagInput) => {
  try {
    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        icon: data.icon,
        iconLibrary: data.iconLibrary,
      },
    });
    return { data: tag, code: 200 };
  } catch (e) {
    logger.error(e);
    throw CustomError.UNEXPECTED_ERROR;
  }
};

