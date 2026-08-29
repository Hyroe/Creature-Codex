import type { Creature } from '../types/creature';

export function getCreatureHabitats(creature: Creature) {
  return creature.ecology.habitats;
}

export function getCreatureDiets(creature: Creature) {
  return creature.ecology.diets;
}

export function getCreatureAffinities(creature: Creature) {
  return creature.combat.affinities;
}

export function getCreatureWeaknesses(creature: Creature) {
  return creature.combat.affinities.filter(
    (affinity) => affinity.type === 'Weakness',
  );
}

export function getCreatureResistances(creature: Creature) {
  return creature.combat.affinities.filter(
    (affinity) => affinity.type === 'Resistance',
  );
}

export function getAffinityTargetPath(
  targetType: 'Element' | 'DamageType' | 'BodyPart',
  targetId: string,
) {
  switch (targetType) {
    case 'Element':
      return `/library/elements/${targetId}`;

    case 'DamageType':
      return `/library/damage-types/${targetId}`;

    case 'BodyPart':
      return `/library/body-parts/${targetId}`;
  }
}
