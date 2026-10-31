# Engineering Orchestrator

The Engineering Orchestrator is a primary OpenCode agent that coordinates bounded delivery. It does not edit production files.

## Lifecycle

| Stage | Exit criterion |
| --- | --- |
| REQUIREMENTS | Scope, source of truth, ambiguities, risks, and human decisions are explicit. |
| PLANNING | Acceptance criteria, verification commands, base revision, and worker scopes are defined. |
| IMPLEMENTATION | Implementer reports completed work and actual command results. |
| VALIDATION | Required commands have passed or failures are reported. |
| INDEPENDENT REVIEW | Reviewer receives the diff, requirements, evidence, and reports a conclusion. |
| REMEDIATION | Implementer addresses only supported findings. |
| RE-REVIEW | Reviewer assesses the remediation scope and unresolved findings. |
| HUMAN APPROVAL | Human receives delivery status, risks, evidence, and merge/deployment decision. |

The Orchestrator permits at most two remediation/re-review cycles in the same subsystem. If both are unsuccessful, it stops for a root-cause reassessment and escalates security risks, unmet criteria, and unresolved findings. Findings are never suppressed.

## Delegation Contract

Every delegation carries the worker-contract handoff packet: canonical original requirements and acceptance criteria, exact base and target refs, complete changed-file list, scope and authority, relevant context, an evidence ledger, risk tier/rationale, open finding IDs, remediation history, and the required next output. Unknown or unrun items are explicit; original requirements are never replaced by a summary.

Risk is `lightweight`, `standard`, or `security-critical`. Lightweight work excludes authentication/authorization, permissions, secrets, external I/O, persistence/schema, shared components, generated/release artifacts, dependencies/configuration, and unclear impact. Uncertainty escalates. Security-critical work retains the strongest available model and independent review.

Validation reuses evidence only when demonstrably unaffected. Rerun affected acceptance and shared-dependency checks plus reviewer-requested and environment-sensitive checks. Document why each unrepeated check remains valid. Final validation evidence is mandatory.

The Reviewer must receive the complete packet before full review or focused re-review. Focused re-review covers only remediation and affected dependencies, remains independent, and uses the canonical original requirements. Reviewer findings remain verbatim in the final delivery report.

## Local Observability

Use only existing local OpenCode stats, session, or sanitized export facilities and approved data-handling rules. Never retain or share raw exports, prompts, or secrets. Do not claim time, token, or cost savings without attributable measurements; label estimates as assumptions.

## Non-destructive Benchmark Protocol Template

Use a docs-only task to compare a baseline and workflow run:

```text
Task/ref:
Required custom delegation preflight: pass | STOP (reason)
Baseline/run local metric or elapsed time:
Completed handoffs:
Sanitized evidence location:
Unavailable metrics / assumptions:
```

Before each run, verify that the required custom delegation can execute. If it cannot, stop and report the preflight failure; do not substitute an agent or collect telemetry. Do not record raw exports, prompts, or secrets, and do not present unavailable metrics as savings.

## Human Control

The human decides material ambiguity, architectural tradeoffs, scope/cost changes, significant security risks, unmet acceptance criteria, and every merge, deployment, release, or destructive action.

## Invocation

Use `@engineering-orchestrator` in an interactive OpenCode primary session with an issue or specification reference. The Orchestrator delegates to `implementer` and `reviewer` only where the running OpenCode host supports custom subagent delegation.

`opencode run --agent` starts primary agents but cannot directly run subagents. The local task launcher currently has a fixed custom-agent allowlist, so it cannot validate custom Implementer delegation. Do not substitute an unapproved agent when this limitation occurs; report the blocker and use a host that supports primary-to-subagent delegation.
