import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Array as Arr, Effect, FileSystem, Option } from "effect";
import {
  JsonFile,
  JsonPatch,
  javascript,
  ReleasableCommits,
  release,
} from "projen";
import packageManifest from "./package.json" with { type: "json" };

const currentPackageVersion: string = packageManifest.version;

const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  description: "Effect-native infrastructure automation for TypeScript.",
  deps: [
    "@aws-crypto/sha256-js@^5.2.0",
    "@aws-sdk/core@^3.979.1",
    "@aws-sdk/credential-provider-node@^3.972.92",
    "@smithy/core@^3.38.1",
    "@smithy/signature-v4@^5.7.5",
    "@smithy/types@^4.19.0",
    "@effect/platform-node@4.1.1",
    "effect@4.1.1",
    "redis@^6.3.1",
    "tsx@^4.20.6",
  ],
  copyrightOwner: "Roman Naumenko",
  devDeps: [
    "@aws-cdk/service-spec-importers@0.0.145",
    "@aws-cdk/service-spec-types@0.0.289",
    "@biomejs/biome@2.6.3",
    "@catenarycloud/linteffect@0.1.0",
    "@effect/tsgo@0.63.0",
    "@effect/vitest@4.1.1",
    "@types/node@^24.0.0",
    "projen@^0.98.34",
    "ts-morph@27.0.2",
    "typescript@7.0.2",
    "typescript-ast@npm:typescript@6.0.2",
    "vite@^8.0.7",
    "vitest@^5.0.5",
  ],
  entrypoint: "",
  github: true,
  jest: false,
  license: "MIT",
  licensed: true,
  name: "nomoss",
  npmAccess: javascript.NpmAccess.PUBLIC,
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  prettier: false,
  releaseToNpm: true,
  release: true,
  releaseTrigger: release.ReleaseTrigger.workflowDispatch(),
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  repository: "https://github.com/Tradedal/nomoss.git",
  workflowNodeVersion: "24.11.1",
  workflowBootstrapSteps: [
    {
      name: "Install Yarn",
      run: "corepack enable && corepack prepare yarn@4.17.1 --activate",
    },
  ],
  yarnBerryOptions: {
    version: "4.17.1",
    zeroInstalls: false,
    yarnRcOptions: {
      enableScripts: true,
      nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
    },
  },
});

project.release?.publisher?.publishToNpm({
  trustedPublishing: true,
});

project.package.addVersion(currentPackageVersion);
project.package.addField("type", "module");
project.package.addField("engines", { node: ">=24" });
project.package.addField("exports", {
  ".": "./src/index.ts",
  "./core": "./src/core/index.ts",
  "./cli": "./src/cli.ts",
  "./providers": "./src/providers/index.ts",
  "./providers/commands": "./src/providers/resourceCommandPolicyLayer.ts",
  "./providers/aws": "./src/providers/aws/index.ts",
  "./providers/stripe": "./src/providers/stripe/index.ts",
});
project.package.addField("files", [
  "README.md",
  "LICENSE",
  "docs",
  "examples",
  "media",
  "src",
]);
project.package.addField("publishConfig", { access: "public" });
project.package.addField("packageManager", "yarn@4.17.1");
project.package.addField("scripts", {
  check:
    "yarn format && yarn lint && yarn typecheck:tsgo && vitest run --pool forks --passWithNoTests --exclude 'tests/**/*.integration.test.ts'",
  format: "biome check --write",
  "format:staged": "biome check --write --staged --no-errors-on-unmatched",
  "generate:aws-resource-definition":
    "tsx tools/compileAwsResourceDefinition.ts",
  "generate:aws-resources": "tsx tools/compileAwsCloudControlClient.ts",
  "generate:stripe-client": "tsx tools/compileStripeClient.ts",
  lint: "biome lint --reporter=summary",
  "lint:fix": "biome check --write",
  nomoss: "tsx examples/queue/cli.ts",
  "tsgo:patch": "effect-tsgo patch --typescript",
  "typecheck:tsgo": "yarn format:staged && effect-tsgo tsc --build .",
  "test:integration":
    "vitest run --config vitest.integration.config.ts --pool forks",
  "test:integration:aws":
    "vitest run --config vitest.integration.config.ts tests/awsUploadEvents.integration.test.ts --pool forks",
  "test:integration:stripe":
    "vitest run --config vitest.integration.config.ts tests/stripe --pool forks",
  projen: "tsx .projenrc.ts",
  postinstall: "yarn tsgo:patch",
});
project.gitignore.addPatterns(".nomoss/");
project.gitignore.addPatterns("refs/");
project.defaultTask?.reset("tsx .projenrc.ts");
project.testTask.exec("yarn check");

