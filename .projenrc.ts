import fs from "node:fs";
import {
  javascript,
  JsonFile,
  JsonPatch,
  ReleasableCommits,
  TextFile,
} from "projen";
import { JobStep } from "projen/lib/github/workflows-model";
import { YarnNodeLinker } from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const packageManifestPath = "package.json";
const currentPackageVersion = fs.existsSync(packageManifestPath)
  ? JSON.parse(fs.readFileSync(packageManifestPath, "utf8")).version ?? "0.0.0"
  : "0.0.0";

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
    "@catenarycloud/linteffect@0.0.7-dev.2",
    "@effect/tsgo@0.23.0",
    "@effect/vitest@4.0.0-beta.93",
    "@types/node@^24.0.0",
    "projen@^0.98.34",
    "typescript@7.0.2",
    "vite@^8.0.7",
    "vitest@^4.1.4",
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
  releaseTrigger: ReleaseTrigger.workflowDispatch(),
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  repository: "https://github.com/Tradedal/nomoss.git",
  sampleCode: false,
  workflowNodeVersion: "24.11.1",
  yarnBerryOptions: {
    version: "4.17.1",
    zeroInstalls: false,
    yarnRcOptions: {
      enableScripts: true,
      nodeLinker: YarnNodeLinker.NODE_MODULES,
    },
  },
});

project.release?.publisher?.publishToNpm({
  trustedPublishing: true,
});

project.package.addVersion(currentPackageVersion);
project.package.addField("type", "module");
project.package.addField("engines", { node: ">=24" });
project.package.addField("bin", "bin/nomoss");
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
  "media",
  "src",
]);
project.package.addField("publishConfig", { access: "public" });
project.package.addField("packageManager", "yarn@4.17.1");
project.package.addField("scripts", {
  check: "yarn lint && yarn typecheck:tsgo && vitest run --pool forks --passWithNoTests --exclude 'tests/**/*.integration.test.ts'",
  lint: "biome lint --reporter=summary",
  "lint:fix": "biome check --write",
  "tsgo:patch": "effect-tsgo patch",
  "typecheck:tsgo": "tsc -b .",
  projen: "tsx .projenrc.ts",
});
project.gitignore.addPatterns(".nomoss/");
project.defaultTask?.reset("tsx .projenrc.ts");

if (project.github) {
  const buildWorkflow = project.github.workflows.find(
    (workflow) => workflow.name === "build",
  );

  if (buildWorkflow) {
    buildWorkflow.file?.patch(
      JsonPatch.add("/jobs/build/steps/2/with/package-manager-cache", false),
    );

    const buildJob = buildWorkflow.getJob("build");
    const buildSteps = buildJob?.steps;
    const resolvedBuildSteps =
      typeof buildSteps === "function"
        ? buildSteps()
        : ((buildSteps as JobStep[] | undefined) ?? []);

    buildWorkflow.updateJob("build", {
      ...buildJob,
      steps: [
        resolvedBuildSteps[0],
        {
          name: "Install Yarn",
          run: "corepack enable && corepack prepare yarn@4.17.1 --activate",
        },
        ...resolvedBuildSteps.slice(1),
      ],
    });
  }
}

new JsonFile(project, "tsconfig.json", {
  obj: {
    $schema: "./node_modules/@effect/tsgo/schema.json",
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
      "examples/**/*.ts",
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
    '  \"extends\": [\"@catenarycloud/linteffect\"],',
    '  \"files\": {',
    '    \"ignoreUnknown\": false,',
    '    \"includes\": [\"examples/**/*.ts\", \"src/**/*.ts\", \"tests/**/*.ts\", \"vitest.config.ts\", \"vitest.integration.config.ts\"]',
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

fs.writeFileSync(
  ".release-please-manifest.json",
  `${JSON.stringify({ ".": currentPackageVersion }, null, 2)}\n`,
);

fs.writeFileSync(
  "release-please-config.json",
  `${JSON.stringify(
    {
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
    null,
    2,
  )}\n`,
);

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

fs.chmodSync(releaseWorkflowPath, 0o644);
fs.writeFileSync(releaseWorkflowPath, releasePleaseWorkflow);
fs.chmodSync(releaseWorkflowPath, 0o444);
