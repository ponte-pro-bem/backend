/*
  Warnings:

  - You are about to drop the column `endDate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Campaign` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pixQRCodeRaw" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionId" TEXT,
    CONSTRAINT "Campaign_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Campaign" ("createdAt", "description", "id", "institutionId", "name", "pixQRCodeRaw") SELECT "createdAt", "description", "id", "institutionId", "name", "pixQRCodeRaw" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
