import { describe, expect, it } from 'vitest'
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

  it('requires approval for acknowledgements and rejects body images', () => {
    expect(() => parsePublishedChronicles([
      article('unapproved-thanks.md', { acknowledgements: '\n  entries:\n    - Someone' }, '![Not allowed](/images/old-town-placeholder.svg)'),
    ])).toThrow(/acknowledgements require approved: true[\s\S]*inline body images/)
  })

  it('rejects unsafe reference links and every reference-style body image', () => {
    expect(() => parsePublishedChronicles([
      article('unsafe-reference.md', {}, `[Unsafe reference][unsafe]

![Full reference image][image]
![Collapsed reference image][]
![Shortcut reference image]

[unsafe]: javascript:alert(1)
[image]: /images/old-town-placeholder.svg`),
    ])).toThrow(/(?=[\s\S]*unsafe Markdown link "javascript:alert\(1\)")(?=[\s\S]*reference-style body images)/)
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
    expect(isSafeLink('mailto:hello@example.test')).toBe(true)
    expect(isSafeLink('javascript:alert(1)')).toBe(false)
    expect(isSafeLink('data:text/html,unsafe')).toBe(false)
  })
})
