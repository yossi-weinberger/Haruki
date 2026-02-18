import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storageKeys } from '@/lib/constants/storage-keys';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LanguageCode = 'en' | 'he';

type SettingsState = {
  theme: ThemeMode;
  language: LanguageCode;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: LanguageCode) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (setState) => ({
      theme: 'system',
      language: 'en',
      setTheme: (theme) => {
        setState({ theme });
      },
      setLanguage: (language) => {
        setState({ language });
      }
    }),
    {
      name: storageKeys.settings,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ theme, language }) => ({ theme, language })
    }
  )
);
