import type { VillagerProfile } from '../content/villagers'

type VillagerCardProps = {
  villager: VillagerProfile
}

export function VillagerCard({ villager }: VillagerCardProps) {
  const name = villager.name ?? 'Profile forthcoming'
  const portraitAlt = villager.name ? `${villager.name}'s character portrait` : 'Placeholder for a Longkeep villager character portrait'
  const homeAlt = villager.homeName ? `Placeholder for a screenshot of ${villager.homeName}` : 'Placeholder for a Longkeep villager home screenshot'

  return (
    <article className="villager-card">
      <div className="villager-card-portrait"><img src={villager.portraitImage} alt={portraitAlt} loading="lazy" /></div>
      <div className="villager-card-home"><img src={villager.homeImage} alt={homeAlt} loading="lazy" /></div>
      <div className="villager-card-content">
        <p className="eyebrow">{villager.playstyle ?? 'A place in Longkeep'}</p>
        <h3>{name}</h3>
        {villager.homeName && <p className="villager-home">{villager.homeName}</p>}
        {villager.biography && <p>{villager.biography}</p>}
        {villager.motto && <p className="villager-motto">“{villager.motto}”</p>}
        {villager.isPlaceholder && <p className="villager-note">This profile is waiting for approved community details.</p>}
      </div>
    </article>
  )
}
