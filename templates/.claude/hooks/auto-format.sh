#!/bin/bash
# Auto-format TypeScript/JavaScript files after edits

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')

# Only format TS/JS files
if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]]; then
  # Run ESLint fix silently
  npx eslint --fix "$FILE_PATH" 2>/dev/null || true
fi
