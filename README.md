# claude-code-ts

Add Claude Code configuration (agents, skills, hooks, workflows) to TypeScript projects with a single command.

## Quick Start

```bash
npx claude-code-ts
```

This will interactively install Claude Code configuration files to your project's `.claude/` directory.

## What's Included

### Agents

Pre-configured agents optimized for TypeScript development:

| Agent | Model | Purpose |
|-------|-------|---------|
| `feature-implementer` | sonnet | Implements new features in `src/` |
| `test-writer` | sonnet | Creates comprehensive test files |
| `code-reviewer` | sonnet | Reviews code for quality and security |
| `test-runner` | haiku | Runs tests efficiently |
| `bug-fixer` | haiku | Fixes failing tests with minimal changes |

### Skills (Slash Commands)

User-invocable skills that orchestrate agents:

- `/implement [feature]` - Implement a new feature following clean architecture
- `/write-tests [what]` - Write comprehensive tests for functionality
- `/review [files]` - Review code for quality, security, and best practices
- `/test [file]` - Run tests, prioritizing recent changes
- `/fix [error]` - Fix failing tests or bugs with minimal changes

### Hooks

Safety and quality automation:

| Hook | Purpose |
|------|---------|
| `auto-format.sh` | Auto-formats TS/JS files after edits with ESLint |
| `block-dangerous-commands.sh` | Blocks dangerous bash commands (rm -rf, force push, etc.) |
| `protect-sensitive-files.sh` | Blocks edits to .env, credentials, and secrets |
| `quality-gate-tests.sh` | Ensures tests pass before Claude completes |

### Workflows

Reference documentation for complex multi-agent operations:

- `feature-implementation.md` - Orchestration guide for implementing features

## Configuration

After installation, configure your settings:

### settings.json (commit to git)

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317"
  }
}
```

### settings.local.json (add to .gitignore)

```json
{
  "env": {
    "ANTHROPIC_FOUNDRY_API_KEY": "your-api-key-here"
  }
}
```

## Customization

All installed files are meant to be customized for your project:

1. **Agents**: Modify agent prompts in `.claude/agents/` to match your coding standards
2. **Skills**: Update skill definitions in `.claude/skills/` to reference your architecture
3. **Hooks**: Enable/disable hooks by editing `.claude/settings.json`
4. **Workflows**: Add project-specific workflows to `.claude/workflows/`

## Project Structure

```
.claude/
├── agents/
│   ├── feature-implementer.md
│   ├── test-writer.md
│   ├── code-reviewer.md
│   ├── test-runner.md
│   └── bug-fixer.md
├── skills/
│   ├── implement/SKILL.md
│   ├── write-tests/SKILL.md
│   ├── review/SKILL.md
│   ├── test/SKILL.md
│   └── fix/SKILL.md
├── hooks/
│   ├── auto-format.sh
│   ├── block-dangerous-commands.sh
│   ├── protect-sensitive-files.sh
│   └── quality-gate-tests.sh
├── workflows/
│   └── feature-implementation.md
├── settings.json
└── settings.local.json (gitignored)
```

## Requirements

- Node.js >= 18.0.0
- Claude Code CLI installed

## License

MIT
