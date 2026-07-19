import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@nomoss/core": fileURLToPath(
        new URL("./src/core/index.ts", import.meta.url),
      ),
      "@nomoss/providers": fileURLToPath(
        new URL("./src/providers/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["tests/**/*.integration.test.ts"],
  },
});
