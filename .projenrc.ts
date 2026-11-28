import { createRequire } from "node:module";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
} from "effect";
import {
  JsonFile,
  JsonPatch,
  javascript,
  ReleasableCommits,
  release,
} from "projen";
import packageManifest from "./package.json" with { type: "json" };
import {
  awsClientCore,
  awsClientCoreDirectory,
  awsClientCoreExports,
  awsClientDirectory,
  awsClientPackages,
  awsCredentialClientPackages,
  awsCredentials,
  awsCredentialsDirectory,
} from "./tools/awsClientPackages.js";
import packageExports from "./tools/package-exports.json" with { type: "json" };

const currentPackageVersion: string = packageManifest.version;
const effectVersion = "4.1.4";
const awsClientCoreDependencies = {
  "@effect/platform-node-shared": effectVersion,
  "fast-xml-parser": "5.10.1",
};

const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  description: "Effect-native infrastructure automation for TypeScript.",
  deps: [
    `${awsClientCore}@workspace:^`,
    `${awsCredentials}@workspace:^`,
    "@tradedal/aws-client-iam@workspace:^",
    "@tradedal/aws-client-sts@workspace:^",

    // Effect runs stack operations on Node.js. Redis satisfies the Node platform package's peer dependency.
    "@effect/platform-node@4.1.4",
    `effect@${effectVersion}`,
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
    "@tradedal/aws-client-sqs@workspace:^",
    "@tradedal/aws-client-cloudcontrol@workspace:^",

    // Biome checks repository code with the shared Effect lint rules.
    "@biomejs/biome@2.6.9",
    "@tradedal/linteffect@0.1.2-dev",

    // Effect's compiler diagnostics extend the project's TypeScript checks for Node.js.
    "@effect/tsgo@0.73.4",
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
project.package.addField("workspaces", [
  `${awsClientDirectory}/*`,
  awsClientCoreDirectory,
  awsCredentialsDirectory,
]);

const awsPackageFields = {
  version: currentPackageVersion,
  type: "module",
  license: "MIT",
  engines: { node: ">=24" },
  publishConfig: { access: "public" },
};
const awsPackageRepository = (directory: string) => ({
  type: "git",
  url: "git+https://github.com/Tradedal/nomoss.git",
  directory,
});

new JsonFile(project, `${awsClientCoreDirectory}/package.json`, {
  marker: false,
  readonly: false,
  obj: {
    name: awsClientCore,
    description: "Shared request execution for Nomoss AWS clients.",
    ...awsPackageFields,
    repository: awsPackageRepository(awsClientCoreDirectory),
    files: ["/*.ts", "/generated/*.ts"],
    exports: Record.map(awsClientCoreExports, (module) => `./${module}.ts`),
    dependencies: { ...awsClientCoreDependencies, effect: effectVersion },
  },
});

new JsonFile(project, `${awsCredentialsDirectory}/package.json`, {
  marker: false,
  readonly: false,
  obj: {
    name: awsCredentials,
    description:
      "Credential acquisition and session renewal for Nomoss AWS clients.",
    ...awsPackageFields,
    repository: awsPackageRepository(awsCredentialsDirectory),
    files: ["/*.ts"],
    exports: "./index.ts",
    dependencies: Record.fromEntries([
      [awsClientCore, "workspace:^"],
      ...Arr.map(
        awsCredentialClientPackages,
        ({ name }) => [name, "workspace:^"] as const,
      ),
      ["@effect/platform-node-shared", effectVersion],
      ["effect", effectVersion],
    ]),
  },
});

Arr.forEach(awsClientPackages, ({ directory, name }) => {
  new JsonFile(project, `${directory}/package.json`, {
    marker: false,
    readonly: false,
    obj: {
      name,
      description: "Effect client for an AWS service, generated from Smithy.",
      ...awsPackageFields,
      repository: awsPackageRepository(directory),
      files: ["index.ts"],
      exports: "./index.ts",
      dependencies: { [awsClientCore]: "workspace:^", effect: effectVersion },
    },
  });
});

project.package.addField("files", [
  "/README.md",
  "/ROADMAP.md",
  "/LICENSE",
  "/docs/**",
  "/examples/**",
  "/media/**",
  "/src/**",
  "/providers/aws/README.md",
  "/providers/aws/awsEnvironment.ts",
  "/providers/aws/runtime.ts",
  "/providers/aws/management/**/*.ts",
  "/providers/aws/generated/managementRegistry.ts",
  "/providers/aws/generated/resources/**/*.ts",
]);

project.package.addField("publishConfig", { access: "public" });
project.package.addField("packageManager", "yarn@4.17.1");

project.package.addField("scripts", {
  check:
    "yarn format && yarn lint && yarn typecheck:tsgo && vitest run --pool forks --passWithNoTests --exclude 'tests/**/*.integration.test.ts'",
  format: "biome check --write",
  "format:staged": "biome check --write --staged --no-errors-on-unmatched",
  "generate:aws-resources":
    "tsx tools/compileAwsServiceResourceDeclarations.ts && yarn generate:aws-management",
  "generate:aws-management": "tsx tools/compileAwsManagementRegistry.ts",
  "generate:aws-credential-clients": "tsx tools/compileAwsCredentialClients.ts",
  "generate:stripe-client": "tsx tools/compileStripeClient.ts",
  lint: "biome lint --reporter=summary",
  "lint:fix": "biome check --write",
  nomoss: "tsx examples/cli.ts",
  "tsgo:patch": "effect-tsgo patch --typescript",
  "typecheck:tsgo":
    "yarn format:staged && yarn tsgo:patch && effect-tsgo tsc --build .",
  "test:integration":
    "vitest run --config vitest.integration.config.ts --pool forks",
  "test:integration:stripe":
    "vitest run --config vitest.integration.config.ts tests/stripe --pool forks",
  projen: "tsx .projenrc.ts",
});

project.gitignore.addPatterns(".nomoss/");
project.gitignore.addPatterns("refs/");
project.npmignore?.addPatterns("/refs/");
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
            globalJsonInEffect: "error",
            cryptoRandomUUID: "warning",
            cryptoRandomUUIDInEffect: "warning",
            deterministicKeys: "warning",
            effectDoNotation: "warning",
            newPromise: "warning",
            nestedEffectGenYield: "warning",
          },
          // The preferTypedSchemaDecoder override allows generated Stripe
          // bindings to check declaration values against Stripe's request schema.
          overrides: [
            {
              include: [
                "src/providers/stripe/client/generated/resourceBindings/**/*.ts",
              ],
              options: {
                diagnosticSeverity: { preferTypedSchemaDecoder: "off" },
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
      "providers/**/*.ts",
      "src/**/*.ts",
      "tests/**/*.ts",
      "tools/**/*.ts",
      "vitest.config.ts",
      "vitest.integration.config.ts",
    ],
  },
});

