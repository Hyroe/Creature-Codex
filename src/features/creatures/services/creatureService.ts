import { creatures } from '../data/creatures';
import type { Creature } from '../types/creature';

export function getCreatureById(id: string): Creature | undefined {
  return creatures.find((creature) => creature.id === id);
}