import matter from 'gray-matter'
import { isSafeLink } from './markdown-safety.js'

export type ChronicleCover = {
  src: string
  alt: string
  caption?: string
}

export type PublishedChronicle = {
  slug: string
  title: string
  summary: string
  publishedOn: string
  cover?: ChronicleCover
  acknowledgements?: string[]
  body: string
}

export type ChronicleSource = {
  filename: string
  raw: string
}

type ValidationOptions = {
  assetExists?: (src: string) => boolean
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isRealDate(value: string): boolean {
  if (!datePattern.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

function validateBody(filename: string, body: string, errors: string[]) {
  if (/!\[[^\]]*\]\([^)]*\)/.test(body)) {
    errors.push(`${filename}: inline body images are not supported; use the cover metadata instead`)
  }

  for (const match of body.matchAll(/(?<!!)\[[^\]]*\]\(([^\s)]+)/g)) {
    const href = match[1]
    if (!isSafeLink(href)) errors.push(`${filename}: unsafe Markdown link "${href}"`)
  }
}

export function parsePublishedChronicles(sources: ChronicleSource[], options: ValidationOptions = {}): PublishedChronicle[] {
  const errors: string[] = []
  const chronicles: PublishedChronicle[] = []
  const seenSlugs = new Set<string>()

  for (const source of sources) {
    let parsed: ReturnType<typeof matter>
    try {
      parsed = matter(source.raw)
    } catch (error) {
      errors.push(`${source.filename}: cannot parse frontmatter (${error instanceof Error ? error.message : String(error)})`)
      continue
    }

    const data = parsed.data
    const filenameSlug = source.filename.replace(/\.md$/, '')
    const slug = data.slug
    const title = data.title
    const summary = data.summary
    const publishedOn = data.date

    if (!nonEmptyString(slug) || !slugPattern.test(slug)) errors.push(`${source.filename}: slug must be lowercase kebab-case`)
    if (slug !== filenameSlug) errors.push(`${source.filename}: slug must match its filename`)
    if (nonEmptyString(slug) && seenSlugs.has(slug)) errors.push(`${source.filename}: slug "${slug}" must be unique`)
    if (nonEmptyString(slug)) seenSlugs.add(slug)
    if (!nonEmptyString(title)) errors.push(`${source.filename}: title is required`)
    if (!nonEmptyString(summary)) errors.push(`${source.filename}: summary is required`)
    if (!nonEmptyString(publishedOn) || !isRealDate(publishedOn)) errors.push(`${source.filename}: date must be a real YYYY-MM-DD date`)
    if (data.status !== 'published') errors.push(`${source.filename}: status must be "published"`)

    const approval = data.approval
    if (!isRecord(approval) || approval.approved !== true || !nonEmptyString(approval.approvedOn) || !isRealDate(approval.approvedOn)) {
      errors.push(`${source.filename}: approval must include approved: true and a real approvedOn date`)
    }

    let cover: ChronicleCover | undefined
    if (data.cover !== undefined) {
      if (!isRecord(data.cover) || !nonEmptyString(data.cover.src) || !data.cover.src.startsWith('/images/') || !nonEmptyString(data.cover.alt)) {
        errors.push(`${source.filename}: cover requires a local /images/ src and nonempty alt text`)
      } else {
        if (data.cover.caption !== undefined && !nonEmptyString(data.cover.caption)) errors.push(`${source.filename}: cover caption must be nonempty when provided`)
        if (options.assetExists && !options.assetExists(data.cover.src)) errors.push(`${source.filename}: cover asset "${data.cover.src}" does not exist`)
        cover = { src: data.cover.src, alt: data.cover.alt, ...(nonEmptyString(data.cover.caption) ? { caption: data.cover.caption } : {}) }
      }
    }

    let acknowledgements: string[] | undefined
    if (data.acknowledgements !== undefined) {
      const acknowledgementsData = data.acknowledgements
      const entries = isRecord(acknowledgementsData) ? acknowledgementsData.entries : undefined
      if (!isRecord(acknowledgementsData) || acknowledgementsData.approved !== true || !Array.isArray(entries) || !entries.every(nonEmptyString)) {
        errors.push(`${source.filename}: acknowledgements require approved: true and nonempty entries`)
      } else {
        acknowledgements = entries
      }
    }

    validateBody(source.filename, parsed.content, errors)
    if (nonEmptyString(slug) && nonEmptyString(title) && nonEmptyString(summary) && nonEmptyString(publishedOn)) {
      chronicles.push({ slug, title, summary, publishedOn, ...(cover ? { cover } : {}), ...(acknowledgements ? { acknowledgements } : {}), body: parsed.content })
    }
  }

  if (errors.length > 0) throw new Error(`Chronicle metadata validation failed:\n- ${errors.join('\n- ')}`)
  return chronicles.sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || a.slug.localeCompare(b.slug))
}
