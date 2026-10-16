import type { ReactNode } from 'react'

interface Props {
  id: string
  label: string
  error?: string
  hint?: string
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

export default function Field({ id, label, error, hint, children }: Props) {
  const describedBy = [error ? `${id}-err` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ')
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy || undefined })}
      {error && <p className="field__error" id={`${id}-err`}>{error}</p>}
    </div>
  )
}