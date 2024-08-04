import logger from "../../libs/logger";
import { prisma } from "../../libs/prisma";
import { CreateCampaignInput, ErrorResponse } from "../types";
import { CustomError } from "./errors";

export const getCampaigns = async () => {
    return await prisma.campaign.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const createCampaign = async (createCampaignInput: CreateCampaignInput) => {
    try {
        const institution = await prisma.institution.findUnique({
            where: {
                id: createCampaignInput.institutionId
            }
        })

        if (!institution) {
            return {
                error: true,
                code: 404,
                message: CustomError.INSTITUTION_NOT_FOUND
            }
        }

        const campaign = await prisma.campaign.create({
            data: {
                institution: {
                    connect: { id: createCampaignInput.institutionId }
                },
                name: createCampaignInput.name,
                description: createCampaignInput.description,
                images: createCampaignInput.images,
                pixQRCodeRaw: createCampaignInput.pixQRCodeRaw,
                startDate: createCampaignInput.startDate,
                endDate: createCampaignInput.endDate,
            }
        });
    
        return { data: campaign, code: 201 };
    } catch (e) {
        logger.error(e)
        
        throw CustomError.UNEXPECTED_ERROR
    }
};
