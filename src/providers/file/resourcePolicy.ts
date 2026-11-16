import { Context, Effect, Layer, Match, Option, Record, Schema } from "effect";
import {
  type PlanDecision,
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  type ResourceSchemaAnnotation,
  readResourceSchemaAnnotation,
  resourceModelLayer,
} from "../../core/resource/model.js";
import { ResourceCommandExecutionFailed } from "../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../resourceCommandPolicyLayer.js";
import { JsonFile, jsonFileLayer } from "./jsonFile.js";
import type { JsonFileResourceDefinition } from "./model.js";

/**
 * The JsonFileResourcePolicy service lets the stack manage an application
 * document through its ordinary apply, reconciliation, and teardown commands.
 * Generation supplies the document contract and the fields that identify its
 * destination, so the same operations serve files with different contents.
 * The shared resource model validates the path saved after publication. Failed
 * commands preserve their original cause so the stack can retain ownership
 * and retry the operation.
 */
export class JsonFileResourcePolicy extends Context.Service<JsonFileResourcePolicy>()(
  "nomoss/providers/file/resourcePolicy/JsonFileResourcePolicy",
  {
    make: Effect.gen(function* () {
      const files = yield* JsonFile;
      const model = yield* ResourceModel;

      /**
       * The register service method makes a file definition's output schema
       * available to the shared resource model before commands execute. Its
       * returned annotation identifies the command registration that saved
       * resources will use. A property schema without a resource annotation
       * fails registration because saved commands would have no dispatch identity.
       */
      const register = Effect.fn("JsonFileResourcePolicy.register")(function* (
        definition: JsonFileResourceDefinition,
      ) {
        const schema = yield* readResourceSchemaAnnotation(
          definition.propsSchema,
        ).pipe(Effect.fromOption);

        yield* model.registerOutputsSchema(schema, definition.outputsSchema);

        const registered: ResourceSchemaAnnotation = schema;

        return registered;
      });

      /**
       * The savedPath service method locates the file that the stack previously
       * published. It validates saved outputs before selecting the configured
       * path, so invalid state stops observation or teardown before filesystem
       * access. A missing or empty path fails the call.
       */
      const savedPath = Effect.fn("JsonFileResourcePolicy.savedPath")(
        function* (definition: JsonFileResourceDefinition, node: ResourceNode) {
          const outputs = yield* model.decodeOutputs(
            node,
            definition.outputsSchema,
          );

          const selected = yield* Record.get<string, Schema.Json>(
            outputs,
            definition.file.pathOutput,
          ).pipe(Effect.fromOption);
          const outputPath: string = yield* Schema.decodeUnknownEffect(
            Schema.NonEmptyString,
          )(selected);

          return outputPath;
        },
      );

      /**
       * The read service method supplies reconciliation with the application
       * document found at the saved path. A validated document produces a
       * Present observation; an absent file produces Missing so reconciliation
       * can release its saved ownership. Invalid contents and failed reads stop
       * reconciliation with the saved state intact.
       */
      const read = Effect.fn("JsonFileResourcePolicy.read")(function* (
        definition: JsonFileResourceDefinition,
        node: ResourceNode,
      ) {
        const outputPath = yield* savedPath(definition, node);
        const document = yield* files.read(
          outputPath,
          definition.documentSchema,
        );

        const observation: ResourceObservation = Option.match(document, {
          onNone: () => ResourceObservation.Missing({ node }),
          onSome: (observed) => ResourceObservation.Present({ node, observed }),
        });
        const result: ResourceCommandResult = ResourceCommandResult.Observed({
          observation,
        });

        return result;
      });

      /**
       * The write service method publishes a file after the stack has resolved
       * the declaration's resource dependencies. The property schema validates
       * the destination and data, and the document schema selects and validates
       * the content to publish. The returned node carries the published path
       * for persistence, allowing later reads and teardown to find that file.
       */
      const write = Effect.fn("JsonFileResourcePolicy.write")(function* (
        definition: JsonFileResourceDefinition,
        node: ResourceNode,
      ) {
        const properties = yield* model.decodeProps(
          node,
          definition.propsSchema,
        );

        const selected = yield* Record.get<string, Schema.Json>(
          properties,
          definition.file.pathProperty,
        ).pipe(Effect.fromOption);
        const outputPath = yield* Schema.decodeUnknownEffect(
          Schema.NonEmptyString,
        )(selected);

        const published = yield* files.write(
          outputPath,
          definition.documentSchema,
          properties,
        );

        const applied: ResourceNode = yield* model.withOutputs(
          node,
          Record.singleton(definition.file.pathOutput, published),
        );

        return applied;
      });

      /**
       * The destroy service method completes teardown of the file at the saved
       * path. A successful removal or confirmed absence returns Destroyed so
       * the stack can release ownership. A failed removal leaves the saved path
       * available for retry.
       */
      const destroy = Effect.fn("JsonFileResourcePolicy.destroy")(function* (
        definition: JsonFileResourceDefinition,
        node: ResourceNode,
      ) {
        const outputPath = yield* savedPath(definition, node);

        yield* files.remove(outputPath);

        const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
          node,
        });

        return result;
      });

      /**
       * The apply service method executes a reviewed file change and returns
       * the lifecycle result that the stack must save. Create and Update
       * publish resolved data; Delete and Destroy remove the previously saved
       * path. The stack handles NoOp and Repair decisions itself, and passing
       * either here fails with ResourceCommandUnsupported.
       */
      const apply = Effect.fn("JsonFileResourcePolicy.apply")(function* (
        definition: JsonFileResourceDefinition,
        decision: PlanDecision,
      ) {
        const result: ResourceCommandResult = yield* Match.value(decision).pipe(
          Match.tag("Create", ({ node }) =>
            write(definition, node).pipe(
              Effect.map((node) => ResourceCommandResult.Created({ node })),
            ),
          ),
          Match.tag("Update", ({ node }) =>
            write(definition, node).pipe(
              Effect.map((node) => ResourceCommandResult.Updated({ node })),
            ),
          ),
          Match.tag("Delete", "Destroy", ({ node }) =>
            destroy(definition, node),
          ),
          Match.tag("NoOp", "Repair", () =>
            Effect.fail(
              new ResourceCommandUnsupported({
                command: ResourceCommand.Apply({ decision }),
              }),
            ),
          ),
          Match.exhaustive,
        );

        return result;
      });

      /**
       * The execute service method lets command dispatch observe a managed file,
       * apply a reviewed change, or tear it down. Direct Diff, Create, Update,
       * and Delete commands fail with ResourceCommandUnsupported because file
       * mutations require an Apply decision. Each failure is wrapped in
       * ResourceCommandExecutionFailed with the original command and cause so
       * the stack can identify the resource and preserve recovery information.
       */
      const execute = Effect.fn("JsonFileResourcePolicy.execute")(function* (
        definition: JsonFileResourceDefinition,
        command: ResourceCommand,
      ) {
        const result: ResourceCommandResult = yield* Match.value(command).pipe(
          Match.tag("Read", ({ node }) => read(definition, node)),
          Match.tag("Apply", ({ decision }) => apply(definition, decision)),
          Match.tag("Destroy", ({ node }) => destroy(definition, node)),
          Match.tag("Diff", "Create", "Update", "Delete", () =>
            Effect.fail(new ResourceCommandUnsupported({ command })),
          ),
          Match.exhaustive,
          Effect.mapError(
            (cause) => new ResourceCommandExecutionFailed({ command, cause }),
          ),
        );

        return result;
      });

      return { register, savedPath, read, write, destroy, apply, execute };
    }),
  },
) {}

/**
 * The jsonFileResourcePolicyLayer Layer supplies file execution with the shared
 * resource model used by declaration registration and saved-state validation.
 * The application supplies filesystem and path services for that same graph.
 */
export const jsonFileResourcePolicyLayer = Layer.effect(
  JsonFileResourcePolicy,
  JsonFileResourcePolicy.make,
).pipe(Layer.provide([jsonFileLayer, resourceModelLayer]));

/**
 * The jsonFileResourcePolicyRegistration function lets generated file commands
 * keep the dispatch identity recorded in saved resources. The returned Layer
 * registers output validation and command execution together. Compose it with
 * declarations in the application's shared Layer graph so both operations
 * use the same resource model.
 */
export const jsonFileResourcePolicyRegistration = (
  definition: JsonFileResourceDefinition,
) =>
  Layer.unwrap(
    Effect.gen(function* () {
      const policy = yield* JsonFileResourcePolicy;
      const schema = yield* policy.register(definition);

      return Layer.succeed(providerCommandPolicyTag(schema), {
        execute: (command) => policy.execute(definition, command),
      });
    }),
  ).pipe(Layer.provide(jsonFileResourcePolicyLayer));
