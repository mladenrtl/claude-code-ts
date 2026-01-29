#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import inquirer from 'inquirer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, 'templates', '.claude');
const targetDir = path.join(process.cwd(), '.claude');

async function main() {
  console.log(chalk.blue('\n📦 Claude Code TypeScript Configuration\n'));
  console.log(chalk.gray('This tool adds Claude Code agents, skills, hooks, and workflows to your project.\n'));

  // Check if .claude already exists
  if (fs.existsSync(targetDir)) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: chalk.yellow('.claude directory already exists. Merge/overwrite?'),
      default: false
    }]);
    if (!overwrite) {
      console.log(chalk.yellow('\nAborted. No changes made.'));
      process.exit(0);
    }
  }

  // Select components to install
  const { components } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'components',
    message: 'Select components to install:',
    choices: [
      {
        name: 'Agents (feature-implementer, test-writer, code-reviewer, test-runner, bug-fixer)',
        value: 'agents',
        checked: true
      },
      {
        name: 'Skills (implement, write-tests, review, test, fix)',
        value: 'skills',
        checked: true
      },
      {
        name: 'Hooks (auto-format, block-dangerous-commands, protect-sensitive-files, quality-gate-tests)',
        value: 'hooks',
        checked: true
      },
      {
        name: 'Workflows (feature-implementation)',
        value: 'workflows',
        checked: true
      }
    ]
  }]);

  if (components.length === 0) {
    console.log(chalk.yellow('\nNo components selected. Exiting.'));
    process.exit(0);
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy selected components
  for (const component of components) {
    const src = path.join(templateDir, component);
    const dest = path.join(targetDir, component);

    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
      console.log(chalk.green(`  ✓ Installed ${component}`));
    } else {
      console.log(chalk.red(`  ✗ Component not found: ${component}`));
    }
  }

  // Copy settings.json (create a template without sensitive data)
  const settingsPath = path.join(targetDir, 'settings.json');
  if (!fs.existsSync(settingsPath)) {
    const settingsTemplate = {
      "env": {
        "// NOTE": "Add your environment variables here",
        "// CLAUDE_CODE_USE_FOUNDRY": "1",
        "// ANTHROPIC_FOUNDRY_RESOURCE": "your-resource-name",
        "// ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-5",
        "// ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-5",
        "// ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
      }
    };
    fs.writeFileSync(settingsPath, JSON.stringify(settingsTemplate, null, 2) + '\n');
    console.log(chalk.green('  ✓ Created settings.json template'));
  } else {
    console.log(chalk.yellow('  ⚠ settings.json already exists, skipped'));
  }

  // Make hooks executable
  if (components.includes('hooks')) {
    const hooksDir = path.join(targetDir, 'hooks');
    if (fs.existsSync(hooksDir)) {
      const hookFiles = fs.readdirSync(hooksDir);
      for (const file of hookFiles) {
        if (file.endsWith('.sh')) {
          const hookPath = path.join(hooksDir, file);
          fs.chmodSync(hookPath, 0o755);
        }
      }
      console.log(chalk.green('  ✓ Made hooks executable'));
    }
  }

  console.log(chalk.green('\n✅ Claude Code configuration installed!\n'));

  console.log(chalk.white('Next steps:'));
  console.log(chalk.gray('  1. Review .claude/settings.json and add your API keys'));
  console.log(chalk.gray('  2. Create .claude/settings.local.json for local overrides'));
  console.log(chalk.gray('  3. Add .claude/settings.local.json to .gitignore'));
  console.log(chalk.gray('  4. Customize agents, skills, and hooks for your project\n'));

  console.log(chalk.white('Available skills (slash commands):'));
  console.log(chalk.cyan('  /implement [feature]  ') + chalk.gray('- Implement a new feature'));
  console.log(chalk.cyan('  /write-tests [what]   ') + chalk.gray('- Write tests for functionality'));
  console.log(chalk.cyan('  /review [files]       ') + chalk.gray('- Review code for quality'));
  console.log(chalk.cyan('  /test [file]          ') + chalk.gray('- Run tests'));
  console.log(chalk.cyan('  /fix [error]          ') + chalk.gray('- Fix a failing test or bug\n'));

  console.log(chalk.gray('For more info, see: https://github.com/mladenrtl/claude-code-ts\n'));
}

main().catch((error) => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});
