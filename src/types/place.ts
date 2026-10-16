export type Category = 'restaurant' | 'hotel' | 'tourisme' | 'loisirs' | 'cafe'

export type PriceLevel = 1 | 2 | 3

export interface Place {
  id: string
  slug: string
  name: string
  category: Category
  commune: string
  address: string
  description: string
  priceLevel: PriceLevel
  hours: string
  phone?: string
  tags: string[]
  featured: boolean
}

export const CATEGORY_LABELS: Record<Category, string> = {
  restaurant: 'Restaurant',
  hotel: 'Hôtel',
  tourisme: 'Lieu touristique',
  loisirs: 'Activité de loisirs',
  cafe: 'Café',
}

export const PRICE_LABELS: Record<PriceLevel, string> = {
  1: 'Économique',
  2: 'Intermédiaire',
  3: 'Haut de gamme',
}