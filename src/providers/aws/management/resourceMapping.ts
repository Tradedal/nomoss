import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Layer,
  Match,
  Option,
  pipe,
  Record,
  Schema,
  Tuple,
} from "effect";
import { Digest } from "effect/crypto";
import {
  ResourceModel,
  type ResourceNode,
  resourceModelLayer,
} from "../../../core/resource/model.js";
import { ResourceCommandStackName } from "../../../core/resource/resourceCommandPolicy.js";
import { AwsJsonRpcPayload } from "../client/awsClientModel.js";
import type {
  AwsAttributeResourceConfiguration,
  AwsResourceAttributeValues,
  AwsResourceProperties,
  AwsResourceState,
} from "./resourceConfiguration.js";

/**
 * The AwsResourceMappingFailed error identifies a declaration that cannot be
 * represented by its resource configuration. Lifecycle commands propagate this
 * failure before mutation so core retains the last successfully applied state.
 */
export class AwsResourceMappingFailed extends Data.TaggedError(
  "AwsResourceMappingFailed",
)<{
  readonly typeName: string;
  readonly message: string;
}> {}

/**
 * The AwsResourceMapping service validates declarations and reconstructed
 * resources against the original Registry schema. Native attribute and tag
 * values use the generated operation codecs. Physical naming and name recovery
 * follow SQS's URL identity contract.
 */
