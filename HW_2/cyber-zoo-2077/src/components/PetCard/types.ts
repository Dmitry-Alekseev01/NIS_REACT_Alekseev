export interface Pet {
  id: string;
  name: string;
  species: string;
  mood: 'happy' | 'content' | 'sad' | 'sleepy' | 'excited';
  energy: number;
  level: number;
  avatar: string;
}

export type PetAction = 
  | { type: 'FEED' }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET' }
  | { type: 'UPDATE_ENERGY'; payload: number }
  | { type: 'UPDATE_MOOD'; payload: Pet['mood'] }
  | { type: 'SYNC_WITH_PARENT'; payload: Partial<Pet> };