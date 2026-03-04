import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '@features/settings/hooks/useSettings';

const menuItems = [
  { text: 'navigation.dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'navigation.products', icon: <ProductsIcon />, path: '/products' },
  { text: 'navigation.profile', icon: <ProfileIcon />, path: '/profile' },
  { text: 'navigation.settings', icon: <SettingsIcon />, path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSettings();

  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary">
          E-commerce Admin
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={t(item.text)} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};