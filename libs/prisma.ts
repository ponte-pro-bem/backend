import { PrismaClient } from "@prisma/client";
import logger from "./logger";

async function initializePrisma() {
    try {
        const prisma = new PrismaClient();

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
