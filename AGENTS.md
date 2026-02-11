# AGENTS.md - Obsidian Kanban Plugin

## Project Overview

Obsidian Kanban plugin written in TypeScript using Preact (aliased as React). Provides kanban board functionality for Obsidian.md.

## Build Commands

```bash
# Development build with watch mode
# Auto-copies to vault if TARGET_PLUGIN_DIR is set in .env file
pnpm dev

# Production build
pnpm build

# Type checking only
pnpm typecheck
```

## Development Workflow

To automatically copy plugin files to your Obsidian vault after each build:

**Method 1: Create a `.env` file (Recommended)**

```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your vault path
# TARGET_PLUGIN_DIR=/path/to/your/vault/.obsidian/plugins/obsidian-kanban

# Then run dev normally
pnpm dev
```

**Method 2: Manual copy**

```bash
# Copy files manually after build
node scripts/copy-to-vault.mjs /path/to/vault/.obsidian/plugins/obsidian-kanban
```

## Lint Commands

```bash
# Run ESLint
pnpm lint

# Run ESLint with auto-fix
pnpm lint:fix

# Format with Prettier
pnpm prettier

# Clean (prettier + lint:fix)
pnpm clean
```

## Test Commands

**Note:** This project does not currently have a test framework configured. There are no test runners available.

## Code Style Guidelines

### TypeScript

- Target: ES2018, Module: ESNext
- JSX with Preact (`jsxImportSource: "preact"`)
- `noImplicitAny: true` (strict types)
- Path alias: `src/` maps to project root
- React types from `@types/react`, implementation from `preact/compat`

### Imports

- Order: External libraries → Internal (`src/...`)
- Prettier sorts imports automatically using `@trivago/prettier-plugin-sort-imports`
- Use single quotes
- Example:

```typescript
import { Plugin } from 'obsidian';
import { useState } from 'preact/compat';

import { KanbanView } from './KanbanView';
import { t } from './lang/helpers';
```

### Formatting

- 2 spaces, no tabs
- Single quotes
- Semicolons required
- 100 character print width
- Trailing commas (ES5 style)
- Unix line endings (LF)

### Naming Conventions

- **Interfaces**: PascalCase (e.g., `KanbanSettings`, `LaneData`)
- **Types**: PascalCase (e.g., `DataKey`, `FileAccessor`)
- **Enums**: PascalCase, members PascalCase (e.g., `LaneSort.TitleAsc`)
- **Classes**: PascalCase (e.g., `KanbanPlugin`, `StateManager`)
- **Functions**: camelCase (e.g., `generateInstanceId`, `getParentWindow`)
- **Variables**: camelCase (e.g., `stateManagers`, `settingsTab`)
- **Constants**: camelCase or UPPER_SNAKE for true constants
- **Files**: PascalCase for components/classes (e.g., `Settings.ts`), camelCase for helpers

### Type Definitions

- Prefer `interface` over `type` for object shapes
- Use `enum` for related constants
- Optional properties use `?:` notation
- Nullable types: `type | undefined` or `type | null`
- Avoid explicit `any` when possible (but `@typescript-eslint/no-explicit-any` is off)

### Error Handling

- Use try/catch for async operations
- Return early for error conditions
- No specific error type requirements

### React/Preact

- Functional components preferred
- Hooks from `preact/compat` (useState, useEffect, etc.)
- JSX files use `.tsx` extension
- Props interfaces defined inline or in types files

### ESLint Rules

- Explicit function return types: off (inferred preferred)
- No explicit any: off (allowed)
- React prop-types: off (TypeScript handles this)
- React in JSX scope: off (not needed with new JSX transform)
- Member delimiter style: off

## Project Structure

```
src/
  components/    # React/Preact components
  dnd/          # Drag and drop functionality
  helpers/      # Utility functions
  lang/         # Internationalization
  parsers/      # Markdown parsing logic
  *.ts          # Main plugin files
```

## Release Commands

```bash
# Bump version and generate release notes
pnpm bump

# Commit, tag, and push release
pnpm release
```
