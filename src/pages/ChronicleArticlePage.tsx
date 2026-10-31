import { Link, useParams } from 'react-router'
import { ChronicleCover } from '../components/ChronicleCover'
import { MarkdownArticleBody } from '../components/MarkdownArticleBody'
import { PageTitle } from '../components/PageTitle'
import { getPublishedChronicle } from '../content/chronicles'
import type { PublishedChronicle } from '../content/chronicle-validation'
import { NotFoundPage } from './NotFoundPage'

export function ChronicleArticlePage() {
  const { slug } = useParams()
  const chronicle = slug ? getPublishedChronicle(slug) : undefined

  if (!chronicle) {
    return <NotFoundPage />
  }

  return <ChronicleArticle chronicle={chronicle} />
}

type ChronicleArticleProps = {
  chronicle: PublishedChronicle
  isPreview?: boolean
}

export function ChronicleArticle({ chronicle, isPreview = false }: ChronicleArticleProps) {
  const publicationLabel = isPreview ? 'Unpublished draft · local development preview only' : `Published ${chronicle.publishedOn}`

  return (
    <>
      <PageTitle title={isPreview ? `Unpublished preview: ${chronicle.title}` : `Chronicle: ${chronicle.title}`} description={chronicle.summary} />
      <article className="article-layout" aria-labelledby="article-title"><header className="article-header"><p className="eyebrow">The Village Chronicle · {publicationLabel}</p><h1 id="article-title">{chronicle.title}</h1><p>{chronicle.summary}</p></header>{chronicle.cover && <ChronicleCover cover={chronicle.cover} />}<MarkdownArticleBody>{chronicle.body}</MarkdownArticleBody>{chronicle.acknowledgements && <section className="article-section"><h2>With Thanks</h2><ul>{chronicle.acknowledgements.map((acknowledgement) => <li key={acknowledgement}>{acknowledgement}</li>)}</ul></section>}<Link className="text-link" to="/chronicles">Back to the Chronicle <span aria-hidden="true">←</span></Link></article>
    </>
  )
}
