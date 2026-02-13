import { api } from './index'

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi

export interface LoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}