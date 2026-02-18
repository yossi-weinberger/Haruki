import type { Book } from '@/features/books/types';

import BookCard from './book-card';

type BookGridProperties = {
  books: Book[];
  isInWishList: (bookId: string) => boolean;
  onToggleWish: (book: Book, isCurrentlyInWishList: boolean) => void;
  activeBookId: string | null;
  onToggleBookFlip: (bookId: string) => void;
};

export default function BookGrid({
  books,
  isInWishList,
  onToggleWish,
  activeBookId,
  onToggleBookFlip
}: Readonly<BookGridProperties>) {
  return (
    <div className='book-grid grid auto-rows-[26rem] grid-cols-1 gap-4 sm:auto-rows-[32rem] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((book) => (
        <div key={book.id} className='book-grid-item'>
          <BookCard
            book={book}
            isInWishList={isInWishList(book.id)}
            onToggleWish={onToggleWish}
            isFlipped={activeBookId === book.id}
            onToggleBookFlip={onToggleBookFlip}
          />
        </div>
      ))}
    </div>
  );
}
