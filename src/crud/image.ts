import logger from "../../libs/logger";
import { prisma } from "../../libs/prisma";
import { CreateImageInput } from "../types";
import { getObjectUrl } from "./bucket";
import { CustomError } from "./errors";

export const getImages = async () => {
    return await prisma.image.findMany();
};

export const createImage = async (createImageInput: CreateImageInput) => {
    try {
        const { key, campaignId, institutionId } = createImageInput;

        const url = await getObjectUrl(createImageInput.key);
        const image = await prisma.image.create({
            data: {
                key: createImageInput.key,
                url: url,
                institution: institutionId ? {
                    connect: { id: createImageInput.institutionId }
                } : undefined,
                campaign: campaignId ? {
                    connect: { id: createImageInput.campaignId }
                } : undefined
            }
        });
    
        return { data: image, code: 201 };
    } catch (e) {
        logger.error(e)
        
        throw CustomError.UNEXPECTED_ERROR
    }
};
