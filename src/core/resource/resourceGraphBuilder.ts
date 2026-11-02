import {
  Array as Arr,
  Context,
  Effect,
  Layer,
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
import {
  ResourceGraphStore,
  resourceGraphStoreLayer,
} from "./resourceGraphStore.js";

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
 * ResourceGraphBuilder registers declarations and their dependencies for stack
 * planning. Output schemas belong to the shared ResourceModel so provider
 * execution can validate the values promised by those declarations.
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
         * dependsOn declares an input to replace with another resource's output
         * during apply. It supports initial values whose dependencies are not
         * already expressed as output references in props.
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
         * register adds a resource with the schemas used to validate its inputs
         * and eventual outputs. Source resources must already be registered
         * before they can be referenced, including inside JSON objects and
         * arrays or through an explicit dependsOn declaration.
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
         * valueFrom returns a validated declaration-time output and records
         * the input it will supply during apply. A failed read leaves no
         * dependency behind. ResourceOutputResolver reads applied provider
         * values after execution.
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
         * stringFrom returns a declaration-time string output and records its
         * dependency only if the read succeeds. A missing value identifies the
         * source resource and output for reporting the unresolved input.
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

export const resourceGraphBuilderLayer = Layer.effect(
  ResourceGraphBuilder,
  ResourceGraphBuilder.make,
).pipe(Layer.provideMerge(resourceGraphStoreLayer));
