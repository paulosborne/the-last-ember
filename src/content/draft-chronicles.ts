import { draftChronicles as records } from 'virtual:draft-chronicles'
import type { DraftChronicle } from './chronicle-validation'

export const draftChronicles: DraftChronicle[] = records

export function getDraftChronicle(slug: string): DraftChronicle | undefined {
  return draftChronicles.find((chronicle) => chronicle.slug === slug)
}
