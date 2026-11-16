# Wedding Invitation Website

Open `index.html` in a browser. No build step.

## Change the details
Edit **js/config.js** only: names, dates, venues, map links, countdown time,
Arabic text, music and image paths.

- Countdown: `countdown.target` — ISO date with time-zone, e.g. `2026-12-11T16:00:00+05:30`
- Music: put an mp3 in `/audio`, set `music.src`
- Florals: replace files in `/images` or point `images.*` at your own PNG/SVG

## Change colours / fonts
Top of **css/style.css** (`:root` variables).

## Publish
Upload the whole folder to Vercel, Netlify or GitHub Pages.
