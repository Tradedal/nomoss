# Nomoss

Nomoss is a bare-bones, embeddable infrastructure automation library for TypeScript projects written in pure Effect. Get your hands dirty!

Nomoss keeps resource definitions beside application code. Effect test layers exercise the resource lifecycle without cloud access.

A Nomoss program is an `Effect`. It records resources in a typed graph and returns typed output references. The project Effect graph provides the Nomoss runtime.

Nomoss uses the Distilled AWS and Stripe libraries from Alchemy for typed provider operations.

## Why Nomoss

- A cool name
- Small enough to read and adapt to a project
- Implemented in pure, idiomatic Effect
- Typed output references define resource dependencies
- Nomoss runs inside the project Effect graph
- Effect test layers cover resource policy and provider behavior without cloud access
- `nomoss graph`, `nomoss plan`, and `nomoss diff` expose the resource graph and proposed changes

## Example

[S3 upload events](examples/upload-events/README.md) demonstrates a typed Nomoss resource graph for S3 object notifications over SQS.

## CLI

```sh
nomoss graph
nomoss plan
nomoss diff
nomoss create
nomoss destroy
```

Run `nomoss --help` for stack, AWS profile, and output options.

## Status

Nomoss is early software. Its public API and provider coverage will evolve as it is used inside real TypeScript projects.

## License

MIT
