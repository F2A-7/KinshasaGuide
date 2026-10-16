import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page introuvable')
  return (
    <div className="container page">
      <h1>Page introuvable</h1>
      <p>L'adresse demandée n'existe pas ou a été déplacée.</p>
      <p>
        <Link to="/" className="btn btn--primary">Retour à l'accueil</Link>{' '}
        <Link to="/explorer" className="btn btn--secondary">Explorer les lieux</Link>
      </p>
    </div>
  )
}