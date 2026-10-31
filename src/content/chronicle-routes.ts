import type { PublishedChronicle } from './chronicle-validation'

export type ChronicleRoute =
  | { kind: 'archive' }
  | { kind: 'article'; slug: string }
  | { kind: 'redirect'; to: string }
  | { kind: 'not-found' }

export function resolveChronicleRoute(pathname: string, chronicles: PublishedChronicle[]): ChronicleRoute {
  if (pathname === '/chronicles') return { kind: 'archive' }
  if (pathname === '/chronicle') return { kind: 'redirect', to: '/chronicles' }

  const match = pathname.match(/^\/(chronicles|chronicle)\/([^/]+)$/)
  if (!match) return { kind: 'not-found' }
  const [, route, slug] = match
  const exists = chronicles.some((chronicle) => chronicle.slug === slug)
  if (!exists) return { kind: 'not-found' }
  return route === 'chronicle' ? { kind: 'redirect', to: `/chronicles/${slug}` } : { kind: 'article', slug }
}
