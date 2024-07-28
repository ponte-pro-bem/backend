import { afterAll, beforeAll } from "bun:test";
import { prismaCleanup } from "../libs/prisma";

import { NODE_ENV } from "../libs/constants";

export const userData = {
  name: "Nome do usuário",
  password: "123456",
  isAdmin: false,
};

export const institutionData = {
  name: "Nome da instituicao",
  description: "Descrição da instituição",
  images: [],
  pixQRCodeRaw: "00020126580014b....",
};

export const campaignData = {
  name: "Campanha",
  description: "Descrição da campanha.",
  images: [],
  pixQRCodeRaw: "00020126580014b....",
};

var t_expectedInstitutionId = "";
export const setExpectedInstitutionId = (id: string) => {
  t_expectedInstitutionId = id;
};
export const getExpectedInstitutionId = () => {
  return t_expectedInstitutionId;
};

beforeAll(async () => {
  if (NODE_ENV == "production") throw "Running tests in production! Aborting.";

  console.log("Reseting development database before tests...");
  await prismaCleanup();
});

afterAll(async () => {
  console.log("Cleaning up development database...");
  await prismaCleanup();
});
