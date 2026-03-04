import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          {t('notFound.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('notFound.description')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          size="large"
        >
          {t('notFound.homeButton')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;