# AWS SDK package

## Tracker maintenance

Keep this section at the top of the tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as work progresses.

## Scope statement

Nomoss currently publishes a package for each generated AWS client, plus shared execution and credentials packages. Publish one SDK with per-service imports. The SDK must run independently of the Nomoss stack engine.

## Direction

Use the existing Effect client, credential providers, and Signature Version 4 signer. Keep the Smithy operation contracts and the stack resource declarations in their existing roles.

Nomoss and applications that call AWS directly should import the same SDK. Release Please should set its version in the release PR.

## Completed work

- [x] The existing client runs AWS operations through shared Effect services for configuration, credentials, signing, requests, and response decoding.
- [x] The `@nomoss/aws` package contains the generated service clients and shared runtime. Its README shows a direct STS call and explains how the SDK selects credentials and signs requests.

## Tasks

- [ ] Verify the trusted publisher connection on the first release run. Approve the staged SDK in npm before approving the Nomoss release that depends on it.

## References

[AWS provider](../providers/aws/README.md) · [Release procedure](../docs/operations/releasing.md) · [Distilled AWS package exports](../refs/distilled/packages/aws/package.json)
