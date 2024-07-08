import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateCampaignInput } from "../../types";
import { createCampaign } from "../../crud/campaign";

export const campaignService = new Elysia({ name: "campaignService" })
    .use(store)
    .derive(({ store }) => ({
        create: async (createCampaignData: CreateCampaignInput) => {
            const campaign = await createCampaign(createCampaignData);
            store.campaigns.push(campaign);
            return campaign;
        },
    }));
