import { useEffect } from 'react';

import { useSettingsStore } from '@/stores/settings-store';

const THEME_META_SELECTOR = 'meta[name="theme-color"]';

const setDocumentTheme = (theme: 'dark' | 'light') => {
  const rootElement = document.documentElement;
  rootElement.classList.remove('light', 'dark');
  rootElement.classList.add(theme);

  const themeColorMeta = document.querySelector<HTMLMetaElement>(THEME_META_SELECTOR);
  if (!themeColorMeta) {
    return;
  }

  themeColorMeta.setAttribute('content', theme === 'dark' ? '#0F0D0A' : '#FFFBF5');
};

export default function ThemeSync() {
  const theme = useSettingsStore((state) => state.theme);
  const language = useSettingsStore((state) => state.language);

  useEffect(() => {
    if (theme !== 'system') {
      setDocumentTheme(theme);
      return;
    }

    const mediaQueryList = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const applySystemTheme = () => {
      setDocumentTheme(mediaQueryList.matches ? 'dark' : 'light');
    };

    applySystemTheme();
    mediaQueryList.addEventListener('change', applySystemTheme);
    return () => {
      mediaQueryList.removeEventListener('change', applySystemTheme);
    };
  }, [theme]);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.setAttribute('lang', language);
    rootElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
  }, [language]);

  return null;
}
