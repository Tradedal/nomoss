# AWS client packages and resource layout

## Tracker maintenance

Move a task to Completed work after its acceptance check passes. Keep decisions about package names, dependencies, and source locations here until the contributor guide explains the resulting layout.

## Scope statement

Publish one installable package per AWS service client. Keep the generated clients and stack resource declarations together under the AWS provider, with the handwritten request and lifecycle code outside the generated directory. The [IAM management tracker](dev-attempts_aws-iam-resource-management.md) covers resource behavior.

## Direction

An application that only needs to call IAM should be able to install the IAM client and its shared request dependencies. The client package must work without the stack engine or unrelated service clients. Nomoss should use those same packages to execute native AWS resource operations. The [AWS SDK layout](../refs/aws-sdk-js-v3/README.md#high-level-concepts) is the reference for one package per service. Alchemy's [workspace](../refs/alchemy/pnpm-workspace.yaml) and [AWS package](../refs/alchemy/packages/aws/package.json) show how to keep package manifests and published exports explicit.

Give contributors one documented starting point per AWS service. An IAM example should show where to select an API operation and where to find the generated client and the TypeScript an application uses to declare an IAM group. From that same starting point, a contributor should find the mapping that tells Nomoss how to manage the group, the access key workflow, and the IAM integration cases.

## Completed work

- [x] Organize the AWS implementation under [providers/aws](../providers/aws/README.md). Generate the client modules and stack resource declarations under `generated/` within that provider. Keep the shared request code, lifecycle mappings, and custom workflows in handwritten modules. Existing stack resource imports resolve to the relocated declarations. Direct AWS API calls use the client package imports.
- [x] Generate all six service packages and all 27 AWS stack resource declarations. Regeneration reproduces the same TypeScript and removes the intermediate OpenAPI files. AWS integration cases still verify IAM User, Group, Role, and AccessKey and exercise the SQS client directly.
- [x] Install the packed IAM and SQS clients in separate clean projects. IAM reads a role and SQS lists queues without installing Nomoss. The packed Nomoss application imports its AWS runtime and IAM group declaration, and the archive excludes the reference checkouts.

## Tasks

- [ ] Configure registry access and publish through the [release workflow](../docs/operations/releasing.md). Verify that the published IAM and SQS packages install separately through npm and that Nomoss installs with the IAM package as a dependency.
