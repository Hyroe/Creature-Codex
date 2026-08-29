import type { Habitat } from './habitat';
import type { Diet } from './diet';

export interface CreatureEcology {
  habitatIds: string[];
  dietIds: string[];

  habitats: Habitat[];
  diets: Diet[];

  behavior: string;
  lifeCycle: string;
}
