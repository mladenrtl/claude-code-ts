---
name: fix
description: Fix a failing test or bug. Analyzes error messages, identifies root causes, and applies minimal targeted fixes.
argument-hint: [error or test name]
context: fork
agent: bug-fixer
---

Fix the issue: $ARGUMENTS

Apply minimal, targeted fixes only.

## Bug Fixing Process

1. **Reproduce**: Run the failing test or reproduce the bug
2. **Analyze**: Identify the root cause from error messages and stack traces
3. **Fix**: Apply the minimal change needed to resolve the issue
4. **Verify**: Run tests to confirm the fix works without regressions

## Common Issues

### Type Errors
- Check type annotations
- Verify null/undefined handling
- Check import statements

### Test Failures
- Compare expected vs actual values
- Check mock configurations
- Verify async handling

### Runtime Errors
- Check for null pointer access
- Verify function signatures
- Check data transformations

## Principles

- **Minimal changes**: Only fix what's broken
- **No over-engineering**: Resist the urge to refactor surrounding code
- **Targeted testing**: Run affected tests, then full suite

## Checklist

- [ ] Error analyzed and understood
- [ ] Root cause identified
- [ ] Minimal fix applied
- [ ] Tests pass after fix
