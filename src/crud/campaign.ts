import { Tag } from "@prisma/client";
import logger from "../../libs/logger";
import { prisma } from "../../libs/prisma";
import { ErrorResponse } from "../types";
import { CustomError } from "./errors";
import { uploadImageBuffer } from "./bucket";
import { createImage } from "./image";
import { createTag } from "./tag";

export const getCampaigns = async () => {
  return await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        select: {
          id: true,
          key: true,
          url: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          icon: true,
          iconLibrary: true
        }
      }
    },
  });
};

export interface CreateCampaignInput {
  name: string;
  description: string;
  pixQRCodeRaw: string;
  tags: Tag[]
  files: any[];
  startDate: string
  endDate: string
}


export const createCampaign = async (
  createCampaignInput: CreateCampaignInput
) => {
  try {
    // const institution = await prisma.institution.findUnique({
    //   where: {
    //     id: createCampaignInput.institutionId,
    //   },
    // });

    // if (!institution) {
    //   return {
    //     error: true,
    //     code: 404,
    //     message: CustomError.INSTITUTION_NOT_FOUND,
    //   };
    // }

    const campaign = await prisma.campaign.create({
      data: {
        // institution: {
        //   connect: createCampaignInput.institutionId ? { id: createCampaignInput.institutionId } : undefined
        // },

        name: createCampaignInput.name,
        description: createCampaignInput.description,
        pixQRCodeRaw: createCampaignInput.pixQRCodeRaw,
        startDate: createCampaignInput.startDate,
        endDate: createCampaignInput.endDate,
      },
    });


    // 2. Para cada arquivo, salvamos a imagem e criamos a referência
    const imagePromises = createCampaignInput.files.map(async (file) => {
      uploadImageBuffer(file.name, Buffer.from(await file.arrayBuffer()))
      return await createImage({
        key: file.name,
        campaignId: campaign.id,
      });
    });

    await Promise.all(imagePromises);
    console.log(createCampaignInput.tags)
    const tagPromises = createCampaignInput.tags.map(async (tag1) => {
      const tag = JSON.parse(tag1)
      return await createTag({
        name: tag.name,
        icon: tag.icon || undefined,
        iconLibrary: tag.iconLibrary || undefined,
        campaignId: campaign.id
      });
    });
    await Promise.all(tagPromises);

    // 3. Buscamos a institution com as imagens incluídas
    const institutionWithImages = await prisma.campaign.findUnique({
      where: { id: campaign.id },
      include: {
        images: {
          select: {
            id: true,
            key: true,
            url: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });

    console.log('>>>', institutionWithImages);


    return { data: institutionWithImages, code: 201 };
  } catch (e) {
    logger.error(e);

    throw CustomError.UNEXPECTED_ERROR;
  }
};
export const deleteCampaign = async (id: string) => {
  return await prisma.campaign.delete({
    where: {
      id,
    },
  });
};