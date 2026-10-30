import { Link, useParams } from 'react-router'
import { ArticleContent } from '../components/ArticleContent'
import { PageTitle } from '../components/PageTitle'
import { getChronicleIssue } from '../content/chronicle'
import { NotFoundPage } from './NotFoundPage'

export function ChronicleArticlePage() {
  const { slug } = useParams()
  const issue = slug ? getChronicleIssue(slug) : undefined

  if (!issue) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageTitle title={`Chronicle: ${issue.title}`} description={issue.excerpt} />
      <article className="article-layout" aria-labelledby="article-title"><header className="article-header"><p className="eyebrow">The Village Chronicle · {issue.label}</p><h1 id="article-title">{issue.title}</h1><p>{issue.excerpt}</p></header>{issue.featuredImage && <figure className="article-feature"><img src={issue.featuredImage.src} alt={issue.featuredImage.alt} />{issue.featuredImage.caption && <figcaption>{issue.featuredImage.caption}</figcaption>}</figure>}{issue.isEditorialPlaceholder && <aside className="editorial-note">The complete Week One update will be published here when its approved source material is available.</aside>}<ArticleContent sections={issue.sections} />{issue.acknowledgements && <section className="article-section"><h2>With Thanks</h2><ul>{issue.acknowledgements.map((acknowledgement) => <li key={acknowledgement}>{acknowledgement}</li>)}</ul></section>}<Link className="text-link" to="/chronicle">Back to the Chronicle <span aria-hidden="true">←</span></Link></article>
    </>
  )
}
