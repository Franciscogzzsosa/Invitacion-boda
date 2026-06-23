# AGENTS.md

Static Spanish-language wedding invitation website for **Alicia & Víctor** — ceremony 2026-12-05 17:00, Hacienda San Matías, Guanajuato. Pure HTML/CSS/vanilla-JS, no build system, no package manager, no framework, no automated tests, no CI. Served as static files.

## Setup commands

- No install step. There is no `package.json`, lockfile, or vendored deps.
- Local dev server (the site uses HTML5 `<audio>` and `<picture>`, so `file://` breaks audio playback):
  ```bash
  python3 -m http.server 8000
  # open http://localhost:8000
  ```
  Any other static server works (`npx serve`, `php -S localhost:8000`).
- Build / test / lint / typecheck: **none exist**. Do not invent them.

## Project layout

- `index.html` — single page, all sections inline (hero, countdown, parents, dress code + venue, itinerary, weather, music/playlist, "Nuestra Historia", guest links). `<audio>` and `<picture>` elements require `http://`.
- `styles.css` — all styles, mobile-first with breakpoints at 480px, 760px, 900px, 980px.
- `script.js` — `DOMContentLoaded` wires 9 init functions: countdown, music pill, playlist, calendar, scroll-fade, count-up, story reveal, lightbox, itinerary reveal.
- `pdf-viewer.js` — opens the two reference PDFs (hotels, qué hacer) in an in-page modal via PDFSlick.
- `img/` — hero photos, decorative branches/leaves, venue photo, dress-code hanger, `iconos/` for guest-link icons, `Favicon.png`.
- `playlist/` — 20 mp3 tracks (Spotify-saved copies) referenced by the playlist player. Filenames contain accented characters.
- `Christina Perri - A Thousand Years.mp3` — root-level track played by the top-right pill player.
- `*.pdf` — guest-facing reference PDFs (hotels, Guanajuato activities).
- `CLAUDE.md` — Mavis-specific project memory; the canonical source of architectural detail (read it before doing structural work).

## Code style

- No linter or formatter. Match the existing style: 4-space indent, single quotes, semicolons, ES2020+ vanilla JS, BEM-ish class names in CSS.
- Google Fonts loaded via `<link>`: `Allura`, `Raleway`. CSS references `Cormorant Garamond` and `Montserrat` but those are **not** loaded — they fall back to the system serif/sans stack. Add them to the `<link>` if you actually need them.
- Color palette: primary green `#3D4A3A`, sage `#6B7B6A`, tan `#C5AC96`, card border `#d9cdc0`, button olive `#7E7F6C`, page bg `#FAF7F3`.
- HTML is in Spanish (`lang="es"`). Keep copy in Spanish unless the user asks otherwise.
- Do not refactor out the two-audio-element design or the date-source-of-truth — both are intentional and called out in `CLAUDE.md`.

## Testing instructions

- No automated test suite. Verification is **manual browser smoke**:
  1. Load `http://localhost:8000/` in Chrome and Safari.
  2. Check console for errors.
  3. Resize through the 4 breakpoints (480 / 760 / 900 / 980).
  4. Click the music pill — `A Thousand Years` plays; the playlist stops (or stays stopped).
  5. Click the playlist player — it cycles; the pill stops.
  6. Open the calendar button — a prefilled Google Calendar tab opens with the correct date.
  7. Open both PDFs in the modal viewer.
  8. Click every guest-link icon — each target URL resolves.

## PR & commit conventions

- Default branch: `main`. Branch from `main`; never push to it directly.
- Commit messages: short conventional prefix (`feat:` / `fix:` / `docs:` / `refactor:` / `chore:`). The repo already uses this style — match it.
- No CI runs. Self-verify with the manual smoke list before pushing.
- No `gh pr create` flow is set up — push the branch and let the user open the PR.

## Security

- No secrets in this repo. No `.env`, no API keys, no auth.
- `<audio>` sources are local mp3s. `<img>` sources are local. `<script>` is one inline file and the PDFSlick CDN. Do not add external trackers, analytics, or third-party scripts without the user's explicit consent.
- The site is public; do not commit drafts, internal notes, or the leftover WhatsApp image (`WhatsApp Image 2026-04-27 at 15.36.10.jpeg` is untracked — leave it alone or remove it via the trash, do not commit).

## Things that will break if you don't know them

- **Wedding date is hardcoded in two places that must stay in sync**: `script.js` `initCountdown` and the `event` object in `initCalendar`. Update both, or the countdown and the calendar button will disagree.
- **Two `<audio>` elements are mutually exclusive**. `#bg-music` plays the root-level `A Thousand Years` track via the top-right pill. `#playlist-music` cycles the 20 tracks in `playlist/`. Each init function pauses the other before starting. Do not unify them.
- **Playlist array** at the top of `initPlaylist` is the source of truth for track order, titles, artists, and filenames. `encodeURI(track.src)` is applied before assignment — keep that.
- **`buildICalContent` in `script.js` is defined but never called** — dead code, fine to wire up or remove.
- **Pending content** in `index.html` is marked `PENDIENTE` (event menu) and `POR CONFIRMAR` (weather). Don't fill these in unless the user provides the values.
- **Spotify playlist link** is hardcoded in `index.html` — update there if the playlist changes.
