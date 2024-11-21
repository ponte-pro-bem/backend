/*
  Warnings:

  - Added the required column `icon` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconLibrary` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionId" TEXT,
    "campaignId" TEXT,
    "iconLibrary" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    CONSTRAINT "Tag_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tag_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("campaignId", "createdAt", "id", "institutionId", "name") SELECT "campaignId", "createdAt", "id", "institutionId", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
