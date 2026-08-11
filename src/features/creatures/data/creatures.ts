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
  {
  id: 'marrow-crawler',
  name: 'Marrow Crawler',
  scientificName: 'Ossifex Vorax',
  description:
    'A subterranean scavenger that burrows through ancient burial grounds in search of mineral-rich bones.',
  habitat: 'Burial Grounds',
  threatLevel: 'High',
  imageUrl:
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
},
{
  id: 'mossback',
  name: 'Mossback',
  scientificName: 'Viriditerga Minor',
  description:
    'A peaceful creature covered in thick moss that spends most of its life wandering through humid forests.',
  habitat: 'Humid Forests',
  threatLevel: 'Low',
  imageUrl:
    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
},
{
  id: 'storm-harrier',
  name: 'Storm Harrier',
  scientificName: 'Fulmen Rapax',
  description:
    'A flying predator capable of riding violent storms across entire mountain ranges.',
  habitat: 'Mountain Peaks',
  threatLevel: 'Extreme',
  imageUrl:
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80',
},
];