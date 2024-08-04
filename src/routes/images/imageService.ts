import Elysia from "elysia";
import { store } from "../../../libs/store";
import { CreateImageInput } from "../../types";

import { getObjectUrl, uploadImageBuffer } from "../../crud/bucket"
import { createImage, getImages } from "../../crud/image";
import logger from "../../../libs/logger";

export const imageService = new Elysia({ name: "imageService" })
    .use(store)
    .derive({ as: "global" }, ({ store }) => ({
        create: async (imageData: CreateImageInput, file: string) => {
            const output = await uploadImageBuffer(imageData.key, file);
            const {code, data} = await createImage(imageData);
            
            return {
                data,
                code
            };
        },
        read: () => getImages(),
    }));
