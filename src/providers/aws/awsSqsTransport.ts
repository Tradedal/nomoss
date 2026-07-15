import type * as SQS from "@distilled.cloud/aws/sqs";
import * as sqs from "@distilled.cloud/aws/sqs";
import { Context, Effect } from "effect";

/**
 * Queue lifecycle code reaches Distilled SQS through this adapter so tests can
 * replace external responses without replacing lifecycle or policy services.
 */
export class AwsSqsTransport extends Context.Service<AwsSqsTransport>()(
  "nomoss/providers/aws/awsSqsTransport",
  {
    make: Effect.gen(function* () {
      const distilledCreateQueue = yield* sqs.createQueue;
      const distilledDeleteQueue = yield* sqs.deleteQueue;
      const distilledGetQueueAttributes = yield* sqs.getQueueAttributes;
      const distilledGetQueueUrl = yield* sqs.getQueueUrl;
      const distilledListQueueTags = yield* sqs.listQueueTags;

      return {
        createQueue: (request: SQS.CreateQueueRequest) =>
          distilledCreateQueue(request),
        deleteQueue: (request: SQS.DeleteQueueRequest) =>
          distilledDeleteQueue(request),
        getQueueAttributes: (request: SQS.GetQueueAttributesRequest) =>
          distilledGetQueueAttributes(request),
        getQueueUrl: (request: SQS.GetQueueUrlRequest) =>
          distilledGetQueueUrl(request),
        listQueueTags: (request: SQS.ListQueueTagsRequest) =>
          distilledListQueueTags(request),
      };
    }),
  },
) {}
