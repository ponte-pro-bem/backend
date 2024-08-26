# Sample .env

```
NODE_ENV="development"
LOG_LEVEL="info"

APP_HOST="localhost"
APP_PORT="8080"

DATABASE_URL="file:./dev.db"

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
