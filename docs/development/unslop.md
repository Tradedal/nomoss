Rewrite text in plain English after checking it for these patterns. Preserve its meaning and tone. Follow the [specification guidance](spec-writing.md) for requirements and the [code documentation guidance](code-documentation.md) for source comments and API descriptions.

## Patterns to detect and fix

Keep rule numbers stable so existing references continue to identify the same rules.

### Content

3. Replace superficial phrases such as "highlighting...", "ensuring...", "reflecting...", "showcasing..." and "fostering..." with a supported claim, or remove them.
5. Name the source behind claims such as "Experts believe", "Industry reports suggest" and "Some critics argue", or remove the claim.

### Language

7. Replace stock vocabulary with plain words. Common examples include additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore and vibrant.
8. Use "is" or "has" in place of "serves as", "stands as", "boasts" and "features".
9. State the subject's actual behavior directly.
10. Group ideas according to their relationship. Use the number of items the subject requires.
11. Use the terms already used in the repository consistently for the same concept. Keep identifiers exactly as declared.
12. Use "from X to Y" for values on a meaningful scale. Describe independent topics directly.

### Style

13. Separate thoughts with periods or commas. Give an aside its own sentence when it needs an explanation.
14. Reserve colons for lists and examples. Connect clauses with ordinary sentence structure. "Describe when the scheduler should fire in plain English" gives the reader a direct instruction.
15. Reserve bold text for information that needs emphasis.
16. Replace a label that repeats the next sentence with prose. A useful lead-in names the subject and adds detail.
17. Use sentence case for headings.
18. Remove decorative emojis from headings and bullets.
19. Use straight quotes.

### Communication artifacts

20. Remove chatbot phrases such as "I hope this helps!", "Let me know if...", "Of course!", "Certainly!" and "Found the smoking gun!".
22. Respond directly. Remove praise such as "Great question! You're absolutely right!".

### Filler

23. Replace "In order to" with "To" and "Due to the fact that" with "Because". Remove "It is important to note that".
24. Replace stacked qualifiers such as "could potentially possibly be argued that it might" with "may".
25. End with specific plans or facts. Remove generic conclusions such as "The future looks bright."

### Jargon

26. Name the actual operation or component. Replace "wedge in" with "add" and "evacuate" with "move out" for code moves. Use the mechanism's established name and explain its action.

### Plain speech

27. Replace vague claims such as "the API is easy to use" with an explanation of what the caller can accomplish and how to use the result. Explain failures or restrictions beside the behavior they affect. Remove generic statements that could describe any project.
28. Split dense sentences so the reader can follow the action in order. Preserve qualifications when moving or splitting clauses.
29. Name the actor that performs the action. Distinguish data from the operation that reads or resolves it. Use passive voice for an unknown actor or a result that matters more than the actor.
30. Use a stronger verb or a measurement in place of an adverb. Replace "runs quickly" with "is fast" or a measured duration, and "significantly improves" with the measured change.
31. Prefer plain words. Replace "utilize" and "leverage" with "use", "facilitate" with "help", "numerous" with "many", and "in the event that" with "if".
32. Use literal phrases in place of aphorisms ("wire it or delete it"), rhetorical fragments, personified code ("the plan holds it"), figurative verbs ("rides along", "stands on") and stock framing phrases. Replace "A dial worth turning" with "a parameter worth varying". Rule 26 covers metaphor nouns.
33. Write complete sentences with articles and verbs. Explain abbreviated operations in ordinary language, as in "The parser rejects an invalid date and exits with code 2 before writing the file."
34. Verify claims about current behavior against the implementation and requirements against accepted decisions. Keep planned behavior clearly identified. Preserve the reason for each requirement and the conditions under which it applies.