export class AwsResourceMapping extends Context.Service<AwsResourceMapping>()(
  "nomoss/providers/aws/management/resourceMapping/AwsResourceMapping",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;
      const digest = yield* Digest.Digest;
      const json = Schema.fromJsonString(Schema.Json);

      /**
       * The attributesMatch service method checks whether a provider read has
       * reached the requested settings. String properties compare literally.
       * JSON properties compare by value because AWS can change policy formatting.
       * An absent attribute satisfies an explicit empty-string removal.
       */
      const attributesMatch = (
        definition: AwsAttributeResourceConfiguration,
        expected: AwsResourceAttributeValues,
        actual: AwsResourceAttributeValues,
      ) => {
        const encodings = Record.mapEntries(
          definition.mapping.attributes,
          ({ attribute }, property) =>
            Tuple.make(attribute, definition.encodings[property]),
        );
        const equal = Schema.toEquivalence(Schema.Json);
        const matches: boolean = Record.every(expected, (value, attribute) => {
          const observed = actual[attribute] ?? "";
          return Match.value(encodings[attribute]).pipe(
            Match.when("string", () => value === observed),
            Match.orElse(() => {
              const desired = Schema.decodeUnknownOption(json)(value).pipe(
                Option.getOrElse(() => value),
              );
              const actualValue = Schema.decodeUnknownOption(json)(
                observed,
              ).pipe(Option.getOrElse(() => observed));
              return equal(desired, actualValue);
            }),
          );
        });

        return matches;
      };

      /**
       * The encodeAttributes service method converts declared settings to native
       * string values. JSON policy strings retain their existing representation.
       * numeric, boolean, and object values use Effect's JSON codec.
       */
      const encodeAttributes = Effect.fn("AwsResourceMapping.encodeAttributes")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          properties: AwsJsonRpcPayload,
        ) {
          const selected = Record.filter(properties, (_, property) =>
            Record.has(definition.mapping.attributes, property),
          );
          const entries = yield* Effect.forEach(
            Record.toEntries(selected),
            Effect.fnUntraced(function* ([property, value]) {
              const encoded = yield* Match.value(value).pipe(
                Match.when(Match.string, (value) => Effect.succeed(value)),
                Match.orElse(Schema.encodeEffect(json)),
              );
              return Tuple.make(
                definition.mapping.attributes[property].attribute,
                encoded,
              );
            }),
          );
          const attributes: AwsResourceAttributeValues =
            yield* Schema.decodeEffect(definition.attributeSchema)(
              Record.fromEntries(entries),
            );

          return attributes;
        },
      );

      /**
       * The prepare service method validates a resolved declaration and supplies
       * its native attributes and managed tags. Duplicate tag keys fail because
       * a native map cannot retain both values from that declaration.
       */
      const prepare = Effect.fn("AwsResourceMapping.prepare")(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
      ) {
        const declared = yield* model.decodeProps(node, definition.propsSchema);
        const properties =
          yield* Schema.decodeUnknownEffect(AwsJsonRpcPayload)(declared);
        const attributes = yield* encodeAttributes(definition, properties);

        // The prepare operation retains the original tag list until duplicate
        // detection completes. A map alone cannot reveal that two declaration
        // entries supplied different values for the same key.
        const declaredTags = yield* Schema.decodeUnknownEffect(
          definition.tagsSchema,
        )(properties[definition.mapping.tags.property] ?? []);
        const tagValues = Record.fromIterableWith(
          declaredTags,
          ({ Key, Value }) => Tuple.make(Key, Value),
        );
        yield* Effect.fail(
          new AwsResourceMappingFailed({
            typeName: definition.mapping.typeName,
            message: "Tag keys must be unique",
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(Record.size(tagValues) !== declaredTags.length),
          ),
        );
        const tags = yield* Schema.decodeEffect(definition.tagMapSchema)(
          tagValues,
        );
        const prepared: AwsResourceProperties = {
          properties,
          attributes,
          tags,
        };

        return prepared;
      });

      /**
       * The generatePhysicalName service method lets creation retries address
       * the same queue. Its digest includes the stack and create-only values so
       * separate stacks and replacement generations receive different names.
       */
      const generatePhysicalName = Effect.fn(
        "AwsResourceMapping.generatePhysicalName",
      )(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
        properties: AwsJsonRpcPayload,
      ) {
        const stackName = yield* ResourceCommandStackName;
        const owner = yield* Effect.fromOption(stackName);
        const createOnly = Record.filter(properties, (_, property) =>
          Arr.contains(definition.createOnlyProperties, property),
        );
        const seed = yield* Schema.encodeEffect(json)([
          owner,
          node.key.logicalId,
          definition.mapping.typeName,
          createOnly,
        ]);
        const hash = yield* digest.digestHex(
          Digest.sha256,
          new TextEncoder().encode(seed),
        );

        // The generatePhysicalName operation reserves room for the required
        // .fifo suffix within SQS's 80-character queue-name limit.
        const prefix = node.key.logicalId
          .replace(/[^a-zA-Z0-9_-]/g, "-")
          .substring(0, 40);
        const fifo = Option.fromUndefinedOr(
          definition.mapping.name.fifoProperty,
        ).pipe(Option.exists((property) => properties[property] === true));
        const suffix = Match.value(fifo).pipe(
          Match.when(true, () => ".fifo"),
          Match.orElse(() => ""),
        );
        const name: string = `${prefix}-${hash.substring(0, 24)}${suffix}`;

        return name;
      });

      /**
       * The physicalName service method preserves an application's explicit name
       * or derives a retry-stable name. Derivation requires the owning stack
       * supplied by core when it executes a planned mutation.
       */
      const physicalName = Effect.fn("AwsResourceMapping.physicalName")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          node: ResourceNode,
          properties: AwsJsonRpcPayload,
        ) {
          const name: string = yield* Record.get(
            properties,
            definition.mapping.name.property,
          ).pipe(
            Option.match({
              onSome: Schema.decodeUnknownEffect(Schema.NonEmptyString),
              onNone: () => generatePhysicalName(definition, node, properties),
            }),
          );

          return name;
        },
      );

      /**
       * The decodeResource service method reconstructs the resource that core
       * saves after an AWS read. Missing output aliases fail, and the complete
       * writable properties must satisfy the original Registry schema.
       */
      const decodeResource = Effect.fn("AwsResourceMapping.decodeResource")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          identity: string,
          attributes: AwsResourceAttributeValues,
          tags: AwsResourceAttributeValues,
        ) {
          // The decodeResource operation treats empty policy attributes as absent
          // properties because SQS uses an empty string to clear a policy.
          const selected = Record.filter(
            definition.mapping.attributes,
            ({ attribute }) =>
              Record.has(attributes, attribute) && attributes[attribute] !== "",
          );
          const values = yield* Effect.forEach(
            Record.toEntries(selected),
            Effect.fnUntraced(function* ([property, { attribute }]) {
              const value = attributes[attribute];
              const decoded = yield* Match.value(
                definition.encodings[property],
              ).pipe(
                Match.when("string", () => Effect.succeed(value)),
                Match.orElse(() => Schema.decodeEffect(json)(value)),
              );
              return Tuple.make(property, decoded);
            }),
          );
          const outputs = yield* Effect.forEach(
            Record.toEntries(definition.mapping.outputAttributes),
            Effect.fnUntraced(function* ([property, attribute]) {
              const value = yield* Schema.decodeUnknownEffect(
                Schema.NonEmptyString,
              )(attributes[attribute]);
              return Tuple.make(property, value);
            }),
          );

          // The decodeResource operation recovers QueueName from QueueUrl because
          // GetQueueAttributes omits the name. Effect codecs reject malformed URLs
          // and invalid URI escapes before the resource model is reconstructed.
          const url = yield* Schema.decodeEffect(Schema.URLFromString)(
            identity,
          );
          const segment = yield* Arr.last(url.pathname.split("/")).pipe(
            Effect.fromOption,
          );
          const decodedName = yield* Schema.decodeEffect(
            Schema.StringFromUriComponent,
          )(segment);
          const name = yield* Schema.decodeEffect(Schema.NonEmptyString)(
            decodedName,
          );
          const tagList = Arr.map(Record.toEntries(tags), ([Key, Value]) => ({
            Key,
            Value,
          }));
          const properties: AwsJsonRpcPayload = pipe(
            Record.fromEntries(values),
            Record.set(definition.mapping.name.property, name),
            Record.set(definition.mapping.tags.property, tagList),
          );
          yield* Schema.decodeUnknownEffect(
            Schema.toType(definition.propsSchema),
          )(properties);

          const projected = Record.union(
            properties,
            Record.fromEntries(outputs),
            (_, output) => output,
          );
          const resource: AwsJsonRpcPayload = Record.set(
            projected,
            definition.mapping.identity.property,
            identity,
          );
          const state: AwsResourceState = { resource, attributes, tags };

          return state;
        },
      );

      return {
        prepare,
        encodeAttributes,
        generatePhysicalName,
        physicalName,
        decodeResource,
        attributesMatch,
      };
    }),
  },
) {}

export const awsResourceMappingLayer = Layer.effect(
  AwsResourceMapping,
  AwsResourceMapping.make,
).pipe(Layer.provide(resourceModelLayer));
