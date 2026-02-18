import type { Book } from '@/features/books/types';
import type { KeyboardEvent } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import LikeButton from '@/components/ui/like-button';
import { useI18n } from '@/i18n/use-i18n';
import { detectTextDirection } from '@/lib/text-direction';
import { cn } from '@/lib/utils';

type BookCardProperties = {
  book: Book;
  isInWishList: boolean;
  onToggleWish: (book: Book, isCurrentlyInWishList: boolean) => void;
  isFlipped: boolean;
  onToggleBookFlip: (bookId: string) => void;
};

const truncatedDescriptionClassName =
  '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden';

export default function BookCard({
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
      className='book-flip-shell h-full'
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
          <div className='bg-muted border-border flex aspect-[3/4] w-full items-center justify-center border-b'>
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={`Cover of ${book.title}`}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            ) : (
              <span className='text-muted-foreground text-xs'>{t('bookNoCover')}</span>
            )}
          </div>
          <div className='flex h-full min-h-0 flex-col px-4 py-4'>
            <h3 dir={titleDirection} className='text-base leading-snug font-medium'>
              {book.title}
            </h3>
            <p dir={authorDirection} className='text-muted-foreground mt-2 text-sm'>
              {authorText}
            </p>
            <p
              dir={descriptionDirection}
              className={cn('text-muted-foreground mt-3 text-sm', truncatedDescriptionClassName)}
            >
              {description}
            </p>
            <div className='border-border/70 mt-auto flex items-center justify-center border-t pt-3'>
              <LikeButton
                checked={isInWishList}
                className='bg-background/85'
                onChange={() => {
                  onToggleWish(book, isInWishList);
                }}
              />
            </div>
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
          <div className='relative z-10 flex h-full flex-col gap-3 px-4 py-4'>
            <h3 dir={titleDirection} className='text-base leading-snug font-semibold'>
              {book.title}
            </h3>
            <p dir={authorDirection} className='text-muted-foreground text-sm'>
              {authorText}
            </p>

            <dl className='text-sm'>
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

            <p dir={descriptionDirection} className='text-muted-foreground text-sm leading-6'>
              {book.description ?? t('bookNoSummaryLong')}
            </p>

            <div className='border-border/70 mt-auto flex items-center justify-center border-t pt-3'>
              <LikeButton
                checked={isInWishList}
                className='bg-background/85'
                onChange={() => {
                  onToggleWish(book, isInWishList);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
