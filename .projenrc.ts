import { javascript, JsonFile, TextFile } from "projen";
import { YarnNodeLinker } from "projen/lib/javascript";

const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  description: "Effect-native infrastructure automation for TypeScript.",
  deps: [
    "@distilled.cloud/aws@^0.27.0",
    "@distilled.cloud/stripe@^0.27.0",
    "@effect/platform-node@4.0.0-beta.93",
    "effect@4.0.0-beta.93",
    "tsx@^4.20.6",
  ],
  copyrightOwner: "Roman Naumenko",
  devDeps: [
    "@biomejs/biome@2.4.12",
    "@effect/language-service@0.86.2",
    "@effect/tsgo@0.16.0",
    "@effect/vitest@4.0.0-beta.93",
    "@types/node@^24.0.0",
    "@typescript/native-preview@7.0.0-dev.20260611.2",
    "projen@^0.98.34",
    "typescript@^5.9.3",
    "vite@^8.0.7",
    "vitest@^4.1.4",
  ],
  entrypoint: "",
  github: false,
  jest: false,
  license: "MIT",
  licensed: true,
  name: "nomoss",
  npmAccess: javascript.NpmAccess.PUBLIC,
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  prettier: false,
  release: false,
  sampleCode: false,
  yarnBerryOptions: {
    version: "4.12.0",
    zeroInstalls: false,
    yarnRcOptions: {
      nodeLinker: YarnNodeLinker.NODE_MODULES,
    },
  },
});

project.package.addField("type", "module");
project.package.addField("engines", { node: ">=24" });
project.package.addField("bin", { nomoss: "bin/nomoss" });
project.package.addField("exports", {
  ".": "./src/index.ts",
  "./core": "./src/core/index.ts",
  "./providers": "./src/providers/index.ts",
  "./providers/aws": "./src/providers/aws/index.ts",
  "./providers/stripe": "./src/providers/stripe/index.ts",
});
project.package.addField("files", [
  "README.md",
  "LICENSE",
  "bin",
  "docs",
  "examples",
  "src",
]);
project.package.addField("publishConfig", { access: "public" });
project.package.addField("packageManager", "yarn@4.12.0");
project.package.addField("scripts", {
  check: "yarn lint && yarn typecheck:tsgo && vitest run --pool forks --passWithNoTests --exclude 'tests/**/*.integration.test.ts'",
  lint: "biome lint --reporter=summary",
  "lint:fix": "biome check --write",
  "typecheck:tsgo": "node ./node_modules/@typescript/native-preview/bin/tsgo.js -b .",
  projen: "tsx .projenrc.ts",
  postinstall: "effect-tsgo patch",
});
project.gitignore.addPatterns(".nomoss/");

new JsonFile(project, "tsconfig.json", {
  obj: {
    compilerOptions: {
      noEmit: true,
      rootDir: ".",
      incremental: true,
      tsBuildInfoFile: "lib/tsconfig.tsbuildinfo",
      allowImportingTsExtensions: true,
      module: "NodeNext",
      moduleResolution: "NodeNext",
      target: "ESNext",
      strict: true,
      noImplicitOverride: true,
      noFallthroughCasesInSwitch: true,
      noImplicitReturns: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      forceConsistentCasingInFileNames: true,
      moduleDetection: "force",
      verbatimModuleSyntax: true,
      skipLibCheck: true,
      plugins: [
        {
          name: "@effect/language-service",
          diagnosticSeverity: {
            globalDateInEffect: "error",
            globalDate: "warning",
            globalErrorInEffectCatch: "warning",
            globalFetch: "warning",
            globalFetchInEffect: "error",
            globalRandom: "error",
            globalTimers: "error",
            importFromBarrel: "warning",
            globalConsole: "warning",
            globalConsoleInEffect: "error",
            catchAllToMapError: "warning",
            anyUnknownInErrorContext: "error",
            layerMergeAllWithDependencies: "error",
            nodeBuiltinImport: "error",
            preferSchemaOverJson: "error",
            cryptoRandomUUID: "warning",
            cryptoRandomUUIDInEffect: "warning",
            deterministicKeys: "warning",
            effectDoNotation: "warning",
            newPromise: "warning",
            nestedEffectGenYield: "warning",
          },
          barrelImportPackages: ["effect", "@effect/*"],
          includeSuggestionsInTsc: true,
          ignoreEffectWarningsInTscExitCode: true,
          ignoreEffectSuggestionsInTscExitCode: true,
        },
      ],
      types: ["node"],
    },
    include: [
      "src/**/*.ts",
      "tests/**/*.ts",
      "vitest.config.ts",
      "vitest.integration.config.ts",
    ],
  },
});

new TextFile(project, "biome.jsonc", {
  marker: false,
  lines: [
    "{",
    '  \"$schema\": \"node_modules/@biomejs/biome/configuration_schema.json\",',
    '  \"root\": true,',
    '  \"files\": {',
    '    \"ignoreUnknown\": false,',
    '    \"includes\": [\"src/**/*.ts\", \"tests/**/*.ts\", \"vitest.config.ts\", \"vitest.integration.config.ts\"]',
    "  },",
    '  \"formatter\": { \"enabled\": true, \"indentStyle\": \"space\", \"indentWidth\": 2 },',
    '  \"javascript\": { \"formatter\": { \"quoteStyle\": \"double\" } },',
    '  \"linter\": { \"enabled\": true, \"rules\": { \"recommended\": true, \"style\": { \"useConst\": \"error\" } } },',
    '  \"vcs\": { \"clientKind\": \"git\", \"enabled\": true, \"useIgnoreFile\": true }',
    "}",
  ],
});

new TextFile(project, "vitest.config.ts", {
  marker: false,
  lines: [
    'import { defineConfig } from "vitest/config";',
    "",
    "export default defineConfig({",
    "  test: {",
    '    include: ["tests/**/*.test.ts"],',
    "  },",
    "});",
  ],
});

new TextFile(project, "vitest.integration.config.ts", {
  marker: false,
  lines: [
    'import { defineConfig } from "vitest/config";',
    "",
    "export default defineConfig({",
    "  test: {",
    '    include: ["tests/**/*.integration.test.ts"],',
    "  },",
    "});",
  ],
});
project.synth();
