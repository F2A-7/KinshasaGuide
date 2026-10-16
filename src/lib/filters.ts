import type { Category, Place, PriceLevel } from '../types/place'

export interface Filters {
  q: string
  categorie: Category | ''
  commune: string
  prix: PriceLevel | ''
}

export const EMPTY_FILTERS: Filters = { q: '', categorie: '', commune: '', prix: '' }

const CATEGORIES: Category[] = ['restaurant', 'hotel', 'tourisme', 'loisirs', 'cafe']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function parseFilters(params: URLSearchParams): Filters {
  const categorie = params.get('categorie') ?? ''
  const prix = Number(params.get('prix'))
  return {
    q: (params.get('q') ?? '').trim().slice(0, 80),
    categorie: CATEGORIES.includes(categorie as Category) ? (categorie as Category) : '',
    commune: (params.get('commune') ?? '').slice(0, 40),
    prix: prix === 1 || prix === 2 || prix === 3 ? prix : '',
  }
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.q) params.set('q', filters.q)
  if (filters.categorie) params.set('categorie', filters.categorie)
  if (filters.commune) params.set('commune', filters.commune)
  if (filters.prix) params.set('prix', String(filters.prix))
  return params
}

export function filterPlaces(places: Place[], filters: Filters): Place[] {
  const query = normalize(filters.q)
  return places.filter((p) => {
    if (filters.categorie && p.category !== filters.categorie) return false
    if (filters.commune && p.commune !== filters.commune) return false
    if (filters.prix && p.priceLevel !== filters.prix) return false
    if (query) {
      const haystack = normalize([p.name, p.description, p.commune, ...p.tags].join(' '))
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

export function hasActiveFilters(filters: Filters): boolean {
  return Boolean(filters.q || filters.categorie || filters.commune || filters.prix)
}
export function getSimilarPlaces(all: Place[], current: Place, limit = 3): Place[] {
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      place: p,
      score:
        (p.category === current.category ? 2 : 0) +
        (p.commune === current.commune ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.place)
}