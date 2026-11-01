# Commit Message Spec

Write commit messages as durable engineering records in continuous paragraphs and active voice. Start with the outcome and give the context a future reader needs.

Name the domain behavior or design contract changed. Include the implementation approach when the commit changes service graphs, schemas, runtime wiring, persistence, projections, generated contracts, tests, tooling, or user-facing flows.

For Effect changes, describe dependency wiring and the validation location when they affect the contract. For migrations and restructures, name the old path and its replacement.

Routine validation logs, file inventories, and work history do not belong in the message.

A commit message must match the commit scope.
