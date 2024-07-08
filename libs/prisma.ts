import { PrismaClient } from "@prisma/client";
import logger from "./logger";

async function initializePrisma() {
    const prisma = new PrismaClient();

    try {
        await prisma.$executeRaw`SELECT 1;`;

        logger.info(
            "PrismaClient has been initialized and connected successfully."
        );
        return prisma;
    } catch (error) {
        logger.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

export const prisma = await initializePrisma();

export const prismaCleanup = async () => {
    await prisma.user.deleteMany();
};
