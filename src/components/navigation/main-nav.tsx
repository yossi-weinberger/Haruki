import { NavLink } from 'react-router-dom';

import { useI18n } from '@/i18n/use-i18n';
import { cn } from '@/lib/utils';
import { useWishListStore } from '@/stores/wishlist-store';

import LanguageToggle from './language-toggle';
import ThemeToggle from './theme-toggle';

export default function MainNav() {
  const wishListCount = useWishListStore((state) => state.items.length);
  const { t, isRtlLanguage } = useI18n();
  const links = [
    { to: '/search', label: t('navSearch') },
    { to: '/wishlist', label: t('navWishList') },
    { to: '/about', label: t('navAbout') }
  ] as const;

  return (
    <header className='border-border/80 bg-background/92 sticky top-0 z-20 border-b backdrop-blur-sm'>
      <div className='content-container flex min-h-18 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2'>
        <div className='flex items-center gap-6'>
          <NavLink to='/search' className='group flex items-center gap-3'>
            <img
              src='/favicon/logo.png'
              alt='Haruki logo'
              className='border-border bg-muted h-10 w-10 rounded-lg border object-cover shadow-sm'
            />
            <div className='space-y-0.5'>
              <div className='text-lg font-semibold tracking-tight'>Haruki</div>
              <p
                className='text-muted-foreground hidden max-w-xl text-[11px] italic md:block'
                dir='ltr'
              >
                {t('navQuote')}
              </p>
            </div>
          </NavLink>
          <nav
            aria-label='Main navigation'
            className={cn('flex items-center gap-2', isRtlLanguage ? 'flex-row-reverse' : null)}
          >
            {links.map((linkItem) => (
              <NavLink
                key={linkItem.to}
                to={linkItem.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {linkItem.label}
                {linkItem.to === '/wishlist' && wishListCount > 0 ? (
                  <span className='bg-primary/20 text-primary ml-2 rounded-full px-1.5 py-0.5 text-xs'>
                    {wishListCount}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className={cn('flex items-center gap-2', isRtlLanguage ? 'flex-row-reverse' : null)}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
