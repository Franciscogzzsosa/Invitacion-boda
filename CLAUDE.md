# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Spanish-language wedding invitation website for **Alicia & Víctor** — ceremony 2026-12-05 17:00, Hacienda San Matías, Guanajuato.

No build system, no package manager, no framework, no tests, no linter. Pure HTML/CSS/vanilla-JS served as static files.

## File layout

- `index.html` — single page, all sections inline (hero, countdown, parents, dress code + venue, itinerary, weather, music/playlist, "Nuestra Historia", guest links).
- `styles.css` — all styles, mobile-first with breakpoints at 480px, 760px, 900px, 980px.
- `script.js` — DOMContentLoaded handler wires four init functions: `initCountdown`, `initMusic`, `initPlaylist`, `initCalendar`.
- `img/` — hero photos, decorative branches/leaves, venue photo, dress-code hanger, `iconos/` for guest-link icons, `Favicon.png`.
- `playlist/` — 20 mp3 tracks (SPOTISAVER copies) referenced by the playlist player.
- `Christina Perri - A Thousand Years.mp3` — root-level background track.
- `WhatsApp Image 2026-04-27 at 15.36.10.jpeg` — untracked, leftover from WhatsApp.

## Running locally

The site uses HTML5 `<audio>` and `<picture>`, which require `http://` — opening `index.html` via `file://` will break audio playback in most browsers.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any other static server works (`npx serve`, `php -S localhost:8000`, etc.).

## Architecture notes

- **Two audio elements, mutually exclusive.** `#bg-music` plays the single root-level track (A Thousand Years) via the top-right pill player; `#playlist-music` cycles through the 20 tracks in `playlist/`. `initMusic` and `initPlaylist` each pause the other before starting — don't refactor this out, it's intentional.
- **Wedding date is hardcoded** in two places that must stay in sync: `script.js:254` (`initCountdown`) and `script.js:298-299` (`initCalendar` event object).
- **Google Calendar integration** uses `buildGoogleCalendarUrl` to open a prefilled render URL in a new tab. `buildICalContent` is defined but never called — dead code, can be removed or wired up.
- **Playlist array** in `script.js:69-170` is the source of truth for track order, titles, artists, and filenames. Filenames contain accented characters — `encodeURI(track.src)` is applied before assignment.
- **Google Fonts** loaded via `<link>`: `Allura`, `Raleway`. CSS also references `Cormorant Garamond` and `Montserrat` but those are **not** loaded — they fall back to the system serif/sans stack. If you need them, add them to the Google Fonts link in `index.html`.
- **Color palette** (in CSS): primary green `#3D4A3A`, secondary sage `#6B7B6A`, accent tan `#C5AC96`, card border `#d9cdc0`, button olive `#7E7F6C`, page bg `#FAF7F3`.
- **Section anchors / IDs** referenced by JS: `bg-music`, `playlist-music`, `music-toggle`, `music-icon`, `section-music-toggle`, `section-music-icon`, `section-prev`, `section-next`, `section-song-title`, `section-song-artist`, `track-count`, `days`, `hours`, `minutes`, `seconds`, `calendar-btn`, `footer-calendar-btn`, `map-btn`.

## Common edits

- **Change wedding date/time** → update both `script.js:254` and the `event` object in `initCalendar` (~line 294-300). Also update countdown copy / itinerary times in `index.html` if shifted.
- **Add/reorder playlist tracks** → edit the `playlist` array in `initPlaylist`. Drop the mp3 into `playlist/` first; filename must match exactly.
- **Replace hero photo** → swap `img/Hero.png` (desktop) and `img/Hero-Movil.png` (mobile, used under 768px via `<picture>`).
- **Edit guest-link URLs** → `href="#"` placeholders in `.guest-links` section of `index.html` (Instagram hashtag, Google Maps, photo album, WhatsApp RSVP).
- **Pending content** marked `PENDIENTE` in HTML: event menu. Also `POR CONFIRMAR` for weather.
- **Spotify playlist link** is hardcoded in `index.html:254` — update if the playlist changes.
