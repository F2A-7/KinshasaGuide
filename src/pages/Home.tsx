import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'
import { Utensils, BedDouble, Landmark, Waves, Coffee } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SearchBar from '../components/places/SearchBar'
import PlaceCard from '../components/places/PlaceCard'
import { getFeaturedPlaces } from '../services/placesService'
import { CATEGORY_LABELS } from '../types/place'
import type { Category, Place } from '../types/place'


const categoryIcons: Record<Category, LucideIcon> = {
  restaurant: Utensils,
  hotel: BedDouble,
  tourisme: Landmark,
  loisirs: Waves,
  cafe: Coffee,
}

const communes = ['Gombe', 'Limete', 'Ngaliema', 'Nsele']

export default function Home() {
  usePageTitle()
  const [featured, setFeatured] = useState<Place[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

  useEffect(() => {
    getFeaturedPlaces()
      .then((data) => {
        setFeatured(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Découvrez les bonnes adresses de Kinshasa</h1>
          <p className="hero__lead">
            Restaurants, hôtels, lieux à visiter et activités : trouvez où aller, commune par commune.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="section container" aria-labelledby="cat-title">
        <h2 id="cat-title">Parcourir par catégorie</h2>
        <ul className="category-list">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => {
            const Icon = categoryIcons[cat]
            return (
              <li key={cat}>
                <Link to={`/explorer?categorie=${cat}`} className="category-link">
                  <Icon size={22} aria-hidden="true" />
                  {CATEGORY_LABELS[cat]}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="section container" aria-labelledby="commune-title">
        <h2 id="commune-title">Destinations populaires</h2>
        <ul className="chip-list">
          {communes.map((c) => (
            <li key={c}>
              <Link to={`/explorer?commune=${c}`} className="chip">{c}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="featured-title">
        <h2 id="featured-title">Lieux recommandés</h2>
        {status === 'loading' && <p className="state" role="status">Chargement…</p>}
        {status === 'error' && (
          <p className="state state--error" role="alert">
            Impossible de charger les lieux. Veuillez réessayer plus tard.
          </p>
        )}
        {status === 'ready' && (
          <div className="grid">
            {featured.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        )}
        <p className="home-note">Tous les établissements présentés sont fictifs (contenu de démonstration).</p>
      </section>

      <section className="section container">
        <div className="cta card">
          <h2>Un lieu à faire connaître ?</h2>
          <p>Proposez un restaurant, un hôtel ou une activité pour enrichir KinsGuide.</p>
          <Link to="/ajouter" className="btn btn--primary">Proposer un établissement</Link>
        </div>
      </section>
    </>
  )
}