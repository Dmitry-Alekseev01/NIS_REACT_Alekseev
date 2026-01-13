export const getRussianPluralForm = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'one';
  }
  
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
    return 'few'; 
  }
  
  return 'many'; 
};

export const getEnglishPluralForm = (count: number): string => {
  return count === 1 ? 'one' : 'other';
};

export const getPluralForm = (count: number, locale: string): string => {
  if (locale === 'ru') {
    return getRussianPluralForm(count);
  } else {
    return getEnglishPluralForm(count);
  }
};