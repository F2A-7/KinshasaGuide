import { CATEGORY_LABELS, PRICE_LABELS } from '../../types/place'
import type { Category, PriceLevel } from '../../types/place'
import type { Filters } from '../../lib/filters'

interface Props {
  filters: Filters
  communes: string[]
  onChange: (next: Filters) => void
  onReset: () => void
  canReset: boolean
}

export default function FilterPanel({ filters, communes, onChange, onReset, canReset }: Props) {
  return (
    <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="field">
        <label className="field__label" htmlFor="f-q">Recherche</label>
        <input
          id="f-q"
          className="field__input"
          type="search"
          maxLength={80}
          placeholder="Nom, plat, quartier…"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="f-cat">Catégorie</label>
        <select
          id="f-cat"
          className="field__input"
          value={filters.categorie}
          onChange={(e) => onChange({ ...filters, categorie: e.target.value as Category | '' })}
        >
          <option value="">Toutes</option>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="f-com">Commune</label>
        <select
          id="f-com"
          className="field__input"
          value={filters.commune}
          onChange={(e) => onChange({ ...filters, commune: e.target.value })}
        >
          <option value="">Toutes</option>
          {communes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="f-prix">Prix indicatif</label>
        <select
          id="f-prix"
          className="field__input"
          value={filters.prix}
          onChange={(e) =>
            onChange({ ...filters, prix: e.target.value ? (Number(e.target.value) as PriceLevel) : '' })
          }
        >
          <option value="">Tous</option>
          {([1, 2, 3] as PriceLevel[]).map((p) => (
            <option key={p} value={p}>{PRICE_LABELS[p]}</option>
          ))}
        </select>
      </div>

      <button type="button" className="btn btn--secondary" onClick={onReset} disabled={!canReset}>
        Effacer les filtres
      </button>
    </form>
  )
}