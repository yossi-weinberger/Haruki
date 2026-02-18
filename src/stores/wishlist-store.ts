import type { Book } from '@/features/books/types';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storageKeys } from '@/lib/constants/storage-keys';

type WishListState = {
  items: Book[];
  itemIdIndex: Record<string, true>;
  add: (book: Book) => void;
  remove: (bookId: string) => void;
  isInWishList: (bookId: string) => boolean;
};

export const useWishListStore = create<WishListState>()(
  persist(
    (setState, getState) => ({
      items: [],
      itemIdIndex: {},
      add: (book) => {
        const state = getState();
        if (state.itemIdIndex[book.id]) {
          return;
        }

        setState((previousState) => ({
          items: [...previousState.items, book],
          itemIdIndex: { ...previousState.itemIdIndex, [book.id]: true }
        }));
      },
      remove: (bookId) => {
        setState((previousState) => {
          if (!previousState.itemIdIndex[bookId]) {
            return previousState;
          }

          const filteredItems = previousState.items.filter((book) => book.id !== bookId);
          const updatedItemIdIndex: Record<string, true> = {};
          for (const book of filteredItems) {
            updatedItemIdIndex[book.id] = true;
          }

          return {
            items: filteredItems,
            itemIdIndex: updatedItemIdIndex
          };
        });
      },
      isInWishList: (bookId) => Boolean(getState().itemIdIndex[bookId])
    }),
    {
      name: storageKeys.wishlist,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ items, itemIdIndex }) => ({ items, itemIdIndex })
    }
  )
);
