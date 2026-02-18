import { Outlet } from 'react-router-dom';

import MainNav from '@/components/navigation/main-nav';
import { useI18n } from '@/i18n/use-i18n';

export default function AppShell() {
  const { t, isRtlLanguage } = useI18n();

  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <MainNav />
      <main className='content-container py-6 md:py-8'>
        <Outlet />
      </main>
      <footer className='text-muted-foreground border-border/80 content-container flex flex-col items-center justify-center gap-1 border-t py-4 text-center text-sm'>
        <p className='max-w-xl italic' dir={isRtlLanguage ? 'rtl' : 'ltr'}>
          {t('navQuote')}
        </p>
        <p className='text-xs' dir={isRtlLanguage ? 'rtl' : 'ltr'}>
          {t('aboutQuoteByline')}
        </p>
        <p className='mt-2 text-xs opacity-80'>{t('footerTagline')}</p>
      </footer>
    </div>
  );
}
