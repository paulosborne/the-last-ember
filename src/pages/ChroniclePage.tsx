import { Link } from 'react-router'
import { PageTitle } from '../components/PageTitle'
import { getChronicleIssuesNewestFirst } from '../content/chronicle'

export function ChroniclePage() {
  const issues = getChronicleIssuesNewestFirst()

  return (
    <>
      <PageTitle title="The Village Chronicle" description="News and notes from The Last Ember's shared life in Longkeep." />
      <section className="page-hero page-hero--chronicle" aria-labelledby="chronicle-title"><p className="eyebrow">From the village noticeboard</p><h1 id="chronicle-title">The Village Chronicle</h1><p>A historical record of what the community has been making, exploring and sharing together.</p></section>
      <section className="section chronicle-archive" aria-label="Chronicle issues">{issues.map((issue) => <article className="chronicle-entry chronicle-entry--full" key={issue.slug}><p className="entry-week">{issue.label}{issue.publishedOn ? ` · ${issue.publishedOn}` : ' · Publication date to be confirmed'}</p><h2>{issue.title}</h2><p className="entry-summary">{issue.excerpt}</p><Link className="text-link" to={`/chronicle/${issue.slug}`}>Read issue <span aria-hidden="true">→</span></Link></article>)}</section>
    </>
  )
}