const requireFromProject = createRequire(import.meta.url);
const lintEffectPreset = Schema.fromJsonString(
  Schema.Struct({ plugins: Schema.Array(Schema.String) }),
);

/**
 * The biomeConfig object gives repository checks and generated TypeScript
 * publication the same formatting and built-in lint rules. The publisher
 * stages candidates under tools/generated in a temporary workspace so the
 * tools include pattern also selects those files before publication.
 *
 * @see node_modules/@biomejs/biome/configuration_schema.json (files.includes)
 */
const biomeConfig = {
  $schema: "node_modules/@biomejs/biome/configuration_schema.json",
  root: true,
  files: {
    ignoreUnknown: false,
    includes: [
      ".projenrc.ts",
      "examples/**/*.ts",
      "providers/**/*.ts",
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
};

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
      - name: Set workspace package versions
        env:
          PROJEN_DISABLE_POST: "1"
        run: yarn projen
      - name: Check
        run: yarn check
      - name: Pack workspaces
        run: |
          mkdir -p "$RUNNER_TEMP/nomoss-release"
          yarn workspaces foreach --all --no-private pack --out "$RUNNER_TEMP/nomoss-release/%s.tgz"
      - name: Publish
        env:
          NPM_CONFIG_PROVENANCE: "true"
        run: |
          yarn workspaces foreach --all --no-private --topological exec sh -eu -c '
            archive_name=$(printf "%s" "$npm_package_name" | tr "/" "-")
            npm publish "$RUNNER_TEMP/nomoss-release/$archive_name.tgz" --access public
          '
`;

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;

  const preset = yield* fs
    .readFileString(requireFromProject.resolve("@tradedal/linteffect"))
    .pipe(Effect.flatMap(Schema.decodeEffect(lintEffectPreset)));

  // Biome matches plugin includes against each file before invoking Grit.
  // Generated schemas contain many regex constructors this rule inspects.
  // See node_modules/@biomejs/biome/configuration_schema.json (PluginWithOptions).
  const plugins = Arr.map(preset.plugins, (path) =>
    Match.value(Str.endsWith("/warn-native-collections.grit")(path)).pipe(
      Match.when(true, () => ({
        path,
        includes: ["**", "!**/generated/**"],
      })),
      Match.orElse(() => path),
    ),
  );

  new JsonFile(project, "biome.jsonc", {
    marker: false,
    readonly: false,
    obj: { ...biomeConfig, plugins },
  });
  project.synth();

  yield* fs.chmod(releaseWorkflowPath, 0o644);
  yield* fs.writeFileString(releaseWorkflowPath, releasePleaseWorkflow);
  yield* fs.chmod(releaseWorkflowPath, 0o444);
}).pipe(Effect.provide(NodeFileSystem.layer), NodeRuntime.runMain);
