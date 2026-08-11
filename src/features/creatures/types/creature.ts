export interface Creature {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  imageUrl: string;
}