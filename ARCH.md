# Haruki Architecture

## High-Level Overview

Haruki is a client-side React SPA with three routes:

- `search`: query Google Books and add books.
- `wishlist`: manage saved books.
- `about`: lightweight in-app documentation.

## State Design

### Wish List Store

- Technology: Zustand + persist middleware.
- Data: normalized `items` array + `itemIdIndex` map for O(1) duplicate checks.
- Actions: `add`, `remove`, `isInWishList`.
- Persistence: localStorage (`HARUKI-WISHLIST`).

### Settings Store

- Technology: Zustand + persist middleware.
- Data: `theme`, `language`.
- Actions: `setTheme`, `setLanguage`.
- Persistence: localStorage (`HARUKI-SETTINGS`).

## Search Flow

1. User types in SearchBar.
2. Query is debounced in `useDebouncedValue`.
3. A cancellable request is sent to Google Books.
4. Response is normalized via adapter layer.
5. UI transitions between `idle/loading/success/empty/error`.

## API Layer

- `searchGoogleBooks` wraps fetch and error mapping.
- `adaptGoogleBookVolume(s)` maps external payload into internal `Book` model.
- API key is optional via `VITE_GOOGLE_BOOKS_API_KEY`.

## UI Composition

- App shell: top navigation + content + footer.
- Reusable state components: loading, empty, error.
- Book components: search bar, card grid, details modal.
- Motion: subtle page/card/modal transitions via Framer Motion.
- Accessibility baseline: semantic labels, keyboard modal support, focus visibility.

## Styling

- Tailwind CSS with CSS variable design tokens in `global.css`.
- Light and dark palettes aligned with project branding.
