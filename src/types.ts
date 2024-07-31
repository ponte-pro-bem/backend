export type SignupInput = {
    name: string,
    password: string,
    isAdmin: boolean
}

export type LoginInput = {
    name: string,
    password: string,
}

export type CreateUserInput = {
    name: string,
    hash: string,
    salt: string,
    isAdmin: boolean
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