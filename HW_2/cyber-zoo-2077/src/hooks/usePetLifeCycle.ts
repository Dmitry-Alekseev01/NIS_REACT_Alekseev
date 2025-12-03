import { useEffect, useRef } from 'react';
import { Pet } from '../components/PetCard/types';

interface UsePetLifecycleProps {
  pet: Pet;
  onEnergyChange: (id: string, energy: number) => void;
  onMoodChange: (id: string, mood: Pet['mood']) => void;
}

export const usePetLifecycle = ({
  pet,
  onEnergyChange,
  onMoodChange
}: UsePetLifecycleProps) => {
  const prevEnergyRef = useRef(pet.energy);
  const prevMoodRef = useRef(pet.mood);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pet.energy > 0) {
        const newEnergy = Math.max(0, pet.energy - 5);
        
        if (newEnergy !== prevEnergyRef.current) {
          onEnergyChange(pet.id, newEnergy);
          prevEnergyRef.current = newEnergy;
        }

        let newMood: Pet['mood'] = 'content';
        if (newEnergy <= 20) newMood = 'sad';
        else if (newEnergy <= 40) newMood = 'sleepy';
        else if (newEnergy >= 80) newMood = 'excited';
        else if (newEnergy >= 60) newMood = 'happy';

        if (newMood !== prevMoodRef.current) {
          onMoodChange(pet.id, newMood);
          prevMoodRef.current = newMood;
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [pet.energy, pet.mood, pet.id, onEnergyChange, onMoodChange]);
};