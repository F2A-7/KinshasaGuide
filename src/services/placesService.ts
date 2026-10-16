import { places } from '../data/places'
import type { Place } from '../types/place'

export async function getPlaces(): Promise<Place[]> {
  return places
}

export async function getPlaceBySlug(slug: string): Promise<Place | undefined> {
  return places.find((p) => p.slug === slug)
}

export async function getFeaturedPlaces(): Promise<Place[]> {
  return places.filter((p) => p.featured)
}