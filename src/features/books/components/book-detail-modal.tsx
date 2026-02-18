import type { Book } from '@/features/books/types';

import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

type BookDetailModalProperties = {
  book: Book | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const stripHtmlTags = (value?: string) => {
  if (!value) {
    return;
  }

  const temporaryElement = document.createElement('div');
  temporaryElement.innerHTML = value;
  const plainText = temporaryElement.textContent.trim();
  return plainText.length > 0 ? plainText : undefined;
};

export default function BookDetailModal({
  book,
  isOpen,
  onOpenChange
}: Readonly<BookDetailModalProperties>) {
  const shouldReduceMotion = useReducedMotion();
  if (!book) {
    return null;
  }

  const cleanDescription = stripHtmlTags(book.description);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.18, ease: 'easeOut' }}
          className='space-y-4'
        >
          <DialogHeader>
            <DialogTitle>{book.title}</DialogTitle>
            <DialogDescription>
              {book.authors.length > 0 ? `By ${book.authors.join(', ')}` : 'Author not available'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 sm:grid-cols-[9rem_1fr]'>
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={`Cover of ${book.title}`}
                className='border-border bg-muted h-48 w-full rounded-md border object-cover sm:h-full'
              />
            ) : (
              <div className='border-border bg-muted text-muted-foreground flex h-48 w-full items-center justify-center rounded-md border text-xs sm:h-full'>
                No cover image
              </div>
            )}
            <div className='space-y-3'>
              <dl className='text-sm'>
                <div className='flex gap-2'>
                  <dt className='text-muted-foreground min-w-22'>Published:</dt>
                  <dd>{book.publishedDate ?? 'Unknown'}</dd>
                </div>
                <div className='flex gap-2'>
                  <dt className='text-muted-foreground min-w-22'>Publisher:</dt>
                  <dd>{book.publisher ?? 'Unknown'}</dd>
                </div>
              </dl>
              <p className='text-muted-foreground text-sm leading-6'>
                {cleanDescription ?? 'No summary available for this book.'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
