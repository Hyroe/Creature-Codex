import type { CreatureAffinity } from './creatureAffinity';
import type { CreatureGallery } from './creatureGallery';
import type { CreatureEcology } from './creatureEcology';

export type ThreatLevel = 'Low' | 'Moderate' | 'High' | 'Extreme';

export interface CreatureCombat {
  attackStyle: string;
  affinities: CreatureAffinity[];
}

export type CreatureStatus = 'Draft' | 'Published';

export interface Creature {
  id: string;
  slug: string;

  name: string;
  scientificName?: string;
  description: string;
  threatLevel: ThreatLevel;

  authorId: string;
  status: CreatureStatus;

  ecology: CreatureEcology;
  combat: CreatureCombat;
  gallery: CreatureGallery;
}
