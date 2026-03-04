import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@features/settings/hooks/useSettings';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    language,
    theme,
    pageSize,
    changeLanguage,
    changePageSize,
    toggleTheme,
  } = useSettings();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value as 'en' | 'ru');
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 5 && value <= 100) {
      changePageSize(value);
    }
  };

  const handleSaveSettings = () => {
    alert(t('common.settingsSaved'));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('settings.title')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('settings.language')}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>{t('settings.language')}</InputLabel>
            <Select
              value={language}
              label={t('settings.language')}
              onChange={handleLanguageChange}
            >
              <MenuItem value="en">{t('settings.english')}</MenuItem>
              <MenuItem value="ru">{t('settings.russian')}</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('settings.theme')}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label={theme === 'dark' ? t('settings.dark') : t('settings.light')}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, gridColumn: '1 / -1' }}>
          <Typography variant="h6" gutterBottom>
            {t('settings.pageSize')}
          </Typography>
          <Box sx={{ mt: 2, maxWidth: 200 }}>
            <TextField
              fullWidth
              type="number"
              label={t('settings.pageSize')}
              value={pageSize}
              onChange={handlePageSizeChange}
              inputProps={{ min: 5, max: 100 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {t('settings.pageSizeHint')}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSaveSettings}>
          {t('common.save')}
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsPage;