# Design plan — Ona va Bola

## Palette

Named tokens (defined in `src/index.css` as Tailwind v4 `@theme` values, both light and dark variants where relevant):

| Name | Hex | Role |
|---|---|---|
| `lapis` | `#152B54` | Primary brand — deep Samarkand-tile blue. Headers, primary buttons, wordmark, day-mode hero surfaces. |
| `turquoise` | `#1F8A82` | Secondary brand — tile teal. Links, secondary actions, progress/positive data, the pillar icons. |
| `apricot` | `#E2924C` | The *one* warm accent (Uzbek apricot). Used rarely and deliberately: the cry-alert state, one CTA per screen, a handful of chart highlights. Never a background wash. |
| `linen` | `#F7F4EE` | Light-mode page background. Warm off-white, not sterile white, not the generic cream-only look (paired with cool blues/teals so it never reads as "cream + terracotta"). |
| `ink` | `#12172A` | Primary text on light surfaces, near-black with a blue cast (not pure black). |
| `night` | `#0A1226` | Dark/monitor-mode background — deeper and cooler than `ink`, close to a real night sky over Tashkent. |

Semantic aliases (derived, not new brand colors): `success` = turquoise-600, `warning` = apricot-600, `danger` = a muted rose `#C24B5C` (used only for destructive/urgent states, e.g. EPDS high-risk flag — never decorative).

Both light and dark surfaces get a full 50–900 ramp generated from the base hues so cards, borders, hovers etc. stay in-family instead of falling back to Tailwind gray.

## Type

- **Display — Alegreya** (variable, 400–900, incl. italic). Verified to render `Oʻzbekiston, gʻamxoʻrlik, maʼlumot` correctly at every weight used (400, 600, 700, 800). Warm, humanist, slightly editorial — used for H1–H3, the wordmark, and big stats. Sentence case only, no all-caps.
- **Text — Source Sans 3** (variable, 400–700). Also verified for U+02BB at every weight used. Quiet, highly legible, used for body copy, UI labels, nav, forms, tables, chart labels.
- Scale: `text-xs` (12) → `display-xl` (56/60 clamp) on a ~1.25 modular ramp, tuned by hand for the two faces rather than pure math (Alegreya needs a touch more line-height at large sizes).
- No eyebrow labels in all-caps. Section labels, if used, are sentence case with a small colored tick mark (a short diagonal stroke echoing the tile motif) instead of letter-spaced caps.

**Verification method** (for the record, not shipped): fetched each candidate family from the Google Fonts `css2` API with `&text=` forcing the exact glyphs, decompressed the WOFF2, and checked the `cmap` table for U+02BB with `opentype.js`. Several popular candidates (Fraunces, Newsreader, Inter, Roboto, Rubik, Karla, PT Sans/Serif) do **not** ship that codepoint and were rejected before any UI work started.

## Layout concept

- A restrained 12-col grid, generous vertical rhythm (section padding scales 64px → 128px), content max-width ~1280px with a wider "showpiece" exception for the monitor page.
- Each of the five pillars gets a *distinct* visual treatment on the landing page (different composition, not a repeated card shape) — see section 5.3 of the brief.
- The monitor page is the one dramatic surface: full night-mode, larger type, glow/light-ring motion. Every other page stays disciplined, light, and quiet so the monitor reads as the "wow" moment rather than everything competing for attention.
- Phone-frame components (`<PhoneFrame>`) wrap the mother's-app routes on viewports ≥ the `lg` breakpoint; below that they render full-bleed as a normal page.
- One original SVG tile motif (`TileMotif`), built from a repeating 8-point-star/cross unit inspired by Samarkand majolica, used sparingly: hero background at low opacity, the monitor device's faceplate, and thin section dividers. Never as a full decorative wash.

## Principles (self-check against the brief)

1. **No generic template smell.** Rejected: cream+terracotta as the *whole* identity (mitigated by anchoring in cool lapis/turquoise with apricot only as accent), black+neon dark mode (night mode uses navy + warm light-ring glow, not neon), identical grey-shadow cards (cards use colored, soft tinted shadows keyed to their section's hue), all-caps eyebrows (none used), gradient-wash decoration (gradients only appear as physically-motivated glows: the device light ring, the cry-alert pulse), fade-slide-up on every section (motion is purposeful — reserved for the monitor's live states, the learning-curve chart draw-in, and micro-feedback; static sections just appear).
2. **Cultural motif stays original and sparing** — hand-built SVG geometry, not a stock pattern, not overused.
3. **Every AI-ish surface reads as a suggestion**, never a verdict — enforced at the copy level (`uz.json`/`en.json` review pass) and reflected in UI (probability bars, "most likely", never a single bold diagnosis).
4. **Accessible by default** — AA contrast checked per token pairing, focus rings always visible (2px `turquoise` outline offset), `prefers-reduced-motion` disables the non-essential motion listed above, dark mode is a first-class second theme, not an afterthought.
