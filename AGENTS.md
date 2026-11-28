# AGENTS.md

## Highest-priority speaking and writing rule

Do not use compressed or chained prose such as "Use this checklist after implementation to prepare completed work for the user's review", or terse code summaries such as "Axes provide scale and placement; axis lines and ticks remain virtual". Write grounded, direct English that is easy to read and understand. Readers must be able to understand the explanation without expanding shorthand or reconstructing omitted context.

Prohibited patterns:

- State the subject's actual behavior affirmatively instead of defining it through negation.
- Do not use rhetorical contrasts such as "X is Y, not Z" or conditional explanations such as "this is x, unless named z".
- Do not obscure missing facts through indirect wording or guesses. State directly what happens and why.
- Do not repeat points, including at the end of a response.
- Do not use "So yes," as an opener that repeats an earlier answer.

The following words and related phrases are prohibited:
collapse/collapsing
slice
boundary
adapter
surface
endpoint/endpoints
extremum/extrema
machinery

Do not recap conversations.

Omit apologies, self-blame, and agreement formulas.

Do not use Python scripts to work on code or repository changes.

## Check the architecture first

Before making a change, confirm that the relevant services are established and work correctly. Read the complete operation and check that its consumers receive the required result.

Stop immediately when any of the following is present:

- Atoms and Effect services duplicate domain logic
- Consumer-specific atoms independently rebuild the same domain read models
- Service projections ignore consumer filter and sort criteria
- Atoms bypass Effect service APIs and call domain calculation helpers directly
- Atoms construct and run separate Effect service graphs outside the shared runtime

Report the defect under "Foundation Defects" with evidence and an explanation of its impact suitable for an engineering manager. Stop work beyond this check, including planning, while the foundational services remain incorrect. Correct those services before resuming implementation. After reporting the defect, follow the user's directions on scope, priority, and sequence, including when the current assignment already covers the repair.

## Naming

Use industry-established terms for file, service, and method names. Reuse the same term consistently for the same concept. Do not introduce ad hoc terminology in file, method, or service names.

Reuse canonical library, protocol and repository terminology, and verify unfamiliar names against authoritative documentation.

## Response style and writing

Write in plain English. Use English only. Cite file names with optional line numbers. Keep responses focused on the request as written.

Use "user" instead of "customer". Do not invent scenarios that involve or imply switching users or loading another user's data in the application.

Do not use lists of disconnected terms or statements in responses or repository files. Choose the established term or concept name and identify the subject clearly when defining it. Write definitions that explain how the facts relate.

Writing must establish what the subject does and why, and supply the context needed to understand it. Resolve missing facts through evidence before writing. Keep the explanation understandable in the text itself, with references for further detail. Apply [code-documentation.md](docs/development/code-documentation.md) to every code comment.

## Architecture and design discussions

When the user asks about architectural direction, design drift, shortcuts, or bypasses, first establish the product's purpose and the application behavior it promises. Read the project overview, active task, and relevant architecture contracts, then follow the affected application workflow through its services. Check which requirements the upstream tools actually supply and which decisions the application must own.

Answer at the level of the requested design decision. Explain how the implementation changes the project's direction, maintenance responsibility, or guarantees to application authors. For example, assess whether one successful integration has become the assumed model for substantially different integrations, whether generation adds behavior the project must maintain, or whether a fallback weakens the promised application workflow. Make each conclusion specific to the checked implementation and distinguish established facts from consequences inferred from them.

Introduce each named component through its purpose, its place in the application, and its relationship to the other components needed for the explanation. Explain the architectural consequence in the answer itself. Use file references as supporting evidence. When the user asks for examples, show how a concrete application need leads to the design choice and what that choice means for the system as it grows. Keep field names and method sequences to the detail needed to establish that meaning.

Assess service composition by the responsibilities and assumptions its contracts permit callers to vary. Separate methods and Layers establish organization; reusable domain behavior also requires contracts that express the relevant differences between consumers. State which behavior remains fixed and explain its consequence for the intended uses.

Keep design discussion in explanatory prose. Add implementation tasks or tracker checklists when the user requests them. Preserve unresolved design choices for discussion, and base proposed architecture changes on the user's requirements and verified repository contracts.

## Corrections and realignment

At the first sign that the user is dissatisfied with or rejects the current approach, stop edits, adjustments, and command execution immediately. Set aside the rejected approach and the assumptions or conclusions carried over from it. Reassess the user's requested result and corrections, and identify how the attempted work differs from them. Restart from the user's needs and resolve any remaining ambiguity with one focused question.

## Scope and discovery

For every user-requested code check, consult the current worktree's `refs/` first, then the main worktree's `refs/`, and the internet last. Use the earliest source that provides sufficient evidence.

