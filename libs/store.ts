import { Campaign, Institution, User } from "@prisma/client";
import Elysia from "elysia";

const users: User[] = []
const institutions: Institution[] = []
const campaigns: Campaign[] = []

export const store = new Elysia({ name: "store" })
    .state("users", users)
    .state("institutions", institutions)
    .state("campaigns", campaigns)
    .decorate("getUser", (userId: string) => {
        return users.find(user => user.id = userId);
    })
    .decorate("getInstitution", (institutionId: string) => {
        return institutions.find(inst => inst.id = institutionId);
    })
    .decorate("getCampaign", (campaignId: string) => {
        return campaigns.find(cmpg => cmpg.id = campaignId);
    });
