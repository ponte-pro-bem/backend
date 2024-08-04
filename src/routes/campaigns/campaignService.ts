import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateCampaignInput } from "../../types";
import { createCampaign, getCampaigns } from "../../crud/campaign";

export const campaignService = new Elysia({ name: "campaignService" })
    .use(store)
    .derive({ as: "global" }, ({ store }) => ({
        create: async (createCampaignData: CreateCampaignInput) => {
            const {error: isError,code, message, data} = await createCampaign(createCampaignData);
            
            if(data) store.campaigns.push(data);

            return {
                data,
                error: isError,
                code,
                message,
            };
        },
        read: () => getCampaigns(),
    }));
