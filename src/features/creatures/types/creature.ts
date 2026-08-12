import type { CreatureAffinity } from './creatureAffinity';
import type { CreatureGallery } from './creatureGallery';
import type { CreatureEcology } from './creatureEcology';

export type ThreatLevel =
  | 'Low'
  | 'Moderate'
  | 'High'
  | 'Extreme';

export interface CreatureCombat {
  attackStyle: string;
  affinities: CreatureAffinity[];
}

export interface Creature {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  threatLevel: ThreatLevel;

  ecology: CreatureEcology;

  combat: CreatureCombat;

  gallery: CreatureGallery;
}