import { afterAll, beforeAll } from "bun:test";
import { prismaCleanup } from "../libs/prisma";

import { NODE_ENV } from "../libs/constants";

export const userData = {
  name: "João Test",
  password: "123456789abcdef",
  isAdmin: true,
};

export const institutionData = {
  name: "Nome da instituicao",
  description: "Descrição da instituição",
  pixQRCodeRaw: "00020126580014b....",
};

export const campaignData = {
  name: "Campanha",
  description: "Descrição da campanha.",
  pixQRCodeRaw: "00020126580014b....",
  startDate: '12/12/2024',
  endDate: '12/12/2025',
};

var t_expectedInstitutionId = "";
export const setExpectedInstitutionId = (id: string) => {
  t_expectedInstitutionId = id;
};
export const getExpectedInstitutionId = () => {
  return t_expectedInstitutionId;
};

var t_expectedAccessToken = "";
export const setExpectedAccessToken = (token: string) => {
  t_expectedAccessToken = token;
}
export const getExpectedAccessToken = () => {
  return t_expectedAccessToken;
}


beforeAll(async () => {
  if (NODE_ENV == "production") throw "Running tests in production! Aborting.";

  console.log("Reseting development database before tests...");
  await prismaCleanup();
});

afterAll(async () => {
  console.log("Cleaning up development database...");
  await prismaCleanup();
});
