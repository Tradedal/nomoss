# Releasing Nomoss

The `release` workflow accumulates conventional commits on `main` into a release PR:

- `fix:` produces a patch release
- `feat:` produces a minor release
- `feat!:` or a `BREAKING CHANGE:` footer produces a major release

Merging that PR creates the GitHub release and publishes the package to npm.

The npm publisher uses GitHub Actions OpenID Connect and npm provenance. It has no npm token.

Configure npm Trusted Publishing for `Tradedal/nomoss` and the `release.yml` workflow before merging a release PR.
