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

The Orchestrator permits at most two remediation/re-review cycles. It escalates security risks, unmet criteria, or unresolved findings after that limit.

## Delegation Contract

Every delegation identifies the issue/specification, input revision, context files, allowed files, authority, acceptance criteria, verification commands, and report format from `.agents/skills/worker-contract/SKILL.md`.

The Reviewer must receive the original requirements, exact base and target revisions, changed-file list, implementation evidence, and any remediation history. Reviewer findings remain verbatim in the final delivery report.

## Human Control

The human decides material ambiguity, architectural tradeoffs, scope/cost changes, significant security risks, unmet acceptance criteria, and every merge, deployment, release, or destructive action.

## Invocation

Use `@engineering-orchestrator` in an interactive OpenCode primary session with an issue or specification reference. The Orchestrator delegates to `implementer` and `reviewer` only where the running OpenCode host supports custom subagent delegation.

`opencode run --agent` starts primary agents but cannot directly run subagents. The local task launcher currently has a fixed custom-agent allowlist, so it cannot validate custom Implementer delegation. Do not substitute an unapproved agent when this limitation occurs; report the blocker and use a host that supports primary-to-subagent delegation.
