import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import {
  setLanguage,
  setTheme,
  setPageSize,
  toggleTheme,
  Language,
  Theme,
} from '../model/settingsSlice'
import { useTranslation } from 'react-i18next'

export const useSettings = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const settings = useAppSelector((state) => state.settings)

  const changeLanguage = (language: Language) => {
    dispatch(setLanguage(language))
    i18n.changeLanguage(language)
  }

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme))
  }

  const changePageSize = (size: number) => {
    dispatch(setPageSize(size))
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return {
    ...settings,
    changeLanguage,
    changeTheme,
    changePageSize,
    toggleTheme: handleToggleTheme,
  }
}