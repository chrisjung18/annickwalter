# Wedding invitation, streaming-night edition

Quasar 2 + Vue 3 (`<script setup>`), Quasar CLI with webpack, Pinia. Black and red theme, envelope intro, countdown,
video, venues, programme, story, dress code, hotels, FAQ and a short RSVP form. French, English and Italian included.

```bash
npm install
npx quasar dev        # development
npx quasar build      # production build in dist/spa
```

Open `/?nointro` while editing to skip the envelope intro.

## What to edit

| What | Where |
| --- | --- |
| Names, date, time zone, venues, schedule, hotels, hashtag, RSVP deadline, max guests, images, video path | `src/stores/wedding.js` |
| All texts (French / English / Italian) | `src/content/fr.js`, `en.js`, `it.js` |
| Colors and fonts | `src/css/app.scss` (tokens at the top), `src/css/quasar.variables.scss` |
| Images | `public/images/` (keep the file names or change the paths in `wedding.js`) |
| Video | `public/media/film.mp4` (and poster `public/images/film-poster.svg`) |

The images are dummy SVG placeholders. Replace them with JPG/WebP files and update the paths in `wedding.js`.
Keep the video under a few MB, or host it elsewhere and put the full URL in `video`.

## RSVP

By default the form runs in demo mode: replies are kept in the visitor's browser (`localStorage`) so you can test it.
To receive real answers, set `rsvpEndpoint` in `src/stores/wedding.js` to a URL that accepts a JSON `POST`
(Formspree, Getform, a Google Apps Script web app, your own API...). The body is:

```json
{ "name": "", "email": "", "attending": "yes|no", "guests": 2, "menu": "meat", "note": "" }
```

## Notes

- The red tall letter is a simple monogram made from the first partner's initial. Use your own logo if you prefer.
- Language: the visitor can switch FR/EN/IT in the top bar; the default is `defaultLang` in `wedding.js`.
- Adding your own i18n or axios later: in Quasar 2 boot files use `defineBoot` and `app.use(...)` / `app.config.globalProperties`,
  not Vue 2's `Vue.prototype`. In `.js` files import with the extension (`./en-us/index.js`).
- Hosting: the router uses history mode. On Netlify the included `public/_redirects` handles it; on other hosts
  redirect unknown paths to `index.html`, or set `vueRouterMode: 'hash'` in `quasar.config.js`.
