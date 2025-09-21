
import { translations, TranslationKey } from '../translations/fr';

export const useTranslation = () => {
  const t = (key: TranslationKey): string => {
    return translations[key] || key;
  };

  const formatDate = (date: Date): string => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    
    const dayName = t(days[date.getDay()] as TranslationKey);
    const monthName = t(months[date.getMonth()] as TranslationKey);
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
  };

  return { t, formatDate };
};
