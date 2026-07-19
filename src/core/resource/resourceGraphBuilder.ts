import { Array as Arr, Context, Effect, Option, Ref, Schema } from "effect";

import {
  type DependencyEdge,
  type ResourceKey,
  ResourceModel,
  type ResourceOutputRef,
  ResourceOutputRefSchema,
} from "./model.js";
import { ResourceGraphStore } from "./resourceGraphStore.js";

export type ResourceDependencyInput = {
  readonly source: ResourceKey;
  readonly target: ResourceKey;
  readonly edge: DependencyEdge;
};

export type ResourceDeclarationInput<
  Props,
  Outputs,
  PropsSchema extends Schema.Schema<Props>,
  OutputsSchema extends Schema.Schema<Outputs>,
> = {
  readonly propsSchema: PropsSchema;
  readonly outputsSchema: OutputsSchema;
  readonly props: NoInfer<Props>;
  readonly outputs: NoInfer<Outputs>;
};

/**
 * Provider declarations consume output refs through this service so the graph
 * records dependency edges at the same point where a resource needs another
 * resource value.
 */
export class ResourceGraphBuilder extends Context.Service<ResourceGraphBuilder>()(
  "nomoss/core/resourceGraphBuilder",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;
      const model = yield* ResourceModel;

      return {
        resource: Effect.fn("ResourceGraphBuilder.resource")(function* (
          key: ResourceKey,
        ) {
          const dependencies = yield* Ref.make<
            ReadonlyArray<ResourceDependencyInput>
          >([]);
          const registerDependencies = Effect.fn(
            "ResourceGraphBuilder.resource.registerDependencies",
          )(function* () {
            const resourceDependencies = yield* Ref.get(dependencies);

            yield* Effect.forEach(
              resourceDependencies,
              (dependency) =>
                graph.addDependency(
                  dependency.source,
                  dependency.target,
                  dependency.edge,
                ),
              { discard: true },
            );
          });

          return {
            after: Effect.fn("ResourceGraphBuilder.resource.after")(function* (
              source: ResourceKey,
              property: string,
              sourceProperty: string,
            ) {
              const dependency: ResourceDependencyInput = {
                source,
                target: key,
                edge: {
                  kind: "property",
                  property,
                  sourceProperty,
                },
              };

              yield* Ref.update(dependencies, Arr.append(dependency));
            }),

            register: Effect.fn("ResourceGraphBuilder.resource.register")(
              function* <
                Props,
                Outputs,
                PropsSchema extends Schema.Schema<Props>,
                OutputsSchema extends Schema.Schema<Outputs>,
              >(
                input: ResourceDeclarationInput<
                  Props,
                  Outputs,
                  PropsSchema,
                  OutputsSchema
                >,
              ) {
                const node = yield* model.nodeFromResource({
                  key,
                  propsSchema: input.propsSchema,
                  outputsSchema: input.outputsSchema,
                  props: input.props,
                  outputs: input.outputs,
                });

                yield* graph.addResource(node);
                const declaredProps = yield* Schema.decodeUnknownEffect(
                  Schema.Record(Schema.String, Schema.Json),
                )(input.props);
                yield* Effect.forEach(
                  Object.entries(declaredProps),
                  ([property, value]) =>
                    Option.match(
                      Schema.decodeUnknownOption(ResourceOutputRefSchema)(
                        value,
                      ),
                      {
                        onNone: () => Effect.void,
                        onSome: (output) =>
                          graph.addDependency(output.source, key, {
                            kind: "property",
                            property,
                            sourceProperty: output.property,
                          }),
                      },
                    ),
                  { discard: true },
                );
                yield* registerDependencies();

                return node;
              },
            ),

            materialize: Effect.fn("ResourceGraphBuilder.resource.materialize")(
              function* <
                Props,
                Outputs,
                PropsSchema extends Schema.Schema<Props>,
                OutputsSchema extends Schema.Schema<Outputs>,
              >(
                input: ResourceDeclarationInput<
                  Props,
                  Outputs,
                  PropsSchema,
                  OutputsSchema
                >,
              ) {
                const node = yield* model.nodeFromResource({
                  key,
                  propsSchema: input.propsSchema,
                  outputsSchema: input.outputsSchema,
                  props: input.props,
                  outputs: input.outputs,
                });

                yield* graph.materializeResource(node);
                yield* registerDependencies();

                return node;
              },
            ),

            valueFrom: Effect.fn("ResourceGraphBuilder.resource.valueFrom")(
              function* <Value, ValueSchema extends Schema.Schema<Value>>(
                output: ResourceOutputRef,
                property: string,
                schema: ValueSchema,
              ) {
                const dependency: ResourceDependencyInput = {
                  source: output.source,
                  target: key,
                  edge: {
                    kind: "property",
                    property,
                    sourceProperty: output.property,
                  },
                };

                yield* Ref.update(dependencies, Arr.append(dependency));
                const outputValue = yield* graph.outputValue(
                  output.source,
                  output.property,
                );
                const decodedOutput =
                  yield* Schema.decodeUnknownEffect(schema)(outputValue);

                return decodedOutput;
              },
            ),

            stringFrom: Effect.fn("ResourceGraphBuilder.resource.stringFrom")(
              function* (output: ResourceOutputRef, property: string) {
                const dependency: ResourceDependencyInput = {
                  source: output.source,
                  target: key,
                  edge: {
                    kind: "property",
                    property,
                    sourceProperty: output.property,
                  },
                };

                yield* Ref.update(dependencies, Arr.append(dependency));
                const outputValue = yield* graph.outputValue(
                  output.source,
                  output.property,
                );
                const outputString = yield* Schema.decodeUnknownEffect(
                  Schema.String,
                )(outputValue);

                return outputString;
              },
            ),
          };
        }),
      };
    }),
  },
) {}
