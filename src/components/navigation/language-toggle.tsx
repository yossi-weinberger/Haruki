import type { LanguageCode } from '@/stores/settings-store';

import { useI18n } from '@/i18n/use-i18n';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settings-store';

const languages: LanguageCode[] = ['en', 'he'];

export default function LanguageToggle() {
  const selectedLanguage = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const { t } = useI18n();

  return (
    <div className='border-border bg-background/80 inline-flex items-center rounded-lg border p-1'>
      <span className='text-muted-foreground px-2 text-xs'>{t('navLanguage')}</span>
      {languages.map((language) => (
        <button
          key={language}
          type='button'
          className={cn(
            'rounded-md px-2 py-1 text-xs font-medium transition-colors',
            selectedLanguage === language
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={selectedLanguage === language}
          onClick={() => {
            setLanguage(language);
          }}
        >
          {language === 'en' ? t('languageEnglish') : t('languageHebrew')}
        </button>
      ))}
    </div>
  );
}
