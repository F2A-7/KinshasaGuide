import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim().slice(0, 80)
    navigate(q ? `/explorer?q=${encodeURIComponent(q)}` : '/explorer')
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="home-search" className="visually-hidden">
        Rechercher un lieu
      </label>
      <input
        id="home-search"
        className="field__input search-bar__input"
        type="search"
        placeholder="Restaurant, hôtel, quartier…"
        value={query}
        maxLength={80}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn--primary">
        <Search size={18} aria-hidden="true" />
        Rechercher
      </button>
    </form>
  )
}