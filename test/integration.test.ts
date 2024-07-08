import { test, expect, describe, afterAll } from "bun:test";

import { prismaCleanup } from "../libs/prisma";

describe("Create the basic data entities.", async () => {
    // integration tests go here
});

afterAll(async () => {
    await prismaCleanup();
});
