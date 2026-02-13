import React, { useEffect } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@features/auth/hooks/useAuth'
import { useAppSelector } from '@app/store/hooks'
import { selectIsAuthenticated } from '@features/auth/model/authSlice'

const schema = yup.object({
  username: yup.string().required('errors.required'),
  password: yup.string().min(6, 'errors.minLength').required('errors.required'),
})

type LoginForm = yup.InferType<typeof schema>

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: LoginForm) => {
    setError(null)
    const result = await login(data.username, data.password)
    if (!result.success) {
      setError(t('auth.loginError'))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
            {t('auth.login')}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('auth.username')}
              autoComplete="username"
              autoFocus
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username && t(errors.username.message as any)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('auth.password')}
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password && t(errors.password.message as any, { count: 6 })}
            />

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
              {isLoading ? <CircularProgress size={24} /> : t('auth.login')}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                {t('auth.noAccount')}{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  {t('auth.register')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage