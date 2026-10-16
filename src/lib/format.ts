import type { PriceLevel } from '../types/place'

export function priceSymbols(level: PriceLevel): string {
  return '$'.repeat(level)
}