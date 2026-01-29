#!/bin/bash
# Block dangerous bash commands

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf \*"
  "git push.*--force"
  "git reset --hard"
  "npm publish"
  "DROP TABLE"
  "DELETE FROM.*WHERE 1"
  "> /dev/sd"
  "chmod 777"
  "curl.*\| sh"
  "wget.*\| sh"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if [[ "$COMMAND" =~ $pattern ]]; then
    echo "BLOCKED: Dangerous command detected: $pattern" >&2
    exit 2
  fi
done
