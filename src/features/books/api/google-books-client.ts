import type { GoogleBookVolume } from '@/features/books/api/book-adapter';
import type { Book } from '@/features/books/types';

import { adaptGoogleBookVolumes } from '@/features/books/api/book-adapter';

const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
const MAX_CACHE_ENTRIES = 60;
const WHITESPACE_REGEX = /\s+/g;
const RATE_LIMIT_COOLDOWN_IN_MILLISECONDS = 25_000;
let rateLimitUntil = 0;

type GoogleBooksResponse = {
  items?: GoogleBookVolume[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isGoogleBookVolumeArray = (value: unknown): value is GoogleBookVolume[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((entry) => isRecord(entry) && typeof entry.id === 'string');
};

const parseGoogleBooksResponse = (value: unknown): GoogleBooksResponse => {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const items = (value as Record<string, unknown>).items;
  if (!isGoogleBookVolumeArray(items)) {
    return {};
  }

  return { items };
};

const getErrorMessage = (statusCode: number) => {
  if (statusCode === 429) {
    return 'Google Books rate limit reached. Please wait a few seconds and try again.';
  }

  if (statusCode >= 500) {
    return 'Google Books is currently unavailable. Please try again shortly.';
  }

  return 'Unable to load books right now. Please try again.';
};

const normalizeQueryText = (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) return '';
  return trimmed.replaceAll(WHITESPACE_REGEX, ' ');
};

/**
 * Builds a structured query for title/author only (no description).
 * Multi-word input is NOT wrapped in quotes so Google can match flexibly
 * (e.g. Hebrew "קפקא" may match English "Kafka" in full-text fallback).
 */
const toSearchQuery = (query: string) => {
  const normalized = normalizeQueryText(query);
  if (!normalized) return '';
  return `(intitle:${normalized} OR inauthor:${normalized})`;
};

/**
 * Returns a plain full-text search query for fallback when structured search finds nothing.
 * Used to match across scripts (e.g. Hebrew query vs English title) or in other metadata.
 */
const getFallbackSearchQuery = (rawUserQuery: string) => {
  const normalized = normalizeQueryText(rawUserQuery);
  if (normalized.length < 2) return '';
  return normalized;
};

const getCacheKey = (query: string) => query.trim().toLowerCase();

const queryCache = new Map<string, Book[]>();

const getCachedBooks = (query: string) => queryCache.get(getCacheKey(query));

const setCachedBooks = (query: string, books: Book[]) => {
  const cacheKey = getCacheKey(query);
  queryCache.set(cacheKey, books);
  if (queryCache.size <= MAX_CACHE_ENTRIES) {
    return;
  }

  const oldestCacheKey = queryCache.keys().next().value;
  if (!oldestCacheKey) {
    return;
  }

  queryCache.delete(oldestCacheKey);
};

const deduplicateBooks = (books: Book[]) => {
  const uniqueBookMap = new Map<string, Book>();
  for (const book of books) {
    uniqueBookMap.set(book.id, book);
  }

  return [...uniqueBookMap.values()];
};

const fetchBooksByQuery = async (query: string, signal?: AbortSignal): Promise<Book[]> => {
  const searchParameters = new URLSearchParams({
    q: query,
    maxResults: '24',
    printType: 'books',
    orderBy: 'relevance'
  });

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  if (apiKey) {
    searchParameters.set('key', apiKey);
  }

  const response = await fetch(`${GOOGLE_BOOKS_ENDPOINT}?${searchParameters.toString()}`, {
    signal
  });
  if (!response.ok) {
    if (response.status === 429) {
      rateLimitUntil = Date.now() + RATE_LIMIT_COOLDOWN_IN_MILLISECONDS;
    }

    throw new Error(getErrorMessage(response.status));
  }

  const responsePayload: unknown = await response.json();
  const responseData = parseGoogleBooksResponse(responsePayload);
  return adaptGoogleBookVolumes(responseData.items ?? []);
};

export const searchGoogleBooks = async (query: string, signal?: AbortSignal): Promise<Book[]> => {
  const searchQuery = toSearchQuery(query);
  if (!searchQuery || searchQuery.length < 2) {
    return [];
  }

  const cachedBooks = getCachedBooks(searchQuery);
  if (cachedBooks) {
    return cachedBooks;
  }

  if (Date.now() < rateLimitUntil) {
    throw new Error('Google Books rate limit reached. Please wait a few seconds and try again.');
  }

  const primaryBooks = await fetchBooksByQuery(searchQuery, signal);
  if (primaryBooks.length > 0) {
    const deduplicatedBooks = deduplicateBooks(primaryBooks);
    setCachedBooks(searchQuery, deduplicatedBooks);
    return deduplicatedBooks;
  }

  const fallbackSearchQuery = getFallbackSearchQuery(query);
  if (!fallbackSearchQuery) {
    setCachedBooks(searchQuery, []);
    return [];
  }

  const fallbackBooks = await fetchBooksByQuery(fallbackSearchQuery, signal);
  const deduplicatedBooks = deduplicateBooks(fallbackBooks);
  setCachedBooks(searchQuery, deduplicatedBooks);
  if (!getCachedBooks(fallbackSearchQuery)) {
    setCachedBooks(fallbackSearchQuery, deduplicatedBooks);
  }

  return deduplicatedBooks;
};
