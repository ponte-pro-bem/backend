/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixQRCodeRaw` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixQRCodeRaw` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "pixQRCodeRaw" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "pixQRCodeRaw" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
