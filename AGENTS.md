# Repository Workflow Notes

## Session Logbook

- Keep a daily session log in `docs/logs/` using the filename format `YYYY-MM-DD.md`.
- At the end of each meaningful work session, append a short entry to that day's file instead of overwriting it.
- Log only durable context that helps future sessions: what changed, what was verified, open issues, and next useful checks.
- Never store secrets in the logbook or other tracked files. Do not record passwords, private keys, tokens, or full credentials.

## Log Entry Format

- Start each file with a date header.
- For each session, add a timestamped subsection and concise bullets.
- Prefer facts over commentary.
