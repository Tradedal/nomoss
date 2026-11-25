# Roadmap

## Proof of concept (complete)

Generated clients and resource definitions drive live AWS and Stripe deployments. The examples show typed dependencies between resources, a CLI diff before apply, and access to provider outputs after deployment.

## Experimental

The goal is full AWS and Stripe resource coverage through the TypeScript declaration API. Applications can pass related resources directly, grant permissions through resource methods, and manage nested Stripe resources across deployments.

## Beta

The generated SDKs ship separately from the stack engine so applications can use either the provider API or the full deployment workflow. The runtime has zero external SDK dependencies. It uses Smithy-generated AWS clients and protocol code, resolves and refreshes its own credentials, and signs requests through a standalone SigV4 implementation.

## Stable

Automated tests cover the public TypeScript API and the CLI. Provider integration tests exercise the resource lifecycle, and regression tests protect generated contracts, saved state compatibility, and recovery after interrupted deployments.
