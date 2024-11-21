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

export const createTag = async (createTagInput: CreateTagInput) => {
  try {
    const tag = await prisma.tag.findFirst({
      where: {
        name: createTagInput.name,
      },
    });

    if (tag) {
      return {
        error: true,
        code: 409,
        message: CustomError.TAG_ALREADY_EXISTS,
      };
    }

    if (createTagInput.institutionId && !createTagInput.campaignId) {
      const institution = await prisma.institution.findUnique({
        where: {
          id: createTagInput.institutionId,
        },
      });

      if (!institution) {
        return {
          data: null,
          error: true,
          code: 404,
          message: CustomError.INSTITUTION_NOT_FOUND,
        };
      }
      console.log('123123123', createTagInput);

      const createdTag = await prisma.tag.create({
        data: {
          name: createTagInput.name,
          institution: {
            connect: { id: createTagInput?.institutionId },
          },
          icon: createTagInput.icon,
          iconLibrary: createTagInput.iconLibrary,
        },
      });

      return { data: createdTag, code: 201 };
    }

    if (!createTagInput.institutionId && createTagInput.campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: createTagInput.campaignId,
        },
      });
      if (!campaign) {
        return {
          data: null,
          error: true,
          code: 404,
          message: CustomError.CAMPAIGN_NOT_FOUND,
        };
      }

      const createdTag = await prisma.tag.create({
        data: {
          name: createTagInput.name,
          campaign: {
            connect: { id: createTagInput?.campaignId },
          },
          icon: createTagInput.icon,
          iconLibrary: createTagInput.iconLibrary,
        },
      });

      return { data: createdTag, code: 201 };
    }

    if (!createTagInput.institutionId && !createTagInput.campaignId) {
      const createdTag = await prisma.tag.create({
        data: {
          name: createTagInput.name,
          icon: createTagInput.icon,
          iconLibrary: createTagInput.iconLibrary,
        },
      });

      return { data: createdTag, code: 201 };
    }

    return {
      error: true,
      code: 500,
      message: CustomError.UNEXPECTED_ERROR,
    };

  } catch (e) {
    logger.error(e);

    throw CustomError.UNEXPECTED_ERROR;
  }
};
