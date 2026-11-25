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
import packageExports from "./tools/package-exports.json" with { type: "json" };

const currentPackageVersion: string = packageManifest.version;

const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  description: "Effect-native infrastructure automation for TypeScript.",
  deps: [
    // The AWS client resolves service addresses and credentials and uses the SDK's AWS Query codec.
    // @aws-crypto/sha256-js is a legacy dependency. AwsRequestSigner uses @smithy/core for SHA-256.
    "@aws-crypto/sha256-js@^5.2.0",
    "@aws-sdk/core@^3.979.1",
    "@aws-sdk/credential-provider-node@^3.972.92",

    // AwsRequestSigner signs HTTP requests with SigV4. The AWS Query codec uses Smithy schema types.
    "@smithy/core@^3.38.1",
    "@smithy/signature-v4@^5.7.5",
    "@smithy/types@^4.19.0",

    // Effect runs stack operations on Node.js. Redis satisfies the Node platform package's peer dependency.
    "@effect/platform-node@4.1.4",
    "effect@4.1.4",
    "redis@^6.3.1",

    // The asset service builds TypeScript handlers with esbuild and packages deployment ZIPs with fflate.
    "esbuild@^0.27.0",
    "fflate@^0.8.3",

    // tsx runs the TypeScript CLI and project scripts. The CLI uses YAML for detailed property diffs.
    "tsx@^4.20.6",
    "yaml@^2.6.0",
  ],
  copyrightOwner: "Tradedal",
  devDeps: [
    // The AWS resource generator imports Registry metadata through the CDK service specification.
    "@aws-cdk/service-spec-importers@0.0.145",
    "@aws-cdk/service-spec-types@0.0.289",

    // Biome checks repository code with the shared Effect lint rules.
    "@biomejs/biome@2.6.6",
    "@tradedal/linteffect@0.1.1-dev.3",

    // Effect's compiler diagnostics extend the project's TypeScript checks for Node.js.
    "@effect/tsgo@0.63.0",
    "@types/node@^24.0.0",
    "typescript@7.0.2",

    // Projen generates the package manifest, project tasks, and release configuration.
    "projen@^0.98.34",

    // The generators emit TypeScript syntax trees with ts-morph. The alias makes TypeScript 6 available alongside the project compiler.
    "ts-morph@27.0.2",
    "typescript-ast@npm:typescript@6.0.2",

    // Vitest runs the suites through Vite. Effect's test integration runs cases that require Effect services.
    "@effect/vitest@4.1.4",
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

project.tryFindObjectFile(".yarnrc.yml")?.addOverride("npmMinimalAgeGate", 0);

project.release?.publisher?.publishToNpm({
  trustedPublishing: true,
});

project.package.addVersion(currentPackageVersion);
project.package.addField("type", "module");
project.package.addField("engines", { node: ">=24" });
// NodePackage.addField publishes the import paths applications use, such as nomoss/core.
project.package.addField("exports", packageExports);
project.package.addField("files", [
  "README.md",
  "ROADMAP.md",
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
  nomoss: "tsx examples/cli.ts",
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
    extends: ["@tradedal/linteffect"],
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
