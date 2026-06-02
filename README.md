# Azure Portfolio — Design System

A minimalist portfolio brand system. Built from scratch (no source assets were attached) for a designer/developer who needs a clean, editorial portfolio they can deploy and use to attract clients.

> **Vibe:** warm paper, ink, and editorial cobalt blue. One sans-serif typeface used at every size. Small, considered animations — never showy. Reads like a designer's notebook, not a SaaS dashboard.

## Sources

No external sources were provided. This system was designed from first principles based on the brief:

- *"Simple portfolio, minimalist with simple fonts and color, white and blue, simple interactive animation, can attract clients."*
- *"Warm palette about blue and white… minimalist."*

If you have an existing logo, color palette, or examples you like, attach them and I'll reconcile.

## Index

| File | Purpose |
| --- | --- |
| `colors_and_type.css` | All color + typography + spacing + motion tokens. Import once. |
| `README.md` | This file. Brand overview + content + visual + iconography rules. |
| `SKILL.md` | Cross-compatible skill manifest for Claude Code. |
| `fonts/` | Font files (currently empty — using Google Fonts CDN; see note below). |
| `assets/` | Logos, icons, image placeholders. |
| `preview/` | Design-system tab specimens (one HTML card per token / component). |
| `ui_kits/portfolio/` | Pixel-fidelity recreation of the portfolio product. |

---

## Content Fundamentals

How the brand writes.

**Voice.** First-person, present-tense, quietly confident. Says *what is* without selling. No exclamation points unless they're earned. The portfolio owner speaks as themselves — direct, warm, occasional dry humor.

**Pronoun.** *I* for the designer's own story, *we* only on collaborative projects. Speaks to the reader as *you* sparingly — never "Hey there!" or "Welcome!".

**Casing.**
- Headings: **Sentence case.** "Selected work" — not "Selected Work".
- Buttons: **Sentence case.** "View case study" — not "VIEW CASE STUDY" or "View Case Study".
- Eyebrows / labels: **UPPERCASE with wide tracking.** "001 — INDEX", "AVAILABLE FOR WORK".
- Project names: rendered as the client gave them.

**Punctuation.**
- Em-dashes (—) generously, for asides.
- Numerals for dates and counts. Years written `2024 — present`.
- Lists prefer plain text over bullets where possible.
- No oxford comma when listing two; oxford comma when listing three or more.

**Tone examples** (real copy you might find in this system):

- ✅ "I design quiet interfaces for companies who'd rather be remembered for the work than the wrapping."
- ✅ "Currently with Studio Mira. Open to one freelance project per quarter."
- ✅ "Selected work — 2019 to now."
- ❌ "🚀 Welcome to my AMAZING portfolio! Let's build something incredible together! ✨"
- ❌ "Hi there! I'm a passionate designer who loves to craft delightful experiences!"

**Emoji.** None. Not even in social meta. The brand reads as paper — emoji feels like screen.

**Length.** Project descriptions are 1–3 sentences in the index, expanding to ~150–400 words on the case page. The About is one paragraph plus a list of facts (location, tools, current role).

---

## Visual Foundations

**Palette.** Paper + ink + a single editorial cobalt.

| Role | Token | Hex |
| --- | --- | --- |
| Page background | `--paper-1` | `#F8F4EC` (warm off-white) |
| Card surface | `--paper-0` | `#FFFFFF` |
| Alt section | `--paper-2` | `#EFEAE0` |
| Primary text | `--ink-1` | `#0E1A36` (deep blue-black) |
| Secondary text | `--ink-2` | `#2E3A57` |
| Caption / meta | `--ink-3` | `#6A7392` |
| Brand accent | `--azure-500` | `#2547C8` |
| Pressed accent | `--azure-600` | `#1B36A8` |
| Tint wash | `--azure-50` | `#EEF2FB` |

The accent appears sparingly — link underlines, focus rings, the one CTA on a page, a small spot on a chart. Never as a flood-fill background.

**Typography.**

- **Single family — Geist.** The whole system uses one sans-serif typeface. Minimalism through restraint.
- **Display — Geist Light (300).** Used at 36px+ for the designer's name, hero phrase, section openers, project names. Set tight (`-0.025em`).
- **Body — Geist Regular (400) / Medium (500).** Regular for body, Medium for UI labels and emphasis. Light for the occasional `.lead` paragraph.
- **Mono — Geist Mono.** Used for metadata: dates, indices ("001/006"), captions, "AVAILABLE FOR WORK" pills. Always uppercase + wide tracking for labels.
- **Emphasis.** Never italic. Use weight (Light → Medium) or color (`--azure-500`). One accent word per page, max.

**Spacing.** 4px base scale. Generous vertical rhythm — sections are separated by `var(--sp-9)` (96px) at minimum. Hero pages use `var(--sp-10)` (128px) of top breathing room.

