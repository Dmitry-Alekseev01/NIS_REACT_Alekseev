import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { I18nextProvider } from 'react-i18next'
import { store, persistor } from './app/store'
import { AppRouter } from './app/router'
import i18n from './shared/lib/i18n'
import { useSettings } from '@features/settings/hooks/useSettings'

const AppContent: React.FC = () => {
  const { theme: themeMode, language } = useSettings()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <AppContent />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  )
}

export default App