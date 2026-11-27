# Inspect an operation through its trace

## Instrument the application

Read the operation and its caller. Put a root span around the work the caller waits for, including cleanup. Use named `Effect.fn` operations and `Effect.withSpan` to measure the work inside it. For a child process, include the wait for its exit. For a stream, measure consumption. Use `NomossTracingLive` in the application runtime so those spans share a trace and reach the collector.

Use `Effect.annotateCurrentSpan` to record the operation context needed to interpret the timing. Use log events for decisions and failures that help explain a span. Take elapsed times and parent relationships from the recorded spans.

Run the real operation and open its trace in Jaeger. Verify that the trace contains the expected root and child spans, and that the root outcome agrees with what the caller received. Record the trace ID and the durations that answer the timing question.

## Reproduce an operation

Choose the timing question and follow the [tracing contract](../application/tracing.md). For a performance fix, capture the baseline before changing the slow operation. Reproduce the same workload after the change and report the root duration, the affected span duration, and the trace IDs. Share the measured cause and new timings as they become available.

Jaeger's local OTLP HTTP receiver listens on port 4318. Open [Jaeger](http://127.0.0.1:16686) to inspect traces in the browser. If trace export fails, inspect the collector's service status and configured logs.

The queue example exports a plan trace without provider mutation:

```sh
OTEL_TRACES_EXPORTER=otlp \
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 \
OTEL_BSP_SCHEDULE_DELAY=1000 \
yarn nomoss queue diff
```

## Inspect Jaeger

Search Jaeger for the `nomoss` service and the reproduction interval. Open the completed trace and inspect the root operation, its children, and their durations.

For an apply trace, compare the root duration with the time spent in provider calls, retries, and confirmation. Check `AwsClient` retry events before attributing a delay to the transport or AWS. Compare action timestamps within a dependency batch to measure time spent waiting for earlier actions. After a change, repeat the same workflow and retain its cleanup.

Run lint on touched files, the configured Effect project compiler, and the existing behavior suites for the affected operation. Include validation results and trace evidence in the change review.
