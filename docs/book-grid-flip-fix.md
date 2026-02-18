# Book grid flip – investigation (pre-stash state)

## Current structure (working, but card "drops" on click)

### BookGrid

- **Grid:** `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — no `grid-auto-rows`, so row height is content-based.
- **AnimatePresence** wraps the list with `mode='popLayout'` — layout animations when children change.

### BookCard (motion.article)

- **`layout`** — Framer layout animation; any layout change (size/position) is animated.
- **whileHover:** `{ y: -5, scale: 1.015 }` — card lifts 5px on hover.
- **className:** `book-flip-shell h-full` — no min-height on the article.

### CSS

- **.book-flip-content:** `h-full min-h-[28rem] w-full` — fills parent, minimum 28rem. Can grow if parent grows.
- **.book-flip-face:** `absolute inset-0` — both faces fill the flip container; they do not affect its height.
- Back face has long content (full description) in flow; overflow is not clipped (no overflow-hidden on shell).

---

## Likely causes of "card drops a line" on flip

1. **whileHover `y: -5`**  
   On click the card flips and often loses hover → Framer reverts to `y: 0` → visible 5px drop.

2. **`layout` on motion.article**  
   Layout animates size/position changes. Flip (or reflow from 3D transform) can trigger a layout read → animated move.

3. **AnimatePresence `mode='popLayout'`**  
   Optimized for add/remove; when `activeBookId` changes, layout may be recalculated and trigger movement.

4. **Grid row height**  
   No fixed `grid-auto-rows`; row height is content-based. If anything makes the cell height change on flip, the row grows and content shifts.

---

## Fix plan (after stash pop)

1. **Grid:** Add fixed row height so the row does not grow on flip, e.g. `auto-rows-[28rem]` (match `.book-flip-content` min-height).
2. **Card hover/drop:** Either:
   - Remove vertical movement: use only `scale` in `whileHover` (e.g. `scale: 1.015`), or
   - Keep lift but when flipped set `animate={{ y: -5, scale: 1.015 }}` so the card does not "drop" when hover is lost.
3. **Layout:** Remove `layout` from `motion.article` so flip does not trigger layout animation (cards are not reordering, only flipping).
4. **AnimatePresence:** Consider removing it or using a different mode — cards are not mounted/unmounted on flip; if kept, ensure it does not drive layout on `activeBookId` change.
5. **Do not** add `overflow: hidden` on `.book-flip-shell` — it was clipping the back face and made the card disappear.

Apply changes incrementally and test after each step.
