import { describe, it, expect } from 'vitest'
import { EMPTY_FILTERS, filterPlaces, getSimilarPlaces, parseFilters } from './filters'
import type { Place } from '../types/place'

function makePlace(overrides: Partial<Place>): Place {
  return {
    id: 'x',
    slug: 'x',
    name: 'Lieu',
    category: 'restaurant',
    commune: 'Gombe',
    address: 'Adresse',
    description: 'Description',
    priceLevel: 1,
    hours: '24h',
    tags: [],
    featured: false,
    ...overrides,
  }
}

const places: Place[] = [
  makePlace({ id: 'a', name: 'Chez Alpha', category: 'restaurant', commune: 'Gombe', priceLevel: 1 }),
  makePlace({ id: 'b', name: 'Bistro Beta', category: 'restaurant', commune: 'Limete', priceLevel: 3 }),
  makePlace({ id: 'c', name: 'Café Gamma', category: 'cafe', commune: 'Gombe', priceLevel: 2 }),
  makePlace({ id: 'd', name: 'Hôtel Delta', category: 'hotel', commune: 'Limete', priceLevel: 3 }),
]

describe('filterPlaces', () => {
  it('renvoie tous les lieux sans filtre', () => {
    expect(filterPlaces(places, EMPTY_FILTERS)).toHaveLength(4)
  })

  it('filtre par catégorie', () => {
    const result = filterPlaces(places, { ...EMPTY_FILTERS, categorie: 'restaurant' })
    expect(result.map((p) => p.id)).toEqual(['a', 'b'])
  })

  it('combine plusieurs filtres', () => {
    const result = filterPlaces(places, { ...EMPTY_FILTERS, categorie: 'restaurant', commune: 'Gombe' })
    expect(result.map((p) => p.id)).toEqual(['a'])
  })

  it('filtre par prix', () => {
    const result = filterPlaces(places, { ...EMPTY_FILTERS, prix: 3 })
    expect(result.map((p) => p.id)).toEqual(['b', 'd'])
  })

  it('ignore les accents et les majuscules dans la recherche', () => {
    expect(filterPlaces(places, { ...EMPTY_FILTERS, q: 'CAFE' }).map((p) => p.id)).toEqual(['c'])
    expect(filterPlaces(places, { ...EMPTY_FILTERS, q: 'hotel' }).map((p) => p.id)).toEqual(['d'])
  })

  it('renvoie une liste vide si rien ne correspond', () => {
    expect(filterPlaces(places, { ...EMPTY_FILTERS, q: 'zzzz' })).toEqual([])
  })
})

describe('parseFilters', () => {
  it('lit des paramètres valides', () => {
    const f = parseFilters(new URLSearchParams('q=poisson&categorie=hotel&commune=Gombe&prix=2'))
    expect(f).toEqual({ q: 'poisson', categorie: 'hotel', commune: 'Gombe', prix: 2 })
  })

  it('ignore une catégorie inconnue', () => {
    expect(parseFilters(new URLSearchParams('categorie=pirate')).categorie).toBe('')
  })

  it('ignore un prix invalide', () => {
    expect(parseFilters(new URLSearchParams('prix=99')).prix).toBe('')
  })

  it('coupe une recherche trop longue à 80 caractères', () => {
    const long = 'a'.repeat(500)
    expect(parseFilters(new URLSearchParams(`q=${long}`)).q).toHaveLength(80)
  })
})

describe('getSimilarPlaces', () => {
  it('exclut le lieu courant et classe par pertinence', () => {
    const current = places[0] // restaurant à Gombe
    const result = getSimilarPlaces(places, current)
    // b : même catégorie (2 pts), c : même commune (1 pt), d : rien en commun
    expect(result.map((p) => p.id)).toEqual(['b', 'c'])
  })
})