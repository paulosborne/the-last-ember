import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MarkdownArticleBody } from '../components/MarkdownArticleBody'
import { parsePublishedChronicles } from './chronicle-validation'
import { isSafeLink } from './markdown-safety'

function article(filename: string, overrides: Record<string, string> = {}, body = 'A safe [local link](/village).') {
  const fields = {
    slug: filename.replace('.md', ''),
    title: 'A fictional Chronicle fixture',
    summary: 'A fictional summary used only for tests.',
    date: '"2026-02-03"',
    status: 'published',
    approval: '\n  approved: true\n  approvedOn: "2026-02-02"',
    ...overrides,
  }
  return {
    filename,
    raw: `---
${Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n')}
---
${body}`,
  }
}

describe('published Chronicle validation', () => {
  it('orders published records newest first, then by slug', () => {
    const records = parsePublishedChronicles([
      article('zeta.md', { date: '"2026-01-01"' }),
      article('alpha.md', { date: '"2026-01-01"' }),
      article('newest.md', { date: '"2026-03-01"' }),
    ])

    expect(records.map((record) => record.slug)).toEqual(['newest', 'alpha', 'zeta'])
  })

  it('allows an empty published corpus', () => {
    expect(parsePublishedChronicles([])).toEqual([])
  })

  it('accepts an unquoted valid YAML date', () => {
    expect(parsePublishedChronicles([article('unquoted-date.md', { date: '2026-02-03' })])[0]?.publishedOn).toBe('2026-02-03')
  })

  it('reports actionable invalid metadata diagnostics', () => {
    expect(() => parsePublishedChronicles([
      article('wrong-name.md', { slug: 'Not-safe', date: '"2026-02-30"', status: 'draft', approval: 'false' }, 'An [unsafe link](javascript:alert(1)).'),
      article('missing-cover.md', { cover: '\n  src: /images/missing.svg\n  alt: ""' }),
    ], { assetExists: () => false })).toThrow(/slug must be lowercase kebab-case[\s\S]*real YYYY-MM-DD[\s\S]*status must be "published"[\s\S]*approval[\s\S]*unsafe Markdown link[\s\S]*cover requires/)
  })

  it('requires approval for acknowledgements and rejects inline body images', () => {
    expect(() => parsePublishedChronicles([
      article('unapproved-thanks.md', { acknowledgements: '\n  entries:\n    - Someone' }, '![Not allowed](/images/old-town-placeholder.svg)'),
    ])).toThrow(/acknowledgements require approved: true[\s\S]*body images are not supported/)
  })

  it('rejects unsafe inline and reference links resolved by the Markdown pipeline', () => {
    expect(() => parsePublishedChronicles([
      article('unsafe-links.md', {}, '[Unsafe inline](javascript:alert(1))\n[Unsafe reference][unsafe\\ label]\n\n[unsafe\\ label]:\n  data:text/html,unsafe'),
    ])).toThrow(/unsafe Markdown link "javascript:alert\(1\)"[\s\S]*unsafe Markdown link "data:text\/html,unsafe"/)
  })

  it('rejects full reference-style body images', () => {
    expect(() => parsePublishedChronicles([
      article('full-reference-image.md', {}, '![Full reference image][image]\n\n[image]: /images/old-town-placeholder.svg'),
    ])).toThrow(/body images are not supported/)
  })

  it('rejects collapsed reference-style body images', () => {
    expect(() => parsePublishedChronicles([
      article('collapsed-reference-image.md', {}, '![Collapsed reference image][]\n\n[collapsed reference image]: /images/old-town-placeholder.svg'),
    ])).toThrow(/body images are not supported/)
  })

  it('rejects shortcut reference-style body images', () => {
    expect(() => parsePublishedChronicles([
      article('shortcut-reference-image.md', {}, '![Shortcut reference image]\n\n[shortcut reference image]: /images/old-town-placeholder.svg'),
    ])).toThrow(/body images are not supported/)
  })

  it('resolves escaped, multiline, and case-insensitive reference labels', () => {
    expect(() => parsePublishedChronicles([
      article('resolved-references.md', {}, `[Escaped label][escaped\\ label]
[Case-insensitive][CASE LABEL]
[Multiline][multiline]

[escaped\\ label]: /chronicles
[case label]: mailto:chronicles@example.test
[multiline]:
  https://example.test/chronicles`),
    ])).not.toThrow()
  })

  it('accepts safe inline and reference link destinations', () => {
    expect(() => parsePublishedChronicles([
      article('safe-links.md', {}, `[HTTP](http://example.test)
[HTTPS](https://example.test)
[Root](/chronicles)
[Relative](articles/today)
[Mail][mail]

[mail]: mailto:chronicles@example.test`),
    ])).not.toThrow()
  })

  it('does not treat malformed references as links', () => {
    const body = '[Not a link][\n\njavascript:alert(1)'
    expect(() => parsePublishedChronicles([article('malformed-reference.md', {}, body)])).not.toThrow()
    expect(renderToStaticMarkup(createElement(MarkdownArticleBody, undefined, body))).not.toContain('<a ')
  })

  it('uses the same escaped-reference interpretation as the Markdown renderer', () => {
    const body = `[Rendered][escaped\\ label]

[escaped\\ label]: /chronicles`
    expect(() => parsePublishedChronicles([article('renderer-alignment.md', {}, body)])).not.toThrow()
    expect(renderToStaticMarkup(createElement(MarkdownArticleBody, undefined, body))).toContain('<a href="/chronicles">Rendered</a>')
  })

  it('rejects cover paths that escape the public images directory', () => {
    for (const src of ['/images/../favicon.svg', '/images/%2e%2e/favicon.svg']) {
      expect(() => parsePublishedChronicles([
        article('escaped-cover.md', { cover: `\n  src: ${src}\n  alt: "Escaped asset"` }),
      ])).toThrow(/cover requires a local \/images\/ src/)
    }
  })

  it('accepts only safe link protocols', () => {
    expect(isSafeLink('https://example.test')).toBe(true)
    expect(isSafeLink('/chronicles')).toBe(true)
    expect(isSafeLink('articles/today')).toBe(true)
    expect(isSafeLink('mailto:hello@example.test')).toBe(true)
    expect(isSafeLink('//example.test')).toBe(false)
    expect(isSafeLink('javascript:alert(1)')).toBe(false)
    expect(isSafeLink('data:text/html,unsafe')).toBe(false)
  })
})
