/*
  Warnings:

  - Added the required column `name` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "name" TEXT NOT NULL;
