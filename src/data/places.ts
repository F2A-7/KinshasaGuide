import type { Place } from '../types/place'

export const places: Place[] = [
  {
    id: '1', slug: 'chez-mama-nzuzi', name: 'Chez Mama Nzuzi', category: 'restaurant',
    commune: 'Gombe', address: 'Avenue de la Paix (adresse fictive)',
    description: 'Cuisine congolaise traditionnelle : poulet à la moambe, saka-saka et chikwangue, dans une salle simple et chaleureuse.',
    priceLevel: 1, hours: 'Lun-Sam 11h-22h', phone: '+243 000 000 001',
    tags: ['cuisine locale', 'déjeuner', 'famille'], featured: true,
  },
  {
    id: '2', slug: 'le-comptoir-du-fleuve', name: 'Le Comptoir du Fleuve', category: 'restaurant',
    commune: 'Gombe', address: 'Boulevard du 30 Juin (adresse fictive)',
    description: 'Restaurant avec terrasse sur le fleuve Congo. Poissons grillés et carte de cuisine internationale.',
    priceLevel: 3, hours: 'Tous les jours 12h-23h', phone: '+243 000 000 002',
    tags: ['vue sur le fleuve', 'dîner', 'terrasse'], featured: true,
  },
  {
    id: '3', slug: 'maquis-de-limete', name: 'Maquis de Limete', category: 'restaurant',
    commune: 'Limete', address: '12e rue (adresse fictive)',
    description: 'Maquis animé le soir : brochettes, poisson braisé et musique en direct le week-end.',
    priceLevel: 2, hours: 'Mar-Dim 17h-01h',
    tags: ['grillades', 'musique', 'soirée'], featured: false,
  },
  {
    id: '4', slug: 'hotel-lumiere-du-congo', name: 'Hôtel Lumière du Congo', category: 'hotel',
    commune: 'Gombe', address: 'Avenue Colonel Lukusa (adresse fictive)',
    description: 'Hôtel d\'affaires de 60 chambres, wifi, salle de réunion et petit-déjeuner inclus.',
    priceLevel: 3, hours: 'Réception 24h/24', phone: '+243 000 000 004',
    tags: ['affaires', 'wifi', 'petit-déjeuner'], featured: true,
  },
  {
    id: '5', slug: 'residence-ngaliema-vue', name: 'Résidence Ngaliema Vue', category: 'hotel',
    commune: 'Ngaliema', address: 'Route de Matadi (adresse fictive)',
    description: 'Résidence calme avec jardin et vue sur le fleuve, idéale pour un séjour de quelques jours.',
    priceLevel: 2, hours: 'Réception 7h-22h',
    tags: ['calme', 'jardin', 'séjour'], featured: false,
  },
  {
    id: '6', slug: 'parc-de-la-vallee-de-la-nsele', name: 'Parc de la Vallée de la N\'sele', category: 'tourisme',
    commune: 'Nsele', address: 'Route de Kingakati (adresse fictive)',
    description: 'Grand espace vert avec pique-nique, promenades et vue sur la vallée, à environ une heure du centre.',
    priceLevel: 1, hours: 'Tous les jours 8h-18h',
    tags: ['nature', 'pique-nique', 'famille'], featured: true,
  },
  {
    id: '7', slug: 'marche-des-artisans', name: 'Marché des Artisans', category: 'tourisme',
    commune: 'Gombe', address: 'Près de la Gare centrale (adresse fictive)',
    description: 'Sculptures, tissus et objets d\'art. Un bon endroit pour découvrir l\'artisanat local.',
    priceLevel: 1, hours: 'Lun-Sam 8h-17h',
    tags: ['artisanat', 'souvenirs', 'culture'], featured: false,
  },
  {
    id: '8', slug: 'galerie-kin-art', name: 'Galerie Kin Art', category: 'tourisme',
    commune: 'Gombe', address: 'Avenue de l\'Équateur (adresse fictive)',
    description: 'Galerie d\'art contemporain congolais avec expositions temporaires et rencontres avec les artistes.',
    priceLevel: 1, hours: 'Mar-Sam 10h-18h',
    tags: ['art', 'exposition', 'culture'], featured: false,
  },
  {
    id: '9', slug: 'club-nautique-du-pool', name: 'Club Nautique du Pool', category: 'loisirs',
    commune: 'Ngaliema', address: 'Bord du fleuve (adresse fictive)',
    description: 'Balades en bateau sur le fleuve, piscine et espace détente.',
    priceLevel: 2, hours: 'Mer-Dim 9h-19h',
    tags: ['bateau', 'piscine', 'week-end'], featured: false,
  },
  {
    id: '10', slug: 'cafe-des-arts-kinois', name: 'Café des Arts Kinois', category: 'cafe',
    commune: 'Gombe', address: 'Avenue Tombalbaye (adresse fictive)',
    description: 'Café de spécialité avec café local, pâtisseries et espace de coworking calme.',
    priceLevel: 2, hours: 'Lun-Sam 7h-20h',
    tags: ['café', 'wifi', 'coworking'], featured: true,
  },
]