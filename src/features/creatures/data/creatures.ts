import type { Creature } from '../types/creature';

export const creatures: Creature[] = [
  {
    id: 'ashen-stalker',
    name: 'Ashen Stalker',
    scientificName: 'Cineris Venator',
    description:
      'A nocturnal predator that inhabits volcanic forests and hunts by sensing vibrations beneath the ground.',
    habitat: 'Volcanic Forests',
    threatLevel: 'High',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hollow-antler',
    name: 'Hollow Antler',
    scientificName: 'Cervus Vacuus',
    description:
      'A strange herbivore whose antlers grow hollow and resonate with sounds from the surrounding forest.',
    habitat: 'Ancient Forests',
    threatLevel: 'Moderate',
    imageUrl:
      'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'deepmaw',
    name: 'Deepmaw',
    scientificName: 'Abyssus Vorax',
    description:
      'An enormous aquatic creature rarely observed near the surface. Its presence is often preceded by sudden silence.',
    habitat: 'Abyssal Waters',
    threatLevel: 'Extreme',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  },
];