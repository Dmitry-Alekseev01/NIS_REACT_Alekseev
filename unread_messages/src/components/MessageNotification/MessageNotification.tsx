import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLastMessageDate } from '../shared/hooks/useLocaleDate';
import { getPluralForm } from '../../utils/date/pluralRules';
import styles from './MessageNotification.module.css';

interface MessageNotificationProps {
  locale?: 'ru' | 'en';
  className?: string;
}

const MessageNotification: React.FC<MessageNotificationProps> = ({ 
  locale = 'ru',
  className = ''
}) => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState<number>(0);
  const formattedDate = useLastMessageDate();

  useEffect(() => {
    const randomCount = Math.floor(Math.random() * 10) + 1;
    setCount(randomCount);
    
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const pluralKey = getPluralForm(count, locale);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.notification}>
        {t(`messages.${pluralKey}`, {
          count,
          date: formattedDate
        })}
      </div>
      
      <div className={styles.debugInfo}>
        <p>Сгенерированное число: <strong>{count}</strong></p>
        <p>Текущая локаль: <strong>{locale}</strong></p>
        <p>Форма плюрализации: <strong>{pluralKey}</strong></p>
      </div>
    </div>
  );
};

export default MessageNotification;