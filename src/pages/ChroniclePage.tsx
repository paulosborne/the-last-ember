import { Link } from 'react-router'
import { PageTitle } from '../components/PageTitle'
import { publishedChronicles } from '../content/chronicles'

export function ChroniclePage() {
  const chronicles = publishedChronicles

  return (
    <>
      <PageTitle title="The Village Chronicle" description="News and notes from The Last Ember's shared life in Longkeep." />
      <section className="page-hero page-hero--chronicle" aria-labelledby="chronicle-title"><p className="eyebrow">From the village noticeboard</p><h1 id="chronicle-title">The Village Chronicle</h1><p>A historical record of what the community has been making, exploring and sharing together.</p></section>
      <section className="section chronicle-archive" aria-label="Chronicle archive">{chronicles.length > 0 ? chronicles.map((chronicle) => <article className="chronicle-entry chronicle-entry--full" key={chronicle.slug}><p className="entry-week">Published {chronicle.publishedOn}</p><h2>{chronicle.title}</h2><p className="entry-summary">{chronicle.summary}</p><Link className="text-link" to={`/chronicles/${chronicle.slug}`}>Read Chronicle <span aria-hidden="true">→</span></Link></article>) : <p className="chronicle-empty">No Chronicle articles have been published yet. When there is an approved record to share, it will appear here.</p>}</section>
    </>
  )
}
