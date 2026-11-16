import {
  Array as Arr,
  Context,
  Data,
  Effect,
  HashMap,
  JsonPatch,
  JsonPointer,
  Layer,
  Match,
  Option,
  Predicate,
  Record,
  Ref,
  Schema,
  SchemaGetter,
  SchemaIssue,
  String as Str,
  Struct,
} from "effect";

import { ProviderIdSchema } from "../../providers/provider.js";
export const ResourceKeySchema = Schema.Struct({
  logicalId: Schema.NonEmptyString,
});

export type ResourceKey = typeof ResourceKeySchema.Type;

/**
 * ResourcePropertyPath identifies the declared input that output resolution
 * will replace. Segments name object properties or decimal array indexes; an
 * empty path addresses all props. Property names retain punctuation so a name
 * that contains a period is not interpreted as several nested fields.
 */
export const ResourcePropertyPathSchema = Schema.Array(Schema.String);

export type ResourcePropertyPath = typeof ResourcePropertyPathSchema.Type;

export const ResourceTypeSchema = Schema.Struct({
  provider: ProviderIdSchema,
  service: Schema.NonEmptyString,
  resource: Schema.NonEmptyString,
});

export type ResourceType = typeof ResourceTypeSchema.Type;

/**
 * A ResourceEntity instance identifies a declaration before a provider creates
 * it. Relationship schemas constrain its resource type, and graph registration
 * verifies that its key identifies a source of that type.
 */
export class ResourceEntity<
  Type extends ResourceType = ResourceType,
> extends Data.Class<{
  readonly key: ResourceKey;
  readonly resourceType: Type;
}> {}

/**
 * The ResourceRequestMappingSchema schema preserves the shape required by a
 * dependent request. Each selected source output replaces an existing location
 * in that shape, so one entity can supply a scalar or several related values.
 */
export const ResourceRequestMappingSchema = Schema.Struct({
  value: Schema.Json,
  outputs: Schema.NonEmptyArray(
    Schema.Struct({
      source: ResourcePropertyPathSchema,
      target: ResourcePropertyPathSchema,
    }),
  ),
});

export type ResourceRequestMapping = typeof ResourceRequestMappingSchema.Type;

export const ResourceReferenceRecordSchema = Schema.TaggedStruct(
  "ResourceReference",
  {
    source: ResourceKeySchema,
    resourceType: ResourceTypeSchema,
    mapping: ResourceRequestMappingSchema,
  },
);

export type ResourceReferenceRecord = typeof ResourceReferenceRecordSchema.Type;

/**
 * The ResourceReferenceSchema constructor accepts an entity of the permitted
 * resource type. Its JSON codec saves the source identity and provider mapping
 * without the source's properties. Scalar IDs and output references fail this
 * schema before graph registration.
 */
export const ResourceReferenceSchema = <Type extends ResourceType>(
  resourceType: Schema.Schema<Type>,
  mapping: ResourceRequestMapping,
) => {
  const requestMapping = ResourceRequestMappingSchema.make(mapping);
  const mappingEqual = Schema.toEquivalence(ResourceRequestMappingSchema);
  const reference = Schema.declareConstructor<ResourceEntity<Type>>()(
    [Schema.toType(resourceType)],
    ([resourceType]) =>
      (input, ast, options) =>
        Match.value(input).pipe(
          Match.when(Schema.is(Schema.instanceOf(ResourceEntity)), (entity) =>
            Schema.decodeUnknownEffect(
              Schema.Struct({
                key: ResourceKeySchema,
                resourceType: Schema.toType(resourceType),
              }),
            )(entity).pipe(
              Effect.map((value) => new ResourceEntity(value)),
              Effect.mapError((error) => error.issue),
            ),
          ),
          Match.orElse(() =>
            Effect.fail(new SchemaIssue.InvalidType(ast, input, options)),
          ),
        ),
    {
      expected: "ResourceEntity",
      toCodec: ([resourceType]) => {
        const savedSchema = Schema.TaggedStruct("ResourceReference", {
          source: ResourceKeySchema,
          resourceType: Schema.toType(resourceType),
          mapping: ResourceRequestMappingSchema.check(
            Schema.makeFilter((value) => mappingEqual(value, requestMapping)),
          ),
        });

        return Schema.link<ResourceEntity<Type>>()(savedSchema, {
          decode: SchemaGetter.transform(
            (saved) =>
              new ResourceEntity({
                key: saved.source,
                resourceType: saved.resourceType,
              }),
          ),
          encode: SchemaGetter.transform((entity) => {
            const saved: typeof savedSchema.Type = {
              _tag: "ResourceReference",
              source: entity.key,
              resourceType: entity.resourceType,
              mapping: requestMapping,
            };

            return saved;
          }),
        });
      },
    },
  );

  return reference;
};

