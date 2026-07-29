## Summary
- Standardize dependency management to pnpm-only.
- Resolve Dependabot security findings in the Node dependency graph.
- Align automation so future updates are lockfile-consistent.

## Why pnpm-only
- This repository uses `pnpm-workspace.yaml` and already manages dependencies with pnpm.
- Keeping both `package-lock.json` and `pnpm-lock.yaml` causes lockfile drift and inconsistent audit/update results.
- A single lockfile source of truth reduces false positives and makes security updates reproducible.

## What Changed
- Removed `package-lock.json` from version control.
- Added `package-lock.json` to `.gitignore` to prevent accidental reintroduction.
- Updated `.github/dependabot.yml` to use the Node ecosystem updater on the repo root with a weekly schedule.
- Applied dependency updates required to clear current high-severity alerts.

## Dependabot Behavior Going Forward
- Dependabot should open dependency update PRs against `main` for the repository root.
- PRs should only update pnpm-managed dependency state (`package.json` and `pnpm-lock.yaml`).
- `package-lock.json` should not be added back to PRs.

## Validation
- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm audit --prod --dev`
- [ ] `pnpm run lint`
- [ ] `pnpm run build`

## Related Security Alerts
- brace-expansion DoS advisories (transitive dependency path)
- PostCSS source map path traversal advisory
