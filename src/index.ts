import { Elysia } from "elysia";
import { dlopen, FFIType, suffix } from "bun:ffi";

/**
 * Hmmm...
 */
// import { add } from "./libs/main.rs";

// const version = add(1, 0);

const path = `libmain.${suffix}`

const {
  symbols: {
    add, // the function to call
  },
} = dlopen(
  path, // a library name or file path
  {
    add: {
      args: [
        FFIType.int32_t, // the type of the first argument
        FFIType.int32_t, // the type of the second argument
      ],
      returns: FFIType.int32_t, // the type of the return value
    },
  },
);

const app = new Elysia().get("/", () => `Hello Elysia, Bun (v${add(1, 0)})`).listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
