---
name: review
description: Review recently modified code for quality, security, and best practices. Use after implementing features or fixing bugs.
argument-hint: [files or scope]
context: fork
agent: code-reviewer
---

Review the code: $ARGUMENTS

Check for: correctness, security, performance, and pattern adherence.

## Review Checklist

### Code Quality
- [ ] Readable and self-documenting
- [ ] Follows project conventions
- [ ] No unused imports or variables
- [ ] Proper error handling

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present where needed
- [ ] No injection vulnerabilities
- [ ] Proper authentication handling

### Performance
- [ ] Efficient algorithms
- [ ] No N+1 query patterns
- [ ] Proper resource cleanup

### Testing
- [ ] Tests exist for new functionality
- [ ] Tests follow project patterns
- [ ] Mocks are properly configured
