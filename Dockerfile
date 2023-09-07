FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

ENV PORT=8080 \
    ENV=production

EXPOSE 8080

CMD ["bun", "src/index.ts"]