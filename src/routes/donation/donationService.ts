import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateDonateInput } from "../../types";
import { createDonation, getDonations } from "../../crud/donation";

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
    // delete: (donationId: string) => deletedonation(donationId),
  }));
