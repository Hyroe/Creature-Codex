import type { Creature } from '../../creatures/types/creature';

export interface CreatureFavorite {
  id: string;
  userId: string;
  creatureId: string;
  createdAt: string;

  creature: Creature;
}
