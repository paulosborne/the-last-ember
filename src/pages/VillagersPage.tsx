import { PageTitle } from '../components/PageTitle'
import { VillagerCard } from '../components/VillagerCard'
import { villagers } from '../content/villagers'

export function VillagersPage() {
  return (
    <>
      <PageTitle title="The People of Longkeep" description="Meet the people making a home in Longkeep." />
      <section className="page-hero page-hero--villagers" aria-labelledby="villagers-title"><p className="eyebrow">The community at its heart</p><h1 id="villagers-title">The People of Longkeep</h1><p>Every home has a story. Every adventurer has a place.</p></section>
      <section className="section villagers-introduction" aria-labelledby="villager-gallery-title"><div className="section-heading"><p className="eyebrow">Coming together, in time</p><h2 id="villager-gallery-title">Stories waiting to be shared</h2><p>These spaces are reserved for the people who call Longkeep home. Authentic profiles and screenshots will be added when each villager chooses to share them.</p></div><div className="villager-grid">{villagers.map((villager) => <VillagerCard key={villager.slug} villager={villager} />)}</div></section>
    </>
  )
}
