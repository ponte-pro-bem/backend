export type SignupInput = {
    name: string,
    password: string,
}

export type LoginInput = {
    name: string,
    password: string,
}

export type CreateUserInput = {
    name: string,
    hash: string,
    salt: string,
}

export type CreateInstitutionInput = {
    name: string,
    images: string[]
    description: string,
    pixQRCodeRaw: string
}

export type CreateCampaignInput = {
    name: string,
    images: string[]
    description: string,
    startDate: string,
    endDate: string,
    pixQRCodeRaw: string,
    institutionId: string
}


export interface ErrorResponse {
    error?: boolean;
    code: number;
    message?: string;
}

// Define tipos para as respostas de sucesso das funções
export interface SignupResponse extends ErrorResponse {
    access?: string;
    refresh?: string;
};

export interface LoginResponse extends ErrorResponse{
    access?: string;
    refresh?: string;
};

