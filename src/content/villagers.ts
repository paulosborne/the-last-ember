export type VillagerProfile = {
  slug: string
  name?: string
  playstyle?: string
  portraitImage: string
  homeImage: string
  homeName?: string
  biography?: string
  motto?: string
  isPlaceholder?: boolean
}

export const villagers: VillagerProfile[] = [
  { slug: 'future-villager-1', portraitImage: '/images/villager-portrait-placeholder.svg', homeImage: '/images/villager-home-placeholder.svg', isPlaceholder: true },
  { slug: 'future-villager-2', portraitImage: '/images/villager-portrait-placeholder.svg', homeImage: '/images/villager-home-placeholder.svg', isPlaceholder: true },
  { slug: 'future-villager-3', portraitImage: '/images/villager-portrait-placeholder.svg', homeImage: '/images/villager-home-placeholder.svg', isPlaceholder: true },
]
