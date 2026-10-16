import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
usePageTitle('À propos')  
  return (
    <div className="container page prose">
      <h1>À propos de KinsGuide</h1>

      <p className="prose__lead">
        KinsGuide est un projet de plateforme pour découvrir des restaurants, des hôtels,
        des lieux à visiter et des activités à Kinshasa.
      </p>

      <h2>Le concept</h2>
      <p>
        Trouver une bonne adresse dans une grande ville demande souvent du bouche-à-oreille.
        KinsGuide imagine un endroit unique où chercher par catégorie, par commune ou par
        mot-clé, puis consulter une fiche claire : description, horaires, prix indicatif et
        informations pratiques.
      </p>

      <h2>Ce qui fonctionne aujourd'hui</h2>
      <ul>
        <li>Recherche et filtres combinables (catégorie, commune, prix).</li>
        <li>Fiches détaillées avec lieux similaires.</li>
        <li>Formulaires de contact et de proposition, avec validation.</li>
      </ul>

      <h2>Ce qui est une démonstration</h2>
      <p>
        KinsGuide est un <strong>prototype personnel</strong>. Tous les établissements affichés
        sont inventés : leurs noms, adresses et numéros sont fictifs, seules les communes sont
        réelles. Les formulaires ne transmettent rien : ils montrent uniquement le
        fonctionnement de la validation.
      </p>

      <h2>La suite possible</h2>
      <p>
        Avec de vraies données et un serveur, le site pourrait accueillir des fiches réelles
        vérifiées, des photos et une carte interactive.
      </p>

      <p>
        <Link to="/explorer" className="btn btn--primary">Explorer les lieux</Link>
      </p>
    </div>
  )
}