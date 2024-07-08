export type CreateUserInput = {
    name: string,
    password: string,
    isAdmin: boolean
}

export type CreateInstitutionInput = {
    name: string
}

export type CreateCampaignInput = {
    name: string,
    institutionId: string
}