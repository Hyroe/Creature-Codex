export type AffinityType =
  | 'Weakness'
  | 'Resistance';

export type AffinityTargetType =
  | 'Element'
  | 'DamageType'
  | 'BodyPart';

export interface CreatureAffinity {
  id: string;

  type: AffinityType;

  targetType: AffinityTargetType;

  targetId: string;

  description?: string;
}