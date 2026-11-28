# Application tracing

A command or finite integration workflow has one root span for its entire lifetime. Service spans appear under the callers that invoked them. Distinct spans for local work, HTTP requests, retries, and provider waits let an operator locate a delay.

## Trace export

Applications install NomossTracingLive once in the shared runtime. It exports spans through Effect's native OTLP tracer with service.name=nomoss and a dedicated HTTP transport. The tracer flushes completed spans when the application scope closes. Optional Effect DevTools observe the same tracer under their existing configuration.

OTEL_TRACES_EXPORTER=otlp enables export when a collector address is configured. OTEL_EXPORTER_OTLP_ENDPOINT supplies the base URL. OTEL_EXPORTER_OTLP_TRACES_ENDPOINT supplies the complete traces URL when set. OTEL_SDK_DISABLED=true disables export. Effect's OtlpTracer and OtlpSerialization modules handle configuration, serialization, and batch export.

## Resource and operation context

Use Service.operation as the span name. For AWS, the service signing name and API operation produce names such as cloudcontrolapi.CreateResource. Effect composition preserves the established service spans and their parent relationships. Incidental calculations and state changes belong within the service span.

Downstream spans and events identify the resource by stack, logical id, and provider-qualified type. The service and lifecycle operation stay in scope through reads and persistence. Record the AWS API operation separately so a single resource creation distinguishes CreateResource from each GetResourceRequestStatus poll and the final GetResource.

Planned action counts on the stack span show the scale of the change. Each client span retains the AWS service and operation, from the first request preparation step until the client decodes the response. A request span reports region, HTTP status, and provider request identifier when available.

Application annotations exclude resource properties, command arguments, credentials, and uploaded object contents. An optional AWS attribute appears only if the request supplies it.

## Provider waits and retries

Each request retry records its attempt, cause, and backoff delay. An operator can compare those events with HTTP spans and provider progress to distinguish transport latency from retry delays and resource stabilization.

## Integration evidence

Instrumentation changes preserve the workflow's inputs and assertions. A completed Jaeger trace shows whether the expected spans reached the collector with their parent relationships, resource context, and elapsed times. [observability procedure](../operations/observability-sop.md)
