# Redesign plan — from feature inventory to story

Read together with `DESIGN.md` (palette/type, unchanged) and `DECISIONS.md` (running log; this redesign's decisions are appended there, not duplicated here). This file is the map; the log is the record of what actually happened, including anything that changed from this plan during the build (see §7 iteration notes).

## 1. Why

The current `/` is an 11-section report: every section gets equal visual weight, the best moment (the cry alert) is buried on `/monitor`, and a visitor has to assemble "what is this" themselves across a dozen scrolls. This redesign restructures the experience around one throughline — **one mother, one night, one product** — and moves everything document-shaped to a page built for document-reading (`/jury`).

## 2. What moves where

| Old landing section | New home |
|---|---|
| Hero | Rebuilt as story 4.1, same device asset + play-a-cry interaction, cut to one line + one sentence |
| Problem timeline (5 stages) | `/jury` §1, unchanged content, timeline treatment kept (it's the one place a sequence is the right shape) |
| Five pillars grid | Dissolved into the story itself — monitor *is* 4.1–4.3, mother's-app pillars *are* 4.4's journey stops, community *is* 4.5. No standalone "here are our 5 features" grid remains on `/`. A compact 5-pillars-around-the-device diagram appears once, on `/jury` §2, as the single "solution in one picture." |
| "How the monitor learns" (confidence chart) | Becomes story 4.3 (Day 21), same `LearningProgress`-style chart data, cut to chart + 2 insights |
| "For the health system" | Folded into story 4.6 (one line + nurse-dashboard preview), full KPI detail stays on `/clinic` itself |
| Why it's different (6 differentiators) | `/jury` §3, unchanged data |
| Business model | `/jury` §4, unchanged data + price placeholders added presentationally |
| Roadmap | `/jury` §6, existing `ROADMAP` array gets one new first entry ("MVP & competition, Sep–Oct 2026") prepended — every later step already carries no invented date, so no other change needed |
| Team & partners | `/jury` §7, unchanged data |
| Safety & privacy | Split: the 4 `SAFETY_POINTS` get a varied-scale treatment in story 4.6 *and* a fuller writeup + "honest limits of cry analysis" paragraph on `/jury` §8 |

Nothing in `src/data/` is deleted or forked — every number on both `/` and `/jury` reads from the exact same arrays/functions the demo pages already use.

## 3. New routes

```
/         story (7 sections, §4 below)
/jury     document-like deep dive for jury/investors (§5)
/monitor  unchanged logic, polished presentation (§7)
/app      unchanged logic, polished presentation (§7)
/community unchanged logic, polished presentation (§7)
/clinic   unchanged logic, polished presentation (§7)
/kiosk    exhibition auto-advance loop (§6)
```

`App.tsx` gains two new lazy routes (`Jury`, `Kiosk`). `Kiosk` renders **outside** `SiteLayout` (no header/footer, like `MonitorShell` does for `/monitor`) since it must be a truly bare full-screen surface.

## 4. Header

Single row, taller (`h-20` vs the old `h-16`), four things: wordmark · "Hikoya / Story" (→ `/`) · "Demolar / Demos" (a small popover menu listing the four demo pages, each with its existing `BrandIcons` glyph + a one-line description pulled from `landing.pillars`-style copy) · "Hakamlar uchun / For jury" (→ `/jury`) · language switch. The old flat 5-link nav (`Bosh sahifa / Monitor / Ilova / Hamjamiyat / Klinika paneli`) is replaced — demo pages are one level down, behind "Demos," because a first-time visitor shouldn't have to choose between five equal-weight top-level destinations.

A new `ClinicIcon` is added to `BrandIcons.tsx` (the demos menu needs a fourth bespoke icon; everything else reuses existing glyphs) — a simple dashboard/chart glyph in the same stroke language as the rest of the set.

`/kiosk` is deliberately **not** in the nav — it's reached by typing the URL, same as how an exhibition stand operator would launch it, not something a regular visitor should stumble into.

## 5. Story page sections (`/`) — technical notes per section

All copy lives in a new `story.*` i18n namespace (both locale files), all recurring/structural content is pulled from existing `src/data/` — no parallel data files for numbers that already exist.

### 4.1 Hero (dark)
Reuses `DeviceIllustration` + the existing synthesized-chime pattern from the old `Hero.tsx`. New: pressing play doesn't just pulse the ring — it drives a small `CryPredictionPhone` widget (new, shared with 4.2 and `/kiosk`) that calls the real `predictReasons()` with a representative context object and renders 2–3 probability bars inside a phone mockup, matching the brief's "Aziz uygʻondi va yigʻlayapti" → bars flow. Muted by default, existing mute toggle pattern kept.

### 4.2 03:10 night scene (dark, the one orchestrated motion)
A `position: sticky` container ~400vh tall; 4 `motion.div` steps cross-fade based on scroll progress (`useScroll` + `useTransform` from Framer Motion, thresholds at 0–25–50–75–100%). Step 3 reuses `CryPredictionPhone` (same widget as 4.1) with a context tuned for "early days" (`confidenceForDay(3)` — intentionally *before* the Day 21 payoff in 4.3, so the arc from worry → calm is real, not just staged copy). Step 4's "learned" tick reuses the same day→confidence step-up logic already in `useMonitorDemo`'s `CRY_FEEDBACK` reducer case (read, not re-implemented). `prefers-reduced-motion` and viewports below `lg` render the same 4 steps as a plain vertical stack of stills — no scroll-jacking, same component, a `stickyEnabled` flag switches the container behavior.

### 4.3 Day 21 (light)
A compact confidence-curve chart (Recharts, same `DAYS`/`confidenceForDay` series `LearningProgress` already charts, re-rendered smaller/quieter here) + 2 cards from the existing `INSIGHTS` array (not all 3 — brief says "two or three," two keeps the whitespace rule). Links out to `/monitor`.

### 4.4 One journey (light)
Four `JourneyStop` cards, each a small non-interactive phone-screen preview built from real data (not the full heavy tab components, to keep this route's bundle light — `MotherApp`/`AppShell` stay code-split on `/app`):
- Pregnancy: `PREGNANCY_WEEKS[23]` (week 24) + `NILUFAR`
- Recovery: EPDS intro card, `EPDS_QUESTIONS.length`
- First months: `AZIZ`, `ageInMonths`, `cryCountToday()`, latest `sleepPerDay()` entry
- Age 3 (speech): one `ANIMAL_SOUND_GAME` prompt, `MADINA`

Each card is a `<Link to="/app?tab=X">`. `MotherApp` gains a `useSearchParams` read on mount to set its initial `desktopTab`/mobile `AppShell` tab from `?tab=`, so the click genuinely opens that tab rather than always landing on Home.

### 4.5 Not alone (light)
2–3 real `COMMUNITY_POSTS` filtered to ones with a `verifiedMidwife` reply. One live moderation example: a minimal compose-and-classify widget reusing `moderateText()` and `EXAMPLE_MESSAGES` directly (not a new classifier, not hard-coded output) — pick one held/blocked example so the "kind explanation" the brief asks for is the real `MODERATION_EXPLANATIONS` string, not invented copy.

### 4.6 Built with doctors (light, tile motif)
`SAFETY_POINTS` (4 items) laid out at varied scale (one large + three smaller, not a 4-up identical grid) + a small `/clinic` KPI preview pulling 2 numbers from `CLINIC_KPIS`.

### 4.7 Closing (dark)
One sentence, two links (`/monitor`, `/jury`), minimal footer (demo badge + language switch only — the current `Footer.tsx`'s product/resources link columns move out; this footer is intentionally smaller than the site-wide one, matching "short" in the brief).

## 6. `/jury`

Sticky desktop TOC (8 anchors matching §5–12 below the intro), light theme throughout, print stylesheet (reuse the `.no-print` / print-CSS pattern already established for the monitor's `DoctorReport`). New `src/data/jury.ts` holds only content that has no existing home: `MVP_STATUS` (what's a working demo vs. mockup vs. roadmap item — genuinely new) and `JURY_LIMITS` (honest-limits-of-cry-analysis copy). Everything else imports from `landing.ts` / `clinic.ts` as-is.

## 7. `/kiosk`

A dedicated slide deck, not a hijacked scroll position — `/monitor`'s night scene is scroll-pinned, which doesn't translate to an unattended, no-input kiosk context. Slides reuse the same underlying widgets built for the story page (`CryPredictionPhone`, the night-scene stills, the Day-21 panel, journey-stop cards, the community example, the trust points) composed into a fixed array, auto-advancing on a `setInterval`, total loop ~70s. Any pointer/key event pauses and shows two buttons (try it yourself → `/monitor`, resume); 45s of no input resumes the loop. `?alternate=1` flips language once per loop iteration. Cursor hidden via a CSS class toggled after a 3s idle timer. No network requests beyond what's already bundled (everything is local assets/data, same as the rest of the app).

## 8. Demo-page polish (§7 of the brief)

- `/monitor`: short intro band above the existing device-status row; the four simulate buttons move into one visually grouped "control dock" (bordered container, already close to this — tightened); stats section reordered so today's 24h timeline leads, then learning progress, then the remaining charts.
- `/app`: already defaults to Home (baby snapshot) first — verified, no change needed there; add the back-to-story link.
- `/community`: compose box + "try an example" already renders above the fold in the existing two-column layout on desktop — verified during polish pass; add the back-to-story link, tighten if the intro block pushes it down at 1440px.
- `/clinic`: one new sentence under the title explaining who uses this screen and why; add the back-to-story link.

## 9. Process notes (filled in as sections are built)

Per-section screenshot critiques live here as they happen, most recent last. Each entry: what the screenshot showed, what was cut/fixed, why.

### Header (§4)
Screenshot at 1440px showed the new one-row header exactly as planned — logo, Hikoya, Demolar (dropdown), Hakamlar uchun, then demo badge/language/theme grouped quietly at the end. One real fix: the "Onalar ilovasi" (mother's app) demo-menu item first used the speech-bubble icon reused from elsewhere in the codebase — misleading, since that icon means "speech development," a single sub-feature of the app, not the app itself. Swapped to `BabyTabIcon` (a simple figure), which reads correctly as "the whole mother-and-baby app." Mobile menu screenshot confirmed the mobile hamburger panel groups the four demos under a quiet "Demolar" label with icons, matches the desktop dropdown's content. `/monitor`'s existing back-link now reads "Hikoyaga qaytish" instead of "Bosh sahifa," matching the brief's exact phrasing for the back-to-story links the other three demo pages will get in the polish pass (§8).

### 4.1 Hero (§5)
First screenshot was close to right immediately — headline, one-sentence subtitle, one big apricot CTA, a quiet secondary link, device + phone mockup, nothing extraneous. Pressing "Yigʻini eshiting" produced probability bars (62% / 24% / 6%) startlingly close to the brief's own worked example ("Hunger 62%, Wants to be held 21%, Pain/gas 9%") — good confirmation `predictReasons()` is well-tuned, no adjustment needed there.

One real bug the screenshot caught: at this section's taller device size (`h-52`/`h-60` vs. the old landing hero's `h-48`), a **solid black 19px band** became visible under the device's shadow — rows 497–515 of `device-hero.png` were pure `#000000`, a leftover artifact from the original card-background extraction that earlier placements had happened to crop out of view. Confirmed via direct pixel inspection (`numpy.unique` on that row range returned exactly one color, black, across the full width — not a shadow gradient, not part of the device). Fixed by cropping the source PNG at the exact row the legitimate soft-grey shadow ellipse ends (496) and regenerating the WebP. This asset is shared by three places (`Hero`, the old `PillarsSection`'s flagship card, and `/monitor`'s `LiveView` panel) — re-screenshotted all three post-fix to confirm the same artifact wasn't quietly visible elsewhere too (it wasn't, in the other two the device rendered smaller/cropped differently, but worth the two extra screenshots to be sure rather than assume).

Nothing removed from this section per the "cut one element" rule — it was already at the discipline the brief asks for on first pass; the fix here was a real defect, not a trim.

### 4.2 03:10 night scene (§5)
First verification pass produced a false alarm: an initial screenshot (taken via `scrollIntoViewIfNeeded` immediately after page load) showed washed-out grey text and a barely-visible device on the `bg-night-900` background, with the progress dots already on step 3 instead of step 1. Investigated before treating it as a bug — the cause was the test script, not the component: for a 400vh sticky container, Chromium's native `scrollIntoView` doesn't land at the top edge, and the screenshot was taken mid-fade (300ms into a 400ms entrance transition). Rewrote the check to scroll incrementally from the page top in viewport-sized increments with a full 700ms settle, which reproduced the section correctly: crisp white text, a soft ring-glow on the device against the near-black background, dots advancing 1-2-3-4 in step with scroll. Worth recording as a lesson for future verification passes on this section type — trust the screenshot's causes before the component's, but scroll-driven sections need scroll-accurate test scripts or every screenshot lies.

Once verified properly, the four steps read as intended: 03:10 silence → Aziz starts crying (waveform) → "these are the early days" (real `CryPredictionPhone` at `confidenceForDay(3)` — 52% confidence, notably wider spread than the hero's day-21 bars) → calmed, with a "+27% by day 21" badge computed live from `confidenceForDay(21) - confidenceForDay(3)`. That delta deliberately compares day 3 to day 21 rather than day 3 to day 4 — the per-day confidence series has built-in random jitter (see `DAYS` in `monitor.ts`), so a single-day step could easily show a small dip and undercut the point; the 21-day span is the one comparison guaranteed to read as real growth, and it primes the payoff that 4.3 delivers next. Reduced-motion and sub-`lg` viewports both correctly fall back to a plain vertical stack (confirmed via a `reducedMotion: 'reduce'` Playwright context and a 390px viewport) — no scroll-jacking, same four steps, same data.

Nothing cut here either — four steps is the minimum that makes "early → learning → calm" legible, and each one earns its place (silence, alert, uncertain guess, confident calm).

### 4.3 Day 21 (§5)
Two real bugs found here, both worth fixing at the source rather than papering over in this one section:

1. **Y-axis labels invisible on every confidence chart in the app.** The screenshot showed only a sliver of each tick label ("100", "90", "70"...) clipped to a single curved stroke, looking like stray punctuation. Root cause: the chart's `margin.left` (a negative value, used to shrink the reserved gutter) was more negative than the `YAxis width`, leaving only ~8-12px of actual room for two-to-three-digit labels at `fontSize=11`. This pattern was copy-pasted into three places over the project's life — `LearningProgress.tsx` (live on `/monitor` right now), the dormant `MonitorLearningSection.tsx`, and my new `Day21Section.tsx` — so it was a real, already-shipped defect on `/monitor`, not something I introduced. Fixed all three the same way: `margin.left: -8`, `YAxis width: 36` (net ~28px of label room, enough for "100"). Re-screenshotted `/monitor` directly to confirm — labels are legible there now too.
2. **Sticky header covers anchor-scroll targets sitewide.** Scrolling to `#day21` for a screenshot landed with the heading's top edge tucked under the header — not a screenshot-script artifact this time; a real anchor click (`Qanday ishlaydi?` → `#night-scene`, already live since 4.1) has the exact same problem, since `Header.tsx` is `sticky top-0` at `h-20` (80px) and nothing in `index.css` reserved that space for fragment navigation. Fixed with one line — `scroll-padding-top: 5.5rem` on `html` — verified two ways: a real `<a href="#...">` click (clean, full clearance) and, separately, confirmed that Chromium's legacy `scrollIntoViewIfNeeded()` doesn't honor `scroll-padding-top` the way the spec'd `scrollIntoView()` does, which is why one of my early verification screenshots looked wrong even after the fix — switching the test to `scrollIntoView({block:'start'})` matched what a real user link-click does. This fix benefits every future anchor in the story page (journey stops, TOC on `/jury`), not just this section.

Content-wise the section landed close to the plan on the first pass: one real chart (`DAYS` through day 21, same series `/monitor` charts), the big `79%` confidence number pulled from the same `confidenceForDay(LEARNING_WINDOW_DAYS)` the hero and night scene already use (so all three sections quietly agree on the same number), two insight cards (not three — kept the whitespace), and a single link out to `/monitor`. Nothing needed cutting beyond that.
