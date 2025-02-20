import { Tag } from "@prisma/client";

export type SignupInput = {
  name: string;
  password: string;
};

export type LoginInput = {
  name: string;
  password: string;
};

export type CreateUserInput = {
  name: string;
  hash: string;
  salt: string;
};

export type CreateTagInput = {
  name: string;
  icon?: string;
  iconLibrary?: string;
};

export type CreateInstitutionInput = {
  name: string;
  description: string;
  pixQRCodeRaw: string;
  files: File[]
  tags: Tag[]
};


export type CreateDonateInput = {
  name: string;
  cpf: string;
  value: string;
  campaignId?: string;
  institutionId?: string;
};
export type CreateCampaignInput = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  pixQRCodeRaw: string;
  institutionId: string;
};

export type CreateImageInput = {
  key: string;
  tagId?: string;
  institutionId?: string;
  campaignId?: string;
};

export interface ErrorResponse {
  error?: boolean;
  code: number;
  message?: string;
}

// Define tipos para as respostas de sucesso das funções
export interface SignupResponse extends ErrorResponse {
  access?: string;
  refresh?: string;
}

export interface LoginResponse extends ErrorResponse {
  access?: string;
  refresh?: string;
}
