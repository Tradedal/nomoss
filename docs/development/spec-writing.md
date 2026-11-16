# Write specifications

Write a specification that explains what the software must do, how a reader can use it, and what result they should expect. Explain the reason for a requirement when it affects the reader's decision. Describe the complete workflow so the reader does not have to reconstruct it from source code or earlier conversations.

## Establish the required behavior

Use the user's decisions to establish required behavior and its limits. Use repository evidence to establish what works now. Distinguish the two wherever a reader might mistake unfinished functionality for an available feature.

Preserve each requirement's scope, reason, intended user, and status. Consolidate repeated explanations and preserve qualifications and accepted decisions. An unresolved choice belongs in the assigned tracker with enough context to resolve it.

Translate feedback into ordinary English before you add it to a specification. Preserve its technical meaning and strength. Raw conversation, private project details, and accounts of how you gathered evidence stay outside repository documentation.

## Explain what the software does

Begin with the operation the reader needs and explain its outcome. Introduce a resource, request, or saved record before a requirement refers to it. When one operation depends on another, explain which result it needs and why that result affects its behavior.

A paragraph must develop an explanation through related sentences. Explain what the consumer can accomplish and how the relevant conditions determine the result. A service name, a paraphrase of its code, or the word must cannot replace that explanation.

For a CLI, explain what each command does, when an operator uses it, what it changes, and what the operator sees. Configuration and failures belong beside the behavior they affect. Constructor contents, method-call sequences, and Layer assembly belong in implementation or API documentation. Tracker summaries and accounts of completed work do not belong in functionality specifications.

If an architecture requirement names an internal service or library, explain which constraint requires that choice. In API documentation, explain how callers use the capability. In source comments, explain facts the declaration alone cannot establish. In operating instructions, give the steps and commands needed to perform the task.

## State requirements clearly and cite their sources

Use complete sentences, familiar verbs, and established AWS, Effect, and Nomoss terms. Explain a technical term before the text relies on it. Unpack noun chains and state the actor and action in each clause so the reader can understand the sentence in order. A proposed name must describe a concrete domain capability.

Place a reference beside the requirement it establishes and explain why that reference matters. Link to authoritative schemas for data already defined there. Formulae must define variables and units, and configuration values need a source that governs them.

Use sentence-case headings for actual subjects. Field catalogues, pseudo-code declarations, decorative diagrams, repeated labels, and disconnected requirement fragments are prohibited. Each Markdown paragraph stays on one physical line; code, equations, and tables retain their required structure.

## Review the complete document

Read the original and the rewrite as complete documents. Apply the [writing guidance](unslop.md) and check that the rewrite preserves the meaning of every requirement, qualification, unresolved decision, and supported fact.

Read each paragraph for what it explains to its intended reader. If it still reads like narrated code or a list of demands, rewrite the explanation in full.
