import logger from "../../libs/logger";
import { prisma } from "../../libs/prisma";
import { CreateCampaignInput } from "../types";

export const getCampaigns = async () => {
    return await prisma.campaign.findMany();
};

export const createCampaign = async (createCampaignInput: CreateCampaignInput) => {
    try {
        const campaign = await prisma.campaign.create({
            data: {
                name: createCampaignInput.name,
                institution: {
                    connect: {
                        id: createCampaignInput.institutionId
                    }
                }
            }
        });
    
        return campaign;
    } catch (e) {
        logger.error(e)
    }
};
