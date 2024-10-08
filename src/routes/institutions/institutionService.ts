import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateInstitutionInput } from "../../types";
import { createInstitution, getInstitutions } from "../../crud/institution";

export const institutionService = new Elysia({ name: "institutionService" })
    .use(store)
    .derive({ as: "global" }, ({ store }) => ({
        create: async (institutionInputData: CreateInstitutionInput) => {
            const institution = await createInstitution(institutionInputData);
            store.institutions.push(institution);
            return institution;
        },
        read: () => getInstitutions(),
    }));
