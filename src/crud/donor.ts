import { prisma } from "../../libs/prisma";
import { CustomError } from "./errors";

export const getDonors = async () => {
  try {
    const donors = await prisma.donor.findMany({
      include: {
        donations: true, // Inclui as doações para calcular totais
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return donors;
  } catch (e) {
    console.error(e);
    throw CustomError.UNEXPECTED_ERROR;
  }
}; 