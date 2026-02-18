# Haruki

A personal library and wish list web app. Search books via the Google Books API, keep a persistent wish list in the browser, and manage your reading queue with a responsive UI.

**Demo:** [https://haruki-five.vercel.app/search](https://haruki-five.vercel.app/search)

---

## Features

- **Search** — Find books by title or author (min 2 characters). Results are debounced and requests are cancelled on re-search.
- **Book cards** — Grid of cards with cover, title, authors, and short summary. Flip a card to see publisher, publish date, and full description.
- **Wish list (“My Books”)** — Add books from search; duplicates are prevented. Remove anytime. List persists across sessions (localStorage).
- **Navigation** — Search, My Books, and About. Header with theme toggle (light / dark / system) and language (EN / HE).
- **States** — Idle, loading, empty results, and error with retry. RTL support for Hebrew.
- **Accessibility** — Reduced-motion respected; keyboard support for flip and actions.

---

## Tech Stack

| Area         | Stack                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------- |
| Runtime      | React 19, TypeScript 5.9                                                                 |
| Routing      | React Router 7                                                                           |
| State        | Zustand (wishlist + localStorage persist; settings for theme/language)                   |
| UI           | Shadcn/ui, Radix UI, Tailwind CSS 4, Framer Motion, Tabler Icons, CVA, tailwind-merge   |
| Build        | Vite 7, SWC (Vite React plugin)                                                          |
| Code quality | ESLint 9, Prettier 3, TypeScript strict                                                  |

---

## Project Structure

```text
src/
  app.tsx                    # Routes and layout
  main.tsx
  vite-env.d.ts
  styles/
    global.css
  components/
    layout/                  # app-shell, page-transition
    navigation/              # main-nav, theme-toggle, language-toggle
    providers/               # theme-sync
    states/                  # loading-state, empty-state, error-state
    ui/                      # button, card, dialog, input, dropdown-menu, like-button
  features/
    books/
      api/                   # google-books-client, book-adapter
      components/            # book-card, book-grid, book-like-button, search-bar, book-detail-modal
      types.ts
  hooks/
    use-debounced-value.ts
    use-book-grid-handlers.ts
  i18n/
    messages.ts              # EN / HE strings
    use-i18n.ts
  lib/
    constants/               # storage-keys
    utils.ts
    text-direction.ts
    types/
  pages/
    search-page.tsx
    wishlist-page.tsx
    about-page.tsx
  stores/
    wishlist-store.ts        # Zustand + persist(localStorage)
    settings-store.ts        # theme, language
```

---

## Local Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Optional: Google Books API key** (for higher quota)

   Create `.env.local`:

   ```bash
   VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
   ```

3. **Run the app**

   ```bash
   npm run dev
   ```

   Open the URL shown in the terminal (e.g. `http://localhost:5173`).

---

## Build & Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start dev server               |
| `npm run build`     | Type-check + production build  |
| `npm run preview`   | Serve production build locally |
| `npm run typecheck` | TypeScript only                |
| `npm run lint`      | ESLint                         |
| `npm run lint:fix`  | ESLint with auto-fix           |
| `npm run format`    | Prettier format                |

---

## Architecture

- **Wish list** — Single Zustand store with `items` and `itemIdIndex` for O(1) duplicate check. Persisted to localStorage via `persist`; survives refresh.
- **Search** — Local state in `SearchPage`. Debounced query; AbortController cancels in-flight requests when the query changes.
- **Books data** — Google Books responses are normalized in `book-adapter.ts` before use in the UI.
- **Book grid** — Shared `BookGrid` + `BookCard` on Search and Wish List; logic (toggle wish, flip, active id) lives in `useBookGridHandlers`.
- **Theme & language** — Settings store + `ThemeSync` provider; i18n via `useI18n` and `messages.ts` (EN/HE).

---

## Privacy

All wish list data stays in the browser (localStorage). No backend; no server-side storage of your list.

---

## Credits

- **Project template** — Bootstrapped from [vite-react-ts-shadcn-ui](https://github.com/doinel1a/vite-react-ts-shadcn-ui) (React 19, TypeScript, Shadcn/ui, Tailwind 4, Vite 7, ESLint 9).
- **Book data** — [Google Books API](https://developers.google.com/books).
- **UI components** — Some components (e.g. buttons, inputs) were adapted from designs on [uiverse.io](https://uiverse.io/).
