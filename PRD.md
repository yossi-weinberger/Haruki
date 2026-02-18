# Haruki Product Requirements

## Goal

Build a web app for discovering books and maintaining a personal reading wish list.

## Target User

A reader who wants to quickly search books, save candidates, and keep the list after refresh.

## Must-Have Features

1. Search books by title or author using Google Books API.
2. Show results as cards with cover, title, and authors.
3. Add books to wish list.
4. Prevent duplicate add actions for books already in wish list.
5. Remove books from wish list.
6. Persist wish list in localStorage.
7. Navigate between Search and Wish List pages.
8. Show loading, error, and empty states.
9. Provide an in-app About page.

## Included UX Requirements

- Light/dark/system theme support.
- Subtle motion with `prefers-reduced-motion` support.
- Book details modal from cards.

## Out of Scope (Current Iteration)

- Full i18n and RTL.
- Backend sync across devices.
- Automated test suite.

## Acceptance Criteria

- Search fetches and renders books from Google Books.
- Add button is disabled once a book is already in wish list.
- Wish list survives full browser refresh.
- Remove action updates wish list immediately.
- Search, Wish List, and About routes are reachable.
- Loading/error/empty states are visible in expected situations.
- Build, lint, and typecheck pass.
