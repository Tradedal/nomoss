# Release Nomoss

The `release` workflow accumulates conventional commits on `main` into a release PR. Use a `fix:` subject for a patch release and `feat:` for a minor release. A `feat!:` subject or a `BREAKING CHANGE:` footer produces a major release.

After a release PR merges, the workflow sets `@nomoss/aws` to the Nomoss release version, checks the project, and packs both packages. Yarn writes the SDK version range into the Nomoss archive so npm knows which SDK to install. The workflow submits the archives to npm for review using `npm stage publish`.

In the npm settings for `@nomoss/aws` and `nomoss`, grant `Tradedal/nomoss` permission to run `npm stage publish` from `release.yml`. The workflow authenticates to npm through GitHub Actions OpenID Connect.

Approve `@nomoss/aws` first in npm's **Staged Packages** tab. Once that SDK version is available, approve `nomoss` so users can install it with its SDK dependency.
