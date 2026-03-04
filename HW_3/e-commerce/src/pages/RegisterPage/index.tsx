import React from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('errors.required'),
  email: yup.string().email('errors.email').required('errors.required'),
  firstName: yup.string().required('errors.required'),
  lastName: yup.string().required('errors.required'),
  password: yup.string().min(6, 'errors.minLength').required('errors.required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'errors.passwordMatch')
    .required('errors.required'),
});

type RegisterForm = yup.InferType<typeof schema>;

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Registration data:', data);
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            {t('auth.register')}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: '100%' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                label={t('auth.firstName')}
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName && t(errors.firstName.message as any)}
              />
              <TextField
                required
                fullWidth
                label={t('auth.lastName')}
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName && t(errors.lastName.message as any)}
              />
              <TextField
                required
                fullWidth
                label={t('auth.username')}
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username && t(errors.username.message as any)}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                required
                fullWidth
                label={t('auth.email')}
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email && t(errors.email.message as any)}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                required
                fullWidth
                label={t('auth.password')}
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={
                  errors.password && t(errors.password.message as any, { count: 6 })
                }
              />
              <TextField
                required
                fullWidth
                label={t('auth.confirmPassword')}
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword && t(errors.confirmPassword.message as any)
                }
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : t('auth.register')}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                {t('auth.hasAccount')}{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  {t('auth.login')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;