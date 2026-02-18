import { useCallback, useEffect, useState } from 'react';

import type { Book } from '@/features/books/types';

import PageTransition from '@/components/layout/page-transition';
import EmptyState from '@/components/states/empty-state';
import ErrorState from '@/components/states/error-state';
import LoadingState from '@/components/states/loading-state';
import { searchGoogleBooks } from '@/features/books/api/google-books-client';
import BookGrid from '@/features/books/components/book-grid';
import SearchBar from '@/features/books/components/search-bar';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useI18n } from '@/i18n/use-i18n';
import { useWishListStore } from '@/stores/wishlist-store';

type SearchState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

const SEARCH_DEBOUNCE_DELAY = 650;
const MINIMUM_QUERY_LENGTH = 2;

export default function SearchPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [state, setState] = useState<SearchState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [searchAttempt, setSearchAttempt] = useState(0);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_DELAY);

  const addToWishList = useWishListStore((store) => store.add);
  const removeFromWishList = useWishListStore((store) => store.remove);
  const isInWishList = useWishListStore((store) => store.isInWishList);
  const toErrorMessage = useCallback(
    (error: unknown) => {
      if (error instanceof Error && error.message.toLowerCase().includes('rate limit')) {
        return t('errorRateLimit');
      }

      if (error instanceof Error && error.message.trim().length > 0) {
        return error.message;
      }

      return t('errorGeneric');
    },
    [t]
  );

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();
    if (!normalizedQuery || normalizedQuery.length < MINIMUM_QUERY_LENGTH) {
      setBooks([]);
      setActiveBookId(null);
      setState('idle');
      setErrorMessage('');
      return;
    }

    const abortController = new AbortController();

    const loadBooks = async () => {
      setState('loading');
      setErrorMessage('');

      try {
        const nextBooks = await searchGoogleBooks(normalizedQuery, abortController.signal);
        if (abortController.signal.aborted) {
          return;
        }

        setBooks(nextBooks);
        setState(nextBooks.length > 0 ? 'success' : 'empty');
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        setState('error');
        setErrorMessage(toErrorMessage(error));
      }
    };

    void loadBooks();

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery, searchAttempt, toErrorMessage]);

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
        <h1 className='text-2xl font-semibold tracking-tight'>{t('searchTitle')}</h1>
        <p className='text-muted-foreground text-sm'>{t('searchSubtitle')}</p>
      </section>

      <SearchBar query={query} isLoading={state === 'loading'} onQueryChange={setQuery} />

      {state === 'idle' ? (
        <EmptyState title={t('searchIdleTitle')} description={t('searchIdleDescription')} />
      ) : null}

      {state === 'loading' ? <LoadingState label={t('loadingBooks')} /> : null}

      {state === 'error' ? (
        <ErrorState
          title={t('errorTitle')}
          description={errorMessage}
          retryLabel={t('errorRetry')}
          onRetry={() => {
            setSearchAttempt((previousAttempt) => previousAttempt + 1);
          }}
        />
      ) : null}

      {state === 'empty' ? (
        <EmptyState title={t('searchEmptyTitle')} description={t('searchEmptyDescription')} />
      ) : null}

      {state === 'success' ? (
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
      ) : null}
    </PageTransition>
  );
}
