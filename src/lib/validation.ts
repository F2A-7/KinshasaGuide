export type Errors = Record<string, string>

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export function isPhone(value: string): boolean {
  return /^\+?[0-9\s().-]{7,20}$/.test(value)
}

export function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? '').trim().slice(0, max)
}

export function validateContact(data: {
  name: string
  email: string
  message: string
}): Errors {
  const errors: Errors = {}
  if (data.name.length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).'
  if (!data.email) errors.email = 'Indiquez votre adresse e-mail.'
  else if (!isEmail(data.email)) errors.email = 'Cette adresse e-mail ne semble pas valide.'
  if (data.message.length < 10) errors.message = 'Votre message doit faire au moins 10 caractères.'
  return errors
}

export function validateNewPlace(data: {
  name: string
  category: string
  commune: string
  address: string
  description: string
  phone: string
}): Errors {
  const errors: Errors = {}
  if (data.name.length < 2) errors.name = 'Indiquez le nom de l\'établissement.'
  if (!data.category) errors.category = 'Choisissez une catégorie.'
  if (!data.commune) errors.commune = 'Choisissez une commune.'
  if (data.address.length < 5) errors.address = 'Indiquez une adresse (5 caractères minimum).'
  if (data.description.length < 20) errors.description = 'La description doit faire au moins 20 caractères.'
  if (data.phone && !isPhone(data.phone)) errors.phone = 'Ce numéro ne semble pas valide.'
  return errors
}