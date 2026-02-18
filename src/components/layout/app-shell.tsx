import { Outlet } from 'react-router-dom';

import MainNav from '@/components/navigation/main-nav';
import { useI18n } from '@/i18n/use-i18n';

export default function AppShell() {
  const { t } = useI18n();

  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <MainNav />
      <main className='content-container py-6 md:py-8'>
        <Outlet />
      </main>
      <footer className='text-muted-foreground border-border/80 content-container flex h-12 items-center border-t text-xs sm:text-sm'>
        {t('footerTagline')}
      </footer>
    </div>
  );
}
