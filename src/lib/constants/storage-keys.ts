const STORAGE_PREFIX = 'HARUKI';

export const storageKeys = {
  settings: `${STORAGE_PREFIX}-SETTINGS`,
  wishlist: `${STORAGE_PREFIX}-WISHLIST`
} as const;
