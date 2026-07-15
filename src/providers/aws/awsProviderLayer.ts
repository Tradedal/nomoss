import * as Auth from "@distilled.cloud/aws/Auth";
import * as Credentials from "@distilled.cloud/aws/Credentials";
import * as Region from "@distilled.cloud/aws/Region";
import * as sqs from "@distilled.cloud/aws/sqs";
import { Context, Effect, Layer } from "effect";

import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodePath from "@effect/platform-node/NodePath";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

import {
  resourceGraphBuilderLayer,
  resourceModelLayer,
  resourcePlannerLayer,
  resourcePolicyLayer,
} from "../../core/runtimeLayer.js";
import { AwsApply } from "./awsApply.js";
import { BucketLifecycleService } from "./awsBucket.js";
import { BucketNotificationLifecycleService } from "./awsBucketNotification.js";
import { BucketNotificationResourcePolicy } from "./awsBucketNotificationResourcePolicy.js";
import { BucketResourcePolicy } from "./awsBucketResourcePolicy.js";
import { QueueLifecycleService } from "./awsQueue.js";
import { QueuePolicyLifecycleService } from "./awsQueuePolicy.js";
import { QueuePolicyResourcePolicy } from "./awsQueuePolicyResourcePolicy.js";
import { QueueResourcePolicy } from "./awsQueueResourcePolicy.js";
import { AwsReconciliation } from "./awsReconciliation.js";
import { AwsRefresh } from "./awsRefresh.js";
import { AwsResourceLifecycle } from "./awsResourceLifecycle.js";
import { AwsResourcePolicy } from "./awsResourcePolicy.js";
import { AwsResources } from "./awsResources.js";
import { AwsSqsTransport } from "./awsSqsTransport.js";
import { AwsTagging } from "./awsTagging.js";

const awsAuthRuntimeLayerLive = () =>
  Layer.effect(Auth.Auth, Auth.makeAuthService()).pipe(
    Layer.provideMerge(
      Layer.mergeAll(
        FetchHttpClient.layer,
        NodeFileSystem.layer,
        NodePath.layer,
      ),
    ),
  );

export const awsRuntimeLayerLive = Layer.mergeAll(
  Credentials.fromChain(),
  Region.fromEnv(),
  FetchHttpClient.layer,
);

export const awsRuntimeLayerSsoRegion = (profile: string, region: string) =>
  Layer.mergeAll(
    Credentials.fromSSO(profile).pipe(Layer.provide(awsAuthRuntimeLayerLive())),
    Layer.succeed(Region.Region, Effect.succeed(region)),
    FetchHttpClient.layer,
  );

const awsSqsTransportLayerLive = (awsRuntimeLayer = awsRuntimeLayerLive) =>
  Layer.effect(
    AwsSqsTransport,
    Effect.gen(function* () {
      const distilledCreateQueue = yield* sqs.createQueue;
      const distilledDeleteQueue = yield* sqs.deleteQueue;
      const distilledGetQueueAttributes = yield* sqs.getQueueAttributes;
      const distilledGetQueueUrl = yield* sqs.getQueueUrl;
      const distilledListQueueTags = yield* sqs.listQueueTags;

      return {
        createQueue: (request: sqs.CreateQueueRequest) =>
          distilledCreateQueue(request).pipe(Effect.provide(awsRuntimeLayer)),
        deleteQueue: (request: sqs.DeleteQueueRequest) =>
          distilledDeleteQueue(request).pipe(Effect.provide(awsRuntimeLayer)),
        getQueueAttributes: (request: sqs.GetQueueAttributesRequest) =>
          distilledGetQueueAttributes(request).pipe(
            Effect.provide(awsRuntimeLayer),
          ),
        getQueueUrl: (request: sqs.GetQueueUrlRequest) =>
          distilledGetQueueUrl(request).pipe(Effect.provide(awsRuntimeLayer)),
        listQueueTags: (request: sqs.ListQueueTagsRequest) =>
          distilledListQueueTags(request).pipe(Effect.provide(awsRuntimeLayer)),
      };
    }).pipe(Effect.provide(awsRuntimeLayer)),
  );

export const awsBucketLifecycleLayerLive = Layer.effect(
  BucketLifecycleService,
  BucketLifecycleService.make,
);

export const awsQueueLifecycleLayerLive = Layer.effect(
  QueueLifecycleService,
  QueueLifecycleService.make,
);

export const awsQueuePolicyLifecycleLayerLive = Layer.effect(
  QueuePolicyLifecycleService,
  QueuePolicyLifecycleService.make,
);

export const awsBucketNotificationLifecycleLayerLive = Layer.effect(
  BucketNotificationLifecycleService,
  BucketNotificationLifecycleService.make,
);

export const awsTaggingLayerLive = Layer.effect(AwsTagging, AwsTagging.make);

export const awsProviderLifecycleLayerLive = Layer.mergeAll(
  awsBucketLifecycleLayerLive,
  awsQueueLifecycleLayerLive,
  awsQueuePolicyLifecycleLayerLive,
  awsBucketNotificationLifecycleLayerLive,
).pipe(Layer.provide(awsSqsTransportLayerLive()));

export const awsBucketResourcePolicyLayerLive = Layer.effect(
  BucketResourcePolicy,
  BucketResourcePolicy.make,
).pipe(
  Layer.provideMerge(awsBucketLifecycleLayerLive),
  Layer.provideMerge(awsTaggingLayerLive),
  Layer.provideMerge(resourceModelLayer),
  Layer.provideMerge(resourcePolicyLayer),
);

