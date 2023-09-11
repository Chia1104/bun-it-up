FROM rustlang/rust:nightly-slim as builder

WORKDIR /app

COPY src/libs/main.rs main.rs

RUN rustc --crate-type cdylib main.rs

FROM oven/bun:latest as runner

WORKDIR /app

COPY . .
COPY --from=builder /app/libmain.so ./libmain.so

RUN bun install --production

ENV PORT=8080 \
    ENV=production

EXPOSE 8080

CMD ["bun", "src/index.ts"]