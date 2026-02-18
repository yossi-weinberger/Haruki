import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Book } from '@/features/books/types';

import { useWishListStore } from '@/stores/wishlist-store';

/**
 * Shared logic for BookGrid: wish toggle, flip state, and resetting active book
 * when it is no longer in the current books list (e.g. removed from wishlist).
 */
export function useBookGridHandlers(books: Book[]) {
  const addToWishList = useWishListStore((store) => store.add);
  const removeFromWishList = useWishListStore((store) => store.remove);
  const isInWishList = useWishListStore((store) => store.isInWishList);

  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const handleToggleWish = useCallback(
    (book: Book, isCurrentlyInWishList: boolean) => {
      if (isCurrentlyInWishList) {
        removeFromWishList(book.id);
        return;
      }
      addToWishList(book);
    },
    [addToWishList, removeFromWishList]
  );

  const handleToggleBookFlip = useCallback((bookId: string) => {
    setActiveBookId((previous) => (previous === bookId ? null : bookId));
  }, []);

  const bookIdSet = useMemo(() => new Set(books.map((b) => b.id)), [books]);

  useEffect(() => {
    if (!activeBookId || bookIdSet.has(activeBookId)) {
      return;
    }
    setActiveBookId(null);
  }, [activeBookId, bookIdSet]);

  return {
    isInWishList,
    handleToggleWish,
    handleToggleBookFlip,
    activeBookId
  };
}
