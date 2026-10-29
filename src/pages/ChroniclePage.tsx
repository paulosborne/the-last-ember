import { PageTitle } from '../components/PageTitle'
import { chronicleEntries } from '../content/chronicle'

export function ChroniclePage() {
  return (
    <>
      <PageTitle title="The Village Chronicle" description="News and notes from The Last Ember's shared life in Longkeep." />
      <section className="page-hero page-hero--chronicle" aria-labelledby="chronicle-title"><p className="eyebrow">From the village noticeboard</p><h1 id="chronicle-title">The Village Chronicle</h1><p>A small record of what the community has been making, exploring and sharing together.</p></section>
      <section className="section chronicle-archive" aria-label="Chronicle entries">{chronicleEntries.map((entry) => <article className="chronicle-entry chronicle-entry--full" key={entry.week}><p className="entry-week">{entry.week}</p><h2>{entry.title}</h2><p className="entry-summary">{entry.summary}</p><ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</section>
    </>
  )
}
