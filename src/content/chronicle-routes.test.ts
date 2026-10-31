import { describe, expect, it } from 'vitest'
import { resolveChronicleRoute } from './chronicle-routes'
import type { PublishedChronicle } from './chronicle-validation'

const published: PublishedChronicle[] = [{
  slug: 'fictional-test',
  title: 'Fictional test article',
  summary: 'A test record.',
  publishedOn: '2026-01-01',
  body: 'Test body.',
}]

describe('Chronicle routes', () => {
  it('uses plural archive and article routes as canonical', () => {
    expect(resolveChronicleRoute('/chronicles', published)).toEqual({ kind: 'archive' })
    expect(resolveChronicleRoute('/chronicles/fictional-test', published)).toEqual({ kind: 'article', slug: 'fictional-test' })
  })

  it('redirects only available singular legacy paths', () => {
    expect(resolveChronicleRoute('/chronicle', published)).toEqual({ kind: 'redirect', to: '/chronicles' })
    expect(resolveChronicleRoute('/chronicle/fictional-test', published)).toEqual({ kind: 'redirect', to: '/chronicles/fictional-test' })
    expect(resolveChronicleRoute('/chronicle/draft-or-unknown', published)).toEqual({ kind: 'not-found' })
  })

  it('uses not found for unavailable canonical articles', () => {
    expect(resolveChronicleRoute('/chronicles/fixture', published)).toEqual({ kind: 'not-found' })
    expect(resolveChronicleRoute('/chronicles/fictional-draft-preview', published)).toEqual({ kind: 'not-found' })
  })
})
