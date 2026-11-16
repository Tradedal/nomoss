# Development tracker template

Name development trackers attempts/dev-attempts_<subject>.md, using established domain terms. Reopen and update an existing tracker for the requested work before creating another one. Preserve the sections below in every tracker.

Describe the state of the requested delivery. Exclude agent activity logs, session history, document preparation, and accounts of reading, searching, editing, or running tools.

## Tracker maintenance [keep this section at the top of every tracker]

Preserve this section unchanged while working on a tracker. Keep the tracker lean as development progresses. Consolidate completed tasks into concise statements of delivered behavior, and combine overlapping tasks into coherent outcomes.

Each task must explain the result to deliver and the behavior that establishes completion. Repository guidance defines how to validate work. Keep validation within the task's acceptance conditions; separate tasks for running checks or recording their results add no delivery.

Before marking a task complete, compare the user's request, the initial behavior, and the implemented change. Establish that the affected workflow delivers the requested result and preserves required behavior. Passing checks supports that assessment; completion requires the requested outcome.

## Scope statement

Describe the existing state and the change the user requested. Preserve the requested scope, permitted files, reference behavior, and constraints. Resolve ambiguity with a focused question before adopting an interpretation that changes the delivery.

State the scope in concise, coherent prose. The Tasks section records unfinished work, so omit repeated announcements that implementation or validation remains pending.

## Direction

Write two or three short guiding statements based on the user's instructions and repository contracts. Identify the approach and constraints that keep the work within scope.

## Completed work

Consolidate related completed tasks into statements of delivered behavior.

- [x] Describe the delivered feature, improvement, or corrected behavior.

## Tasks

Write every task as a Markdown checklist item. Describe one coherent outcome in natural language, including the behavior that establishes its completion. Resolve overlapping or conflicting requirements before adding tasks. State a concrete blocker or necessary complexity at the end of the affected task, and link the relevant reference or existing repository pattern beside it.

- [ ] Describe the required change from the current state and the outcome its consumer must receive.

## References

Link the scoped specifications, source evidence, references in refs/, and existing patterns needed to complete the work. Apply the [specification guide](../docs/development/spec-writing.md), [testing contract](../docs/development/testing.md), and [Effect development guide](../docs/development/effect-native-development.md) where they govern the task.

## Supporting materials

Retain relevant files and links supplied by the user. Save screenshots needed during the work and link their saved locations. Capture the user's requirements in clear repository prose while preserving their meaning and scope.
