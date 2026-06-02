# Portfolio UI Kit

Click-thru recreation of the Azure Portfolio brand applied to a working portfolio site for a placeholder designer, **Maren Ito**.

## Screens

1. **Home** — name + role + tagline, status pill, peek of recent work, footer.
2. **Work** — full index of 6 projects with hover saturation.
3. **Project case** — a single project page with hero image, copy, image gallery.
4. **About** — one-paragraph bio + facts list + tools.
5. **Contact** — underline form + alternate contact lines.

## Components

| Component | Purpose |
| --- | --- |
| `Nav` | Sticky top nav with backdrop blur, italic logomark, mono links. |
| `Footer` | Status pill, social Lucide icons, live local clock, copyright. |
| `Hero` | The signature word-by-word fade-up-stagger entry. |
| `ProjectRow` | Index row — number, name, category, year. Hover → accent. |
| `ProjectThumb` | Image card with desaturate-on-rest, saturate-on-hover. |
| `Pill` | Status / meta / tag variants. |
| `Button` | Primary pill, secondary outline, ghost arrow. |
| `Field` | Underline-only form input + textarea. |
| `CursorFollower` | Optional ring cursor that lags ~100ms. |

## Run

Open `index.html`. Click any nav link or project row to navigate — it's a hash-routed SPA so reloading preserves your screen.

## Visual notes

- Background is `--paper-1` everywhere. No gradients or textures.
- All animations use `cubic-bezier(0.22, 0.61, 0.36, 1)` and durations of 160–600ms.
- Images are placeholder gradients (warm tones). Replace with real work in `app.jsx`'s `PROJECTS` array.
