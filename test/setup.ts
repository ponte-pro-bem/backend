import { afterAll, afterEach, beforeAll } from "bun:test";
import { prisma, prismaCleanup } from "../libs/prisma";

import { NODE_ENV } from "../libs/constants";

export const userData =  {
    name: "name",
    password: "pwd",
    isAdmin: false
}

export const institutionData = {
    name: "institution"
}

export const campaignData = {
    name: "campaign"
}

var t_expectedInstitutionId = ""
export const setExpectedInstitutionId = (id: string) => {t_expectedInstitutionId=id}
export const getExpectedInstitutionId = () => {return t_expectedInstitutionId}

beforeAll(async () => {
    if (NODE_ENV == "production")
        throw "Running tests in production! Aborting.";

    console.log("Reseting development database before tests...");
    await prismaCleanup();
});

afterAll(async () => {
    console.log("Cleaning up development database...");
    await prismaCleanup();
});
