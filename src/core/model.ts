import { Context, Data, Effect, Equal, Option, Schema } from "effect";

import { ProviderIdSchema } from "../providers/provider.js";

export const ResourceKeySchema = Schema.Struct({
  logicalId: Schema.NonEmptyString,
});

export type ResourceKey = Schema.Schema.Type<typeof ResourceKeySchema>;

export const DependencyEdgeSchema = Schema.Struct({
  kind: Schema.Literal("property"),
  property: Schema.NonEmptyString,
  sourceProperty: Schema.NonEmptyString,
});

export type DependencyEdge = Schema.Schema.Type<typeof DependencyEdgeSchema>;

export const ResourceOutputRefSchema = Schema.TaggedStruct(
  "ResourceOutputRef",
  {
    source: ResourceKeySchema,
    property: Schema.NonEmptyString,
  },
);

export type ResourceOutputRef = Schema.Schema.Type<
  typeof ResourceOutputRefSchema
>;

/**
 * Provider resource declarations attach this metadata to their props schema so
 * `ResourceModel.nodeFromResource` can persist the provider command identity
 * with each `ResourceNode`. Lifecycle planning selects that command from the
 * persisted node, and `ResourceStateStore` uses named secret outputs to keep
 * provider-only values out of the durable state file.
 */
export const ResourceSchemaAnnotationSchema = Schema.Struct({
  provider: ProviderIdSchema,
  service: Schema.NonEmptyString,
  resource: Schema.NonEmptyString,
  operation: Schema.Literals(["create", "read", "update", "delete"]),
  stateSecretOutputKeys: Schema.Array(Schema.NonEmptyString),
});

export type ResourceSchemaAnnotation = Schema.Schema.Type<
  typeof ResourceSchemaAnnotationSchema
>;

export const ResourceSchemaAnnotationId = Symbol.for(
  "@nomoss/resourceSchemaAnnotation",
);

declare module "effect/Schema" {
  namespace Annotations {
    interface Annotations {
      readonly [ResourceSchemaAnnotationId]?: ResourceSchemaAnnotation;
    }
  }
}

export const ResourceNodeSchema = Schema.Struct({
  key: ResourceKeySchema,
  schema: ResourceSchemaAnnotationSchema,
  props: Schema.Json,
  outputs: Schema.Json,
});

export type ResourceNode = Schema.Schema.Type<typeof ResourceNodeSchema>;

export type PlanAction = Data.TaggedEnum<{
  Create: {
    readonly node: ResourceNode;
  };
  Update: {
    readonly node: ResourceNode;
    readonly current: ResourceNode;
  };
  Delete: {
    readonly node: ResourceNode;
  };
  Destroy: {
    readonly node: ResourceNode;
  };
}>;

export const PlanAction = Data.taggedEnum<PlanAction>();

export type ResourcePlan = {
  readonly createOrUpdate: ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly delete: ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly destroy: ReadonlyArray<ReadonlyArray<PlanAction>>;
};

export class ResourceSchemaAnnotationMissing extends Data.TaggedError(
  "ResourceSchemaAnnotationMissing",
)<{
  readonly logicalId: string;
}> {}

export const keyString = (key: ResourceKey) => key.logicalId;

export const resourceSchemaString = (schema: ResourceSchemaAnnotation) =>
  `${schema.provider}:${schema.service}:${schema.resource}:${schema.operation}`;

export const annotateResourceSchema = <
  Resource,
  ResourceSchema extends Schema.Schema<Resource>,
>(
  schema: ResourceSchema,
  annotation: ResourceSchemaAnnotation,
) =>
  schema.annotate({
    [ResourceSchemaAnnotationId]:
      ResourceSchemaAnnotationSchema.make(annotation),
  });

export const readResourceSchemaAnnotation = <Resource>(
  schema: Schema.Schema<Resource>,
) =>
  Option.fromUndefinedOr(
    Schema.resolveAnnotations(schema)?.[ResourceSchemaAnnotationId],
  ).pipe(
    Option.flatMap((annotation) =>
      ResourceSchemaAnnotationSchema.makeOption(annotation),
    ),
  );

export const resourceOutputRef = (
  source: ResourceKey,
  property: string,
): ResourceOutputRef => {
  const outputRef = ResourceOutputRefSchema.make({
    _tag: "ResourceOutputRef",
    source,
    property,
  });

  return outputRef;
};

/**
 * Resource constructors and policies pass provider data through this service
 * so graph nodes, JSON payloads, and display metadata share one
 * schema-backed contract.
 */
export class ResourceModel extends Context.Service<ResourceModel>()(
  "nomoss/core/model/ResourceModel",
  {
    make: Effect.succeed({
      nodeFromResource: <
        Props,
        Outputs,
        PropsSchema extends Schema.Schema<Props>,
        OutputsSchema extends Schema.Schema<Outputs>,
      >(input: {
        readonly key: ResourceKey;
        readonly propsSchema: PropsSchema;
        readonly outputsSchema: OutputsSchema;
        readonly props: NoInfer<Props>;
        readonly outputs: NoInfer<Outputs>;
      }) =>
        Effect.gen(function* () {
          const schema = yield* readResourceSchemaAnnotation(
            input.propsSchema,
          ).pipe(
            Option.match({
              onNone: () =>
                Effect.fail(
                  new ResourceSchemaAnnotationMissing({
                    logicalId: input.key.logicalId,
                  }),
                ),
              onSome: Effect.succeed,
            }),
          );
          const props = yield* input.propsSchema.makeEffect(input.props);
          const outputs = yield* input.outputsSchema.makeEffect(input.outputs);
          const resourceProps = yield* Schema.decodeUnknownEffect(Schema.Json)(
            props,
          );
          const resourceOutputs = yield* Schema.decodeUnknownEffect(
            Schema.Json,
          )(outputs);
          const resourceNode = yield* ResourceNodeSchema.makeEffect({
            key: input.key,
            schema,
            props: resourceProps,
            outputs: resourceOutputs,
          });

          return resourceNode;
        }),

      decodeProps: <Props>(node: ResourceNode, schema: Schema.Schema<Props>) =>
        schema.makeEffect(node.props),

      decodeOutputs: <Outputs>(
        node: ResourceNode,
        schema: Schema.Schema<Outputs>,
      ) => schema.makeEffect(node.outputs),

      decodeJson: <Resource>(
        schema: Schema.Schema<Resource>,
        encoded: Schema.Json,
      ) => schema.makeEffect(encoded),

      encodeJson: <Resource>(
        schema: Schema.Schema<Resource>,
        value: NoInfer<Resource>,
      ) =>
        Effect.gen(function* () {
          const checked = yield* schema.makeEffect(value);
          const json = yield* Schema.Json.makeEffect(checked);

          return json;
        }),

      propsEqual: (left: ResourceNode, right: ResourceNode) =>
        Equal.equals(left.props, right.props),

      resourceLabel: (node: ResourceNode) =>
        `${node.schema.provider}:${node.schema.service}:${node.schema.resource}/${keyString(node.key)}`,

      actionString: (action: PlanAction) =>
        `${action._tag} ${action.node.schema.provider}:${action.node.schema.service}:${action.node.schema.resource}/${keyString(action.node.key)}`,
    }),
  },
) {}
