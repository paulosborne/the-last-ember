# Chronicle content

Only human-approved public Markdown belongs in `published/`. The public website imports only
`published/*.md`; `drafts/` and `fixtures/` must remain safe for every repository reader
and are never public content. Drafts are available only to the Vite development server and
are not imported or bundled by a production build.

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

## Local draft preview workflow

1. Create `drafts/<lowercase-kebab-case-slug>.md` with the same `slug`, title, summary,
   date, optional cover, acknowledgements, and approved Markdown restrictions shown above.
   Set `status: draft` and use approval metadata exactly as `approval: { approved: false }`;
   do not add `approvedOn` until a human has approved publication. Drafts must be explicitly
   fictional or otherwise safe for repository readers.
2. Run `npm run dev`, then open `http://localhost:5173/chronicles/preview/<slug>` (for the
   committed fictional fixture: `http://localhost:5173/chronicles/preview/fictional-draft-preview`).
   Every preview is marked unpublished and is local-development-only.
3. Revise the draft and refresh the preview. The development server validates draft metadata,
   covers, links, and unsupported Markdown just as it does Chronicle content.
4. Obtain human publication approval and record `approval.approved: true` plus the real
   `approval.approvedOn` date. Move or copy the reviewed Markdown to
   `published/<slug>.md`, change `status` to `published`, and complete the normal review.
   Never rely on the preview route as publication: it is not present in production.
