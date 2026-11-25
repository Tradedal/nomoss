# Documentation

## Application

Start with the [engine design](application/engine-design.md) for Nomoss requirements and the [CLI specification](application/cli-workflow.md) for stack commands. The [resource graph](application/resource-graph.md) explains how declarations record dependencies. The [lifecycle requirements](application/resource-lifecycle-tracker.md) and [command protocol](application/resource-command-policy-stage.md) describe how Nomoss executes changes and saves the result. The [output API](application/resource-outputs.md) defines how applications obtain resource values across runs.

For provider generation, read the [generation architecture](application/generation-architecture.md) and [resource mapping specification](application/resource-mapping.md). The [resource lifecycle requirements](application/resource-operations.md) describe generated operations and the behavior that still needs handwritten policies. The [AWS execution contract](application/aws-resource-lifecycle-management.md) specifies how AWS resource operations run. The [trace contract](application/tracing.md) defines the telemetry used to inspect execution.

## Development process

Create and maintain development trackers with the [tracker template](../attempts/tracker-template.md). It defines how to capture scope, direction, delivered outcomes, and the work that remains.

Use the [Effect development guide](development/effect-native-development.md) when implementing services. Follow the [code documentation contract](development/code-documentation.md) for source comments and the [specification guide](development/spec-writing.md) for requirements. Review documentation with the [remediation checklist](development/review-docs.md) and [writing guidance](development/unslop.md).

Use the [test contract](development/testing.md) to select behavior coverage and the [graph test approach](development/resource-graph-testing-approach.md) when testing resource dependencies. Run checks according to the [lint workflow](development/linting.md). Complete changes under the [review contract](development/review-remediation-spec.md) and write commits under the [commit message specification](development/commit-message-spec.md).

## Operational procedures

Use [the observability procedure](operations/observability-sop.md) to reproduce an operation and inspect its Jaeger trace. Follow [the release procedure](operations/releasing.md) to configure package publication and complete a release.
