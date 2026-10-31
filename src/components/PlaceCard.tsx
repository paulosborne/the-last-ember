import type { Place } from '../content/places'

type PlaceCardProps = {
  place: Place
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="place-record">
      {place.screenshots && <div className="place-record-images">{place.screenshots.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}</div>}
      <div className="place-record-content">
        <p className="eyebrow">{place.category}</p>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        {place.contributor && <p className="record-byline">Shared by {place.contributor}</p>}
        {place.isPlaceholder && <p className="record-note">Screenshot and further details to be shared</p>}
      </div>
    </article>
  )
}