**Backgrounds.** Solid `--paper-1` everywhere. **No gradients.** **No textures.** **No mesh.** Optional: a single grain layer at 4% opacity over hero sections (subtle — must be barely perceptible). Full-bleed imagery is reserved for project pages.

**Imagery vibe.** Warm. Natural light. Slight desaturation. Avoid cold blue casts, neon, heavy grain, AI sheen. Project images appear in 4:5 or 16:9. Default state is slightly desaturated (`filter: saturate(0.92)`) — saturating to full on hover is one of the brand's signature interactions.

**Animation.**
- Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (ease-out) for in-motion, snappy. Durations: 160ms / 280ms / 600ms / 1200ms.
- Never bouncy. No springs. No overshoot.
- Hero text enters by fading + drifting up `8px` over `600ms`, staggered word-by-word at `40ms` intervals.
- Links draw their underline left-to-right on hover.
- Images desaturate-to-saturate (`filter: saturate(0.92) → 1`) over `280ms` on hover.
- A custom cursor: a thin `--azure-500` ring `(8px → 28px on hoverable elements)` that lags the pointer by ~100ms. Optional, can be disabled.

**Hover states.** Always one of:
1. Color shift (text → `--accent`)
2. Underline grow (links)
3. Saturation lift (images)
4. Background wash to `--paper-2` (cards)

No scale transforms. No lifts. No shadow growth.

**Press states.** A `2px` translateY downward + the accent darkens to `--azure-600`. Duration `120ms`.

**Borders.** Hairline `1px solid rgba(14, 26, 54, 0.10)` (= `--border`). Used very sparingly — usually only to separate the footer or a card. Most separation is whitespace, not lines.

**Shadows.** Warm-tinted, ultra-soft. The brand prefers borders + whitespace over shadows. Shadow is only used on overlays (modals, dropdowns), never on resting cards.

**Transparency & blur.** Reserved for the sticky top nav (`backdrop-filter: blur(20px)` over a `rgba(248, 244, 236, 0.7)` paper wash) and for the cursor follower. Not used on cards or buttons.

**Corner radii.** Mostly `0` (sharp). Buttons use `--r-pill` for primary CTAs; cards use `--r-md` (8px). Images: always sharp — `0`.

**Cards.** Sharp corners or `--r-md`. White surface. No shadow at rest. `1px` border or no border. Hover swaps the background to `--paper-2` over 280ms.

**Layout rules.**
- Single column on the index, max-width `680px` for body text. Project gallery breaks out to `1280px`.
- Sticky top nav, height `64px`, with a thin bottom border that only appears on scroll.
- Generous left/right margin: `clamp(24px, 5vw, 64px)` on mobile/desktop.
- The number index (`001 — 006`) always appears on the left of a project row in mono.

**Layout protection.** Sticky nav uses a `backdrop-filter` blur, not a solid fill, so the paper background bleeds through.

---

## Iconography

**System.** [Lucide](https://lucide.dev) icons, stroke `1.5px`, loaded from CDN. Icons are intentionally small (`16–20px`) and used in two places only:

1. External-link arrow `↗` (rendered as Lucide `arrow-up-right`)
2. Social links in the footer (GitHub, X/Twitter, LinkedIn, email)

**Color.** Icons inherit `currentColor` from their parent. Default `--fg-faint`, hover `--accent`.

**Why Lucide?** Pixel-aligned 24×24 grid, monoline aesthetic matches Geist's grotesque body, MIT-licensed.

**Emoji?** No. The brand's quietness rules them out.

**Unicode glyphs?** Yes, when typographically appropriate: `—` (em-dash), `↗` (link arrow when an SVG would be overkill), `·` (mid-dot separator), `→` (CTA arrows in some cases).

**Custom SVG?** Reserved for the logomark only — a single glyph (designer's initial), set in Instrument Serif, rendered as text or as an inline SVG for crispness at large sizes. No illustrative SVG icons anywhere in the system.

**Logomark.** Letter + dot — the designer's initial in Geist Medium (tight tracking, `-0.04em`) followed by a small cobalt dot (`--azure-500`) raised to the cap-height. Lives in the top-left of every page. The wordmark version stacks the mark above the full name in mono.

---

## Font substitution notice

The system uses **Geist** and **Geist Mono** — both loaded from Google Fonts via CDN. No local font files are bundled. If you want to pin specific weights or self-host:

- Geist: https://fonts.google.com/specimen/Geist
- Geist Mono: https://fonts.google.com/specimen/Geist+Mono

Drop the `.woff2` files into `fonts/` and switch the `@import` at the top of `colors_and_type.css` to local `@font-face`.

---

## UI Kits

| Kit | Path | What it shows |
| --- | --- | --- |
| Portfolio | `ui_kits/portfolio/index.html` | The full portfolio site — home, work index, project case, about, contact. Click-thru interactive. |
