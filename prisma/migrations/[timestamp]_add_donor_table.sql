-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar doador padrão para doações existentes
INSERT INTO "Donor" (id, name, cpf, createdAt, updatedAt) 
VALUES ('legacy-donor', 'Doador Legacy', '00000000000', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN "donorId" TEXT;
ALTER TABLE "Donation" ADD COLUMN "updatedAt" DATETIME;

-- Atualizar doações existentes
UPDATE "Donation" 
SET 
    "donorId" = 'legacy-donor',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "donorId" IS NULL;

-- Agora podemos fazer as colunas required
ALTER TABLE "Donation" 
ALTER COLUMN "donorId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Donor_cpf_key" ON "Donor"("cpf");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 