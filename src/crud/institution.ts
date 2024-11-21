import { Tag } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import { CreateInstitutionInput, CreateUserInput } from "../types";
import { uploadImageBuffer } from "./bucket";
import { createImage } from "./image";
import { createTag } from "./tag";

export const getInstitutions = async () => {
  return await prisma.institution.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: { select: { id: true, name: true, iconLibrary: true, icon: true } },
      images: { select: { id: true, key: true, url: true } },
    },
  });
};

// export const createInstitution = async (
//   createInstitutionInput: CreateInstitutionInput
// ) => {
//   return await prisma.institution.create({
//     data: createInstitutionInput,
//   });
// };
export interface CreateInstitutionDto {
  name: string;
  description: string;
  pixQRCodeRaw: string;
  tags: Tag[]
  files: any[];
}
export const createInstitution = async (
  createInstitutionDto: CreateInstitutionDto,
) => {
  try {

    console.log(createInstitutionDto.tags)
    const institution = await prisma.institution.create({
      data: {
        name: createInstitutionDto.name,
        description: createInstitutionDto.description,
        pixQRCodeRaw: createInstitutionDto.pixQRCodeRaw,
      },
    });

    // 2. Para cada arquivo, salvamos a imagem e criamos a referência
    const imagePromises = createInstitutionDto.files.map(async (file) => {
      uploadImageBuffer(file.name, Buffer.from(await file.arrayBuffer()))
      return await createImage({
        key: file.name,
        institutionId: institution.id,
      });
    });

    await Promise.all(imagePromises);
    console.log(createInstitutionDto.tags)
    const tagPromises = createInstitutionDto.tags.map(async (tag1) => {
      const tag = JSON.parse(tag1)
      return await createTag({
        name: tag.name,
        icon: tag.icon || undefined,
        iconLibrary: tag.iconLibrary || undefined,
        institutionId: institution.id
      });
    });
    await Promise.all(tagPromises);



    // 3. Buscamos a institution com as imagens incluídas
    const institutionWithImages = await prisma.institution.findUnique({
      where: { id: institution.id },
      include: {
        images: {
          select: {
            id: true,
            key: true,
            url: true,
          },

        },
        tags: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });

    return institutionWithImages;
  } catch (error) {
    throw error;
  }
};

export const deleteInstitution = async (id: string) => {
  return await prisma.institution.delete({
    where: {
      id,
    },
  });
};

export const updateInstitution = async (
  id: string,
  data: Partial<CreateInstitutionInput>
) => {
  return await prisma.institution.update({
    where: { id },
    data,
  });
};
