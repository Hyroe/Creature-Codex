import type { DamageType } from '../types/damageType';

export const damageTypes: DamageType[] = [
  {
    id: 'slashing',
    name: 'Slashing',
    description:
      'Damage caused by sharp edges such as blades, claws, and talons.',
    icon: 'slashing',
  },
  {
    id: 'piercing',
    name: 'Piercing',
    description:
      'Damage caused by concentrated points such as fangs, horns, and projectiles.',
    icon: 'piercing',
  },
  {
    id: 'blunt',
    name: 'Blunt',
    description:
      'Damage caused by impact, crushing force, or heavy strikes.',
    icon: 'blunt',
  },
];