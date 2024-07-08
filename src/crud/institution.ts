import { prisma } from "../../libs/prisma";
import { CreateInstitutionInput, CreateUserInput } from "../types";

export const getInstitutions = async () => {
    return await prisma.institution.findMany();
};

export const createInstitution = async (createInstitutionInput: CreateInstitutionInput) => {
    return await prisma.institution.create({
        data: createInstitutionInput,
    });
};
