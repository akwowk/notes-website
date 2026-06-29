FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

RUN pnpm build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
