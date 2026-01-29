---
name: implement
description: Implement a new feature, function, or module in the src folder. Use when adding new functionality, extending existing code, or refactoring implementations.
argument-hint: [feature description]
context: fork
agent: feature-implementer
---

Implement the requested feature: $ARGUMENTS

Follow the project's architecture patterns.

## Guidelines

1. **Analyze existing code** to understand patterns and conventions
2. **Match the existing style** - your code should blend seamlessly
3. **Focus only on src/** - don't modify tests or config files
4. **Don't introduce new dependencies** without explicit approval

## Checklist

- [ ] Analyzed similar existing code for patterns
- [ ] Followed naming conventions
- [ ] Matched error handling style
- [ ] No new dependencies added
- [ ] Code is clean and self-documenting
