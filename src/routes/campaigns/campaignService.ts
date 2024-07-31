import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateCampaignInput } from "../../types";
import { createCampaign, getCampaigns } from "../../crud/campaign";

export const campaignService = new Elysia({ name: "campaignService" })
    .use(store)
    .derive({ as: "global" }, ({ store }) => ({
        create: async (createCampaignData: CreateCampaignInput) => {
            const campaign = await createCampaign(createCampaignData);
            store.campaigns.push(campaign);
            return campaign;
        },
        read: () => getCampaigns(),
    }));