export const ResourceRelationshipSchema = Schema.Struct({
  property: ResourcePropertyPathSchema,
  reference: ResourceReferenceRecordSchema,
});

export type ResourceRelationship = typeof ResourceRelationshipSchema.Type;

/**
 * Property dependencies supply provider outputs to dependent inputs.
 * Prerequisites require execution order and do not substitute a value.
 */
export const DependencyEdgeSchema = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("relationship"),
    property: ResourcePropertyPathSchema,
    reference: ResourceReferenceRecordSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("property"),
    property: ResourcePropertyPathSchema,
    sourceProperty: Schema.NonEmptyString,
  }),
  Schema.Struct({
    kind: Schema.Literal("prerequisite"),
    reason: Schema.NonEmptyString,
  }),
]);

export type DependencyEdge = Schema.Schema.Type<typeof DependencyEdgeSchema>;

/**
 * Saved dependencies retain the source and output name so apply can obtain
 * provider values after creation and after a caller reloads a plan.
 */
export const ResourceOutputRefSchema = Schema.TaggedStruct(
  "ResourceOutputRef",
  {
    source: ResourceKeySchema,
    property: Schema.NonEmptyString,
  },
);

export const ResourceOutputReference = Symbol(
  "nomoss/ResourceOutput/reference",
);

/**
 * The ResourceOutput class records an internal dependency before its provider
 * value exists. Resource properties expose applied values directly; this
 * descriptor is encoded in deferred requests and interpreted by execution.
 */
export class ResourceOutput<Value> extends Data.Class<{
  readonly [ResourceOutputReference]: typeof ResourceOutputRefSchema.Type;
  readonly schema: Schema.Codec<Value>;
}> {
  constructor(
    source: ResourceKey,
    property: string,
    schema: Schema.Schema<Value>,
  ) {
    super({
      schema: Schema.toType(schema),
      [ResourceOutputReference]: ResourceOutputRefSchema.make({
        _tag: "ResourceOutputRef",
        source,
        property,
      }),
    });
  }
}

/**
 * The ResourceOutputSchema constructor lets declaration schemas accept typed
 * outputs and encode their dependencies for graph storage. It reconstructs
 * saved outputs with the field's value schema; provider requests validate the
 * resolved value.
 */
export const ResourceOutputSchema = <S extends Schema.Constraint>(value: S) =>
  Schema.declareConstructor<ResourceOutput<S["Type"]>>()(
    [value],
    ([value]) =>
      (input, ast, options) =>
        Match.value(input).pipe(
          Match.when(Schema.is(Schema.instanceOf(ResourceOutput)), (input) => {
            const reference = input[ResourceOutputReference];
            const output: ResourceOutput<S["Type"]> = new ResourceOutput(
              reference.source,
              reference.property,
              Schema.toType(value),
            );

            return Effect.succeed(output);
          }),
          Match.orElse(() =>
            Effect.fail(new SchemaIssue.InvalidType(ast, input, options)),
          ),
        ),
    {
      expected: "ResourceOutput",
      toCodec: ([value]) =>
        Schema.link<ResourceOutput<S["Type"]>>()(ResourceOutputRefSchema, {
          decode: SchemaGetter.transform(
            (reference) =>
              new ResourceOutput(
                reference.source,
                reference.property,
                Schema.toType(value),
              ),
          ),
          encode: SchemaGetter.transform(
            (output) => output[ResourceOutputReference],
          ),
        }),
    },
  );

export type ResourceInputJson =
  | null
  | string
  | number
  | boolean
  | ResourceOutput<Schema.Json>
  | ReadonlyArray<ResourceInputJson>
  | { readonly [key: string]: ResourceInputJson };

