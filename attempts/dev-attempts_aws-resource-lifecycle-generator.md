# AWS resource lifecycle generator

## Problem

- Issue 19, `Effect-native resource integration protocol`, led to work that showed resource integrations and bindings are not feasible to maintain when every AWS resource lifecycle is manually modeled.
- The current work needs a generator-led AWS resource lifecycle model that can derive basic resource contracts from external specifications while keeping Nomoss lifecycle behavior explicit and provider-backed.
- AWS execution currently depends on Distilled; research establishes a feasible path to generate an internal Cloud Control client from AWS's published API definitions.

## Rules / constraints

- CLI interactivity and live progress are out of scope; they belong to the separate CLI live-progress work.
- External specifications provide resource shape and metadata. Nomoss defines the lifecycle mapping, graph behavior, state contract, and Cloud Control execution path.
- Generated resource code must preserve schema-backed props, output references, lifecycle hints, and typed public contracts without duplicating manually assembled schemas.
- The selected client generation path is AWS Smithy JSON → Amazon's `smithy-jsonschema` converter → JSON Schema Draft 2020-12 → Effect `SchemaRepresentation` → typed HTTP operations executed through `HttpApiClient`. Operation metadata must generate the HTTP declarations alongside the request, response, and error definitions.
- Cloud Control uses AWS JSON RPC: `POST /`, `application/x-amz-json-1.0`, and `X-Amz-Target` select each operation. The generated client requires shared credential resolution, SigV4 signing, and AWS error interpretation in the existing Layer graph.
- CloudFormation Registry schemas continue to define resource properties and lifecycle hints. Smithy models define the Cloud Control API messages carrying those resource documents.
- Hands-off generation derives operations from published models. Broader AWS coverage requires shared support for each service's protocols, streaming, checksums, authentication, and request rules, with verification against AWS behavior.
- This work is organized locally for review only. Do not push branches, commits, or issues.

## Completed

- [x] Created a separate tracker for the generator and lifecycle-management scope, distinct from Issue 19 and the CLI live-progress work.
- [x] Renamed the local branch from `research/effect-cross-resource-integrations` to `aws-resources-generator`.
- [x] Drafted a separate issue and resource-management specification for review without creating or pushing a remote issue.
- [x] Identified the official [AWS Smithy JSON models](https://github.com/aws/api-models-aws), checked out Cloud Control under `refs/aws-api-models`, and checked out Amazon's JSON Schema and OpenAPI converters under `refs/smithy`.
- [x] Established that Amazon's JSON Schema conversion supplies Cloud Control request, response, and error definitions suitable for Effect's schema compiler and HTTP-client generation.
- [x] Identified the OpenAPI conversion requirement: Cloud Control selects operations by header while sharing one method and path, so automatic HTTP generation must preserve that RPC metadata.
- [x] Added `yarn generate:aws-resources`: Amazon's pinned converter and Effect generate typed requests, responses, errors, HTTP declarations, and RPC execution metadata for all eight Cloud Control operations from the official Smithy model.

## Remaining

- [ ] The generated Cloud Control client must supply authenticated AWS JSON RPC execution to `AwsCloudControlResourceLifecycle` and `AwsCloudControlRequestTracker`; implement credential resolution, regional request configuration, SigV4 signing, error decoding, pagination, cancellation, and retry behavior through the existing Layer graph, then connect both services to that client.
- [ ] `AwsResourceDefinitionCompiler` supplies generated resources to graph registration, planning, and persisted state; complete required-property preservation, typed output references, lifecycle-hint propagation, and provider-result validation so those consumers receive the resource contracts specified in `docs/aws-resource-lifecycle-management.md`.
- [ ] `ResourceStackLifecycle` currently reconciles generated AWS resources through desired-property discovery; use persisted Cloud Control identifiers for reads and explicit identifiers for import, and preserve correct resource state through creation, updates, missing-resource reconciliation, destruction, and provider failures.
