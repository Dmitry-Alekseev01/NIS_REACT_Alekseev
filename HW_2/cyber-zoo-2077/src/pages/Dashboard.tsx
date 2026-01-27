import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Box,
  SelectChangeEvent
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Skeleton from '@mui/material/Skeleton';
import PetCard from '../components/PetCard/PetCard';
import { EventLog } from '../components/EventLog/EventLog';
import { useEventLog } from '../hooks/useEventLog';
import { Pet } from '../components/PetCard/types';
import petsData from '../data/pets.json';

export const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [logOpen, setLogOpen] = useState(false);
  const { addEvent } = useEventLog();

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Loaded pets data:', petsData);
        setPets(petsData as Pet[]);
        addEvent('System: Pets data loaded successfully');
      } catch (error) {
        console.error('Error loading pets:', error);
        addEvent('System: Error loading pets data');
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const handlePetUpdate = useCallback((id: string, updates: Partial<Pet>) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...updates } : pet
    ));
  }, []);

  const filteredPets = useMemo(() => {
    if (selectedSpecies === 'all') return pets;
    return pets.filter(pet => pet.species === selectedSpecies);
  }, [pets, selectedSpecies]);

  const species = useMemo(() => {
    const allSpecies = pets.map(pet => pet.species);
    return ['all', ...Array.from(new Set(allSpecies))];
  }, [pets]);

  const handleSpeciesChange = (event: SelectChangeEvent) => {
    setSelectedSpecies(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 2 
      }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{
            background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          CyberZoo 2077
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center', 
          flexWrap: 'wrap' 
        }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel 
              sx={{ 
                color: 'white',
                fontWeight: '600',
                '&.Mui-focused': {
                  color: '#2196f3'
                }
              }}
            >
              Filter by Species
            </InputLabel>
            <Select
              value={selectedSpecies}
              label="Filter by Species"
              onChange={handleSpeciesChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      padding: '12px 16px',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      },
                      '&.Mui-selected': {
                        background: 'rgba(33, 150, 243, 0.2)',
                        '&:hover': {
                          background: 'rgba(33, 150, 243, 0.3)'
                        }
                      }
                    }
                  }
                }
              }}
              sx={{ 
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2196f3',
                },
                '& .MuiSelect-icon': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            >
              {species.map(species => (
                <MenuItem 
                  key={species} 
                  value={species}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)'
                    },
                    '&.Mui-selected': {
                      background: 'rgba(33, 150, 243, 0.2)',
                      '&:hover': {
                        background: 'rgba(33, 150, 243, 0.3)'
                      }
                    }
                  }}
                >
                  {species === 'all' ? 'All Species' : species}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton 
            onClick={() => setLogOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #00acc1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <EventIcon />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <div className="pet-card-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton 
              key={index}
              variant="rectangular" 
              height={350} 
              sx={{ 
                borderRadius: 3,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)'
              }}
            />
          ))}
        </div>
      ) : (
        <div className="pet-card-grid">
          {filteredPets.map(pet => (
            <PetCard 
              key={pet.id}
              pet={pet}
              onPetUpdate={handlePetUpdate}
            />
          ))}
        </div>
      )}

      <EventLog open={logOpen} onClose={() => setLogOpen(false)} />
    </Container>
  );
};