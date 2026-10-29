import { DiscordAction } from '../components/DiscordAction'
import { PageTitle } from '../components/PageTitle'

export function VillagePage() {
  return (
    <>
      <PageTitle title="The Village" description="Discover Longkeep, the shared settlement The Last Ember is restoring and growing together." />
      <section className="page-hero" aria-labelledby="village-title"><p className="eyebrow">Our shared home</p><h1 id="village-title">The Village</h1><p>Longkeep is a place being patiently restored and expanded together, with the old settlement at its heart and a growing village beyond.</p></section>
      <section className="section place-grid" aria-label="The two areas of Longkeep">
        <article className="place-card"><img src="/images/old-town-placeholder.svg" alt="Placeholder for a community screenshot of Longkeep's restored Old Town" /><div className="place-copy"><p className="eyebrow">The original settlement</p><h2>Old Town</h2><p>The old ruins are slowly being brought back to life as Longkeep's original settlement is restored.</p></div></article>
        <article className="place-card"><img src="/images/new-longkeep-placeholder.svg" alt="Placeholder for a community screenshot of New Longkeep" /><div className="place-copy"><p className="eyebrow">A village taking root</p><h2>New Longkeep</h2><p>Beyond the ruins, the Great Hall, shared storage and crafting spaces sit alongside the homes each villager is making their own.</p></div></article>
      </section>
      <section className="section village-future" aria-labelledby="village-future-title"><div><p className="eyebrow">There is more to share</p><h2 id="village-future-title">A settlement still taking shape</h2><p>This page has room for the buildings, homes, shared spaces and frontier outposts that the community chooses to share as Longkeep grows.</p></div><img src="/images/longkeep-hero-placeholder.svg" alt="Placeholder for a future community screenshot of Longkeep" loading="lazy" /></section>
      <section className="join join--compact" aria-labelledby="village-join-title"><div><p className="eyebrow">Build at your own pace</p><h2 id="village-join-title">A Place to Settle In</h2><p>Real life comes first. The adventure will always be here.</p><DiscordAction /></div></section>
    </>
  )
}
