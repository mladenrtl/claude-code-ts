#!/bin/bash
# Enforce tests pass after code modifications
# Uses Stop hook to block Claude from finishing if tests fail

INPUT=$(cat)

# Check if any src/ or __tests__/ files were modified (unstaged changes)
MODIFIED_FILES=$(git diff --name-only 2>/dev/null | grep -E "^(src/|__tests__/)" || true)

if [ -z "$MODIFIED_FILES" ]; then
  # No code modifications, allow stop
  exit 0
fi

# Run tests
echo "Running tests due to code modifications..." >&2
TEST_OUTPUT=$(npm test 2>&1)
TEST_EXIT=$?

if [ $TEST_EXIT -ne 0 ]; then
  # Tests failed - block stop and force Claude to continue
  echo "{\"decision\": \"block\", \"reason\": \"Tests failed. Please fix the failing tests before completing.\\n\\nTest output:\\n$TEST_OUTPUT\"}"
  exit 0
fi

# Tests passed, allow stop
exit 0
