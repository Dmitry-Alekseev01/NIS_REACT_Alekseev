import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Brightness4, Brightness7, Person } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '@features/settings/hooks/useSettings';
import { useAuth } from '@features/auth/hooks/useAuth';
import { selectCurrentUser } from '@features/auth/model/authSlice';
import { useAppSelector } from '@app/store/hooks';
import { useGetProductByIdQuery } from '@shared/api/products';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme, theme } = useSettings();
  const { logout } = useAuth();
  const user = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const productId = location.pathname.startsWith('/products/')
    ? Number(location.pathname.split('/')[2])
    : undefined;

  const { product } = useGetProductByIdQuery(productId as number, {
    skip: !productId,
    selectFromResult: (result) => ({ product: result.data }),
  });

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === '/') return t('navigation.dashboard');
    if (path === '/products') return t('navigation.products');
    if (path === '/profile') return t('navigation.profile');
    if (path === '/settings') return t('navigation.settings');
    if (path.startsWith('/products/')) {
      return product?.title || t('products.details');
    }
    return '';
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton onClick={handleMenu} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.firstName?.[0] || <Person />}
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleProfile}>{t('navigation.profile')}</MenuItem>
            <MenuItem onClick={handleSettings}>{t('navigation.settings')}</MenuItem>
            <MenuItem onClick={handleLogout}>{t('auth.logout')}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};