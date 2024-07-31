function envMustExist(name: string): string {
    const env = Bun.env[name];

    if (env == undefined || env == null)
        throw `Enviroment variable ${name} is required but not defined.`;
    return env;
}

export const NODE_ENV = Bun.env.NODE_ENV ?? "development";
export const LOG_LEVEL = Bun.env.LOG_LEVEL ?? "debug";

export const APP_HOST = envMustExist("APP_HOST");
export const APP_PORT = envMustExist("APP_PORT");
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`;

export const JWT_SECRET = envMustExist("JWT_SECRET")

export const AWS_SECRET_ACCESS_KEY = envMustExist("AWS_SECRET_ACCESS_KEY")
export const AWS_ACCESS_KEY_ID = envMustExist("AWS_ACCESS_KEY_ID")