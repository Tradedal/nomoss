import { fileURLToPath } from "node:url";
import { Record } from "effect";
import { defineConfig } from "vitest/config";
import tsconfig from "./tsconfig.json" with { type: "json" };

export default defineConfig({
  resolve: {
    alias: Record.map(tsconfig.compilerOptions.paths, ([path]) =>
      fileURLToPath(new URL(path, import.meta.url)),
    ),
  },
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/**/*.integration.test.ts"],
  },
});
