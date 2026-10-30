export type ChronicleImage = {
  src: string
  alt: string
  caption?: string
}

export type ChronicleSection = {
  heading: string
  paragraphs: string[]
  items?: string[]
  image?: ChronicleImage
}

export type ChronicleIssue = {
  slug: string
  issueNumber: number
  label: string
  title: string
  excerpt: string
  publishedOn?: string
  featuredImage?: ChronicleImage
  sections: ChronicleSection[]
  acknowledgements?: string[]
  isEditorialPlaceholder?: boolean
}

export const chronicleIssues: ChronicleIssue[] = [
  {
    slug: 'week-one',
    issueNumber: 1,
    label: 'Issue 1',
    title: 'Week One — A Settlement Reborn',
    excerpt: 'Our first week has been about making Longkeep feel like home: setting roots in the old ruins and giving the new village its shape.',
    isEditorialPlaceholder: true,
    sections: [
      {
        heading: 'Week One',
        paragraphs: ['The first week has been about making Longkeep feel like home: setting roots in the old ruins and giving the new village its shape.'],
        items: [
          'Establishing Old Town and New Longkeep',
          'Improving communal storage',
          'Moving craftspeople into the Great Hall',
          'Creating individual homes',
          'Beginning a network of frontier outposts',
          'Welcoming new community members',
        ],
      },
      {
        heading: 'The Full Record',
        paragraphs: ['The complete Week One community update will be added here when its approved source material is available.'],
      },
    ],
  },
]

export function getChronicleIssue(slug: string) {
  return chronicleIssues.find((issue) => issue.slug === slug)
}

export function getChronicleIssuesNewestFirst() {
  return [...chronicleIssues].sort((a, b) => b.issueNumber - a.issueNumber)
}

export function getLatestChronicleIssue() {
  return getChronicleIssuesNewestFirst()[0]
}
