# Releasing Nomoss

The `release` workflow is started manually from `main`. It calculates the next version from conventional commits:

- `fix:` produces a patch release
- `feat:` produces a minor release
- `feat!:` or a `BREAKING CHANGE:` footer produces a major release

It builds the release, publishes the package to npm, then creates the Git tag and GitHub release.

The npm publisher uses GitHub Actions OpenID Connect and npm provenance. It has no npm token or repository flag.

Before the first release, npm must trust the `Tradedal/nomoss` repository's `release.yml` workflow for the `nomoss` package.
