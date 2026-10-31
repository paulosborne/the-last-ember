import { Link } from 'react-router'
import { DiscordAction } from '../components/DiscordAction'
import { PageTitle } from '../components/PageTitle'
import { VillagerCard } from '../components/VillagerCard'
import { getLatestPublishedChronicle } from '../content/chronicles'
import { villagers } from '../content/villagers'

export function HomePage() {
  const latestChronicle = getLatestPublishedChronicle()

  return (
    <>
      <PageTitle title="Home" description="The Last Ember is a relaxed, cooperative Enshrouded community building a home together in Longkeep." />
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/images/longkeep-hero-placeholder.svg" alt="Placeholder for a wide community screenshot of Longkeep at dusk" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">A community in Embervale</p>
          <h1 id="hero-title">The Last Ember</h1>
          <p className="hero-tagline">Every great story begins with a single spark.</p>
          <p className="hero-intro">A home for adventurers. A village built together.</p>
          <DiscordAction />
        </div>
        <Link className="scroll-cue" to="/village">Enter Longkeep <span aria-hidden="true">↓</span></Link>
      </section>

      <section className="section home-introduction" aria-labelledby="longkeep-title">
        <div className="section-heading"><p className="eyebrow">Our shared home</p><h2 id="longkeep-title">Welcome to Longkeep</h2><p>Longkeep is a settlement being rebuilt and expanded around its ruins: a quiet refuge in Embervale with room to make a place of your own.</p><Link className="text-link" to="/village">Explore the village <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section home-villagers" aria-labelledby="villagers-title">
        <div className="section-heading section-heading--row"><div><p className="eyebrow">The people who make it home</p><h2 id="villagers-title">Meet the Villagers</h2></div><Link className="text-link" to="/villagers">Meet the people of Longkeep <span aria-hidden="true">→</span></Link></div>
        <div className="villager-grid villager-grid--preview">{villagers.slice(0, 2).map((villager) => <VillagerCard key={villager.slug} villager={villager} />)}</div>
      </section>

      <section className="section chronicle-preview" aria-labelledby="chronicle-title">
        <div><p className="eyebrow">From the village noticeboard</p><h2 id="chronicle-title">The Village Chronicle</h2></div>
        {latestChronicle ? <article className="chronicle-entry"><p className="entry-week">Published {latestChronicle.publishedOn}</p><h3>{latestChronicle.title}</h3><p className="entry-summary">{latestChronicle.summary}</p><Link className="text-link" to={`/chronicles/${latestChronicle.slug}`}>Read the Chronicle <span aria-hidden="true">→</span></Link></article> : <p className="chronicle-empty">The Chronicle will appear here when the first approved article is ready to publish.</p>}
      </section>

      <section className="join" id="join" aria-labelledby="join-title"><div><p className="eyebrow">The fire is warm</p><h2 id="join-title">There's Always Room by the Fire</h2><p>Whether you are setting out for the first time or looking for a quieter place to return to, you are welcome to learn more about Longkeep.</p><DiscordAction /></div></section>
    </>
  )
}
