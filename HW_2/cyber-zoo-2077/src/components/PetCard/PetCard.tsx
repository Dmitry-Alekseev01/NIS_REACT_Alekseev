import React, { useReducer, useCallback, useRef, useEffect } from 'react';
import { Pet, PetAction } from './types';
import { useEventLog } from '../../hooks/useEventLog';
import { usePetLifecycle } from '../../hooks/usePetLifeCycle';
import { ActionButton } from './PetActions/ActionButton.styled';

const styles = {
  petCard: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRadius: '16px',
    padding: '20px',
    margin: '10px',
    color: 'white',
    position: 'relative' as 'relative',
    overflow: 'hidden',
    minHeight: '300px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  avatar: {
    fontSize: '3rem',
    marginRight: '12px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  },
  species: {
    fontSize: '0.875rem',
    color: '#e0e0e0',
    margin: '0',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    margin: '16px 0'
  },
  stat: {
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '8px 12px',
    borderRadius: '8px',
    textAlign: 'center' as 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#e0e0e0',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#fff',
    margin: '4px 0 0 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  energyBar: {
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '12px 0',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
  },
  energyFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginTop: '16px'
  },
  disabledOverlay: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    zIndex: 10,
    backdropFilter: 'blur(4px)'
  },
  disabledText: {
    color: '#fff',
    fontSize: '1.125rem',
    fontWeight: '600',
    textAlign: 'center' as 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  }
};

interface PetCardProps {
  pet: Pet;
  onPetUpdate: (id: string, updates: Partial<Pet>) => void;
}

const calculateMoodFromEnergy = (energy: number): Pet['mood'] => {
  if (energy <= 20) return 'sad';
  if (energy <= 40) return 'sleepy';
  if (energy >= 80) return 'excited';
  if (energy >= 60) return 'happy';
  return 'content';
};

