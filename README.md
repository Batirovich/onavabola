# Ona va Bola

A front-end-only demo of **Ona va Bola** ("Mother and Child") — a digital platform and smart bedside baby monitor supporting mothers and children from pregnancy to age 7. Built for the **InnoWeek.Uz–2026** exhibition in Tashkent.

There is no backend. Every number, post, chart, and mother's-app profile on this site is mocked, deterministically generated, and lives in `src/data/`. Look for the small **"Demo — sample data"** badge in the header on every page.

See [`DESIGN.md`](./DESIGN.md) for the design system, [`DECISIONS.md`](./DECISIONS.md) for a log of the judgment calls made while building this, and [`REDESIGN.md`](./REDESIGN.md) for the plan and per-section notes behind the current one-mother-one-night story structure.

## Routes

| Route | What it is |
|---|---|
| `/` | The story — one mother, one night, one product. Seven sections: a cry-prediction hero, a scroll-driven "03:10" night sequence, the Day 21 payoff, one real journey through the mother's app, a community + live moderation glimpse, a trust section, and a close. |
| `/monitor` | The smart monitor demo — live cry simulation, learning-confidence chart, 24h timeline, sleep/feed history, printable doctor report. Dark, immersive, no site header. |
| `/app` | The mother's app — pregnancy tracking, postpartum recovery + EPDS check-in, baby milestones, speech-development games, profile. Supports deep-linking a specific tab via `?tab=pregnancy\|recovery\|baby\|speech`. |
| `/community` | The moderated community — verified, pseudonymous posts and a real-time moderation classifier (try the "example message" picker in the compose box). |
| `/clinic` | The nurse/specialist dashboard — regional coverage, a mothers table with EPDS/speech-delay flags, a speech-therapist review queue. |
| `/jury` | A document-style deep dive for jury members and investors — problem, solution, differentiators, honest MVP status (what's real vs. mockup vs. roadmap), business model, roadmap, team, safety & the real limits of cry analysis. Sticky table of contents, has a Print/PDF button. |
| `/kiosk` | Unattended exhibition-booth mode — see [Kiosk mode](#kiosk-mode) below. Not linked from the site nav; reached only by URL. |

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

**1. The story (`/`) — 60 seconds**
Start here. Hero: click **"Yigʻini eshiting"** ("Hear a cry") — the device animates and a phone mockup shows real probability bars (the same `predictReasons()` call `/monitor` uses, not staged numbers). Scroll into the dark **"03:10"** section — a scroll-driven four-step sequence from an early, wide guess (day 3, ~52% confidence) to a calmed baby and a live **"+27% by day 21"** callout. Keep scrolling: the **Day 21** payoff (a real 79% confidence number), **one journey** through four real stops in the mother's app, the **community** section (click **"Xabarni tekshirib koʻring"** — "Check this message" — to watch the real moderation classifier hold a message and explain why), the **trust** section, and the close.

**2. Smart monitor (`/monitor`) — 60 seconds, the centerpiece**
Click **"Monitorni sinab koʻring"** from the story's closing section, or **Demolar → Monitor** in the header.
- Click **"Yigʻini simulyatsiya qilish"** ("Simulate cry"). A phone notification appears, "analyzes" for ~1.5s, then shows probability bars for likely reasons, the context behind the prediction, and a checklist. Tap one of the "Bu nima edi?" ("What was it?") reason buttons to give feedback and close it.
- Point at **"Bugungi 24 soat"** (today's 24h timeline), then **"Oʻrganish jarayoni"** ("Learning progress") — the confidence curve and "Day 14 of 21" label. Click **"21 kunga oldinga siljitish"** ("Fast-forward 21 days") to animate it to day 21 live.
- Click **"Pediatrga ulashish"** ("Share with pediatrician") to show the printable weekly report.

**3. Mother's app (`/app`) — 30 seconds**
Show the phone-framed tab app (defaults to Home). Tap through **Homiladorlik** (Pregnancy — drag the week slider), then **Tiklanish** (Recovery) and open the EPDS check-in to show the calm, non-alarming result screen. If time allows, open **Nutq** (Speech) and play one mini-game.

**4. Community & clinic (`/community`, `/clinic`) — 30 seconds**
On `/community`, point out the moderation log sidebar (a running feed of held/blocked messages with reasons). On `/clinic`, show the KPI row and the regional coverage grid, then click any row in the mothers table to open the detail drawer.

**5. For jury (`/jury`) — 20 seconds**
If presenting to jury or investors specifically, switch here: the sticky table of contents, the honest **"Bugun nima ishlaydi"** ("What works today") section naming exactly what's a working demo vs. a mockup vs. still on the roadmap, and the safety section's stated limits of cry analysis.

**6. Wrap — 10 seconds**
Toggle **UZ / EN** in the header on any page to show the full bilingual coverage, and toggle light/dark mode if asked.

## Kiosk mode

`/kiosk` is a full-screen, unattended slide deck for an exhibition booth — not linked from the site's navigation, reached only by URL. It auto-advances through seven slides (~70 seconds per loop), reusing the exact same widgets and data as the story page.

**To run it at the booth:**
1. Open `/kiosk` in a browser on the booth screen (e.g. `https://<your-deployed-url>/kiosk`, or `http://localhost:4173/kiosk` against `npm run preview` for an offline booth).
2. Enter the browser's full-screen mode (F11 on most browsers, or launch Chrome with `--kiosk <url>` for a true kiosk-mode window with no browser chrome at all).
3. Leave it. It loops unattended: the cursor hides after 3 seconds of no input, and every ~70 seconds it cycles through the cry-prediction hero, the "03:10" early-guess moment, the Day 21 payoff, the journey stops, the community + moderation example, the trust points, and the closing line.

**Visitor interaction:** any click, tap, or key press pauses the loop and shows two buttons — **"Oʻzingiz sinab koʻring"** ("Try it yourself," which opens `/monitor`) and **"Davom etish"** ("Resume"). If nobody touches it for 45 seconds, the loop resumes on its own — no need to babysit it between visitors.

**Bilingual booths:** add `?alternate=1` to the URL (e.g. `/kiosk?alternate=1`) to have it flip between Uzbek and English once per completed loop, instead of staying on one language all day.