/**
 * JSON provider inputs can contain outputs inside policy documents and other
 * unstructured properties. Their saved form contains dependency records;
 * resolved provider requests must still contain ordinary JSON values.
 */
export const ResourceInputJsonSchema: Schema.Codec<ResourceInputJson> =
  Schema.Union([
    Schema.Null,
    Schema.String,
    Schema.Finite,
    Schema.Boolean,
    ResourceOutputSchema(Schema.Json),
    Schema.Array(Schema.suspend(() => ResourceInputJsonSchema)),
    Schema.Record(
      Schema.String,
      Schema.suspend(() => ResourceInputJsonSchema),
    ),
  ]);

/**
 * The ResourceReplacementSchema schema requires a reviewed operation order
 * because providers differ in whether creation or removal must finish first.
 * Omitting property paths applies the rule to every selected change.
 * Supplied paths restrict replacement to changes affecting those properties.
 */
export const ResourceReplacementSchema = Schema.Struct({
  order: Schema.Literals(["createBeforeDestroy", "destroyBeforeCreate"]),
  properties: Schema.optionalKey(
    Schema.NonEmptyArray(ResourcePropertyPathSchema),
  ),
});

/**
 * The ResourceSchemaAnnotationSchema schema keeps provider dispatch and
 * protected-output rules usable after a restart, before the application
 * registers its declaration validators. Saved replacement rules also preserve
 * the operation order selected for an unfinished instance.
 */
export const ResourceSchemaAnnotationSchema = Schema.Struct({
  provider: ProviderIdSchema,
  service: Schema.NonEmptyString,
  resource: Schema.NonEmptyString,
  operation: Schema.Literals(["create", "read", "update", "delete"]),
  stateSecretOutputKeys: Schema.Array(Schema.NonEmptyString),
  replacement: Schema.optionalKey(ResourceReplacementSchema),
  primaryIdentifier: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(Schema.isPattern(/^\/properties\/(?:[^/~]|~[01])+$/)),
    ),
  ),
  cloudControl: Schema.optionalKey(
    Schema.Struct({
      typeName: Schema.NonEmptyString,
      primaryIdentifier: Schema.Array(Schema.NonEmptyString),
      readOnlyProperties: Schema.Array(Schema.NonEmptyString),
      createOnlyProperties: Schema.Array(Schema.NonEmptyString),
      writeOnlyProperties: Schema.Array(Schema.NonEmptyString),
    }),
  ),
});

export type ResourceSchemaAnnotation = Schema.Schema.Type<
  typeof ResourceSchemaAnnotationSchema
>;

/**
 * A provider read must describe the resource identified by saved state. This
 * failure preserves the different values so reconciliation can report the read
 * and retain the saved resource's identity.
 */
export class ResourceIdentityMismatch extends Data.TaggedError(
  "ResourceIdentityMismatch",
)<{
  readonly logicalId?: string;
  readonly property: string;
  readonly expected: Schema.Json;
  readonly actual: Schema.Json;
}> {
  override get message() {
    return `Provider read returned a different ${this.property} for the saved resource`;
  }
}

export const ResourceSchemaAnnotationId = Symbol.for(
  "@nomoss/resourceSchemaAnnotation",
);

export const CloudFormationPropertyReferenceSchema = Schema.Struct({
  targetCloudFormationType: Schema.NonEmptyString,
  targetPropertyPath: Schema.NonEmptyString,
});

export type CloudFormationPropertyReference = Schema.Schema.Type<
  typeof CloudFormationPropertyReferenceSchema
>;

export const CloudFormationPropertyReferencesAnnotationId = Symbol.for(
  "@nomoss/cloudFormationPropertyReferences",
);

declare module "effect/Schema" {
  namespace Annotations {
    interface Annotations {
      readonly [ResourceSchemaAnnotationId]?: ResourceSchemaAnnotation;
      readonly [CloudFormationPropertyReferencesAnnotationId]?: ReadonlyArray<CloudFormationPropertyReference>;
    }
  }
}

