import Elysia from "elysia";
import { getDonors } from "../../crud/donor";

export const donorService = new Elysia({ name: "donorService" })
  .derive({ as: "global" }, () => ({
    read: () => getDonors(),
  })); 