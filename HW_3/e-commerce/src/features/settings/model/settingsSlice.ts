import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Language = 'en' | 'ru'
export type Theme = 'light' | 'dark'

interface SettingsState {
  language: Language
  theme: Theme
  pageSize: number
}

const initialState: SettingsState = {
  language: (localStorage.getItem('language') as Language) || 'en',
  theme: (localStorage.getItem('theme') as Theme) || 'light',
  pageSize: Number(localStorage.getItem('pageSize')) || 20,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      localStorage.setItem('pageSize', action.payload.toString())
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { setLanguage, setTheme, setPageSize, toggleTheme } = settingsSlice.actions
export default settingsSlice.reducer

export const selectLanguage = (state: { settings: SettingsState }) =>
  state.settings.language
export const selectTheme = (state: { settings: SettingsState }) => state.settings.theme
export const selectPageSize = (state: { settings: SettingsState }) =>
  state.settings.pageSize