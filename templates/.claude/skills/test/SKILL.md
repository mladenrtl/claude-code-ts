---
name: test
description: Run tests, prioritizing recently modified test files before running the full suite.
argument-hint: [optional: specific test file]
context: fork
agent: test-runner
---

Run tests: $ARGUMENTS

Start with recently modified tests, then run full suite.

## Test Commands

```bash
npm test                           # Run all tests with coverage
npm test -- --watch                # Watch mode for development
npm test -- path/to/file.test.ts   # Run a single test file
npm test -- --updateSnapshot       # Update Jest snapshots
```

## Test Execution Strategy

1. **Identify recently modified tests**: Check git status for modified test files
2. **Run targeted tests first**: Execute tests for recently changed files
3. **Run full suite**: Confirm no regressions across the codebase
4. **Report results**: Summarize pass/fail status and coverage

## Checklist

- [ ] Recent tests identified
- [ ] Targeted tests executed
- [ ] Full suite run
- [ ] Failures analyzed and reported
