# CLI workflow and progress

## Problem

Separate stack commands and provide live progress and structured failure diagnostics under the [CLI contract](../docs/application/cli-workflow.md).

## Rules / constraints

Share one Effect graph. Preserve prepared-plan APIs, application-selected providers and regions, and help/version without valid provider configuration. Use typed progress state, scoped fibers, Effect time, and existing platform facilities. Keep AWS authentication and address resolution in the [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md).

## Completed

- [x] Reusable CLI commands and installed version.
- [x] Declaration isolation and retained prepared graphs.
- [x] Saved action progress and plan invalidation before mutation.
- [x] Plan, action-start, and final-result rendering.

## Remaining

- [ ] Replace the shared create/update handler in nomossCliCommand with distinct stack operations through ResourceStackOperations, expose deletion as delete, and align help text.
- [ ] Replace prepared declarations and output callbacks in ResourceStackDefinition with application Effect returns under the [output guide](../docs/application/resource-outputs.md), keeping registration and preparation inside the engine.
- [ ] Move terminal output from ResourceStackOperations to StackWorkflowRenderer for shared CLI and embedded execution.
- [ ] Replace default error output in the command script with stack, resource, operation, and typed provider diagnostics; define failure and interruption exit behavior.
- [ ] Publish resource, operation, and timestamped progress from ResourceStackLifecycle and AwsCloudControlRequestTracker for starts, acceptance, waits, model reads, and final outcomes; run independent actions with bounded concurrency and preserve prerequisites.
- [ ] Add provider messages, elapsed time, and stable terminal rows to StackWorkflowRenderer; append equivalent plain redirected records without color or cursor controls and retain final outcomes and diagnostics.
- [ ] Add deterministic transitions and clocks to the shared application fixture for concurrent actions, prerequisites, provider waits, terminal updates, redirected output, and interruption cleanup.