/**
 * The ResourceNodeSchema schema retains request relationships alongside the
 * provider identity and outputs needed for later mutations. Its generation
 * identifies the physical instance for persistence, while relationships use
 * the stable declaration identity to find the current applied source.
 */
export const ResourceNodeSchema = Schema.Struct({
  key: ResourceKeySchema,
  generation: Schema.optionalKey(
    Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
  ),
  schema: ResourceSchemaAnnotationSchema,
  props: Schema.Json,
  outputs: Schema.Json,
  cloudControlIdentifier: Schema.optionalKey(Schema.NonEmptyString),
  relationships: Schema.optionalKey(Schema.Array(ResourceRelationshipSchema)),
});

export type ResourceNode = Schema.Schema.Type<typeof ResourceNodeSchema>;

/**
 * The resourceGeneration helper preserves the instance identity of legacy
 * saved nodes by interpreting an omitted generation as zero.
 */
export const resourceGeneration = (node: ResourceNode): number =>
  node.generation ?? 0;

/**
 * The resourceInstanceKey helper distinguishes saved instances that share a
 * declaration identity. State updates and recovery use this key so completing
 * an operation on one instance preserves the other instances still owned.
 */
export const resourceInstanceKey = (node: ResourceNode): string =>
  `${resourceGeneration(node)}:${node.key.logicalId}`;

/**
 * The ResourceOperation type requires its target node to identify the provider
 * instance being changed. Updates retain the last applied node so execution
 * can preserve its outputs when the resolved inputs are unchanged.
 */
