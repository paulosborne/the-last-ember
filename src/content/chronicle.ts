export type ChronicleEntry = {
  week: string
  title: string
  summary: string
  highlights: string[]
}

export const chronicleEntries: ChronicleEntry[] = [
  {
    week: 'Week One',
    title: 'A Settlement Reborn',
    summary: 'Our first week has been about making Longkeep feel like home: setting roots in the old ruins and giving the new village its shape.',
    highlights: [
      'Establishing Old Town and New Longkeep',
      'Improving communal storage',
      'Moving craftspeople into the Great Hall',
      'Creating individual homes',
      'Beginning a network of frontier outposts',
      'Welcoming new community members',
    ],
  },
]