export const awsQueueResourcePolicyLayerLive = (
  awsRuntimeLayer = awsRuntimeLayerLive,
) =>
  Layer.effect(QueueResourcePolicy, QueueResourcePolicy.make).pipe(
    Layer.provideMerge(
      Layer.provide(
        awsQueueLifecycleLayerLive,
        awsSqsTransportLayerLive(awsRuntimeLayer),
      ),
    ),
    Layer.provideMerge(awsTaggingLayerLive),
    Layer.provideMerge(resourceModelLayer),
    Layer.provideMerge(resourcePolicyLayer),
  );

export const awsQueuePolicyResourcePolicyLayerLive = Layer.effect(
  QueuePolicyResourcePolicy,
  QueuePolicyResourcePolicy.make,
).pipe(
  Layer.provideMerge(awsQueuePolicyLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
  Layer.provideMerge(resourcePolicyLayer),
);

export const awsBucketNotificationResourcePolicyLayerLive = Layer.effect(
  BucketNotificationResourcePolicy,
  BucketNotificationResourcePolicy.make,
).pipe(
  Layer.provideMerge(awsBucketNotificationLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
  Layer.provideMerge(resourcePolicyLayer),
);

export const awsResourcePolicyLayerLive = (
  awsRuntimeLayer = awsRuntimeLayerLive,
) =>
  Layer.effect(AwsResourcePolicy, AwsResourcePolicy.make).pipe(
    Layer.provideMerge(
      Layer.mergeAll(
        awsBucketResourcePolicyLayerLive,
        awsQueueResourcePolicyLayerLive(awsRuntimeLayer),
        awsQueuePolicyResourcePolicyLayerLive,
        awsBucketNotificationResourcePolicyLayerLive,
      ),
    ),
  );

export const awsResourceLifecycleLayerLive = Layer.effect(
  AwsResourceLifecycle,
  AwsResourceLifecycle.make,
).pipe(Layer.provideMerge(awsResourcePolicyLayerLive()));

export const awsApplyLayerLive = Layer.effect(AwsApply, AwsApply.make).pipe(
  Layer.provideMerge(awsResourceLifecycleLayerLive),
  Layer.provideMerge(resourcePlannerLayer),
);

export const awsRefreshLayerLive = Layer.effect(
  AwsRefresh,
  AwsRefresh.make,
).pipe(
  Layer.provideMerge(awsResourceLifecycleLayerLive),
  Layer.provideMerge(resourcePolicyLayer),
);

export const awsReconciliationLayerLive = Layer.effect(
  AwsReconciliation,
  AwsReconciliation.make,
).pipe(Layer.provideMerge(awsResourceLifecycleLayerLive));

export const awsDecisionLayerLive = Layer.mergeAll(
  awsApplyLayerLive,
  awsRefreshLayerLive,
  awsReconciliationLayerLive,
);

export const awsResourcesLayerLive = Layer.effect(
  AwsResources,
  AwsResources.make,
).pipe(Layer.provideMerge(resourceGraphBuilderLayer));

/**
 * Provider runtimes select one of these layers to choose live credentials,
 * SSO credentials, or SSO credentials with an explicit region.
 */
export class AwsProviderRuntime extends Context.Service<AwsProviderRuntime>()(
  "nomoss/providers/aws/awsProviderLayer/AwsProviderRuntime",
  {
    make: Effect.gen(function* () {
      const runtimeLayerSso = (profile: string) =>
        Layer.mergeAll(
          Credentials.fromSSO(profile).pipe(
            Layer.provide(awsAuthRuntimeLayerLive()),
          ),
          Region.fromEnv(),
          FetchHttpClient.layer,
        );
      return {
        providerLayerLive: awsProviderLifecycleLayerLive,
        bucketLifecycleLayerLive: awsBucketLifecycleLayerLive,
        queueLifecycleLayerLive: awsQueueLifecycleLayerLive,
        queuePolicyLifecycleLayerLive: awsQueuePolicyLifecycleLayerLive,
        bucketNotificationLifecycleLayerLive:
          awsBucketNotificationLifecycleLayerLive,
        taggingLayerLive: awsTaggingLayerLive,
        bucketResourcePolicyLayerLive: awsBucketResourcePolicyLayerLive,
        queueResourcePolicyLayerLive: awsQueueResourcePolicyLayerLive,
        queuePolicyResourcePolicyLayerLive:
          awsQueuePolicyResourcePolicyLayerLive,
        bucketNotificationResourcePolicyLayerLive:
          awsBucketNotificationResourcePolicyLayerLive,
        resourcePolicyLayerLive: awsResourcePolicyLayerLive,
        resourceLifecycleLayerLive: awsResourceLifecycleLayerLive,
        applyLayerLive: awsApplyLayerLive,
        refreshLayerLive: awsRefreshLayerLive,
        reconciliationLayerLive: awsReconciliationLayerLive,
        decisionLayerLive: awsDecisionLayerLive,
        resourcesLayerLive: awsResourcesLayerLive,
        runtimeLayerLive: awsRuntimeLayerLive,
        runtimeLayerSso,
        runtimeLayerSsoRegion: awsRuntimeLayerSsoRegion,
        resourceLayerLive: awsProviderLifecycleLayerLive.pipe(
          Layer.provideMerge(awsRuntimeLayerLive),
        ),
        resourceLayerSso: (profile: string) =>
          awsProviderLifecycleLayerLive.pipe(
            Layer.provideMerge(runtimeLayerSso(profile)),
          ),
        resourceLayerSsoRegion: (profile: string, region: string) =>
          awsProviderLifecycleLayerLive.pipe(
            Layer.provideMerge(awsRuntimeLayerSsoRegion(profile, region)),
          ),
      };
    }),
  },
) {}
