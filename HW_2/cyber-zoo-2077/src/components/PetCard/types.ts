export enum PetMood {
  HAPPY = 'happy',
  CONTENT = 'content',
  SAD = 'sad',
  SLEEPY = 'sleepy',
  EXCITED = 'excited'
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  mood: PetMood;
  energy: number;
  level: number;
  avatar: string;
}

export enum PetActionType {
  FEED = 'FEED',
  LEVEL_UP = 'LEVEL_UP',
  CHEER = 'CHEER',
  RESET = 'RESET',
  UPDATE_ENERGY = 'UPDATE_ENERGY',
  UPDATE_MOOD = 'UPDATE_MOOD',
  SYNC_WITH_PARENT = 'SYNC_WITH_PARENT'
}

export type PetAction = 
  | { type: PetActionType.FEED }
  | { type: PetActionType.LEVEL_UP }
  | { type: PetActionType.CHEER }
  | { type: PetActionType.RESET }
  | { type: PetActionType.UPDATE_ENERGY; payload: number }
  | { type: PetActionType.UPDATE_MOOD; payload: PetMood }
  | { type: PetActionType.SYNC_WITH_PARENT; payload: Partial<Pet> };