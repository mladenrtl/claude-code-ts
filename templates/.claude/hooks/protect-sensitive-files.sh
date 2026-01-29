#!/bin/bash
# Block edits to sensitive files

SENSITIVE_PATTERNS=(
  "\.env$"
  "\.env\."
  "credentials"
  "secrets"
  "\.pem$"
  "\.key$"
  "id_rsa"
  "\.npmrc$"  # Contains auth tokens
)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // ""')

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" =~ $pattern ]]; then
    echo "BLOCKED: Cannot edit sensitive file: $FILE_PATH" >&2
    exit 2
  fi
done
