import {
  Array as Arr,
  Context,
  Effect,
  Match,
  Record,
  Ref,
  Schema,
} from "effect";
import {
  type DependencyEdge,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
  type ResourceOutputRef,
  ResourceOutputRefSchema,
  type ResourcePropertyPath,
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
 * Resource declarations use this service to add nodes and output dependencies
 * to the graph before the stack is planned. The shared ResourceModel stores
 * their output schemas for provider execution and later reads.
 */
export class ResourceGraphBuilder extends Context.Service<ResourceGraphBuilder>()(
  "nomoss/core/resource/resourceGraphBuilder",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;
      const model = yield* ResourceModel;

      const resource = Effect.fn("ResourceGraphBuilder.resource")(function* (
        key: ResourceKey,
      ) {
        const dependencies = yield* Ref.make<
          ReadonlyArray<ResourceDependencyInput>
        >([]);

        /**
         * Records where apply should replace an initial input value with an
         * output from another resource. Registration automatically finds
         * references passed directly in props.
         */
        const dependsOn = Effect.fn("ResourceGraphBuilder.resource.dependsOn")(
          function* (
            output: ResourceOutputRef,
            property: ResourcePropertyPath,
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
          },
        );

        /**
         * Adds the validated resource to the graph and registers its output
         * schema. It records dependencies from references inside JSON props
         * and from calls to dependsOn. Each source resource must already be
         * registered before another resource can refer to it.
         */
        const register = Effect.fn("ResourceGraphBuilder.resource.register")(
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
            const node: ResourceNode = yield* model.nodeFromResource({
              key,
              propsSchema: input.propsSchema,
              outputsSchema: input.outputsSchema,
              props: input.props,
              outputs: input.outputs,
            });

            const references = (
              value: Schema.Json,
              property: ResourcePropertyPath,
            ): ReadonlyArray<ResourceDependencyInput> =>
              Match.value(value).pipe(
                Match.when(Schema.is(ResourceOutputRefSchema), (output) => {
                  const outputDependencies: ReadonlyArray<ResourceDependencyInput> =
                    [
                      {
                        source: output.source,
                        target: key,
                        edge: {
                          kind: "property",
                          property,
                          sourceProperty: output.property,
                        },
                      },
                    ];

                  return outputDependencies;
                }),
                Match.when(Schema.is(Schema.Array(Schema.Json)), (values) =>
                  Arr.flatMap(values, (child, index) =>
                    references(child, [...property, String(index)]),
                  ),
                ),
                Match.when(
                  Schema.is(Schema.Record(Schema.String, Schema.Json)),
                  (record) =>
                    Arr.flatMap(Record.toEntries(record), ([name, child]) =>
                      references(child, [...property, name]),
                    ),
                ),
                Match.orElse(() => []),
              );

            yield* graph.addResource(node);

            const resourceDependencies = yield* Ref.get(dependencies);

            yield* Effect.forEach(
              Arr.appendAll(references(node.props, []), resourceDependencies),
              (dependency) =>
                graph.addDependency(
                  dependency.source,
                  dependency.target,
                  dependency.edge,
                ),
              { discard: true },
            );

            return node;
          },
        );

        /**
         * Reads an initial output using the supplied schema. If the read
         * succeeds, it records where apply should put that output's value.
         * Use ResourceOutputResolver to read values from applied resource state.
         */
        const valueFrom = Effect.fn("ResourceGraphBuilder.resource.valueFrom")(
          function* <S extends Schema.Constraint>(
            output: ResourceOutputRef,
            property: ResourcePropertyPath,
            schema: S,
          ) {
            const decodedOutput: S["Type"] = yield* graph.outputValue(
              output.source,
              output.property,
              schema,
            );

            yield* dependsOn(output, property);

            return decodedOutput;
          },
        );

        /**
         * Reads an initial output as a string and records its input dependency
         * after the read succeeds. If the value is missing, the error names
         * the source resource and output.
         */
        const stringFrom = Effect.fn(
          "ResourceGraphBuilder.resource.stringFrom",
        )(function* (
          output: ResourceOutputRef,
          property: ResourcePropertyPath,
        ) {
          const value: string = yield* valueFrom(
            output,
            property,
            Schema.String,
          );

          return value;
        });

        return { dependsOn, register, valueFrom, stringFrom };
      });

      return { resource };
    }),
  },
) {}
