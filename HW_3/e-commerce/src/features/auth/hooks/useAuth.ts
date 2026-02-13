import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import { setCredentials, logout } from '../model/authSlice'
import { useLoginMutation, useGetMeQuery } from '@shared/api/auth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const token = useAppSelector((state) => state.auth.token)

  const [login, loginResult] = useLoginMutation()
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery(undefined, {
    skip: !token || !isAuthenticated,
  })

  useEffect(() => {
    if (userData && token) {
      dispatch(setCredentials({ user: userData, token }))
    }
  }, [userData, token, dispatch])

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await login({ username, password }).unwrap()
      dispatch(setCredentials({ user: result, token: result.token }))
      navigate('/')
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return {
    isAuthenticated,
    isLoading: loginResult.isLoading || isUserLoading,
    login: handleLogin,
    logout: handleLogout,
    error: loginResult.error,
  }
}