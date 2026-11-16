# Write commit messages

A commit message must explain the change to someone who has not read the conversation. State what the software does after the change and explain why that behavior was required. Write continuous paragraphs in active voice and keep their scope consistent with the commit.

Explain how the code provides the changed behavior when that affects a design a future reader needs to understand. Cover how services connect, schemas validate data, runtime dependencies supply capabilities, state is saved, projections produce values, or generators produce contracts when the change affects those operations. Explain changes to tests, tooling, and application workflows on the same basis.

For Effect changes, explain which services supply dependencies and which schemas validate values when those choices affect the contract. If the change migrates or restructures code, identify the previous approach and its replacement so the reader can understand how the code is organized afterward.

Routine validation logs, file inventories, and accounts of the work do not belong in the message.
