import type { BodyPart } from '../types/bodyPart';

export const bodyParts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    description:
      'The primary cranial region of the creature.',
    icon: 'head',
  },
  {
    id: 'eyes',
    name: 'Eyes',
    description:
      'Visual organs used to perceive the surrounding environment.',
    icon: 'eye',
  },
  {
    id: 'wings',
    name: 'Wings',
    description:
      'Appendages primarily used for flight.',
    icon: 'wings',
  },
  {
    id: 'tail',
    name: 'Tail',
    description:
      'A posterior appendage used for balance, movement, or combat.',
    icon: 'tail',
  },
];