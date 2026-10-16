import { describe, it, expect } from 'vitest'
import { clean, isEmail, isPhone, validateContact, validateNewPlace } from './validation'

describe('isEmail', () => {
  it('accepte une adresse valide', () => {
    expect(isEmail('nom@exemple.com')).toBe(true)
  })
  it('refuse une adresse invalide', () => {
    expect(isEmail('abc')).toBe(false)
    expect(isEmail('nom@exemple')).toBe(false)
    expect(isEmail('nom @exemple.com')).toBe(false)
  })
})

describe('isPhone', () => {
  it('accepte un numéro valide', () => {
    expect(isPhone('+243 000 000 001')).toBe(true)
  })
  it('refuse des lettres ou un numéro trop court', () => {
    expect(isPhone('abc')).toBe(false)
    expect(isPhone('123')).toBe(false)
  })
})

describe('clean', () => {
  it('retire les espaces et coupe à la longueur maximale', () => {
    expect(clean('  bonjour  ', 100)).toBe('bonjour')
    expect(clean('abcdefghij', 5)).toBe('abcde')
  })
  it('gère une valeur absente', () => {
    expect(clean(null, 10)).toBe('')
  })
})

describe('validateContact', () => {
  it('ne renvoie aucune erreur pour des données valides', () => {
    const errors = validateContact({ name: 'Awa', email: 'awa@exemple.com', message: 'Bonjour, ceci est un message.' })
    expect(errors).toEqual({})
  })
  it('signale chaque champ invalide', () => {
    const errors = validateContact({ name: '', email: '', message: 'court' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })
})

describe('validateNewPlace', () => {
  const valid = {
    name: 'Chez Test',
    category: 'restaurant',
    commune: 'Gombe',
    address: 'Avenue de la Paix',
    description: 'Une description suffisamment longue.',
    phone: '',
  }

  it('accepte des données valides, téléphone vide compris', () => {
    expect(validateNewPlace(valid)).toEqual({})
  })
  it('refuse un téléphone invalide', () => {
    expect(validateNewPlace({ ...valid, phone: 'abc' }).phone).toBeDefined()
  })
  it('exige une catégorie et une commune', () => {
    const errors = validateNewPlace({ ...valid, category: '', commune: '' })
    expect(errors.category).toBeDefined()
    expect(errors.commune).toBeDefined()
  })
})