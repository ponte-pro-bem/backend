import { Campaign, Institution, Tag, User } from "@prisma/client";
import Elysia from "elysia";

const users: User[] = [];
const tags: Tag[] = [];
const institutions: Institution[] = [];
const campaigns: Campaign[] = [];
const donations: Campaign[] = [];

export const store = new Elysia({ name: "store" })
  .state("users", users)
  .state("tags", tags)
  .state("donations", donations)
  .state("institutions", institutions)
  .state("campaigns", campaigns)
  .decorate("getUser", (userId: string) => {
    return users.find((user) => (user.id = userId));
  })
  .decorate("getTag", (tagId: string) => {
    return tags.find((tag) => (tag.id = tagId));
  })
  .decorate("getInstitution", (institutionId: string) => {
    return institutions.find((inst) => (inst.id = institutionId));
  })
  .decorate("deleteInstitution", (institutionId: string) => {
    return institutions.filter((inst) => (inst.id != institutionId));
  })
  .decorate("getCampaign", (campaignId: string) => {
    return campaigns.find((cmpg) => (cmpg.id = campaignId));
  });
