import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from '../components/places/FilterPanel'
import PlaceCard from '../components/places/PlaceCard'
import { getPlaces } from '../services/placesService'
import {
  EMPTY_FILTERS,
  filterPlaces,
  filtersToParams,
  hasActiveFilters,
  parseFilters,
} from '../lib/filters'
import type { Filters } from '../lib/filters'
import type { Place } from '../types/place'
import { usePageTitle } from '../lib/usePageTitle'

export default function Explore() {
  usePageTitle('Explorer')
  const [searchParams, setSearchParams] = useSearchParams()
  const [places, setPlaces] = useState<Place[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

  const filters = parseFilters(searchParams)

  useEffect(() => {
    getPlaces()
      .then((data) => {
        setPlaces(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const communes = useMemo(
    () => Array.from(new Set(places.map((p) => p.commune))).sort(),
    [places],
  )
  const results = useMemo(() => filterPlaces(places, filters), [places, filters])

  function updateFilters(next: Filters) {
    setSearchParams(filtersToParams(next), { replace: true })
  }

  return (
    <div className="container explore">
      <h1>Explorer</h1>

      <div className="explore__layout">
        <FilterPanel
          filters={filters}
          communes={communes}
          onChange={updateFilters}
          onReset={() => updateFilters(EMPTY_FILTERS)}
          canReset={hasActiveFilters(filters)}
        />

        <section aria-labelledby="results-title">
          <h2 id="results-title" className="explore__count" aria-live="polite">
            {status === 'ready'
              ? `${results.length} ${results.length > 1 ? 'résultats' : 'résultat'}`
              : 'Résultats'}
          </h2>

          {status === 'loading' && <p className="state" role="status">Chargement…</p>}
          {status === 'error' && (
            <p className="state state--error" role="alert">
              Impossible de charger les lieux. Veuillez réessayer plus tard.
            </p>
          )}
          {status === 'ready' && results.length === 0 && (
            <div className="state">
              <p>Aucun lieu ne correspond à votre recherche.</p>
              {hasActiveFilters(filters) && (
                <button type="button" className="btn btn--secondary" onClick={() => updateFilters(EMPTY_FILTERS)}>
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
          {status === 'ready' && results.length > 0 && (
            <div className="grid">
              {results.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}