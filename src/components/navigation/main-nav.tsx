import { NavLink, useLocation } from 'react-router-dom';

import { useI18n } from '@/i18n/use-i18n';
import { cn } from '@/lib/utils';
import { useWishListStore } from '@/stores/wishlist-store';

import LanguageToggle from './language-toggle';
import ThemeToggle from './theme-toggle';

const NAV_PATHS = ['/search', '/wishlist', '/about'] as const;

function getNavIndex(pathname: string): number {
  const i = NAV_PATHS.indexOf(pathname as (typeof NAV_PATHS)[number]);
  return i >= 0 ? i : 0;
}

export default function MainNav() {
  const wishListCount = useWishListStore((state) => state.items.length);
  const { t, isRtlLanguage } = useI18n();
  const { pathname } = useLocation();
  const navIndex = getNavIndex(pathname);

  const links = [
    { to: '/search', label: t('navSearch') },
    { to: '/wishlist', label: t('navWishList') },
    { to: '/about', label: t('navAbout') }
  ] as const;

  const togglesEl = (
    <div
      className={cn(
        'flex items-center gap-2',
        isRtlLanguage
          ? '-mr-4 pr-4 sm:-mr-6 sm:pr-6 lg:-mr-8 lg:pr-8'
          : '-ml-4 pl-4 sm:-ml-6 sm:pl-6 lg:-ml-8 lg:pl-8'
      )}
    >
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );

  return (
    <header className='border-border/80 bg-background/92 sticky top-0 z-20 border-b backdrop-blur-sm'>
      <div className='content-container flex min-h-18 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2'>
        {!isRtlLanguage ? togglesEl : null}
        <div className='flex items-center gap-6'>
          <NavLink to='/search' className='group flex shrink-0 items-center' aria-label='Haruki – home'>
            <picture className='border-border bg-muted flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border shadow-sm'>
              <source type='image/webp' srcSet='/favicon/logo.webp' />
              <img
                src='/favicon/logo.png'
                alt='Haruki logo'
                className='h-full w-full object-contain p-0.5'
              />
            </picture>
          </NavLink>
          <nav aria-label='Main navigation' className='relative grid w-full max-w-md grid-cols-3 gap-0 overflow-hidden rounded-lg bg-muted p-1'>
            <div
              aria-hidden
              className='pointer-events-none absolute top-1 bottom-1 left-1 rounded-md bg-primary/20 shadow-sm transition-[transform] duration-300 ease-in-out will-change-transform'
              style={{
                width: 'calc((100% - 0.5rem) / 3)',
                transform: isRtlLanguage
                  ? `translateX(calc(${2 - navIndex} * 100%))`
                  : `translateX(calc(${navIndex} * 100%))`
              }}
            />
            {links.map((linkItem) => (
              <NavLink
                key={linkItem.to}
                to={linkItem.to}
                className={({ isActive }) =>
                  cn(
                    'relative z-10 flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'bg-transparent hover:bg-transparent',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {linkItem.label}
                {linkItem.to === '/wishlist' && wishListCount > 0 ? (
                  <span className='bg-primary/20 text-primary ml-1.5 rounded-full px-1.5 py-0.5 text-xs'>
                    {wishListCount}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>
        {isRtlLanguage ? togglesEl : null}
      </div>
    </header>
  );
}
