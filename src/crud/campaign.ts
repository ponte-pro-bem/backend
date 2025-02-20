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
  tags: string[]
  files: any[];
  // startDate: string
  // endDate: string
}


export const createCampaign = async (
  createCampaignInput: CreateCampaignInput
) => {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        name: createCampaignInput.name,
        description: createCampaignInput.description,
        pixQRCodeRaw: createCampaignInput.pixQRCodeRaw,
        tags: {
          connect: createCampaignInput.tags.map(tag => ({ id: tag }))
        }
      },
      include: {
        tags: true
      }
    });

    // Upload de imagens
    const imagePromises = createCampaignInput.files.map(async (file) => {
      uploadImageBuffer(file.name, Buffer.from(await file.arrayBuffer()))
      return await createImage({
        key: file.name,
        campaignId: campaign.id,
      });
    });

    await Promise.all(imagePromises);

    return { data: campaign, code: 201 };
  } catch (error) {
    throw error;
  }
};
export const deleteCampaign = async (id: string) => {
  return await prisma.campaign.delete({
    where: {
      id,
    },
  });
};