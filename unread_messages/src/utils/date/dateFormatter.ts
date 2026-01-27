export const formatDateShort = (date: Date, locale: string): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  const monthNames = {
    ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  
  const monthKey = locale === 'ru' ? 'ru' : 'en';
  const month = monthNames[monthKey][date.getMonth()];
  
  return `${day} ${month} ${hours}:${minutes}:${seconds}`;
};

export const formatLastMessageDate = (locale: string): string => {
  return formatDateShort(new Date(), locale);
};