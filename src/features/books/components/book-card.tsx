import type { Book } from '@/features/books/types';
import type { KeyboardEvent } from 'react';

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { useI18n } from '@/i18n/use-i18n';
import { detectTextDirection } from '@/lib/text-direction';
import { cn } from '@/lib/utils';

import BookLikeButton from './book-like-button';

type BookCardProperties = {
  book: Book;
  isInWishList: boolean;
  onToggleWish: (book: Book, isCurrentlyInWishList: boolean) => void;
  isFlipped: boolean;
  onToggleBookFlip: (bookId: string) => void;
};

function BookCard({
  book,
  isInWishList,
  onToggleWish,
  isFlipped,
  onToggleBookFlip
}: Readonly<BookCardProperties>) {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useI18n();

  const titleDirection = detectTextDirection(book.title);
  const authorText = book.authors.length > 0 ? book.authors.join(', ') : t('bookAuthorUnavailable');
  const authorDirection = detectTextDirection(authorText);
  const description = book.description ?? t('bookNoSummaryShort');
  const descriptionDirection = detectTextDirection(description);
  const flipCard = () => {
    onToggleBookFlip(book.id);
  };

  const handleFlipByKeyboard = (event_: KeyboardEvent<HTMLElement>) => {
    if (event_.key !== 'Enter' && event_.key !== ' ') {
      return;
    }

    event_.preventDefault();
    flipCard();
  };

  return (
    <motion.article
      layout
      whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.015 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.18, ease: 'easeOut' }}
      className='book-flip-shell relative h-full'
    >
      <div className={cn('book-flip-content', isFlipped ? 'is-flipped' : null)}>
        <div
          role='button'
          tabIndex={0}
          className='book-flip-face book-flip-face--front book-card surface h-full w-full text-start'
          aria-label={book.title}
          onClick={flipCard}
          onKeyDown={handleFlipByKeyboard}
        >
          <div className='bg-muted border-border relative flex aspect-[2/3] w-full items-center justify-center border-b'>
            <span
              className='absolute top-2 right-2 z-20 rtl:left-2 rtl:right-auto'
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <BookLikeButton
                isLiked={isInWishList}
                onToggle={() => {
                  onToggleWish(book, isInWishList);
                }}
              />
            </span>
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={`Cover of ${book.title}`}
                width={200}
                height={300}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            ) : (
              <img
                src='/missing.webp'
                alt={t('bookNoCover')}
                width={200}
                height={300}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div className='flex h-full min-h-0 flex-col px-4 py-4'>
            <h3 dir={titleDirection} className='text-base leading-snug font-medium'>
              {book.title}
            </h3>
            <p dir={authorDirection} className='text-muted-foreground mt-2 text-sm'>
              {authorText}
            </p>
          </div>
        </div>

        <div
          role='button'
          tabIndex={0}
          className='book-flip-face book-flip-face--back book-card surface h-full w-full text-start'
          aria-label={book.title}
          onClick={flipCard}
          onKeyDown={handleFlipByKeyboard}
        >
          <div className='book-flip-back-glow' />
          <span
            className='absolute top-2 right-2 z-20 rtl:left-2 rtl:right-auto'
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <BookLikeButton
              isLiked={isInWishList}
              onToggle={() => {
                onToggleWish(book, isInWishList);
              }}
            />
          </span>
          <div className='relative z-10 flex h-full min-h-0 flex-col gap-3 px-4 py-4'>
            <h3 dir={titleDirection} className='text-base leading-snug font-semibold shrink-0'>
              {book.title}
            </h3>
            <p dir={authorDirection} className='text-muted-foreground text-sm shrink-0'>
              {authorText}
            </p>

            <dl className='text-sm shrink-0'>
              <div className='flex gap-2'>
                <dt className='text-muted-foreground min-w-20'>{t('bookPublished')}:</dt>
                <dd dir={detectTextDirection(book.publishedDate)}>
                  {book.publishedDate ?? t('bookUnknown')}
                </dd>
              </div>
              <div className='flex gap-2'>
                <dt className='text-muted-foreground min-w-20'>{t('bookPublisher')}:</dt>
                <dd dir={detectTextDirection(book.publisher)}>
                  {book.publisher ?? t('bookUnknown')}
                </dd>
              </div>
            </dl>

            <div className='min-h-0 flex-1 overflow-y-auto'>
              <p dir={descriptionDirection} className='text-muted-foreground text-sm leading-6'>
                {book.description ?? t('bookNoSummaryLong')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(BookCard);
