import { prisma } from "../libs/prisma"

import { uploadImageBuffer } from "../src/crud/bucket";

async function main() {
  // Inserting an institution
  const institution = await prisma.institution.create({
    data: {
      name: "Charity Organization",
      description: "A charity organization",
      pixQRCodeRaw: "raw_qr_code_data",
    },
  });

  
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
