import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock, MapPin, Phone, ArrowLeft } from 'lucide-react'
import PlaceCard from '../components/places/PlaceCard'
import { getPlaceBySlug, getPlaces } from '../services/placesService'
import { getSimilarPlaces } from '../lib/filters'
import { priceSymbols } from '../lib/format'
import { CATEGORY_LABELS, PRICE_LABELS } from '../types/place'
import type { Place } from '../types/place'
import { usePageTitle } from '../lib/usePageTitle'

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'not-found' }
  | { status: 'ready'; place: Place; similar: Place[] }

export default function PlaceDetail() {
  const { slug = '' } = useParams()
  const [state, setState] = useState<State>({ status: 'loading' })
usePageTitle(state.status === 'ready' ? state.place.name : 'Lieu')

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })

    Promise.all([getPlaceBySlug(slug), getPlaces()])
      .then(([place, all]) => {
        if (cancelled) return
        if (!place) setState({ status: 'not-found' })
        else setState({ status: 'ready', place, similar: getSimilarPlaces(all, place) })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (state.status === 'loading') {
    return <div className="container detail"><p className="state" role="status">Chargement…</p></div>
  }

  if (state.status === 'error') {
    return (
      <div className="container detail">
        <p className="state state--error" role="alert">
          Impossible de charger ce lieu. Veuillez réessayer plus tard.
        </p>
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <div className="container detail">
        <h1>Lieu introuvable</h1>
        <p>Ce lieu n'existe pas ou n'est plus disponible.</p>
        <Link to="/explorer" className="btn btn--primary">Retour à l'exploration</Link>
      </div>
    )
  }

  const { place, similar } = state

  return (
    <div className="container detail">
      <p>
        <Link to="/explorer" className="detail__back">
          <ArrowLeft size={18} aria-hidden="true" /> Retour aux résultats
        </Link>
      </p>

      <span className="badge">{CATEGORY_LABELS[place.category]}</span>
      <h1>{place.name}</h1>

      <div className="detail__layout">
        <div>
          <div className="detail__visual" role="img" aria-label={`Illustration de ${place.name} (image à venir)`}>
            Image à venir
          </div>

          <h2>Description</h2>
          <p>{place.description}</p>

          {place.tags.length > 0 && (
            <ul className="tag-list" aria-label="Mots-clés">
              {place.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>

        <aside aria-labelledby="infos-title">
          <h2 id="infos-title">Informations pratiques</h2>
          <dl className="info-list">
            <div>
              <dt><MapPin size={16} aria-hidden="true" /> Adresse</dt>
              <dd>{place.address}, {place.commune}</dd>
            </div>
            <div>
              <dt><Clock size={16} aria-hidden="true" /> Horaires</dt>
              <dd>{place.hours}</dd>
            </div>
            <div>
              <dt>Prix indicatif</dt>
              <dd>{priceSymbols(place.priceLevel)} · {PRICE_LABELS[place.priceLevel]}</dd>
            </div>
            {place.phone && (
              <div>
                <dt><Phone size={16} aria-hidden="true" /> Contact</dt>
                <dd>{place.phone} (numéro fictif)</dd>
              </div>
            )}
          </dl>

          <div className="detail__map" role="img" aria-label={`Emplacement simulé : ${place.commune}`}>
            Carte simulée · {place.commune}
          </div>
          <p className="detail__note">Contenu de démonstration : ce lieu est fictif.</p>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="section" aria-labelledby="similar-title">
          <h2 id="similar-title">Lieux similaires</h2>
          <div className="grid">
            {similar.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}