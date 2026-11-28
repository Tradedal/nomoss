# Release Nomoss

The `release` workflow accumulates conventional commits on `main` into a release PR. Use a `fix:` subject for a patch release and `feat:` for a minor release. A `feat!:` subject or a `BREAKING CHANGE:` footer produces a major release.

The [AWS client packages](../../providers/aws/README.md) use the Nomoss release version. After a release PR merges, the workflow sets the workspace versions, checks the project, and packs every public workspace before publishing. Yarn resolves workspace dependencies to version ranges in the archives and schedules publication so each package's workspace dependencies publish first. The archives are in `$RUNNER_TEMP/nomoss-release` on the release runner.

Configure npm publishing for every package before enabling the release workflow. The workflow uses GitHub Actions OpenID Connect and npm provenance. Use the package list in [tools/awsClientPackages.ts](../../tools/awsClientPackages.ts) when setting up registry access for `Tradedal/nomoss` and `release.yml`.
