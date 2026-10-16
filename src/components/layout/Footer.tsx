import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">KinsGuide</p>
          <p className="footer__note">
            Projet personnel de démonstration. Les lieux présentés sont fictifs.
          </p>
        </div>
        <nav aria-label="Liens du pied de page">
          <ul>
            <li><Link to="/explorer">Explorer</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}