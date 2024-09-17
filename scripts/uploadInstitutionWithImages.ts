import { readdir } from "node:fs/promises";

import { prisma } from "../libs/prisma"
import { uploadImageBuffer } from "../src/crud/bucket";
import { CreateInstitutionInput } from "../src/types";
import { createInstitution } from "../src/crud/institution";
import { createImage } from "../src/crud/image";


async function main() {
  const institutionsDirList = await readdir("./data/institutions")
  for (const dir in institutionsDirList) {
    const basePath = `./data/institutions/${dir}`

    const data: CreateInstitutionInput = await Bun.file(basePath+"/data").json()
    const institution = await createInstitution(data)

    const images = await readdir(basePath+"./images");
    for (const img in images) {
      const f = Bun.file(`${basePath}/images/${img}`)
      const imgBuffer =  Buffer.from(await f.arrayBuffer())

      const output = await uploadImageBuffer(img, imgBuffer)
      await createImage({
        key: img,
        institutionId: institution.id
      })
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
