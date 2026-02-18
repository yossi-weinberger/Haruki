import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import PageTransition from '@/components/layout/page-transition';
import EmptyState from '@/components/states/empty-state';
import { Button } from '@/components/ui/button';
import BookGrid from '@/features/books/components/book-grid';
import { useI18n } from '@/i18n/use-i18n';
import { useWishListStore } from '@/stores/wishlist-store';

export default function WishListPage() {
  const { t } = useI18n();
  const books = useWishListStore((store) => store.items);
  const removeFromWishList = useWishListStore((store) => store.remove);
  const isInWishList = useWishListStore((store) => store.isInWishList);
  const addToWishList = useWishListStore((store) => store.add);

  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeBookId) {
      return;
    }

    const hasActiveBook = books.some((book) => book.id === activeBookId);
    if (!hasActiveBook) {
      setActiveBookId(null);
    }
  }, [activeBookId, books]);

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
          onToggleWish={(book, isCurrentlyInWishList) => {
            if (isCurrentlyInWishList) {
              removeFromWishList(book.id);
              return;
            }

            addToWishList(book);
          }}
          activeBookId={activeBookId}
          onToggleBookFlip={(bookId) => {
            setActiveBookId((previousBookId) => (previousBookId === bookId ? null : bookId));
          }}
        />
      )}
    </PageTransition>
  );
}
