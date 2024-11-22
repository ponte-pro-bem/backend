import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateCampaignInput } from "../../types";
import { createCampaign, deleteCampaign, getCampaigns } from "../../crud/campaign";

export const campaignService = new Elysia({ name: "campaignService" })
    .use(store)
    .derive({ as: "global" }, ({ store }) => ({
        create: async (createCampaignData: CreateCampaignInput) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { error: isError, code, message, data } = await createCampaign(createCampaignData);

            if (data) store.campaigns.push(data);

            return {
                data,
                error: isError,
                code,
                message,
            };
        },
        read: () => getCampaigns(),
        delete: (institutionId: string) => deleteCampaign(institutionId),
    }));
