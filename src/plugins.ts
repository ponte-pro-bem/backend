import Elysia from "elysia";
import jwt from "@elysiajs/jwt";

import { prisma } from "../libs/prisma"
import { User } from "@prisma/client";

import { JWT_SECRET } from "../libs/constants";

import { CustomError } from "./crud/errors"


const authPlugin = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: JWT_SECRET,
      })
    )
    .derive(async ({ jwt, cookie: { accessToken }, set }) => {
      if (!accessToken.value) {
        set.status = 401;
        throw new Error(CustomError.BAD_TOKEN);
      }
      const payload = await jwt.verify(accessToken.value);
      if (!payload) {
        set.status = 403;
        throw new Error(CustomError.BAD_TOKEN);
      }

      const userId = payload.userId as string;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        set.status = 403;
        throw new Error(CustomError.BAD_TOKEN);
      }

      return {
        user,
      };
    });

export { authPlugin as auth };
