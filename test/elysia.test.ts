import { afterAll, describe, expect, test } from "bun:test";
import { APP_URL } from "../libs/constants";

import app from "../src/app";

import { prismaCleanup } from "../libs/prisma";
import { campaignData, getExpectedAccessToken, getExpectedInstitutionId, institutionData, setExpectedAccessToken, setExpectedInstitutionId, userData } from "./setup";
import logger from "../libs/logger";

describe("Elysia", () => {
    test("Health check", async () => {
        const response = await app
            .handle(new Request(APP_URL))
            .then((res) => res.text());

        expect(response).toBe("OK");
    });

    describe("/users", async () => {
        const url = APP_URL + "/users";
        test("/signup", async () => {
            const response: any = await app
                .handle(
                    new Request(url + "/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    })
                )
                .then(async (res) => res.json());

            logger.info(response);

            expect(response.access).toBeTypeOf("string");
            expect(response.refresh).toBeTypeOf("string");

            setExpectedAccessToken(response.access)
        });
    });

    describe("/institutions", async () => {
        const url = APP_URL + "/institutions";
        test("/institutions", async () => {
            const response: any = await app
                .handle(
                    new Request(url + "/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Cookie": `accessToken=${getExpectedAccessToken()}`
                        },
                        body: JSON.stringify(institutionData),
                    })
                )
                .then(async (res) => res.json());

            logger.info(response);

            expect(response.id).toBeTypeOf("string");
            expect(response.name).toEqual(institutionData.name);

            setExpectedInstitutionId(response.id);
        });
    });

    describe("/campaigns", async () => {
        const url = APP_URL + "/campaigns";
        test("/create", async () => {
            const expectedInstitutionId = getExpectedInstitutionId();

            const response: any = await app
                .handle(
                    new Request(url + "/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Cookie": `accessToken=${getExpectedAccessToken()}`
                        },
                        body: JSON.stringify({ ...campaignData, institutionId: expectedInstitutionId }),
                    })
                )
                .then(async (res) => res.json());

            logger.info(response);

            expect(response.id).toBeTypeOf("string");
            expect(response.name).toEqual(campaignData.name);
            expect(response.institutionId).toEqual(expectedInstitutionId);
        });
    });
});

afterAll(async () => {
    await prismaCleanup();
});
