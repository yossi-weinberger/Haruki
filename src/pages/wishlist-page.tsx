import { Link } from 'react-router-dom';

import PageTransition from '@/components/layout/page-transition';
import EmptyState from '@/components/states/empty-state';
import { Button } from '@/components/ui/button';
import BookGrid from '@/features/books/components/book-grid';
import { useBookGridHandlers } from '@/hooks/use-book-grid-handlers';
import { useI18n } from '@/i18n/use-i18n';
import { useWishListStore } from '@/stores/wishlist-store';

export default function WishListPage() {
  const { t } = useI18n();
  const books = useWishListStore((store) => store.items);

  const { isInWishList, handleToggleWish, handleToggleBookFlip, activeBookId } =
    useBookGridHandlers(books);

  return (
    <PageTransition>
      <section className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>{t('wishlistTitle')}</h1>
        <p className='text-muted-foreground text-sm'>{t('wishlistSubtitle')}</p>
      </section>

      {books.length === 0 ? (
        <EmptyState
          title={t('wishlistEmptyTitle')}
          description={t('wishlistEmptyDescription')}
          action={
            <Button asChild variant='outline'>
              <Link to='/search'>{t('wishlistGoToSearch')}</Link>
            </Button>
          }
        />
      ) : (
        <BookGrid
          books={books}
          isInWishList={isInWishList}
          onToggleWish={handleToggleWish}
          activeBookId={activeBookId}
          onToggleBookFlip={handleToggleBookFlip}
        />
      )}
    </PageTransition>
  );
}
