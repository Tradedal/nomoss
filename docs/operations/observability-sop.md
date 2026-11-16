# Inspect an operation through its trace

## Reproduce an operation

Choose the application operation and the timing question its trace must answer. Read its caller, complete service implementation, and cleanup path, then apply the [tracing contract](../application/tracing.md) through the shared application runtime. Use named Effect.fn and Effect.withSpan operations to record spans with their actual parent relationships. Add safe domain context through Effect.annotateCurrentSpan and use Effect logs to record events on the active span.

Jaeger's local OTLP HTTP receiver listens on port 4318. Open [Jaeger](http://127.0.0.1:16686) to inspect traces in the browser. If trace export fails, inspect the collector's service status and configured logs.

The queue example exports a plan trace without provider mutation:

```sh
OTEL_TRACES_EXPORTER=otlp \
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 \
OTEL_BSP_SCHEDULE_DELAY=1000 \
yarn nomoss diff
```

The live integration creates and removes uniquely named AWS resources. Select the authorized account and region explicitly. Record the reproduction time, keep the process active until cleanup and exporter shutdown finish, and retain the test result separately from the tracker.

```sh
AWS_PROFILE=your-integration-profile AWS_REGION=us-east-1 \
OTEL_TRACES_EXPORTER=otlp \
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 \
OTEL_BSP_SCHEDULE_DELAY=1000 \
yarn test:integration:aws
```

## Inspect Jaeger

Search Jaeger for service nomoss, operation UploadEventsIntegration.run, and the reproduction interval. Open the completed trace and inspect its parent relationships and span details. Jaeger's /api/v3/traces/{trace_id} endpoint also provides the trace for programmatic inspection.

Compare the root's elapsed time with the time the workflow spends in each apply pass, in reconciliation and destruction, and as it polls for notifications. Read AwsCloudControlRequestTracker.awaitResourceRequest events to determine the provider status, retry timestamps, and poll_delay_ms. Compare those waits with CloudControl operation spans and their HTTP children. Check AwsClient retry events before you conclude that transport or provider throttling caused a delay.

After deletion, the workflow's final reads intentionally receive ResourceNotFoundException from Cloud Control to establish that the resources are absent. The HTTP request span reports that provider failure. AwsCloudControlResourceLifecycle.readResource accepts the same response as proof that the object is absent. Inspect the enclosing resource read and root outcome to determine whether Jaeger's error flag indicates an expected absence check or a failed workflow.

ResourceStackLifecycle executes actions within each dependency batch sequentially. Compare action timestamps to measure how much time that sequence adds. Any proposed change must preserve dependency order and wait for Cloud Control stabilization. Establish the cause from the trace before you change the poll interval or execution concurrency. After a change, repeat the same workflow with its assertions and cleanup intact.

Run lint on touched files, the configured Effect project compiler, and the existing behavior suites for the affected operation. Include validation results and trace evidence in the change review.
