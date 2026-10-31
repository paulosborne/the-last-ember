declare module 'virtual:published-chronicles' {
  import type { PublishedChronicle } from './content/chronicle-validation'

  export const publishedChronicles: PublishedChronicle[]
}

declare module 'virtual:draft-chronicles' {
  import type { DraftChronicle } from './content/chronicle-validation'

  export const draftChronicles: DraftChronicle[]
}

declare module 'virtual:chronicle-preview-route' {
  import type { ReactElement } from 'react'

  export const chroniclePreviewRoute: ReactElement | null
}