Option.fromUndefinedOr(project.github).pipe(
  Option.flatMap((github) =>
    Arr.findFirst(github.workflows, (workflow) => workflow.name === "build"),
  ),
  Option.match({
    onNone: () => undefined,
    onSome: (buildWorkflow) => {
      buildWorkflow.file?.patch(
        JsonPatch.add("/jobs/build/steps/2/with/package-manager-cache", false),
      );
    },
  }),
);

new JsonFile(project, "tsconfig.json", {
  obj: {
    $schema: "./node_modules/@effect/tsgo/schema.json",
    compilerOptions: {
      noEmit: true,
      rootDir: ".",
      paths: {
        "@nomoss/core": ["./src/core/index.ts"],
        "@nomoss/providers": ["./src/providers/index.ts"],
        "@nomoss/providers/aws": ["./src/providers/aws/index.ts"],
      },
      incremental: true,
      tsBuildInfoFile: "lib/tsconfig.tsbuildinfo",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
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
            unstableApiUsage: "off",
            globalDateInEffect: "error",
            globalDate: "warning",
            globalErrorInEffectCatch: "warning",
            globalFetch: "warning",
            globalFetchInEffect: "error",
            globalRandom: "error",
            globalTimers: "error",
            preferBarrelImport: "warning",
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
          /**
           * Generated AWS schemas apply numeric checks after annotations, which
           * makes shorthand suggestions misleading for those declarations.
           * Handwritten schemas retain the schemaNumber diagnostic.
           */
          overrides: [
            {
              include: [
                "src/providers/aws/client/generated/**/*.ts",
                "src/providers/aws/resources/generated/**/*.ts",
              ],
              options: {
                diagnosticSeverity: { schemaNumber: "off" },
              },
            },
          ],
          barrelImportPackages: ["effect", "@effect/*"],
          includeSuggestionsInTsc: true,
          ignoreEffectWarningsInTscExitCode: false,
          ignoreEffectErrorsInTscExitCode: false,
          ignoreEffectSuggestionsInTscExitCode: true,
        },
      ],
      types: ["node"],
    },
    include: [
      ".projenrc.ts",
      "examples/**/*.ts",
      "src/**/*.ts",
      "tests/**/*.ts",
      "tools/**/*.ts",
      "vitest.config.ts",
      "vitest.integration.config.ts",
    ],
  },
});

new JsonFile(project, "biome.jsonc", {
  marker: false,
  readonly: false,
  obj: {
    $schema: "node_modules/@biomejs/biome/configuration_schema.json",
    root: true,
    extends: ["@catenarycloud/linteffect"],
    files: {
      ignoreUnknown: false,
      includes: [
        ".projenrc.ts",
        "examples/**/*.ts",
        "src/**/*.ts",
        "tests/**/*.ts",
        "tools/**/*.ts",
        "vitest.config.ts",
        "vitest.integration.config.ts",
      ],
    },
    formatter: { enabled: true, indentStyle: "space", indentWidth: 2 },
    javascript: { formatter: { quoteStyle: "double" } },
    linter: {
      enabled: true,
      rules: { preset: "recommended", style: { useConst: "error" } },
    },
    vcs: { clientKind: "git", enabled: true, useIgnoreFile: true },
  },
});

project.addExcludeFromCleanup(
  "vitest.config.ts",
  "vitest.integration.config.ts",
);

new JsonFile(project, ".release-please-manifest.json", {
  marker: false,
  obj: { ".": currentPackageVersion },
});

new JsonFile(project, "release-please-config.json", {
  marker: false,
  obj: {
    $schema:
      "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
    packages: {
      ".": {
        "bump-patch-for-minor-pre-major": true,
        "changelog-path": "CHANGELOG.md",
        "include-component-in-tag": false,
        "package-name": "nomoss",
        "release-type": "node",
      },
    },
  },
});

project.synth();

const releaseWorkflowPath = ".github/workflows/release.yml";
const releasePleaseWorkflow = `# ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".

name: release
on:
  push:
    branches:
      - main
  workflow_dispatch: {}
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: "true"
jobs:
  release_please:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    outputs:
      release_created: \${{ steps.release.outputs.release_created }}
    steps:
      - id: release
        uses: googleapis/release-please-action@v5
        with:
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
  publish_npm:
    needs: release_please
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    env:
      CI: "true"
    if: \${{ needs.release_please.outputs.release_created == 'true' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Install Yarn
        run: corepack enable && corepack prepare yarn@4.17.1 --activate
      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version: 24.11.1
          package-manager-cache: false
      - name: Install dependencies
        run: yarn install --immutable
      - name: Check
        run: yarn check
      - name: Publish
        env:
          NPM_CONFIG_PROVENANCE: "true"
        run: npm publish --access public
`;

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;

  yield* fs.chmod(releaseWorkflowPath, 0o644);
  yield* fs.writeFileString(releaseWorkflowPath, releasePleaseWorkflow);
  yield* fs.chmod(releaseWorkflowPath, 0o444);
}).pipe(Effect.provide(NodeFileSystem.layer), NodeRuntime.runMain);
