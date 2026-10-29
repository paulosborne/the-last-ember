import { chronicleEntries } from './content/chronicle'
import { community } from './config/community'
import './App.css'

const navigation = [
  { href: '#longkeep', label: 'Longkeep' },
  { href: '#community', label: 'Community' },
  { href: '#chronicle', label: 'Chronicle' },
  { href: '#server', label: 'Server' },
]

function DiscordAction({ className = '' }: { className?: string }) {
  if (!community.discordInviteUrl) {
    return (
      <span className={`button button-unavailable ${className}`} aria-label="Discord invitation coming soon">
        Discord invitation coming soon
      </span>
    )
  }

  return (
    <a className={`button ${className}`} href={community.discordInviteUrl}>
      Join us on Discord
    </a>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="The Last Ember home">
          <span>The Last</span> Ember
        </a>
        <nav aria-label="Primary navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <a className="header-join" href="#join">Find the fire</a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/longkeep-hero-placeholder.svg" alt="Placeholder for a wide community screenshot of Longkeep at dusk" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">A community in Embervale</p>
            <h1 id="hero-title">The Last Ember</h1>
            <p className="hero-tagline">Every great story begins with a single spark.</p>
            <p className="hero-intro">A home for adventurers. A village built together.</p>
            <DiscordAction />
          </div>
          <a className="scroll-cue" href="#longkeep">Enter Longkeep <span aria-hidden="true">↓</span></a>
        </section>

        <section className="section longkeep" id="longkeep" aria-labelledby="longkeep-title">
          <div className="section-heading">
            <p className="eyebrow">Our shared home</p>
            <h2 id="longkeep-title">Welcome to Longkeep</h2>
            <p>Longkeep is the settlement we are restoring and growing together: a quiet refuge in Embervale with room to make a place of your own.</p>
          </div>
          <div className="place-grid">
            <article className="place-card old-town">
              <img src="/images/old-town-placeholder.svg" alt="Placeholder for a community screenshot of Longkeep's restored Old Town" loading="lazy" />
              <div className="place-copy">
                <p className="eyebrow">The original settlement</p>
                <h3>Old Town</h3>
                <p>The old ruins are slowly being brought back to life, one abandoned building and forgotten street at a time.</p>
              </div>
            </article>
            <article className="place-card new-longkeep">
              <img src="/images/new-longkeep-placeholder.svg" alt="Placeholder for a community screenshot of New Longkeep" loading="lazy" />
              <div className="place-copy">
                <p className="eyebrow">A village taking root</p>
                <h3>New Longkeep</h3>
                <p>Beyond the ruins, the Great Hall, shared storage and crafting spaces sit alongside the homes each villager is making their own.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section values" id="community" aria-labelledby="community-title">
          <div className="section-heading narrow">
            <p className="eyebrow">A gentler way to adventure</p>
            <h2 id="community-title">Our Community</h2>
            <p>We are here for the unhurried parts of the journey: good company, a shared project, and the satisfaction of seeing a corner of the world become home.</p>
          </div>
          <div className="value-list">
            <article><span>01</span><h3>Good company</h3><p>Friendship and kindness are the foundation of the village.</p></article>
            <article><span>02</span><h3>Made together</h3><p>We explore, build and lend a hand when it is wanted.</p></article>
            <article><span>03</span><h3>Space to create</h3><p>There is room for individual ideas, personal homes and projects that feel like yours.</p></article>
            <article><span>04</span><h3>Your pace is enough</h3><p>There is no pressure to play or progress. Real life comes first; the adventure will always be here.</p></article>
          </div>
        </section>

        <section className="section chronicle" id="chronicle" aria-labelledby="chronicle-title">
          <div className="chronicle-intro">
            <p className="eyebrow">From the village noticeboard</p>
            <h2 id="chronicle-title">The Village Chronicle</h2>
            <p>A small record of what the community has been making, exploring and sharing together.</p>
          </div>
          {chronicleEntries.map((entry) => (
            <article className="chronicle-entry" key={entry.week}>
              <p className="entry-week">{entry.week}</p>
              <h3>{entry.title}</h3>
              <p className="entry-summary">{entry.summary}</p>
              <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </section>

        <section className="section server" id="server" aria-labelledby="server-title">
          <div>
            <p className="eyebrow">Keep an eye on the hearth</p>
            <h2 id="server-title">Server Status</h2>
            <p>Members can check server availability and performance history on our monitoring dashboard.</p>
          </div>
          <a className="button button-outline" href={community.serverDashboardUrl} target="_blank" rel="noreferrer">View Server Dashboard <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div>
            <p className="eyebrow">The fire is warm</p>
            <h2 id="join-title">There's Always Room by the Fire</h2>
            <p>Whether you are setting out for the first time or looking for a quieter place to return to, you are welcome to learn more about Longkeep.</p>
            <DiscordAction />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span>The Last</span> Ember</div>
        <p>An independent Enshrouded community. Not affiliated with Keen Games.</p>
        <div className="footer-links">
          {community.discordInviteUrl ? <a href={community.discordInviteUrl}>Discord</a> : <span>Discord invitation coming soon</span>}
          <a href={community.serverDashboardUrl} target="_blank" rel="noreferrer">Monitoring <span className="sr-only">(opens in a new tab)</span></a>
        </div>
      </footer>
    </>
  )
}

export default App
