import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Place } from '../../types/place'
import { CATEGORY_LABELS } from '../../types/place'
import { priceSymbols } from '../../lib/format'

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="place-card card">
     <span className="badge">{CATEGORY_LABELS [place.category]}</span>
       <h3 className="place-card__title">
        <Link to={`/lieux/${place.slug}`}>{place.name}</Link>
      </h3>
      <p className="place-card__meta">
        <MapPin size={16} aria-hidden="true" />
        {place.commune}
        <span>
  · <span aria-hidden="true">{priceSymbols(place.priceLevel)}</span>
  <span className="visually-hidden">Niveau de prix {place.priceLevel} sur 3</span>
</span>
      </p>
      <p>{place.description}</p>
    </article>
  )
}