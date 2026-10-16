import { useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../components/ui/Field'
import { clean, validateContact } from '../lib/validation'
import type { Errors } from '../lib/validation'
import { usePageTitle } from '../lib/usePageTitle'

export default function Contact() {
  usePageTitle('Contact')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    // Champ piège : invisible pour un humain, rempli par les robots.
    if (form.get('website')) return

    const data = {
      name: clean(form.get('name'), 80),
      email: clean(form.get('email'), 120),
      message: clean(form.get('message'), 1000),
    }
    const found = validateContact(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`c-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="container page">
        <h1>Contact</h1>
        <p className="state state--success" role="status">
          Merci, votre message a bien été validé. Version de démonstration : il n'a pas été envoyé.
        </p>
        <button type="button" className="btn btn--secondary" onClick={() => setSent(false)}>
          Écrire un autre message
        </button>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1>Contact</h1>
      <p>Une question, une suggestion ? Écrivez-nous.</p>
      <p className="form-note">Démonstration : le message n'est pas réellement envoyé.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field id="c-name" label="Nom" error={errors.name}>
          {(p) => <input {...p} className="field__input" name="name" type="text" maxLength={80} autoComplete="name" />}
        </Field>
        <Field id="c-email" label="Adresse e-mail" error={errors.email}>
          {(p) => <input {...p} className="field__input" name="email" type="email" maxLength={120} autoComplete="email" />}
        </Field>
        <Field id="c-message" label="Message" error={errors.message} hint="10 à 1000 caractères.">
          {(p) => <textarea {...p} className="field__input" name="message" rows={6} maxLength={1000} />}
        </Field>

        <div className="trap" aria-hidden="true">
          <label>
            Ne pas remplir
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button type="submit" className="btn btn--primary">Envoyer</button>
      </form>
    </div>
  )
}