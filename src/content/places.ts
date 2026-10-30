export type PlaceImage = {
  src: string
  alt: string
}

export type Place = {
  slug: string
  name: string
  description: string
  category: string
  screenshots?: PlaceImage[]
  contributor?: string
  isPlaceholder?: boolean
}

export const places: Place[] = [
  { slug: 'great-hall', name: 'The Great Hall', description: 'A shared building where craftspeople are being relocated.', category: 'New Longkeep', screenshots: [{ src: '/images/new-longkeep-placeholder.svg', alt: 'Placeholder for a screenshot of the Great Hall' }], isPlaceholder: true },
  { slug: 'communal-storage', name: 'Communal Storage', description: 'A shared storage area being improved by the community.', category: 'New Longkeep', screenshots: [{ src: '/images/new-longkeep-placeholder.svg', alt: 'Placeholder for a screenshot of communal storage' }], isPlaceholder: true },
  { slug: 'crafting-workshops', name: 'Crafting Workshops', description: 'Shared crafting facilities in New Longkeep.', category: 'New Longkeep', screenshots: [{ src: '/images/new-longkeep-placeholder.svg', alt: 'Placeholder for a screenshot of crafting workshops' }], isPlaceholder: true },
  { slug: 'individual-homes', name: 'Individual Homes', description: 'Homes being created by individual villagers.', category: 'Longkeep', screenshots: [{ src: '/images/villager-home-placeholder.svg', alt: 'Placeholder for a screenshot of an individual home' }], isPlaceholder: true },
  { slug: 'frontier-outposts', name: 'Frontier Outposts', description: 'A growing network of outposts beyond Longkeep.', category: 'Frontier', screenshots: [{ src: '/images/longkeep-hero-placeholder.svg', alt: 'Placeholder for a screenshot of a frontier outpost' }], isPlaceholder: true },
]