const petReducer = (state: Pet, action: PetAction): Pet => {
  switch (action.type) {
    case 'FEED': {
      const newEnergy = Math.min(100, state.energy + 20);
      const newMood = calculateMoodFromEnergy(newEnergy);
      return { ...state, energy: newEnergy, mood: newMood };
    }
    case 'LEVEL_UP': {
      const newEnergy = Math.max(0, state.energy - 10);
      const newMood = calculateMoodFromEnergy(newEnergy);
      return { ...state, level: state.level + 1, energy: newEnergy, mood: newMood };
    }
    case 'CHEER': {
      const newEnergy = Math.max(0, state.energy - 5);
      let newMood: Pet['mood'];
      switch (state.mood) {
        case 'sad': newMood = 'happy'; break;
        case 'sleepy': newMood = 'content'; break;
        case 'content': newMood = 'happy'; break;
        case 'happy': newMood = 'excited'; break;
        case 'excited': newMood = 'excited'; break;
        default: newMood = 'content';
      }
      return { ...state, energy: newEnergy, mood: newMood };
    }
    case 'RESET':
      return { ...state, energy: 50, level: 1, mood: 'content' };
    case 'UPDATE_ENERGY': {
      const newMood = calculateMoodFromEnergy(action.payload);
      return { ...state, energy: action.payload, mood: newMood };
    }
    case 'UPDATE_MOOD':
      return { ...state, mood: action.payload };
    case 'SYNC_WITH_PARENT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const PetCard: React.FC<PetCardProps> = React.memo(({ pet, onPetUpdate }) => {
  const [state, dispatch] = useReducer(petReducer, pet);
  const { addEvent } = useEventLog();
  const avatarRef = useRef<HTMLDivElement>(null);

  console.log('Rendering PetCard:', state.name, 'Energy:', state.energy, 'Mood:', state.mood);

  useEffect(() => {
    dispatch({ type: 'SYNC_WITH_PARENT', payload: pet });
  }, [pet.id, pet.energy, pet.level, pet.mood]);

  usePetLifecycle({
    pet: state,
    onEnergyChange: (id, energy) => {
      console.log(`Energy change for ${state.name}: ${state.energy} -> ${energy}`);
      dispatch({ type: 'UPDATE_ENERGY', payload: energy });
      addEvent(`${state.name} energy decreased to ${energy}%`);
    },
    onMoodChange: (id, mood) => {
      console.log(`Mood change for ${state.name}: ${state.mood} -> ${mood}`);
      dispatch({ type: 'UPDATE_MOOD', payload: mood });
      addEvent(`${state.name} mood changed to ${mood}`);
    }
  });

  useEffect(() => {
    onPetUpdate(state.id, {
      energy: state.energy,
      level: state.level,
      mood: state.mood
    });
  }, [state.id, state.energy, state.level, state.mood, onPetUpdate]);

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.transform = 'scale(1.1)';
      setTimeout(() => {
        if (avatarRef.current) {
          avatarRef.current.style.transform = 'scale(1)';
        }
      }, 200);
    }
  }, [state.mood]);

  const handleAction = useCallback((action: PetAction, actionName: string) => {
    console.log(`Action: ${actionName} for ${state.name}`);
    dispatch(action);
    addEvent(`${state.name} ${actionName.toLowerCase()}`);
  }, [state.name, addEvent]);

  const feed = useCallback(() => handleAction({ type: 'FEED' }, 'was fed'), [handleAction]);
  const levelUp = useCallback(() => handleAction({ type: 'LEVEL_UP' }, 'leveled up!'), [handleAction]);
  const cheer = useCallback(() => handleAction({ type: 'CHEER' }, 'was cheered up'), [handleAction]);
  const reset = useCallback(() => handleAction({ type: 'RESET' }, 'was reset to default'), [handleAction]);

  const getMoodColor = (mood: string): string => {
    const colors = {
      happy: '#4caf50',
      content: '#2196f3',
      sad: '#f44336',
      sleepy: '#ff9800',
      excited: '#e91e63'
    };
    return colors[mood as keyof typeof colors] || '#2196f3';
  };

  const getEnergyColor = (energy: number): string => {
    if (energy <= 20) return '#f44336';
    if (energy <= 40) return '#ff9800';
    if (energy <= 60) return '#ffeb3b';
    if (energy <= 80) return '#4caf50';
    return '#2196f3';
  };

  const isDisabled = state.energy <= 0;

  const cardStyle = {
    ...styles.petCard,
    boxShadow: `0 8px 32px ${getMoodColor(state.mood)}40`
  };

  return (
    <div style={cardStyle}>
      <div style={styles.header}>
        <div 
          ref={avatarRef}
          style={{...styles.avatar, transition: 'transform 0.3s ease'}}
        >
          {state.avatar}
        </div>
        <div>
          <h3 style={styles.name}>{state.name}</h3>
          <p style={styles.species}>{state.species}</p>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <p style={styles.statLabel}>Level</p>
          <p style={styles.statValue}>{state.level}</p>
        </div>
        <div style={styles.stat}>
          <p style={styles.statLabel}>Mood</p>
          <p 
            style={{...styles.statValue, color: getMoodColor(state.mood)}}
          >
            {state.mood}
          </p>
        </div>
      </div>

      <div>
        <p style={styles.statLabel}>Energy: {state.energy}%</p>
        <div style={styles.energyBar}>
          <div 
            style={{
              ...styles.energyFill,
              width: `${state.energy}%`,
              backgroundColor: getEnergyColor(state.energy)
            }}
          />
        </div>
      </div>

      <div style={styles.actions}>
        <ActionButton 
          onClick={feed} 
          disabled={isDisabled}
          size="small"
        >
          Feed
        </ActionButton>
        <ActionButton 
          onClick={levelUp} 
          disabled={isDisabled}
          size="small"
        >
          Level Up
        </ActionButton>
        <ActionButton 
          onClick={cheer} 
          disabled={isDisabled}
          size="small"
        >
          Cheer Up
        </ActionButton>
        <ActionButton 
          onClick={reset}
          size="small"
        >
          Reset
        </ActionButton>
      </div>

      {isDisabled && (
        <div style={styles.disabledOverlay}>
          <div style={styles.disabledText}>
            System Offline<br />
            <small>Need energy recharge</small>
          </div>
        </div>
      )}
    </div>
  );
});

PetCard.displayName = 'PetCard';

export default PetCard;