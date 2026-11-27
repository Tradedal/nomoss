import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  Struct,
  Tuple,
} from "effect";
import {
  PlanDecision,
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  type ResourceSchemaAnnotation,
  readResourceSchemaAnnotation,
  resourceModelLayer,
} from "../../../core/resource/model.js";
import {
  ResourceRequest,
  resourceRequestLayer,
} from "../../../core/resource/resourceRequest.js";
import {
  providerCommandPolicyTag,
  registerResourceCommands,
} from "../../resourceCommandPolicyLayer.js";
import { StripeClient } from "../client/stripeClient.js";
import type { StripePayload } from "../client/stripeClientModel.js";
import type {
  StripeResourceConfiguration,
  StripeResourceOperation,
} from "./resourceConfiguration.js";

/**
 * The StripeResourcePolicy service executes ordinary resources in the
 * stack's graph. Generated contracts validate provider requests and responses;
 * ResourceModel validates saved outputs and rejects observations for another
 * identity. Configurations select operations and fixed removal values.
 */
export class StripeResourcePolicy extends Context.Service<StripeResourcePolicy>()(
  "nomoss/providers/stripe/management/resourcePolicy/StripeResourcePolicy",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;
      const model = yield* ResourceModel;
      const requests = yield* ResourceRequest;

      /**
       * The invoke service method validates resolved inputs against the selected
       * generated request schema before provider I/O. Provider and validation
       * failures propagate to the caller with their original types.
       */
      const invoke = Effect.fn("StripeResourcePolicy.invoke")(function* <
        State extends StripePayload,
      >(operation: StripeResourceOperation<State>, input: object) {
        const observed: State = yield* Schema.decodeUnknownEffect(
          operation.input,
        )(input).pipe(
          Effect.flatMap((validated) => client.invoke(operation, validated)),
        );

        return observed;
      });

      /**
       * The register service method makes a configured resource's output schema
       * available to state validation in this graph. Its props schema must carry
       * the canonical resource annotation. The result identifies the existing
       * provider registration used by command dispatch.
       */
      const register = Effect.fn("StripeResourcePolicy.register")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(definition: StripeResourceConfiguration<Props, Outputs, State>) {
        const schema = yield* readResourceSchemaAnnotation(
          definition.propsSchema,
        ).pipe(Effect.fromOption);

        yield* model.registerOutputsSchema(schema, definition.outputsSchema);

        const registered: ResourceSchemaAnnotation = schema;

        return registered;
      });

      /**
       * The projectOutputs service method retains identity values supplied in
       * creation parameters when later responses omit them. Saved identity
       * takes precedence during observations and updates. A selected response
       * variant must pass its provider schema before its outputs are accepted.
       */
      const projectOutputs = Effect.fn("StripeResourcePolicy.projectOutputs")(
        function* <
          Props extends object,
          Outputs extends StripePayload,
          State extends StripePayload,
        >(
          definition: StripeResourceConfiguration<Props, Outputs, State>,
          node: ResourceNode,
          state: State,
          previous?: Outputs,
        ) {
          yield* Effect.forEach(
            Option.toArray(Option.fromUndefinedOr(definition.responseSchema)),
            (schema) =>
              Schema.decodeUnknownEffect(Schema.toType(schema))(state),
          );

          const values = yield* Effect.forEach(
            Record.toEntries(definition.inputOutputs ?? {}),
            ([output, parameter]) =>
              requests.properties(node.props, definition.request).pipe(
                Effect.map((props) =>
                  Record.get(previous ?? {}, output).pipe(
                    Option.orElse(() =>
                      Record.get<string, Schema.Json>(props, parameter),
                    ),
                    Option.map((value) => Tuple.make(output, value)),
                    Option.toArray,
                  ),
                ),
              ),
          );

          const projected = definition.projectOutputs(state, previous);
          const identity = Record.fromEntries(Arr.flatten(values));
          const outputs: StripePayload = { ...projected, ...identity };

          return outputs;
        },
      );

      /**
       * The read service method observes the identity in saved outputs. A 404
       * reports absence, while transport, permission, and validation failures
       * propagate. A configured deleted response must pass identity validation
       * before it can make reconciliation remove saved state.
       */
      const read = Effect.fn("StripeResourcePolicy.read")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        node: ResourceNode,
      ) {
        const outputs = yield* model.decodeOutputs(
          node,
          definition.outputsSchema,
        );
        const input = definition.identify(outputs);

        const observed: Option.Option<State> = yield* client
          .invoke(definition.operations.read, input)
          .pipe(
            Effect.asSome,
            Effect.catchTag("StripeApiError", (failure) =>
              Match.value(failure).pipe(
                Match.when({ statusCode: 404 }, () => Effect.succeedNone),
                Match.orElse((failure) => Effect.fail(failure)),
              ),
            ),
          );

        const observation: ResourceObservation = yield* Option.match(observed, {
          onNone: () => Effect.succeed(ResourceObservation.Missing({ node })),
          onSome: (state) =>
            Effect.gen(function* () {
              const projected = yield* projectOutputs(
                definition,
                node,
                state,
                outputs,
              );

              const hydrated = yield* model.withObservedOutputs(
                node,
                projected,
              );

              const deleted =
                definition.deletedResponseMeansMissing &&
                Option.contains(Record.get(state, "deleted"), true);

              const observation: ResourceObservation = Match.value(
                deleted,
              ).pipe(
                Match.when(true, () => ResourceObservation.Missing({ node })),
                Match.orElse(() =>
                  ResourceObservation.Present({
                    node: hydrated,
                    observed: state,
                  }),
                ),
              );

              return observation;
            }),
        });

        const result: ResourceCommandResult = ResourceCommandResult.Observed({
          observation,
        });

        return result;
      });

      /**
       * The create service method accepts resolved declarations and returns
       * validated outputs for persistence and dependent resources. The selected
       * creation schema rejects unresolved references before provider I/O.
       */
      const create = Effect.fn("StripeResourcePolicy.create")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, definition.propsSchema);

        const properties = yield* requests.properties(
          props,
          definition.request,
        );
        const input = yield* requests.prepare(properties, definition.request);

        const created = yield* invoke(definition.operations.create, input);

        const outputs = yield* projectOutputs(definition, node, created);

        const applied = yield* model.withOutputs(node, outputs);

        const result: ResourceCommandResult = ResourceCommandResult.Created({
          node: applied,
        });

        return result;
      });

      /**
       * The update service method applies desired properties to the saved
       * identity. Bound identity parameters take precedence over declaration
       * fields. Provider validation and output validation must finish before
       * the stack receives an Updated result. An omitted update operation
       * fails as unsupported before provider execution. Changed properties that
       * the update schema would discard and omitted saved properties also fail
       * before mutation, because their desired state cannot be applied by this operation.
       */
      const update = Effect.fn("StripeResourcePolicy.update")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const operation = yield* Effect.fromOption(
          Option.fromUndefinedOr(definition.operations.update),
          () =>
            new ResourceCommandUnsupported({
              command: ResourceCommand.Apply({
                decision: PlanDecision.Update({ node, current }),
              }),
            }),
        );

        const props = yield* model.decodeProps(node, definition.propsSchema);

        const previous = yield* model.decodeOutputs(
          current,
          definition.outputsSchema,
        );

        const properties = yield* requests.properties(
          props,
          definition.request,
        );
        const input = Struct.assign(properties, definition.identify(previous));

        const desiredProps = yield* requests.properties(
          node.props,
          definition.request,
        );
        const currentProps = yield* requests.properties(
          current.props,
          definition.request,
        );

        const equivalent = Schema.toEquivalence(Schema.Json);
        const changes = Record.filter(
          desiredProps,
          (value: Schema.Json, key: string) =>
            !Record.has<string, Schema.Json>(currentProps, key) ||
            !equivalent(value, currentProps[key]),
        );

        const validated = yield* Schema.decodeEffect(operation.input)(
          input,
        ).pipe(
          Effect.filterOrFail(
            (request) =>
              Record.isSubrecordBy(equivalent)(changes, request) &&
              Record.every(currentProps, (_: Schema.Json, key: string) =>
                Record.has<string, Schema.Json>(desiredProps, key),
              ),
            () =>
              new ResourceCommandUnsupported({
                command: ResourceCommand.Apply({
                  decision: PlanDecision.Update({ node, current }),
                }),
              }),
          ),
        );

        const prepared = yield* requests.prepare(validated, definition.request);

        const changed = yield* invoke(operation, prepared);

        const outputs = yield* projectOutputs(
          definition,
          node,
          changed,
          previous,
        );

        const applied = yield* model.withOutputs(node, outputs);

        const result: ResourceCommandResult = ResourceCommandResult.Updated({
          node: applied,
        });

        return result;
      });

      /**
       * The destroy service method runs the configured removal operation for
       * the saved identity. Fixed removal values can request deactivation.
       * An absent removal operation fails before provider I/O. That failure
       * and provider failures require the stack to retain saved state.
       */
      const destroy = Effect.fn("StripeResourcePolicy.destroy")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        node: ResourceNode,
      ) {
        const operation = yield* Option.fromUndefinedOr(
          definition.operations.remove,
        ).pipe(
          Effect.fromOption(
            () =>
              new ResourceCommandUnsupported({
                command: ResourceCommand.Destroy({ node }),
              }),
          ),
        );

        const outputs = yield* model.decodeOutputs(
          node,
          definition.outputsSchema,
        );

        const input = Struct.assign(
          definition.removalValues,
          definition.identify(outputs),
        );

        yield* invoke(operation, input);

        const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
          node,
        });

        return result;
      });

      /**
       * The apply service method executes ordinary lifecycle decisions from a
       * reviewed plan. Repair and NoOp remain unsupported commands because
       * those decisions require no ordinary provider mutation here.
       */
      const apply = Effect.fn("StripeResourcePolicy.apply")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        decision: PlanDecision,
      ) {
        const result: ResourceCommandResult = yield* Match.value(decision).pipe(
          Match.tag("Create", ({ node }) => create(definition, node)),
          Match.tag("Update", ({ node, current }) =>
            update(definition, node, current),
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
       * The execute service method connects a configured resource to the core
       * command protocol. Reads, planned apply, direct creation, and destruction
       * share the same schemas and state service. Failures retain their command
       * and typed cause for stack recovery.
       */
      const execute = Effect.fn("StripeResourcePolicy.execute")(function* <
        Props extends object,
        Outputs extends StripePayload,
        State extends StripePayload,
      >(
        definition: StripeResourceConfiguration<Props, Outputs, State>,
        command: ResourceCommand,
      ) {
        const result: ResourceCommandResult = yield* Match.value(command).pipe(
          Match.tag("Read", ({ node }) => read(definition, node)),
          Match.tag("Apply", ({ decision }) => apply(definition, decision)),
          Match.tag("Create", ({ node }) => create(definition, node)),
          Match.tag("Destroy", ({ node }) => destroy(definition, node)),
          Match.tag("Diff", "Update", "Delete", () =>
            Effect.fail(new ResourceCommandUnsupported({ command })),
          ),
          Match.exhaustive,
        );

        return result;
      });

      return {
        invoke,
        register,
        projectOutputs,
        read,
        create,
        update,
        destroy,
        apply,
        execute,
      };
    }),
  },
) {}

/**
 * The stripeResourcePolicyLayer Layer shares ordinary execution with manual
 * resource policies that compose its public methods. StripeClient remains a
 * dependency of the application's runtime, and ResourceModel uses its canonical Layer.
 */
export const stripeResourcePolicyLayer = Layer.effect(
  StripeResourcePolicy,
  StripeResourcePolicy.make,
).pipe(Layer.provide([resourceModelLayer, resourceRequestLayer]));

/**
 * The stripeResourcePolicyRegistration function registers a configured resource
 * through the existing provider command tag. Its Layer requires StripeClient
 * from the application's graph and shares ResourceModel with stack execution.
 */
export const stripeResourcePolicyRegistration = <
  Props extends object,
  Outputs extends StripePayload,
  State extends StripePayload,
>(
  definition: StripeResourceConfiguration<Props, Outputs, State>,
) =>
  Layer.effectContext(
    Effect.gen(function* () {
      const policy = yield* StripeResourcePolicy;
      const schema = yield* policy.register(definition);

      return registerResourceCommands(
        (command) => policy.execute(definition, command),
        providerCommandPolicyTag(schema),
      );
    }),
  ).pipe(Layer.provide(stripeResourcePolicyLayer));
