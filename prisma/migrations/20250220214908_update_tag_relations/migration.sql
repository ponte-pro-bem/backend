/*
  Warnings:

  - You are about to drop the column `campaignId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `institutionId` on the `Tag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_InstitutionToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InstitutionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Institution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InstitutionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CampaignToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CampaignToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CampaignToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "iconLibrary" TEXT,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tag" ("createdAt", "icon", "iconLibrary", "id", "name") SELECT "createdAt", "icon", "iconLibrary", "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_InstitutionToTag_AB_unique" ON "_InstitutionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_InstitutionToTag_B_index" ON "_InstitutionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToTag_AB_unique" ON "_CampaignToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToTag_B_index" ON "_CampaignToTag"("B");
