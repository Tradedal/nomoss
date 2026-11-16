# Configure this project's Codex instructions

Codex loads [system-prompt.md](system-prompt.md) as this project's replacement base instructions through [config.toml](config.toml). Start a new Codex session from this repository to load the replacement. Repository AGENTS.md instructions and the platform's permissions remain separate from the base prompt.

The prompt follows model_messages.instructions_template in the gpt-6.1-sol entry of OpenAI's [model catalog at commit 48524f337a84b570f0c2453ca43ec9a1a29375c0](https://github.com/openai/codex/blob/48524f337a84b570f0c2453ca43ec9a1a29375c0/codex-rs/models-manager/models.json), with the local changes described below. The local source checkout is refs/codex. The user's Codex configuration selects the model; this project setting replaces its instructions.

The local writing rules remove introductory summaries and generic purpose clauses from conversational responses. The source-documentation rules require each comment to add information beyond the declaration and keep class and method documentation within their assigned scopes. A sentence must be accurate and explain something the reader needs at that declaration. The operational instructions retain the reference behavior. The final-answer rule omits the reference's explanation of how the interface presents progress updates.

OpenAI's [sample configuration](https://learn.chatgpt.com/docs/config-file/config-sample) documents model_instructions_file as an override of the built-in base instructions. Its [project configuration guide](https://learn.chatgpt.com/docs/config-file/config-advanced#project-config-files-codexconfigtoml) states that the project must be trusted and that Codex resolves the relative prompt path from .codex. The override applies to new sessions; it does not rewrite an existing conversation's instructions or replace platform policies.

Git tracks the prompt and its configuration together. Compare prompt revisions with git log -- .codex and git show COMMIT -- .codex/system-prompt.md. When you update the reference, preserve the source commit so a reviewer can distinguish upstream changes from local writing rules.