export type ResourceOperation = Data.TaggedEnum<{
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

export const ResourceOperation = Data.taggedEnum<ResourceOperation>();

/**
 * The PlanAction type requires replacement operations to retain their reviewed
 * order so execution and terminal presentation describe the same provider work.
 * Provider policies receive those operations separately through the ordinary
 * command protocol.
 */
export type PlanAction =
  | ResourceOperation
  | {
      readonly _tag: "Replace";
      readonly node: ResourceNode;
      readonly current: ResourceNode;
      readonly operations: ReadonlyArray<ResourceOperation>;
    };

export const PlanAction = Data.taggedEnum<PlanAction>();

/**
 * The ResourcePlan type separates changes to the desired graph from explicit
 * teardown. Later batches wait for earlier batches to finish, and operations
 * inside a replacement retain their own reviewed execution order.
 */
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

export class ResourceOutputSchemaMissing extends Data.TaggedError(
  "ResourceOutputSchemaMissing",
)<{ readonly schema: ResourceSchemaAnnotation }> {}

export class ResourceRequestSchemaMissing extends Data.TaggedError(
  "ResourceRequestSchemaMissing",
)<{ readonly schema: ResourceSchemaAnnotation }> {}

export class ResourceEntityTypeMismatch extends Data.TaggedError(
  "ResourceEntityTypeMismatch",
)<{
  readonly source: ResourceKey;
  readonly expected: ResourceType;
  readonly actual: ResourceType;
}> {}

export class ResourceReferenceSourceMismatch extends Data.TaggedError(
  "ResourceReferenceSourceMismatch",
)<{
  readonly expected: ResourceKey;
  readonly actual: ResourceKey;
}> {}

/**
 * ResourceOutputResolutionMissing identifies a value required by an output
 * read when either its source resource or requested field is absent. The
 * source logical id and output name let callers identify the missing value.
 */
export class ResourceOutputResolutionMissing extends Data.TaggedError(
  "ResourceOutputResolutionMissing",
)<{
  readonly property: string;
  readonly sourceLogicalId: string;
}> {}

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

/**
 * ResourceModel validates resource values and converts them to and from JSON
 * for declaration, provider operations, and persistence. Its registered output
 * schemas remain available to provider reads in the same runtime, and its
 * resource labels keep plans and diagnostics consistent.
 */
export class ResourceModel extends Context.Service<ResourceModel>()(
  "nomoss/core/resource/model/ResourceModel",
  {
    make: Effect.gen(function* () {
      const outputContracts = yield* Ref.make(
        HashMap.empty<
          Pick<
            ResourceSchemaAnnotation,
            "provider" | "service" | "resource" | "operation"
          >,
          {
            readonly schema: ResourceSchemaAnnotation;
            readonly decoder: Schema.Decoder<Schema.Json>;
          }
        >(),
      );

      const requestContracts = yield* Ref.make(
        HashMap.empty<
          Pick<
            ResourceSchemaAnnotation,
            "provider" | "service" | "resource" | "operation"
          >,
          Schema.Decoder<Schema.Json>
        >(),
      );

      /**
       * The registerRequestSchema service method retains the resolved input
       * contract for a provider resource. Entity references use a different
       * declaration schema because their values do not exist until apply.
       */
      const registerRequestSchema = Effect.fn(
        "ResourceModel.registerRequestSchema",
      )(function* <Props>(
        schema: ResourceSchemaAnnotation,
        requestSchema: Schema.Schema<Props>,
      ) {
        const decoder: Schema.Decoder<Schema.Json> = Schema.toType(
          requestSchema,
        ).pipe(Schema.decodeTo(Schema.Json));

        yield* Ref.update(
          requestContracts,
          HashMap.set(
            Struct.pick(schema, [
              "provider",
              "service",
              "resource",
              "operation",
            ]),
            decoder,
          ),
        );

        const registered: ResourceSchemaAnnotation = schema;

        return registered;
      });

      /**
       * The validateResourceRequest service method checks completed properties
       * before a dependent mutation. A missing resolved input contract prevents
       * execution even when all entity references have supplied values.
       */
      const validateResourceRequest = Effect.fn(
        "ResourceModel.validateResourceRequest",
      )(function* (node: ResourceNode) {
        const contracts = yield* Ref.get(requestContracts);
        const decoder = yield* HashMap.get(
          contracts,
          Struct.pick(node.schema, [
            "provider",
            "service",
            "resource",
            "operation",
          ]),
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () => new ResourceRequestSchemaMissing({ schema: node.schema }),
          ),
        );

        yield* Schema.decodeEffect(decoder)(node.props);

        const validated: ResourceNode = node;

        return validated;
      });

      /**
       * The entityFromNode service method gives provider declarations a typed
       * entity whose type must agree with their canonical schema annotation.
       * Its properties and eventual output values remain in the shared graph.
       */
      const entityFromNode = Effect.fn("ResourceModel.entityFromNode")(
        function* <Type extends ResourceType>(
          node: ResourceNode,
          resourceType: Schema.Schema<Type>,
        ) {
          const type = yield* Schema.decodeUnknownEffect(
            Schema.toType(resourceType),
          )(node.schema);
          const entity: ResourceEntity<Type> = new ResourceEntity({
            key: node.key,
            resourceType: type,
          });

          return entity;
        },
      );

      /**
       * The validateResourceReference service method rejects a reference whose
       * source key or resource type disagrees with the registered or applied
       * resource. A matching scalar identifier cannot authorize another type.
       */
      const validateResourceReference = Effect.fn(
        "ResourceModel.validateResourceReference",
      )(function* (reference: ResourceReferenceRecord, source: ResourceNode) {
        yield* Effect.fail(
          new ResourceReferenceSourceMismatch({
            expected: reference.source,
            actual: source.key,
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Schema.toEquivalence(ResourceKeySchema)(
                reference.source,
                source.key,
              ) === false,
            ),
          ),
        );

        const actual: ResourceType = Struct.pick(source.schema, [
          "provider",
          "service",
          "resource",
        ]);

        yield* Effect.fail(
          new ResourceEntityTypeMismatch({
            source: source.key,
            expected: reference.resourceType,
            actual,
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Schema.toEquivalence(ResourceTypeSchema)(
                reference.resourceType,
                actual,
              ) === false,
            ),
          ),
        );

        const validated: ResourceNode = source;

        return validated;
      });

      /**
       * The relationshipsFromProps service method retains each entity reference
       * at its destination path for persistence. Encoded references terminate
       * traversal so a source entity's own properties cannot become inputs of
       * its dependent resource.
       */
      const relationshipsFromProps = (props: Schema.Json) => {
        const visit = (
          value: Schema.Json,
          property: ResourcePropertyPath,
        ): ReadonlyArray<ResourceRelationship> =>
          Match.value(value).pipe(
            Match.when(
              Schema.is(ResourceReferenceRecordSchema),
              (reference) => [{ property, reference }],
            ),
            Match.when(Schema.is(Schema.Array(Schema.Json)), (values) =>
              Arr.flatMap(values, (value, index) =>
                visit(value, [...property, String(index)]),
              ),
            ),
            Match.when(
              Schema.is(Schema.Record(Schema.String, Schema.Json)),
              (values) =>
                Arr.flatMap(Record.toEntries(values), ([name, value]) =>
                  visit(value, [...property, name]),
                ),
            ),
            Match.orElse(() => []),
          );

        const relationships: ReadonlyArray<ResourceRelationship> = visit(
          props,
          [],
        );

        return relationships;
      };

      /**
       * registerOutputsSchema retains a declaration's schema for provider
       * outputs read later in this runtime. Validation uses decoded values
       * and does not require services used only for transport decoding.
       */
      const registerOutputsSchema = Effect.fn(
        "ResourceModel.registerOutputsSchema",
      )(function* <Outputs>(
        schema: ResourceSchemaAnnotation,
        outputsSchema: Schema.Schema<Outputs>,
      ) {
        const decoder: Schema.Decoder<Schema.Json> = Schema.toType(
          outputsSchema,
        ).pipe(Schema.decodeTo(Schema.Json));

        yield* Ref.update(
          outputContracts,
          HashMap.set(
            Struct.pick(schema, [
              "provider",
              "service",
              "resource",
              "operation",
            ]),
            { schema, decoder },
          ),
        );

        const registered: ResourceSchemaAnnotation = schema;

        return registered;
      });

      /**
       * validateResourceOutputs checks declared outputs and returns the full
       * provider JSON model for observations and persistence. The output schema
       * must be registered before this operation can succeed.
       */
      const validateResourceOutputs = Effect.fn(
        "ResourceModel.validateResourceOutputs",
      )(function* (schema: ResourceSchemaAnnotation, model: Schema.Json) {
        const contracts = yield* Ref.get(outputContracts);

        const contract = yield* Effect.fromOption(
          HashMap.get(
            contracts,
            Struct.pick(schema, [
              "provider",
              "service",
              "resource",
              "operation",
            ]),
          ),
        ).pipe(
          Effect.mapError(() => new ResourceOutputSchemaMissing({ schema })),
        );

        yield* Schema.decodeEffect(contract.decoder)(model);

        const outputs: Schema.Json = model;

        return outputs;
      });

      /**
       * nodeFromResource returns a validated JSON node from a typed declaration.
       * Provider metadata is required, and the output schema remains registered
       * in this model for later provider reads and output resolution. Invalid
       * inputs fail before a node is available for graph registration.
       * Omitted output values describe a declaration that awaits provider execution;
       * supplied values must satisfy the registered output contract.
       */
      const nodeFromResource = Effect.fn("ResourceModel.nodeFromResource")(
        function* <
          Props,
          Outputs,
          PropsSchema extends Schema.Schema<Props>,
          OutputsSchema extends Schema.Schema<Outputs>,
        >(input: {
          readonly key: ResourceKey;
          readonly propsSchema: PropsSchema;
          readonly outputsSchema: OutputsSchema;
          readonly requestSchema?: Schema.Schema<Schema.Json> | undefined;
          readonly props: NoInfer<Props>;
          readonly outputs?: NoInfer<Outputs> | undefined;
        }) {
          const schema = yield* readResourceSchemaAnnotation(
            input.propsSchema,
          ).pipe(
            Effect.fromOption,
            Effect.mapError(
              () =>
                new ResourceSchemaAnnotationMissing({
                  logicalId: input.key.logicalId,
                }),
            ),
          );

          const resourceProps = yield* encodeJson(
            input.propsSchema,
            input.props,
          );

          const resourceOutputs: Schema.Json = yield* Option.match(
            Option.fromUndefinedOr(input.outputs),
            {
              onNone: () => Effect.succeed({}),
              onSome: (outputs) => encodeJson(input.outputsSchema, outputs),
            },
          );

          yield* registerOutputsSchema(schema, input.outputsSchema);

          yield* Effect.forEach(
            Option.toArray(Option.fromUndefinedOr(input.requestSchema)),
            (requestSchema) => registerRequestSchema(schema, requestSchema),
          );

          const relationships = relationshipsFromProps(resourceProps);

          const resourceNode: ResourceNode = yield* Schema.decodeEffect(
            ResourceNodeSchema,
          )(
            Match.value(relationships.length).pipe(
              Match.when(0, () => ({
                key: input.key,
                schema,
                props: resourceProps,
                outputs: resourceOutputs,
              })),
              Match.orElse(() => ({
                key: input.key,
                schema,
                props: resourceProps,
                outputs: resourceOutputs,
                relationships,
              })),
            ),
          );

          return resourceNode;
        },
      );

      /**
       * The withOutputs service method returns a node with validated provider
       * outputs for persistence and dependent resources. Invalid outputs fail
       * before a node with those outputs can be returned.
       */
      const withOutputs = Effect.fn("ResourceModel.withOutputs")(function* (
        node: ResourceNode,
        outputs: Schema.Json,
      ) {
        const validated = yield* validateResourceOutputs(node.schema, outputs);

        const updated: ResourceNode = yield* Schema.decodeEffect(
          ResourceNodeSchema,
        )({ ...node, outputs: validated });

        return updated;
      });

      /**
       * The decodeProps service method returns typed declared properties through
       * the supplied domain schema. A resource policy receives a schema failure when saved or
       * resolved properties do not satisfy its operation's contract.
       */
      const decodeProps = Effect.fn("ResourceModel.decodeProps")(function* <
        Props,
      >(node: ResourceNode, schema: Schema.Schema<Props>) {
        const props: Props = yield* decodeJson(schema, node.props);

        return props;
      });

      /**
       * decodeOutputs returns the complete output document decoded through the
       * caller's schema, which may permit absent fields. decodeOutput and
       * resolveOutput require a particular output value to be present.
       */
      const decodeOutputs = Effect.fn("ResourceModel.decodeOutputs")(function* <
        Outputs,
      >(node: ResourceNode, schema: Schema.Schema<Outputs>) {
        const outputs: Outputs = yield* decodeJson(schema, node.outputs);

        return outputs;
      });

      /**
       * decodeOutput returns one output validated against the registered
       * provider model and the caller's field schema. An absent field fails
       * with ResourceOutputResolutionMissing; a value rejected by
       * either schema fails with SchemaError.
       */
      const decodeOutput = Effect.fn("ResourceModel.decodeOutput")(function* <
        S extends Schema.Constraint,
      >(node: ResourceNode, property: string, schema: S) {
        const outputs = yield* Schema.decodeUnknownEffect(
          Schema.Record(Schema.String, Schema.Json),
        )(node.outputs);

        const value = yield* Record.get(outputs, property).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceOutputResolutionMissing({
                property,
                sourceLogicalId: node.key.logicalId,
              }),
          ),
        );

        yield* validateResourceOutputs(node.schema, node.outputs);

        const output: S["Type"] = yield* Schema.decodeEffect(schema)(value);

        return output;
      });

      /**
       * The readAppliedOutput service method projects an available value from
       * materialized lifecycle state without I/O. Both the complete provider
       * outputs and selected property must satisfy their canonical schemas.
       * Missing contracts or values throw the same domain failures as execution.
       */
      const readAppliedOutput = <S extends Schema.Constraint>(
        node: ResourceNode,
        property: string,
        schema: S,
      ) => {
        const contract = Option.getOrThrowWith(
          HashMap.get(
            Ref.getUnsafe(outputContracts),
            Struct.pick(node.schema, [
              "provider",
              "service",
              "resource",
              "operation",
            ]),
          ),
          () => new ResourceOutputSchemaMissing({ schema: node.schema }),
        );
        Schema.decodeSync(contract.decoder)(node.outputs);
        const outputs = Schema.decodeUnknownSync(
          Schema.Record(Schema.String, Schema.Json),
        )(node.outputs);
        const selected = Option.getOrThrowWith(
          Record.get(outputs, property),
          () =>
            new ResourceOutputResolutionMissing({
              property,
              sourceLogicalId: node.key.logicalId,
            }),
        );
        const value: S["Type"] = Schema.decodeSync(Schema.toType(schema))(
          selected,
        );
        return value;
      };

      /**
       * withObservedOutputs accepts a provider read only when its declared
       * identity matches the saved resource. The current registered contract
       * also supplies identity rules for records saved before those annotations
       * existed. A rejected observation leaves persistence to retain prior state.
       */
      const withObservedOutputs = Effect.fn(
        "ResourceModel.withObservedOutputs",
      )(function* (node: ResourceNode, outputs: Schema.Json) {
        const contracts = yield* Ref.get(outputContracts);
        const contract = yield* Effect.fromOption(
          HashMap.get(
            contracts,
            Struct.pick(node.schema, [
              "provider",
              "service",
              "resource",
              "operation",
            ]),
          ),
        ).pipe(
          Effect.mapError(
            () => new ResourceOutputSchemaMissing({ schema: node.schema }),
          ),
        );

        const observed = yield* withOutputs(node, outputs);

        yield* Effect.forEach(contract.schema.primaryIdentifier ?? [], (path) =>
          Effect.gen(function* () {
            const property = JsonPointer.unescapeToken(
              Str.substring("/properties/".length)(path),
            );
            const expected = yield* decodeOutput(node, property, Schema.Json);
            const actual = yield* decodeOutput(observed, property, Schema.Json);

            yield* Effect.fail(
              new ResourceIdentityMismatch({
                logicalId: node.key.logicalId,
                property,
                expected,
                actual,
              }),
            ).pipe(
              Effect.when(
                Effect.succeed(JsonPatch.get(expected, actual).length > 0),
              ),
            );
          }),
        );

        const updated: ResourceNode = observed;

        return updated;
      });

      /**
       * decodeJson validates a stored JSON value against a schema's decoded
       * type. Transport-only transformations and their required services do not
       * participate when the method reads an already decoded resource value.
       */
      const decodeJson = Effect.fn("ResourceModel.decodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, encoded: Schema.Json) {
        const decoded: Resource = yield* Schema.decodeUnknownEffect(
          Schema.toCodecJson(Schema.toType(schema)),
        )(encoded);

        return decoded;
      });

      /**
       * encodeJson validates a decoded domain value and converts it to JSON for
       * graph storage. Values incompatible with either the domain schema or
       * JSON fail before the method adds them to the resource node.
       */
      const encodeJson = Effect.fn("ResourceModel.encodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, value: NoInfer<Resource>) {
        const json: Schema.Json = yield* Schema.encodeEffect(
          Schema.toCodecJson(Schema.toType(schema)),
        )(value);

        return json;
      });

      /**
       * propsEqual compares declared JSON properties for mutation selection.
       * Provider outputs and other node metadata do not make otherwise equal
       * desired properties count as an update.
       */
      const propsEqual = (left: ResourceNode, right: ResourceNode) => {
        const equal: boolean = Predicate.and(
          (node: ResourceNode) =>
            Schema.toEquivalence(Schema.Json)(left.props, node.props),
          (node) =>
            Schema.toEquivalence(Schema.Array(ResourceRelationshipSchema))(
              left.relationships ?? [],
              node.relationships ?? [],
            ),
        )(right);

        return equal;
      };

      const resourceLabel = (node: ResourceNode) => {
        const label: string = `${node.schema.provider}:${node.schema.service}:${node.schema.resource}/${node.key.logicalId}`;

        return label;
      };

      const actionString = (action: PlanAction) => {
        const description: string = `${action._tag} ${resourceLabel(action.node)}`;

        return description;
      };

      return {
        registerRequestSchema,
        validateResourceRequest,
        entityFromNode,
        validateResourceReference,
        relationshipsFromProps,
        registerOutputsSchema,
        validateResourceOutputs,
        nodeFromResource,
        withOutputs,
        withObservedOutputs,
        decodeProps,
        decodeOutputs,
        decodeOutput,
        readAppliedOutput,
        decodeJson,
        encodeJson,
        propsEqual,
        resourceLabel,
        actionString,
      };
    }),
  },
) {}

/**
 * Declaration and provider execution reuse this Layer so output schemas
 * registered at declaration time remain available during execution.
 */
export const resourceModelLayer = Layer.effect(
  ResourceModel,
  ResourceModel.make,
);
