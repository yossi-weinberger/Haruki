import type { LanguageCode } from '@/stores/settings-store';

import { messages } from '@/i18n/messages';
import { useSettingsStore } from '@/stores/settings-store';

type MessageKey = keyof (typeof messages)['en'];

const fallbackLanguage: LanguageCode = 'en';

export const useI18n = () => {
  const language = useSettingsStore((state) => state.language);
  const dictionary = messages[language];
  const fallbackDictionary = messages[fallbackLanguage];

  const t = (key: MessageKey): string => {
    const value = dictionary[key];
    if (typeof value === 'string') {
      return value;
    }

    const fallbackValue = fallbackDictionary[key];
    if (typeof fallbackValue === 'string') {
      return fallbackValue;
    }

    return key;
  };

  return {
    language,
    isRtlLanguage: language === 'he',
    t
  };
};
