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
  return await prisma.donation.findMany({
    include: {
      institution: { select: { id: true, name: true } },
      campaign: { select: { id: true, name: true } },
      donor: { select: { id: true, name: true, cpf: true } }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const validateCPF = (cpf: string): boolean => {
  const normalizedCPF = cpf.replace(/\D/g, "");
  return normalizedCPF.length === 11;
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

    const normalizedCPF = createDonateInput.cpf.replace(/\D/g, "");
      
    // Busca ou cria o doador
    const donor = await prisma.donor.upsert({
      where: { cpf: normalizedCPF },
      update: {},
      create: {
        name: createDonateInput.name,
        cpf: normalizedCPF,
      },
    });

    // Cria a doação vinculada ao doador
    // const donationData = {
    //   value: createDonateInput.value,
    //   donorId: donor.id,
    //   ...(createDonateInput.institutionId && {
    //     institutionId: { connect: { id: createDonateInput.institutionId } },
    //   }),
    //   ...(createDonateInput.campaignId && {
    //     campaign: { connect: { id: createDonateInput.campaignId } },
    //   }),
    // };

      const createdDonation = await prisma.donation.create({
        data: {
          donor: {
            connect: { id: donor.id }
          },
          // name: donor,
          // cpf: createDonateInput.cpf,
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

      const normalizedCPF = createDonateInput.cpf.replace(/\D/g, "");
      
      // Busca ou cria o doador
      const donor = await prisma.donor.upsert({
        where: { cpf: normalizedCPF },
        update: {},
        create: {
          name: createDonateInput.name,
          cpf: normalizedCPF,
        },
      });

      const createdDonation = await prisma.donation.create({
        data: {
          donor: {
            connect: { id: donor.id }
          },
          // name: createDonateInput.name,
          // cpf: createDonateInput.cpf,
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

      
      const normalizedCPF = createDonateInput.cpf.replace(/\D/g, "");
      
      // Busca ou cria o doador
      const donor = await prisma.donor.upsert({
        where: { cpf: normalizedCPF },
        update: {},
        create: {
          name: createDonateInput.name,
          cpf: normalizedCPF,
        },
      });




      const createdDonation = await prisma.donation.create({
        data: {
          // name: createDonateInput.name,
          // cpf: createDonateInput.cpf,
          // value: createDonateInput.value,
          value: createDonateInput.value,
          donor: {
            connect: { id: donor.id }
          }
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

// Adicionar função de delete
export const deleteDonation = async (id: string) => {
  try {
    const donation = await prisma.donation.delete({
      where: { id },
    });

    return { data: donation, code: 200 };
  } catch (e) {
    console.error(e);
    throw CustomError.UNEXPECTED_ERROR;
  }
};