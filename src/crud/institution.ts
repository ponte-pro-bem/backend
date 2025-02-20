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
  tags: string[]
  files: any[];
}
export const createInstitution = async (createInstitutionDto: CreateInstitutionDto) => {
  try {
    const institution = await prisma.institution.create({
      data: {
        name: createInstitutionDto.name,
        description: createInstitutionDto.description,
        pixQRCodeRaw: createInstitutionDto.pixQRCodeRaw,
        tags: {
          connect: createInstitutionDto.tags.map(tag => ({ id: tag }))
        }
      },
      include: {
        tags: true
      }
    });

    // Upload de imagens
    const imagePromises = createInstitutionDto.files.map(async (file) => {
      uploadImageBuffer(file.name, Buffer.from(await file.arrayBuffer()))
      return await createImage({
        key: file.name,
        institutionId: institution.id,
      });
    });

    await Promise.all(imagePromises);

    return { data: institution, code: 201 };
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

// export const updateInstitution = async (
//   id: string,
//   data: Partial<CreateInstitutionInput>
// ) => {
//   return await prisma.institution.update({
//     where: { id },
//     data,
//   });
// };
