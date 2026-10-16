import { useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../components/ui/Field'
import { clean, validateNewPlace } from '../lib/validation'
import type { Errors } from '../lib/validation'
import { CATEGORY_LABELS } from '../types/place'
import type { Category } from '../types/place'
import { usePageTitle } from '../lib/usePageTitle'

const communes = ['Gombe', 'Kinshasa', 'Kalamu', 'Limete', 'Lingwala', 'Ngaliema', 'Nsele']

export default function AddPlace() {
  usePageTitle('Proposer un établissement')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (form.get('website')) return

    const category = clean(form.get('category'), 20)
    const commune = clean(form.get('commune'), 40)
    const data = {
      name: clean(form.get('name'), 100),
      category: category in CATEGORY_LABELS ? category : '',
      commune: communes.includes(commune) ? commune : '',
      address: clean(form.get('address'), 150),
      description: clean(form.get('description'), 800),
      phone: clean(form.get('phone'), 20),
    }
    const found = validateNewPlace(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`a-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="container page">
        <h1>Proposer un établissement</h1>
        <p className="state state--success" role="status">
          Merci ! Votre proposition a bien été validée. Version de démonstration : elle n'a pas été enregistrée.
        </p>
        <button type="button" className="btn btn--secondary" onClick={() => setSent(false)}>
          Proposer un autre lieu
        </button>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1>Proposer un établissement</h1>
      <p>Un lieu manque à KinsGuide ? Renseignez-le ici.</p>
      <p className="form-note">Démonstration : la proposition n'est pas réellement enregistrée.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field id="a-name" label="Nom de l'établissement" error={errors.name}>
          {(p) => <input {...p} className="field__input" name="name" type="text" maxLength={100} />}
        </Field>

        <Field id="a-category" label="Catégorie" error={errors.category}>
          {(p) => (
            <select {...p} className="field__input" name="category" defaultValue="">
              <option value="" disabled>Choisir…</option>
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
          )}
        </Field>

        <Field id="a-commune" label="Commune" error={errors.commune}>
          {(p) => (
            <select {...p} className="field__input" name="commune" defaultValue="">
              <option value="" disabled>Choisir…</option>
              {communes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </Field>

        <Field id="a-address" label="Adresse" error={errors.address}>
          {(p) => <input {...p} className="field__input" name="address" type="text" maxLength={150} autoComplete="street-address" />}
        </Field>

        <Field id="a-description" label="Description" error={errors.description} hint="20 à 800 caractères.">
          {(p) => <textarea {...p} className="field__input" name="description" rows={5} maxLength={800} />}
        </Field>

        <Field id="a-phone" label="Téléphone (facultatif)" error={errors.phone}>
          {(p) => <input {...p} className="field__input" name="phone" type="tel" maxLength={20} autoComplete="tel" />}
        </Field>

        <div className="trap" aria-hidden="true">
          <label>
            Ne pas remplir
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button type="submit" className="btn btn--primary">Envoyer la proposition</button>
      </form>
    </div>
  )
}
