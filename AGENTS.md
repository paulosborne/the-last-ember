## Agent skills

### Issue tracker

GitHub Issues are the project tracker. See `docs/agents/issue-tracker.md`.

### Triage labels

The repository uses the default five-label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository. See `docs/agents/domain.md`.

### Delegated work

Agents performing delegated implementation, QA, or review work must read `.agents/skills/worker-contract/SKILL.md` before beginning.

## Working conventions

- GitHub Issues are the source of truth for planned work. Follow the issue scope and acceptance criteria; raise ambiguity rather than inventing requirements.
- Before implementation, read the relevant product, domain, architecture, and issue documentation.
- Preserve existing architectural conventions and unrelated user changes. Avoid new dependencies or structural changes unless the agreed scope requires them.
- Never commit, log, report, or fabricate credentials, secrets, tokens, URLs, or product facts.
- Support implementation and verification claims with the commands run and their actual results. Report incomplete work, uncertainty, blockers, and limitations plainly.
- Human approval is required before merges, deployments, or changes to GitHub repository settings.
