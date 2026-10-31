# Chronicle content

Only human-approved public Markdown belongs in `published/`. The website imports only
`published/*.md`; `drafts/` and `fixtures/` must remain safe for every repository reader
and are never public content.

Each published filename is its lowercase kebab-case slug. Its frontmatter must use this
shape (quote dates so they remain exact strings):

```md
---
slug: example-article
title: Example article title
summary: A concise public summary.
date: "2026-01-01"
status: published
approval:
  approved: true
  approvedOn: "2026-01-01"
cover:
  src: /images/approved-cover.svg
  alt: An accurate description of the cover image.
  caption: Optional caption.
acknowledgements:
  approved: true
  entries:
    - Approved acknowledgement.
---
```

`cover` and `acknowledgements` are optional. A cover must use an existing local
`public/images/` asset and must have nonempty alt text. Body images, HTML, embeds,
MDX, and components are not supported. Markdown links may be relative, fragment,
HTTP(S), or `mailto:` links; unsafe links fail build validation.

`npm run build` validates published metadata before producing the client bundle.
Do not add Week One until its source, date, and human publication approval are complete.
