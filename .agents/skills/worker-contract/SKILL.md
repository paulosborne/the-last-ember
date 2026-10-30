---
name: worker-contract
description: Use when delegating implementation, review, or QA work to define scope, authority, verification, and evidence expectations.
---

# Worker Contract

Use this contract for delegated work. Keep it proportionate to the task; small changes may use concise entries, but do not omit safety or verification requirements.

## Assignment

State:

1. Objective and expected deliverable.
2. GitHub Issue number or specification reference.
3. Input revision or commit SHA.
4. Required context and reference documents.
5. Files or areas the worker may modify.
6. Tool permissions and authority, including whether commits, network actions, or configuration changes are allowed.
7. Acceptance criteria and required verification commands.
8. Scope, iteration, and resource limits.

Workers must remain within the agreed scope. They must not invent requirements, credentials, product facts, or verification results. Preserve unrelated changes and ask when a conflict or ambiguity prevents a safe decision.

## Final Report

Report these sections clearly:

- **Completed and verified:** delivered work with evidence.
- **Completed but unverified:** work done without independent verification, and why.
- **Commands and results:** every verification command and its actual outcome.
- **Assumptions and questions:** decisions not confirmed by the issue or documentation.
- **Limitations and defects:** known gaps, failures, or follow-up work.
- **Human review required:** security, migration, deployment, GitHub, or product decisions needing approval.

When blocked, stop before guessing, state the blocker and evidence, identify the smallest required human input, and leave the worktree in a clear state. A worker may not claim completion solely from intent or a successful command unrelated to the acceptance criteria.
