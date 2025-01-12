import { Tag, Donation } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import {
  CreateDonateInput,
  CreateInstitutionInput,
  CreateUserInput,
} from "../types";
import { uploadImageBuffer } from "./bucket";
import { createImage } from "./image";
import { createTag } from "./tag";
import { CustomError } from "./errors";

export const getDonations = async () => {
  return await prisma.donation.findMany();
};

export const createDonation = async (createDonateInput: CreateDonateInput) => {
  try {
    // Verificar se a instituição existe (se informado)
    if (createDonateInput.institutionId && !createDonateInput.campaignId) {
      const institution = await prisma.institution.findUnique({
        where: { id: createDonateInput.institutionId },
      });

      if (!institution) {
        return {
          data: null,
          error: true,
          code: 404,
          message: CustomError.INSTITUTION_NOT_FOUND,
        };
      }

      const createdDonation = await prisma.donation.create({
        data: {
          name: createDonateInput.name,
          cpf: createDonateInput.cpf,
          value: createDonateInput.value,
          institution: {
            connect: { id: createDonateInput.institutionId },
          },
        },
      });

      return { data: createdDonation, code: 201 };
    }

    // Verificar se a campanha existe (se informado)
    if (!createDonateInput.institutionId && createDonateInput.campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: createDonateInput.campaignId },
      });

      if (!campaign) {
        return {
          data: null,
          error: true,
          code: 404,
          message: CustomError.CAMPAIGN_NOT_FOUND,
        };
      }

      const createdDonation = await prisma.donation.create({
        data: {
          name: createDonateInput.name,
          cpf: createDonateInput.cpf,
          value: createDonateInput.value,
          campaign: {
            connect: { id: createDonateInput.campaignId },
          },
        },
      });

      return { data: createdDonation, code: 201 };
    }

    // Caso não tenha nem instituição nem campanha associada
    if (!createDonateInput.institutionId && !createDonateInput.campaignId) {
      const createdDonation = await prisma.donation.create({
        data: {
          name: createDonateInput.name,
          cpf: createDonateInput.cpf,
          value: createDonateInput.value,
        },
      });

      return { data: createdDonation, code: 201 };
    }

    return {
      error: true,
      code: 500,
      message: CustomError.UNEXPECTED_ERROR,
    };
  } catch (e) {
    console.error(e);
    throw CustomError.UNEXPECTED_ERROR;
  }
};
