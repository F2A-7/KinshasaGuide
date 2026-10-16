import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/explorer', label: 'Explorer' },
  { to: '/ajouter', label: 'Ajouter un lieu' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="container header__bar">
        <Link to="/" className="header__logo" onClick={close}>
          KinsGuide
        </Link>

        <button
          className="header__toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="main-nav" className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end onClick={close}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}