import { useParams } from 'react-router'
import { getDraftChronicle } from '../content/draft-chronicles'
import { ChronicleArticle } from './ChronicleArticlePage'
import { NotFoundPage } from './NotFoundPage'

export function ChroniclePreviewPage() {
  const { slug } = useParams()
  const chronicle = slug ? getDraftChronicle(slug) : undefined

  if (!chronicle) return <NotFoundPage />

  return <ChronicleArticle chronicle={chronicle} isPreview />
}
