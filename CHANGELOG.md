# Changelog

## [0.0.3](https://github.com/Tradedal/nomoss/compare/v0.0.2...v0.0.3) (2026-07-18)


### Features

* initialize nomoss ([3aa58e5](https://github.com/Tradedal/nomoss/commit/3aa58e5450af31e33e4aaa8169e6b79f58dc908a))


### Bug Fixes

* configure generated build workflow ([4224b70](https://github.com/Tradedal/nomoss/commit/4224b70ffbccc7c75f2129c04d0dea9075142eea))
* enable Corepack before Yarn workflow commands ([4e209f0](https://github.com/Tradedal/nomoss/commit/4e209f0ee8903ce26de6a989291a0fd648be88fa))
* generate named Nomoss executable ([a173e29](https://github.com/Tradedal/nomoss/commit/a173e291b3299504eda775e1536bd3bb582cfa28))
* generate valid release please configuration ([5f1a50d](https://github.com/Tradedal/nomoss/commit/5f1a50d69ae8db3b22a56e5d4c427f77bdf97248))
* generate valid release please configuration ([377dd1b](https://github.com/Tradedal/nomoss/commit/377dd1b84d5f510e4f850cb596c5d3c9ca2177f1))
* make provider reconciliation explicit ([79a11b9](https://github.com/Tradedal/nomoss/commit/79a11b96098172f831fdb6073a79cac98e7d72a7))
* make provider reconciliation explicit ([8b5a6ba](https://github.com/Tradedal/nomoss/commit/8b5a6ba564832369f706057f7f9c41fd47b6e235))
* run Projen build from TypeScript config ([0f1e08f](https://github.com/Tradedal/nomoss/commit/0f1e08f05bb5dd7b02a5eb52a61350d205370d7b))
* stabilize generated package manifest ([9946a43](https://github.com/Tradedal/nomoss/commit/9946a433c5afb62649e8ae758f87815bc2e3dbc5))
* use Effect collections for planning ([d45e464](https://github.com/Tradedal/nomoss/commit/d45e464f4b09ad18c1adf1a218e6bf138a0189e3))
* use Effect collections for planning ([a2a8f5d](https://github.com/Tradedal/nomoss/commit/a2a8f5d51391eae7386e40f1267b53a0176f9768))
* use selected AWS profile for stack execution ([60b0a0d](https://github.com/Tradedal/nomoss/commit/60b0a0de352407420c44f6c7429a29280ccae0d3))
* use selected AWS profile for stack execution - fixes issues with the runtime unable to do write operations ([58e5672](https://github.com/Tradedal/nomoss/commit/58e56728e3eb76665a179bc7bfa1267fc902d193))

## [0.0.2](https://github.com/Tradedal/nomoss/compare/v0.0.1...v0.0.2) (2026-07-18)


### Highlights

* Initial public Nomoss package release, with the `nomoss` executable and
  GitHub Actions trusted npm publishing.
* Effect-native planning, AWS resource reconciliation, and Stripe resource
  declarations use explicit provider operations and immutable collections.

### Compatibility

* No public API or resource-behavior changes.
