# Release Nomoss

The `release` workflow accumulates conventional commits on `main` into a release PR. Use a `fix:` subject for a patch release and `feat:` for a minor release. A `feat!:` subject or a `BREAKING CHANGE:` footer produces a major release.

Before you merge a release PR, configure npm Trusted Publishing for `Tradedal/nomoss` and the `release.yml` workflow. The publisher authenticates through GitHub Actions OpenID Connect and includes npm provenance, so it does not need an npm token. After the merge, the workflow creates the GitHub release and publishes the package to npm.
