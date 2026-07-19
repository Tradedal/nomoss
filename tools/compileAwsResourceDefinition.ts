/**
 * This command is the local entrypoint for one checked-in CloudFormation Registry
 * resource and the shared CDK relationship source. It provides the filesystem,
 * path, and child-process services required to replace and format that resource's
 * generated Nomoss module.
 */
import { Effect, Layer } from "effect";
import * as NodeChildProcessSpawner from "@effect/platform-node/NodeChildProcessSpawner";
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodePath from "@effect/platform-node/NodePath";

import { AwsResourceDefinitionCompiler } from "../src/providers/aws/awsResourceDefinitionCompiler.js";

void Effect.runPromise(
  Effect.gen(function* () {
    const compiler = yield* AwsResourceDefinitionCompiler;
    const [registrySchemaPath, relationshipsPath, outputPath] =
      process.argv.slice(2);

    const resourceDefinition = yield* compiler.readCloudFormationResourceDefinition({
      registrySchemaPath,
      relationshipsPath,
    });
    const renderedModule = yield* compiler.renderNomossResourceModule(
      resourceDefinition,
    );

    return yield* compiler.publishNomossResourceModule({
      outputPath,
      renderedModule,
    });
  }).pipe(
    Effect.provide(
      Layer.effect(
        AwsResourceDefinitionCompiler,
        AwsResourceDefinitionCompiler.make,
      ).pipe(
        Layer.provide(
          Layer.merge(
            Layer.merge(NodeFileSystem.layer, NodePath.layer),
            NodeChildProcessSpawner.layer.pipe(
              Layer.provide(Layer.merge(NodeFileSystem.layer, NodePath.layer)),
            ),
          ),
        ),
      ),
    ),
  ),
);
