# S3 upload events

The `upload-events` resource program connects the `Uploads` S3 bucket to the `UploadEvents` SQS queue. `UploadEventsPolicy` permits S3 to publish messages to the queue. `UploadEventsNotification` routes S3 object-created events to that queue.

The program lives in [`src/providers/aws/sampleStack.ts`](../../src/providers/aws/sampleStack.ts). The `Uploads` bucket sets `forceDestroy`, so `nomoss destroy` removes its objects and the bucket. Use a non-production AWS account for this demo.

## Inspect the resource program

`nomoss graph` prints the dependency graph. `nomoss plan` derives the execution batches from the graph and local Nomoss state. `nomoss list` prints the declared resources.

```sh
nomoss graph --stack upload-events
nomoss plan --stack upload-events
nomoss list --stack upload-events
```

## Plan

With no saved resource state, `nomoss plan --stack upload-events` returns this plan. The `diff` fence colors each `Create` action on GitHub.

```diff
batch 0: 0
+ Create aws:s3:bucket/Uploads 1
+ Create aws:sqs:queue/UploadEvents 2
batch 1: 0
+ Create aws:sqs:queue-policy/UploadEventsPolicy 1
batch 2: 0
+ Create aws:s3:bucket-notification/UploadEventsNotification 1
```

## Apply to AWS

The AWS SSO profile must permit S3 and SQS resource creation and deletion. Replace `my-profile` with that profile name.

```sh
nomoss diff --stack upload-events --profile my-profile
nomoss create --stack upload-events --profile my-profile
nomoss destroy --stack upload-events --profile my-profile
```

`nomoss diff` reads live AWS state. `nomoss create` applies the resource plan. `nomoss destroy` removes the demo resources.
