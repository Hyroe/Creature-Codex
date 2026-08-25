import type { Creature } from '../types/creature';
import type { Habitat } from '../types/habitat';
import type { Diet } from '../types/diet';

import { habitats } from '../data/habitats';
import { diets } from '../data/diets';
import { elements } from '../data/elements';
import { damageTypes } from '../data/damageTypes';
import { bodyParts } from '../data/bodyParts';
import { creatures } from '../data/creatures';

export function getCreatureHabitats(
  creature: Creature,
): Habitat[] {
  return creature.ecology.habitatIds
    .map((id) => habitats.find((habitat) => habitat.id === id))
    .filter((habitat): habitat is Habitat => habitat !== undefined);
}

export function getCreatureDiets(
  creature: Creature,
): Diet[] {
  return creature.ecology.dietIds
    .map((id) => diets.find((diet) => diet.id === id))
    .filter((diet): diet is Diet => diet !== undefined);
}

export function getCreatureAffinities(
  creature: Creature,
) {
  return creature.combat.affinities
    .map((affinity) => {
      let target;

      switch (affinity.targetType) {
        case 'Element':
          target = elements.find(
            (element) => element.id === affinity.targetId,
          );
          break;

        case 'DamageType':
          target = damageTypes.find(
            (damageType) => damageType.id === affinity.targetId,
          );
          break;

        case 'BodyPart':
          target = bodyParts.find(
            (bodyPart) => bodyPart.id === affinity.targetId,
          );
          break;
      }

      if (!target) {
        return undefined;
      }

      return {
        ...affinity,
        target,
      };
    })
    .filter((affinity) => affinity !== undefined);
}

export function getCreatureWeaknesses(
  creature: Creature,
) {
  return getCreatureAffinities(creature).filter(
    (affinity) => affinity.type === 'Weakness',
  );
}

export function getCreatureResistances(
  creature: Creature,
) {
  return getCreatureAffinities(creature).filter(
    (affinity) => affinity.type === 'Resistance',
  );
}

export function getCreaturesWithAffinityTarget(
  targetType: 'Element' | 'DamageType' | 'BodyPart',
  targetId: string,
) {
  return creatures.filter((creature) =>
    creature.combat.affinities.some(
      (affinity) =>
        affinity.targetType === targetType &&
        affinity.targetId === targetId,
    ),
  );
}

export function getCreaturesWeakTo(
  targetType: 'Element' | 'DamageType' | 'BodyPart',
  targetId: string,
) {
  return creatures.filter((creature) =>
    creature.combat.affinities.some(
      (affinity) =>
        affinity.type === 'Weakness' &&
        affinity.targetType === targetType &&
        affinity.targetId === targetId,
    ),
  );
}

export function getCreaturesResistantTo(
  targetType: 'Element' | 'DamageType' | 'BodyPart',
  targetId: string,
) {
  return creatures.filter((creature) =>
    creature.combat.affinities.some(
      (affinity) =>
        affinity.type === 'Resistance' &&
        affinity.targetType === targetType &&
        affinity.targetId === targetId,
    ),
  );
}
export function getAffinityTargetName(
  targetType: 'Element' | 'DamageType' | 'BodyPart',
  targetId: string,
) {
  switch (targetType) {
    case 'Element':
      return elements.find(
        (element) => element.id === targetId,
      )?.name;

    case 'DamageType':
      return damageTypes.find(
        (damageType) => damageType.id === targetId,
      )?.name;

    case 'BodyPart':
      return bodyParts.find(
        (bodyPart) => bodyPart.id === targetId,
      )?.name;

    default:
      return undefined;
  }
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

    default:
      return undefined;
  }
}