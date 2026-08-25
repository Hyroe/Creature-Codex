import type { Diet } from '../types/diet';

export const diets: Diet[] = [
  {
    id: 'carnivore',
    name: 'Carnivore',
    description:
      'Primarily feeds on other animals or creatures.',
    icon: 'meat',
  },
  {
    id: 'herbivore',
    name: 'Herbivore',
    description:
      'Primarily feeds on plants and vegetation.',
    icon: 'leaf',
  },
  {
    id: 'omnivore',
    name: 'Omnivore',
    description:
      'Feeds on both plant and animal matter.',
    icon: 'balance',
  },
  {
    id: 'insectivore',
    name: 'Insectivore',
    description:
      'Primarily feeds on insects and other small arthropods.',
    icon: 'bug',
  },
  {
    id: 'scavenger',
    name: 'Scavenger',
    description:
      'Feeds primarily on carrion or remains left by other creatures.',
    icon: 'skull',
  },
];