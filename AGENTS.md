# AGENTS.md
Operational guide for coding agents working in this repository.
All guidance here is derived from the current codebase/config.

## 1) Hard Rules (Do Not Violate)
1. i18n is mandatory for user-facing copy.
   - Never hardcode UI text in pages/components.
   - Read/write copy via `next-intl` + `messages/en.json` + `messages/zh.json`.
   - New copy requires both locales in the same change.
2. No secrets in code, docs, or logs.
   - Do not commit tokens/keys/passwords/connection strings.
   - Do not log sensitive values.
3. Locale-aware routing only.
   - Marketing pages: `src/app/[locale]/(marketing)/...`
   - Protected pages: `src/app/[locale]/(protected)/...`
4. Pre-push quality gate is required.
   - `corepack pnpm@10.26.1 -s lint`
   - `corepack pnpm@10.26.1 -s build`

## 2) Canonical Commands
Use pinned package manager version from `package.json` (`pnpm@10.26.1`).

### Setup and app lifecycle
- Install dependencies: `corepack pnpm@10.26.1 install`
- Start dev server: `corepack pnpm@10.26.1 dev`
- Build production bundle: `corepack pnpm@10.26.1 build`
- Start production server: `corepack pnpm@10.26.1 start`
- Analyze build: `corepack pnpm@10.26.1 build:analyze`

### Lint/format
- Lint: `corepack pnpm@10.26.1 lint`
- Format: `corepack pnpm@10.26.1 format`
Note: lint runs `biome check --write .` and can modify files.

### Database (Drizzle)
- Generate migration: `corepack pnpm@10.26.1 db:generate`
- Apply migrations: `corepack pnpm@10.26.1 db:migrate`
- Push schema (dev helper): `corepack pnpm@10.26.1 db:push`
- Open studio: `corepack pnpm@10.26.1 db:studio`

### Other project scripts
- Content rebuild: `corepack pnpm@10.26.1 content`
- Email template dev: `corepack pnpm@10.26.1 email`
- Ops: `corepack pnpm@10.26.1 list-users`, `list-contacts`
- Billing ops: `corepack pnpm@10.26.1 fix-payments`, `fix-payments-scene`, `distribute-credits`

## 3) Test Status + Single-Test Guidance
Current state of this repository:
- No `test` or `test:*` scripts in `package.json`.
- No first-party test configs found (`vitest.config.*`, `jest.config.*`,
  `playwright.config.*`, `cypress.config.*`).
- No existing `*.test.*` or `*.spec.*` files found.

Implication:
- There is no official test command today.
- Validation currently relies on lint + build + manual QA.

If you introduce a test runner, update `package.json` and this file together.

Single-test command patterns (when a runner is added):
- Vitest: `corepack pnpm@10.26.1 exec vitest run path/to/file.test.ts`
- Jest: `corepack pnpm@10.26.1 exec jest path/to/file.test.ts`
- Playwright: `corepack pnpm@10.26.1 exec playwright test path/to/file.spec.ts`

## 4) Project Structure and Boundaries
- `src/app/`: App Router pages/layouts (locale-aware route groups).
- `src/actions/`: server actions (`'use server'`).
- `src/components/`: UI + feature components.
- `src/lib/`: shared helpers (auth/session/utils/server logic).
- `src/db/`, `src/i18n/`, `src/payment/`, `src/storage/`, `src/notification/`.
- `src/mail/`, `content/`, `public/` for email/content/assets.

Boundary rule: keep server logic in server files/actions; do not import
client-only hooks into server action modules.

## 5) Formatting and TypeScript Standards
From `biome.json` + `tsconfig.json`:
- Indentation: 2 spaces.
- Quotes: single quotes.
- Semicolons: always.
- Trailing commas: ES5 style.
- Line width: 80.
- TypeScript `strict: true`.
- Path aliases: `@/*`, `@/content/*`, `@/public/*`.

Important Biome nuance:
- `organizeImports` is disabled; do not rely on auto import sorting.

## 6) Imports, Exports, Naming, and Types
Imports:
- Prefer alias imports (`@/...`) over deep relative imports.
- Use `import type` for type-only imports.

Exports:
- Prefer named exports in shared utilities and helper modules.
- Keep framework-idiomatic default exports for Next page/layout files.

Naming:
- File names: kebab-case (example: `update-avatar-card.tsx`).
- Hooks: `use-*` convention (example: `use-session.ts`).
- Components: PascalCase symbols.
- Actions: descriptive verb + `Action` suffix when applicable.

Types:
- Prefer explicit, narrow types; avoid broad `any`.
- Use Zod for action input validation.
- Reuse inferred/shared domain types where possible.

## 7) Next.js, i18n, and Error Handling Patterns
Next/i18n:
- Server pages/components commonly use `getTranslations(...)`.
- Client components commonly use `useTranslations(...)`.
- Metadata should be locale-aware and translated.
- Keep locale navigation in `src/i18n/navigation` helpers.

Error handling:
- Server actions use `next-safe-action` clients from `src/lib/safe-action.ts`.
- Wrap side effects with `try/catch` and return structured error payloads.
- Log with context, but never log secrets.
- Surface user-friendly form errors in UI components.

## 8) Security and Environment Hygiene
- Start from `env.example` and use `.env.local` locally.
- Keep production secrets in provider secret stores (not git).
- If env requirements change, update `env.example` in same PR.

## 9) Cursor/Copilot Rules Integration
Detected Cursor rule files in `.cursor/rules/`:
- Core workflow: `development-workflow.mdc`, `project-structure.mdc`
- TS/React/Next: `typescript-best-practices.mdc`, `react-best-practices.mdc`,
  `nextjs-best-practices.mdc`
- UI: `tailwindcss-best-practices.mdc`, `ui-components.mdc`,
  `radix-ui-best-practices.mdc`, `react-hook-form-best-practices.mdc`
- Data/validation: `zod-best-practices.mdc`, `drizzle-orm-best-practices.mdc`,
  `database-state-management.mdc`, `zustand-best-practices.mdc`
- Integrations: `ai-sdk-best-practices.mdc`, `date-fns-best-practices.mdc`,
  `stripe-best-practices.mdc`

Also checked:
- `.cursorrules`: not found.
- `.github/copilot-instructions.md`: not found.

Conflict resolution:
- Follow repo reality first (`package.json`, `biome.json`, `tsconfig.json`,
  concrete code patterns, and this file).
- Treat Cursor rule docs as supplemental guidance.

## 10) Agent Checklist
Before coding:
- Read nearby modules and follow existing local patterns.
- Check i18n impact first (need en/zh updates or not).

After coding:
- Run `corepack pnpm@10.26.1 -s lint`.
- Run `corepack pnpm@10.26.1 -s build`.
- Re-check for hardcoded UI strings and accidental secret leaks.

Before handoff:
- Summarize changed files and verification commands/results.
- Call out any manual QA still required (auth, billing, AI workflows).
