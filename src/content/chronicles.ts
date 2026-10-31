import { publishedChronicles as records } from 'virtual:published-chronicles'
import type { PublishedChronicle } from './chronicle-validation'

export const publishedChronicles: PublishedChronicle[] = records

export function getPublishedChronicle(slug: string): PublishedChronicle | undefined {
  return publishedChronicles.find((chronicle) => chronicle.slug === slug)
}

export function getLatestPublishedChronicle(): PublishedChronicle | undefined {
  return publishedChronicles[0]
}
