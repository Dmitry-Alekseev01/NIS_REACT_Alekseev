import React from 'react';
import {
  Drawer,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useEventLog } from '../../hooks/useEventLog';

interface EventLogProps {
  open: boolean;
  onClose: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ open, onClose }) => {
  const { events, clearEvents } = useEventLog();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
          color: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(20px)'
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            System Events
          </Typography>
          <Box>
            <IconButton 
              onClick={clearEvents} 
              size="small"
              sx={{ 
                color: 'white', 
                mr: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <ClearIcon />
            </IconButton>
            <IconButton 
              onClick={onClose} 
              size="small"
              sx={{ 
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              ×
            </IconButton>
          </Box>
        </Box>

        <List 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(5px)'
          }}
        >
          {events.map((event, index) => (
            <ListItem 
              key={index}
              sx={{
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255, 255, 255, 0.08)',
                margin: '4px 8px',
                borderRadius: '8px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'white',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {event}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          {events.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}
                  >
                    No events yet
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Drawer>
  );
};