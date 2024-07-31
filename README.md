# Sample .env

```
NODE_ENV="development"
LOG_LEVEL="info"

APP_HOST="localhost"
APP_PORT="8080"

DB_HOST="localhost"
DB_PORT="6500"

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="ratings-${NODE_ENV}"

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/postgres?schema=public"

AWS_ACCESS_KEY_ID="key"
AWS_SECRET_ACCESS_KEY="secretkey"
AWS_REGION="sa-east-1"
```

# Setup

```
touch .env // Needed for testing and deployment.
bun install
bunx prisma migrate dev
bun test
bunx prisma db seed
```
