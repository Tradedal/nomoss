import type * as SQS from "@distilled.cloud/aws/sqs";
import {
  Array as Arr,
  Effect,
  Layer,
  Match,
  Option,
  Ref,
  Schema,
} from "effect";

import type { Effect as EffectType } from "effect/Effect";
import * as FastCheck from "effect/testing/FastCheck";

import { AwsSqsTransport } from "../../src/providers/aws/awsSqsTransport.js";

/**
 * Provider tests script Distilled SQS responses through this ADT while keeping
 * lifecycle and resource-policy services real.
 */
type AwsSqsTransportFixtureStep =
  | {
      readonly _tag: "CreateQueue";
      readonly respond: (
        request: SQS.CreateQueueRequest,
      ) => EffectType<SQS.CreateQueueResult, SQS.CreateQueueError>;
    }
  | {
      readonly _tag: "GetQueueAttributes";
      readonly respond: (
        request: SQS.GetQueueAttributesRequest,
      ) => EffectType<
        SQS.GetQueueAttributesResult,
        SQS.GetQueueAttributesError
      >;
    }
  | {
      readonly _tag: "GetQueueUrl";
      readonly respond: (
        request: SQS.GetQueueUrlRequest,
      ) => EffectType<SQS.GetQueueUrlResult, SQS.GetQueueUrlError>;
    }
  | {
      readonly _tag: "ListQueueTags";
      readonly respond: (
        request: SQS.ListQueueTagsRequest,
      ) => EffectType<SQS.ListQueueTagsResult, SQS.ListQueueTagsError>;
    }
  | {
      readonly _tag: "DeleteQueue";
      readonly respond: (
        request: SQS.DeleteQueueRequest,
      ) => EffectType<SQS.DeleteQueueResponse, SQS.DeleteQueueError>;
    };

type AwsSqsTransportFixtureStepTag = AwsSqsTransportFixtureStep["_tag"];
type StepFor<Tag extends AwsSqsTransportFixtureStepTag> = Extract<
  AwsSqsTransportFixtureStep,
  { readonly _tag: Tag }
>;

const fixtureProtocolDefect = (message: string) =>
  new Error(`AWS SQS transport fixture protocol violation: ${message}`);

/**
 * Fixture scripts fail fast on wrong operation order while preserving scripted
 * provider failures as typed transport errors.
 */
const takeStep = <Tag extends AwsSqsTransportFixtureStepTag>(
  stepsRef: Ref.Ref<ReadonlyArray<AwsSqsTransportFixtureStep>>,
  expected: Tag,
) =>
  Effect.gen(function* () {
    const taken = yield* Ref.modify(stepsRef, (steps) =>
      Arr.matchLeft(steps, {
        onEmpty: () =>
          [Option.none<AwsSqsTransportFixtureStep>(), steps] as const,
        onNonEmpty: (head, tail) =>
          Match.value(head._tag === expected).pipe(
            Match.when(true, () => [Option.some(head), tail] as const),
            Match.orElse(
              () => [Option.none<AwsSqsTransportFixtureStep>(), steps] as const,
            ),
          ),
      }),
    );

    return yield* Option.match(taken, {
      onNone: () =>
        Effect.die(
          fixtureProtocolDefect(`expected next operation ${expected}`),
        ),
      onSome: (step) => Effect.succeed(step as StepFor<Tag>),
    });
  });

/**
 * Tests use this as a typed response base before pinning the semantic fields
 * that matter to a provider scenario.
 */
export const sampleFromSchema = <S extends Schema.Top>(schema: S): S["Type"] =>
  Option.getOrThrow(Arr.head(FastCheck.sample(Schema.toArbitrary(schema), 1)));

/**
 * Provider tests replace only `AwsSqsTransport` so ordered external responses
 * run against the real lifecycle, policy, reconciliation, and apply services.
 */
export const AwsSqsTransportFixture = {
  createQueue: (
    respond: StepFor<"CreateQueue">["respond"],
  ): AwsSqsTransportFixtureStep => ({ _tag: "CreateQueue", respond }),
  deleteQueue: (
    respond: StepFor<"DeleteQueue">["respond"],
  ): AwsSqsTransportFixtureStep => ({ _tag: "DeleteQueue", respond }),
  getQueueAttributes: (
    respond: StepFor<"GetQueueAttributes">["respond"],
  ): AwsSqsTransportFixtureStep => ({ _tag: "GetQueueAttributes", respond }),
  getQueueUrl: (
    respond: StepFor<"GetQueueUrl">["respond"],
  ): AwsSqsTransportFixtureStep => ({ _tag: "GetQueueUrl", respond }),
  listQueueTags: (
    respond: StepFor<"ListQueueTags">["respond"],
  ): AwsSqsTransportFixtureStep => ({ _tag: "ListQueueTags", respond }),
  /** Builds an `AwsSqsTransport` layer from an ordered fixture script. */
  layer: (steps: ReadonlyArray<AwsSqsTransportFixtureStep>) =>
    Layer.effect(
      AwsSqsTransport,
      Effect.gen(function* () {
        const stepsRef = yield* Ref.make(steps);

        return {
          createQueue: (request) =>
            takeStep(stepsRef, "CreateQueue").pipe(
              Effect.flatMap((step) => step.respond(request)),
            ),
          deleteQueue: (request) =>
            takeStep(stepsRef, "DeleteQueue").pipe(
              Effect.flatMap((step) => step.respond(request)),
            ),
          getQueueAttributes: (request) =>
            takeStep(stepsRef, "GetQueueAttributes").pipe(
              Effect.flatMap((step) => step.respond(request)),
            ),
          getQueueUrl: (request) =>
            takeStep(stepsRef, "GetQueueUrl").pipe(
              Effect.flatMap((step) => step.respond(request)),
            ),
          listQueueTags: (request) =>
            takeStep(stepsRef, "ListQueueTags").pipe(
              Effect.flatMap((step) => step.respond(request)),
            ),
        } satisfies AwsSqsTransport["Service"];
      }),
    ),
};
