import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateDonateInput } from "../../types";
import { createDonation, getDonations, deleteDonation } from "../../crud/donation";

export const donationService = new Elysia({ name: "donationService" })
  .use(store)
  .derive({ as: "global" }, ({ store }) => ({
    create: async (donationInputData: CreateDonateInput) => {
      console.log(donationInputData);
      const donation = await createDonation(donationInputData);
      store.donations.push(donation);
      return donation;
    },
    read: () => getDonations(),
    delete: async (id: string) => {
      try {
        const result = await deleteDonation(id);
        return result;
      } catch (error) {
        return { error: true, message: error };
      }
    }
  }));
