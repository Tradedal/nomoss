import { Array as Arr, Context, Effect, Ref, Schema } from "effect";

import {
  type DependencyEdge,
  type ResourceKey,
  ResourceModel,
  type ResourceOutputRef,
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
          const dependencies =
            yield* Ref.make<ReadonlyArray<ResourceDependencyInput>>([]);

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
                yield* Ref.get(dependencies).pipe(
                  Effect.flatMap((resourceDependencies) =>
                    Effect.forEach(
                      resourceDependencies,
                      (dependency) =>
                        graph.addDependency(
                          dependency.source,
                          dependency.target,
                          dependency.edge,
                        ),
                      { discard: true },
                    ),
                  ),
                );

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
                const decodedOutput = yield* Schema.decodeUnknownEffect(schema)(
                  outputValue,
                );

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
