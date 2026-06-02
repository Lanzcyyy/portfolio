# Maren Ito — Portfolio (deployable)

A single-page personal portfolio. Plain HTML + CSS + vanilla JS. No build step, no framework, no bundler. Deploy by dropping the three files (`index.html`, `style.css`, `main.js`, plus `favicon.svg`) on any static host.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page. Semantic HTML, meta tags, OG image link. |
| `style.css`  | All styles + design tokens. |
| `main.js`    | Interactions: project list render, reveal-on-scroll, cursor follower, nav highlight, contact form, live clock. |
| `favicon.svg`| Logomark favicon. |

## Edit me

- **Your projects** — open `main.js`, edit the `PROJECTS` array (top of file).
- **Hero copy** — `index.html`, search for `class="display"`.
- **About text + facts** — `index.html`, `id="about"` section.
- **Email + socials** — search `marenito.studio` and `href="#"` in `index.html`.
- **Name / logomark** — search `M<span class="logomark__dot"></span>` (1 spot) and `Maren Ito` (several spots).
- **Time zone** — `main.js`, `timeZone: "Europe/Lisbon"`.

## Deploy

**Vercel / Netlify / Cloudflare Pages** — drag the folder into the dashboard, or connect a Git repo. No build command, no output directory. It's a static site.

**GitHub Pages** — push to a repo, enable Pages on the `main` branch root.

**Your own server** — copy the files into any directory served as static assets.

## Contact form

The form currently logs to the console only. To make it actually send mail, replace the handler at the bottom of `main.js`. Two easy options:

1. **Formspree** — change the `<form>` `action` to your Formspree endpoint and `method="POST"`, drop the JS handler.
2. **Resend / your own API** — `fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })` inside the existing handler.

## Original design system

The `ui_kits/portfolio/` folder still contains the React prototype this was built from. The full design system (tokens, type, color, components) lives at the project root in `colors_and_type.css` and `README.md`.
