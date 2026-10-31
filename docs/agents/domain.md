# Domain Docs

How the engineering skills should consume this repository's domain documentation when exploring the codebase.

## Before exploring, read these

- `GLOSSARY.md` at the repository root, or `GLOSSARY-MAP.md` if it exists.
- Relevant decisions in `docs/adr/`.

If these files do not exist, proceed silently. The domain-modeling workflow creates them only when terms or decisions are actually resolved.

## File structure

This is a single-context repository:

```
/
├── GLOSSARY.md
├── docs/adr/
└── src/
```

## Use the glossary's vocabulary

Use terms defined in `GLOSSARY.md` in issues, tests, and proposals. If a necessary concept is absent, either reconsider invented language or record it for domain modeling.

## Flag ADR conflicts

Surface any conflict with an existing ADR rather than silently overriding it.
