import type { Creature } from '../types/creature';

export const creatures: Creature[] = [
  {
    id: 'ashen-stalker',
    name: 'Ashen Stalker',
    scientificName: 'Cineris Venator',
    description:
      'A nocturnal predator that inhabits volcanic forests and hunts by sensing vibrations beneath the ground.',
    threatLevel: 'High',

    ecology: {
      habitatIds: ['volcanic-forest', 'underground'],
      dietIds: ['carnivore'],

      behavior:
        'A solitary nocturnal hunter that remains hidden during the day and tracks prey through ground vibrations.',

      lifeCycle:
        'Young Ashen Stalkers remain underground for several months before emerging to hunt independently.',
    },

    combat: {
      attackStyle:
        'Prefers ambush attacks, striking from underground before retreating into the darkness.',

      affinities: [
        {
          id: 'ashen-stalker-water',
          type: 'Weakness',
          targetType: 'Element',
          targetId: 'water',
          description:
            'Water interferes with the creature’s ability to sense vibrations through volcanic soil.',
        },

        {
          id: 'ashen-stalker-ice',
          type: 'Weakness',
          targetType: 'Element',
          targetId: 'ice',
        },

        {
          id: 'ashen-stalker-fire',
          type: 'Resistance',
          targetType: 'Element',
          targetId: 'fire',
        },

        {
          id: 'ashen-stalker-eyes',
          type: 'Weakness',
          targetType: 'BodyPart',
          targetId: 'eyes',
          description:
            'Its eyes are poorly protected and highly sensitive to direct attacks.',
        },

        {
          id: 'ashen-stalker-slashing',
          type: 'Resistance',
          targetType: 'DamageType',
          targetId: 'slashing',
        },
      ],
    },

    gallery: {
      coverImage: {
        id: 'ashen-stalker-01',
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        alt: 'Ashen Stalker concept art',
        caption: 'Field observation',
      },

      images: [],
    },
  },

  {
    id: 'hollow-antler',
    name: 'Hollow Antler',
    scientificName: 'Cervus Vacuus',
    description:
      'A strange herbivore whose antlers grow hollow and resonate with sounds from the surrounding forest.',
    threatLevel: 'Moderate',

    ecology: {
      habitatIds: ['ancient-forest'],
      dietIds: ['herbivore'],

      behavior:
        'Generally peaceful, but becomes highly territorial during its mating season.',

      lifeCycle:
        'The species reaches maturity after several years and sheds its antlers once every cycle.',
    },

    combat: {
      attackStyle:
        'Uses powerful charges and sweeping attacks with its enormous antlers when threatened.',

      affinities: [
        {
          id: 'hollow-antler-fire',
          type: 'Weakness',
          targetType: 'Element',
          targetId: 'fire',
        },

        {
          id: 'hollow-antler-nature',
          type: 'Resistance',
          targetType: 'Element',
          targetId: 'nature',
        },

        {
          id: 'hollow-antler-blunt',
          type: 'Resistance',
          targetType: 'DamageType',
          targetId: 'blunt',
        },
      ],
    },

    gallery: {
      coverImage: {
        id: 'hollow-antler-01',
        url: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80',
        alt: 'Hollow Antler concept art',
        caption: 'Specimen profile',
      },

      images: [],
    },
  },
];