---
name: write-tests
description: Write comprehensive tests for a feature or specification. Use when test coverage is needed for new or existing functionality.
argument-hint: [what to test]
context: fork
agent: test-writer
---

Write tests for: $ARGUMENTS

Follow existing test patterns in the project.

## Testing Guidelines

1. **Analyze existing tests** to understand patterns and conventions
2. **Match the project's test structure** and naming conventions
3. **Cover happy paths, edge cases, and error scenarios**
4. **Use existing fixtures and test utilities**

## Test Patterns

### Unit Tests
```typescript
describe('[Module] [Function]', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Test Coverage Priorities
1. Core business logic
2. Edge cases and boundary conditions
3. Error handling paths
4. Integration points

## Checklist

- [ ] Examined existing test patterns
- [ ] Tests mirror source structure
- [ ] Descriptive test names
- [ ] Independent test cases
- [ ] Proper mocking where needed
