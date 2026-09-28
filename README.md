# Ona va Bola

A front-end-only demo of **Ona va Bola** ("Mother and Child") — a digital platform and smart bedside baby monitor supporting mothers and children from pregnancy to age 7. Built for the **InnoWeek.Uz–2026** exhibition in Tashkent.

There is no backend. Every number, post, chart, and mother's-app profile on this site is mocked, deterministically generated, and lives in `src/data/`. Look for the small **"Demo — sample data"** badge in the header on every page.

See [`DESIGN.md`](./DESIGN.md) for the design system and [`DECISIONS.md`](./DECISIONS.md) for a log of the judgment calls made while building this, with rationale.

## Running it

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. The app defaults to Uzbek; switch to English with the **UZ / EN** toggle in the header.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Type-checks (`tsc -b`) and produces a static build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run i18n:check` | Fails if `src/locales/uz.json` and `en.json` have mismatched keys |
| `npm run lint` | Runs oxlint |

## Deploying

This is a static single-page app (Vite + React Router in browser mode). Both `public/_redirects` (Netlify) and `vercel.json` (Vercel) are already set up to rewrite all paths to `index.html`, so client-side routing works on refresh/direct links.

**Vercel:** import the repo, framework preset "Vite," no environment variables needed. Build command `npm run build`, output directory `dist`.

**Netlify:** same — build command `npm run build`, publish directory `dist`. The `_redirects` file handles the SPA fallback automatically.

Fonts are self-hosted (`src/assets/fonts`), so the deployed site has no external font-loading dependency.

## Tech stack

Vite + React 19 + TypeScript (strict) + Tailwind CSS v4 (CSS-first `@theme` tokens, no default palette) + React Router + react-i18next + Framer Motion + Recharts + lucide-react. No backend, no external APIs. The speech-recording feature uses the browser's `MediaRecorder` API and keeps recordings in memory only (nothing is uploaded or persisted).

## Demo script for the exhibition (~3 minutes)

The UI defaults to Uzbek. Button labels below are given in Uzbek as they appear on screen, with English in parentheses.

**1. Landing page (`/`) — 30 seconds**
Start here. Point out the hero line and the device illustration, then click **"Chaqaloq yigʻisini eshitib koʻring"** ("Hear a baby's cry") — the device's light ring pulses and the phone mockup shows a live notification with an animated waveform. Scroll briefly past the problem timeline and the five-pillar grid (the monitor pillar is visually the largest — it's the flagship).

**2. Smart monitor (`/monitor`) — 90 seconds, the centerpiece**
Click **"Monitorni sinab koʻring"** from the hero, or use the nav. This page is intentionally dark ("night mode").
- Click **"Yigʻini simulyatsiya qilish"** ("Simulate cry"). A phone notification appears, "analyzes" for ~1.5s, then shows probability bars for likely reasons (hunger, wants to be held, etc.), the context behind the prediction (time since last feed, sleep duration), and a checklist. Tap one of the "Bu nima edi?" ("What was it?") reason buttons to give feedback and close it.
- Point at **"Oʻrganish jarayoni"** ("Learning progress") — the confidence curve and "Day 14 of 21" label. Click **"21 kunga oldinga siljitish"** ("Fast-forward 21 days") to animate it to day 21 and "learned" status live.
- Scroll through the stats grid (24h timeline, 21-day cry heatmap, sleep/feed charts, cry-reasons breakdown, family alert toggles).
- Click **"Pediatrga ulashish"** ("Share with pediatrician") to show the printable weekly report.

**3. Mother's app (`/app`) — 40 seconds**
Show the phone-framed tab app. Tap through **Homiladorlik** (Pregnancy — drag the week slider), then **Tiklanish** (Recovery) and open the EPDS check-in (**"Tekshiruvni boshlash"**) to show a couple of questions and the calm, non-alarming result screen. If time allows, open **Nutq** (Speech) and play one of the three mini-games.

**4. Community (`/community`) — 30 seconds**
Click **"Hamjamiyatga qoʻshilish"** ("Join the community"). Enter the demo code **`ONA-2026`**, skip through the MyID "coming soon" step, pick a pseudonym, and finish. In the compose box, open **"Namuna sinab koʻrish"** ("Try an example") and pick a crisis-language example — show that it's routed to a supportive specialist message rather than blocked, and check the moderation log below to show a blocked ad/scam example alongside it.

**5. Clinic dashboard (`/clinic`) — 20 seconds**
Show the KPI row, the regional coverage grid, then click any row in the mothers table to open the detail drawer (EPDS history chart, visit history). Switch to the **"Nutq terapevti"** tab to show the review queue and per-child progress sparklines.

**6. Wrap — 10 seconds**
Toggle **UZ / EN** in the header on any page to show the full bilingual coverage, and toggle light/dark mode if asked.
