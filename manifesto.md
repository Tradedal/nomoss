We need to talk about IaC tooling. Too much IaC became a DMV visit with custom YAML/DSL form gymnastics.

These tools keep assuming developers will tolerate slow feedback and rigid workflows. I want to write code and change infrastructure safely and fast. Tooling companies keep handing developers a combat obstacle course after the DMV visit.

AWS CDK was my favorite tool. It made infrastructure programmable in general-purpose languages, and that mattered. But the ergonomics no longer hold. AI agents write code faster and better now, while CDK still moves changes at CloudFormation speed.

And don’t even get me started on custom resources or dependencies.

The pattern repeats across the space: invent a language, force developers into YAML or a specific runtime, wrap API calls into “configuration,” then make access indirect. Every tool wants to become the control plane between code and reality.

I don’t want another obstacle course. An agent can push through it and burn tokens, but the workflow stays slow and painful.

The development cycles became ridiculous too. Basic resource dependency problems stay open for almost half a decade:
https://github.com/crossplane/crossplane/issues/2072

I opened k8s-config-connector issues five years ago during a consulting engagement with a major bank. The issues are still open. IaC providers move slower than anything else, including banks.

I don’t want to wait for Google or AWS to run a Soviet five-year plan before fixing basic infrastructure tooling. Cloud providers somehow trained developers to accept timelines that look absurd in application development. Especially in the AI Agents era.

Speaking about agents, this is what finally enables a different way to do automation. It makes it fast, fully typed, Node-runtime friendly, and built around a direct provider reconciliation loop.

The prototype separates resources, planning, and lifecycle management. It evaluates the real dependency graph, runs parallel provider calls where possible, produces live diffs before apply, and enables tracing as a layer.

It also tracks generated physical names and keeps familiar CDK-style ergonomics for resources and stacks.

For a real S3 → SQS notification integration test, it creates the stack, uploads an object, asserts the SQS message, and destroys the stack.

The whole thing runs for 𝟵 𝘀𝗲𝗰𝗼𝗻𝗱𝘀!

I added tracing because I did not believe it was actually making the calls. It does, but natively which means its fast.

This has real engineering structure with unit testing for dependency discovery, topological order, props decoding, error handling, resource planning, and provider dispatches.

Last point I want to make.

In the coming years, teams will have to align IaC automation with agent defaults. Those defaults will be fully typed, fast, programmatic, and flexible code.

Agents will not default to tools with five-year fix cycles.
