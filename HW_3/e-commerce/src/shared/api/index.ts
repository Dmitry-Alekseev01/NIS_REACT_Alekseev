import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dummyjson.com',
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (endpoint !== 'login') {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Product', 'User'],
  endpoints: () => ({}),
});