The user's request defines the deliverable, permitted files, scope, and format. Identify the minimum relevant material in `docs/` and the domain code, then keep reading within that scope. Do not scan adjacent files or follow references for unrelated exploration. Expand the reading only when the task's scope changes substantially.

Use `rg` within the narrowest relevant path and expand only while a required question remains unresolved. Read the active task before working on a tracker. Keep searches within five seconds using ordinary repository tools.

Leave deleted symbols absent and reuse deleted code only at the user's explicit request.

Deliver a complete change that meets the agreed review and validation requirements. Take further action to close a specific requirement gap or resolve a correctness question that current evidence leaves open. Retain valid conclusions about unchanged work.

## Code style

Separate logical groups of statements with blank lines so readers can follow each step without unpacking a tightly packed block.

## Implementation

### Follow the user's instructions

Follow the user's instructions as written. Ask for clarification when their meaning or direction is unclear. Do not substitute an inferred goal, expand the task, or add unrequested improvements. A partial result that identifies what remains unresolved is preferable to a broader change based on invented requirements.

Preserve the requested outcome, scope, sequence, and format. Resolve details without substitutions or inferred goals. Ask one focused question only when the implementation direction is unclear.

Make source changes through direct, context-aware patches using the repository's established editing tools. Keep each patch focused on the requested behavior, review its diff, and validate it before expanding the work.

Follow an established pattern or develop one robust, reusable pattern for the requested behavior. Keep each operation together so a reader can follow its decisions and data. Fix the pattern that produces fragmented special cases. Introduce abstractions to make the operation easier to understand.

Validate input with canonical schemas, implement domain behavior in composable service methods, and provide dependencies through Layers.

Keep each Effect operation in one continuous pipeline or expression. Let TypeScript infer Effect and Layer channels from the service composition, and resolve dependency errors in that graph. Run services and their reactive consumers through the same Layer graph and runtime.

Follow the [resource management development guide](docs/development/effect-native-development.md#develop-resource-management) before you add or change a resource lifecycle. If a design requires a new provider-wide command entry or a separate implementation of shared lifecycle behavior, fix the design before you extend it.

## Effect primitives

Locate and use the full set of Effect constructs applicable to the service being implemented. Read the relevant Effect source in `node_modules/effect/src`. Use the Effect patterns established in this repository. Treat code that reimplements an Effect capability as a foundation defect and replace it with the corresponding Effect construct.

## Documentation

Carry out documentation requests in the requested files and format. Follow `docs/development/spec-writing.md`. State requirements from user decisions and checked-in contracts; describe current behavior from repository evidence. Keep scope and evidence checks within the editing process. Use the humanizer skill to review the prose before saving.

Explain how to use the reusable pattern. Explain code in source comments and API references, and describe how to run operations in their operating procedures. Keep overview specifications focused on what the system must do; link to details needed to understand those requirements.

Keep each Markdown paragraph or list item on one physical line.

## Execution and validation

Do not create tests or test infrastructure that reproduce implementation details or confirm documented library behavior. Use existing behavior coverage and operational evidence before expanding test code.

Use documented internal tools and checked-in repository utilities with their declared configuration. Change that configuration only at the user's explicit direction. Read external package documentation in `refs/`.

Configure shared tooling through Projen at the project root.

Investigate a failed operation through its operating procedure and existing `DEBUG` logging. Collect evidence about that operation. Use debuggers or write diagnostic code only at the user's explicit request.

## Trackers

When creating a tracker or reopening an existing tracker, read and follow [tracker-template.md](attempts/tracker-template.md).

The tracker must give the next agent enough verified context to complete the user's task. Preserve the user's requirements and make unfinished work explicit.

Write every development task as a Markdown checklist item.

## Git and operations

Stage only the requested files. Push only at the user's explicit request.

Name branches for their work. Inspect status before and after you change history. Move branches at agreed points to integrate or recover work. Name the source and target before you merge a release. Keep validation fixes on their assigned branch until you integrate it.

### Recovery and revert safety

Preserve staged and unstaged work. Restore or revert only exact files whose replacement the user has approved; do not use broad targets or `--staged`. Preserve the index.

Create or use a `git worktree` only on explicit user request or approval. When one checkout contains mixed scoped work, keep the original checkout untouched as the recovery checkout and create one worktree per approved target branch with a separate index.

Do not treat an approved worktree as a separate repository: the branch ref remains the durable integration unit, commits belong to that branch, and final integration still uses a branch merge rather than file copying between directories.

Run integration merges from the checkout already on the receiving branch. Implement features in an approved feature worktree only when the user has requested or approved that worktree. Integrate branches into `main` from the primary checkout on `main` unless the task explicitly names a different receiving branch.

## Development annotations

Analyze `DESIGN_Q` only at the user's explicit request and retain it until the user reviews the answer. Address `REVIEW_Q` in the current review pass and retain it until the user explicitly confirms its removal. Remove `CLEANUP_Q` after completing its marked cleanup.
