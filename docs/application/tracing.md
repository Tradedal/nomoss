# Application tracing

Each command or finite integration workflow must have one root span that lasts for the complete operation. Service spans must appear beneath their actual callers so an operator can follow the request and explain its outcome. Separate local execution, HTTP requests, retries, and provider waits so their durations show where the operation spent its time.

## Trace export

Applications must install NomossTracingLive once in their shared runtime. That Layer must export spans through Effect's native OTLP tracer with service.name=nomoss and a separate HTTP transport for telemetry. The tracer must flush completed spans when the application scope ends. Optional Effect DevTools must observe the same tracer under its existing configuration.

OTEL_TRACES_EXPORTER=otlp and an OTLP endpoint enable export. OTEL_EXPORTER_OTLP_ENDPOINT sets the collector's base URL; OTEL_EXPORTER_OTLP_TRACES_ENDPOINT sets a complete traces URL when supplied. OTEL_SDK_DISABLED=true disables export. Effect's OtlpTracer and OtlpSerialization modules must handle configuration, serialization, and batching.

## Resource and operation context

Name spans as Service.operation so the trace names the operation it measures. Generated AWS requests use the service signing name and API operation, such as cloudcontrolapi.CreateResource. Effect composition must preserve parent relationships and retain established service spans. Incidental calculations and state changes do not require separate spans.

Carry the resource's stack, logical id, provider, service, type, and lifecycle operation into downstream spans and events. Reads must retain that context too, so an operator can follow one resource through command execution and persistence. Record the AWS API operation separately. One resource creation can invoke CreateResource, repeated GetResourceRequestStatus requests, and GetResource, and the trace must distinguish those calls.

Stack spans must record planned action counts so the amount of work is visible. AWS service and operation context must continue through payload preparation, credentials, signing, transport, and response decoding. Request spans must include the region, HTTP status, and provider request identifier when available. AWS CLI spans must include service, operation, region, and process exit status.

Resource properties, command arguments, credentials, and uploaded object contents must stay out of application annotations. An optional AWS attribute must be omitted when the request does not supply it.

## Provider waits and retries

Cloud Control events must report provider status and requested retry timestamps. Each poll wait must record its actual delay in milliseconds so the trace shows the time between observations. Use the five-second [AWS CLI waiter interval](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/wait/resource-request-success.html) so Nomoss can observe completion before a later provider retry timestamp when possible.

Request retries must report the attempt, cause, and backoff delay. Together with HTTP spans and provider progress events, these records must let an operator distinguish retry delays from transport latency and resource stabilization.

## Integration evidence

The live S3-to-SQS trace must include declaration, all three apply passes, reconciliation, notification delivery, destruction, and final absence checks. The root must identify the unique stack and AWS region and stay active until cleanup finishes after success or failure. Integration workflows must use the same tracing Layer as application commands.

Changes to instrumentation must preserve the integration inputs and assertions. To validate those changes, run the existing provider and lifecycle tests and inspect a completed Jaeger trace for exported spans, parent relationships, resource context, and elapsed time. The [observability procedure](../operations/observability-sop.md) explains how to reproduce and inspect that trace.
