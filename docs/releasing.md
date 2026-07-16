# Releasing Nomoss

Release Please manages Nomoss versions from conventional commits merged into `main`:

- `fix:` produces a patch release
- `feat:` produces a minor release
- `feat!:` or a `BREAKING CHANGE:` footer produces a major release

The release workflow maintains the version in `package.json` and `.projenrc.ts`, updates `CHANGELOG.md`, creates the Git tag, and creates the GitHub release.

npm publication is disabled by default. Before enabling it:

1. Create or claim the public `nomoss` package on npm.
2. Configure npm trusted publishing for `Tradedal/nomoss` and `.github/workflows/publish.yml`.
3. Set the GitHub repository variable `NPM_PUBLISH_ENABLED` to `true`.

Published packages use npm provenance through GitHub's OpenID Connect token. No npm token is stored in the repository.
