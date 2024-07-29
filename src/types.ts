export type CreateUserInput = {
    name: string,
    password: string,
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