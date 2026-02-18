# Haruki

Haruki is a personal library and wish list web app.
It lets you search books via Google Books API, keep a persistent wish list in localStorage, and manage your reading queue with a clean UI.

## Core Features (MVP)

- Search books by title or author.
- Display results as cards (cover, title, authors, short summary).
- Add books to a persistent wish list.
- Prevent duplicate add actions when a book already exists in the wish list.
- Remove books from the wish list.
- Navigate between Search, Wish List, and About pages.
- Show loading, empty, and error states.
- Open a book details modal with description, publisher, and published date.
- Light / dark / system theme support.

## Tech Stack

- React 19 + TypeScript
- React Router
- Zustand (state + localStorage persistence)
- Tailwind CSS 4 + shadcn-style UI components
- Framer Motion (subtle transitions and interactions)
- ESLint + Prettier
- Vite

## Routes

- `/search` - book discovery and add flow
- `/wishlist` - saved books and remove flow
- `/about` - in-app project overview

## Project Structure

```text
src/
  components/
    layout/
    navigation/
    providers/
    states/
    ui/
  features/books/
    api/
    components/
    types.ts
  hooks/
  pages/
  stores/
```

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Optional: add Google Books API key for higher quota.

   Create a `.env.local` file:

   ```bash
   VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - run local dev server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run build` - production build
- `npm run preview` - preview production build locally
- `npm run format` - run Prettier formatting

## Architecture Notes

- Business state (`wishlist`) lives in `zustand` with localStorage persist.
- UI preferences (`theme`, `language`) live in a separate settings store.
- Search state stays local to `SearchPage` and uses debounce + request cancellation.
- Google Books response is normalized through an adapter before rendering.

## Privacy

All wish list data is stored in browser localStorage only.

## Credits

Book data is provided by Google Books API.

## Status

Implemented in this iteration:

- Template cleanup (lean baseline)
- App shell and routing
- Search, wish list, persist, and duplicate prevention
- About page
- Book details modal
- Motion polish with reduced-motion support

Planned for next iteration:

- i18n (English / Hebrew) + full RTL support
- Automated tests
- Optional backend sync
