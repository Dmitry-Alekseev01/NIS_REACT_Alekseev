import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateShort } from '../../../utils/date/dateFormatter';

export const useLocaleDate = (date: Date): string => {
  const { i18n } = useTranslation();
  
  return useMemo(() => {
    return formatDateShort(date, i18n.language);
  }, [date, i18n.language]);
};

export const useLastMessageDate = (): string => {
  const { i18n } = useTranslation();
  const today = useMemo(() => new Date(), []);
  
  return useMemo(() => {
    return formatDateShort(today, i18n.language);
  }, [today, i18n.language]);
};