import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppSelector } from '@app/store/hooks';
import { selectCurrentUser } from '@features/auth/model/authSlice';

const profileSchema = yup.object({
  firstName: yup.string().required('errors.required'),
  lastName: yup.string().required('errors.required'),
  email: yup.string().email('errors.email').required('errors.required'),
});

type ProfileForm = yup.InferType<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile updated:', data);
    alert(t('common.settingsSaved')); // используем перевод
  };

  const handleReset = () => {
    reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
  };

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">{t('errors.network')}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('profile.title')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 3,
        }}
      >
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            src={user.image}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 20px',
              border: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </Avatar>
          <Typography variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('profile.personalInfo')}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label={t('auth.firstName')}
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName && t(errors.firstName.message as any)}
              />
              <TextField
                fullWidth
                label={t('auth.lastName')}
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName && t(errors.lastName.message as any)}
              />
              <TextField
                fullWidth
                label={t('auth.email')}
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email && t(errors.email.message as any)}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                fullWidth
                label={t('auth.username')}
                value={user.username}
                disabled
                sx={{ gridColumn: '1 / -1' }}
              />
            </Box>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained">
                {t('common.save')}
              </Button>
              <Button variant="outlined" onClick={handleReset}>
                {t('common.cancel')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;