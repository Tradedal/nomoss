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
      "@nomoss/providers/aws": fileURLToPath(
        new URL("./src/providers/aws/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/**/*.integration.test.ts"],
  },
});
