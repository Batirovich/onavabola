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

### 4.4 One journey (§5)
Also fixed a real, pre-existing hard-coded string while building this section: `AnimalSoundsGame.tsx` (used by `/app`'s speech tab) had `lng === 'uz' ? 'Bu qanday ovoz chiqaradi?' : 'What sound does this make?'` inline rather than through i18next — a direct violation of the brief's "zero hard-coded strings" rule that predates this redesign. Caught it because the journey card for the speech stop needed the exact same phrase (to show a real prompt, not an invented one) and pulling it through `t('app.speech.animalPrompt')` in both places was strictly less work than inventing a separate string. Added the key to both locales, replaced the ternary in the source component too.

The four cards (pregnancy, recovery, first months, age 3) are non-interactive previews built entirely from data the corresponding `/app` tab already reads — no separate "preview" dataset. Cross-checked this by opening `/app?tab=pregnancy` directly: it independently computes the same week-24 size comparison ("katta tarvuz" / "a large watermelon") from `PREGNANCY_WEEKS[23]`, matching the journey card exactly, which is the real proof the two surfaces can't drift apart.

The `?tab=` deep link required a small change to `MotherApp.tsx`: both the mobile and desktop `AppShell` instances now share one `activeTab` state seeded from `useSearchParams().get('tab')` (validated against `FEATURES`, falling back to `home`), instead of the desktop-only `desktopTab` state that existed before. Verified all four query values (`pregnancy`, `recovery`, `baby`, `speech`) land on the correct tab by navigating to each URL directly and screenshotting.

One test-harness-only wrinkle worth recording so it doesn't get re-investigated later: scrolling straight to `#journey` via `scrollIntoView` with the sitewide `scroll-behavior: smooth` sometimes stopped partway through the 03:10 section instead of reaching the target — almost certainly the smooth-scroll animation getting interrupted by Framer Motion's scroll-linked listener in `NightScene` (which runs on every scroll frame). No live link in the app currently smooth-scrolls past that section in one jump, so this doesn't affect any real user path today; switched the verification script to an instant `window.scrollTo` to get accurate screenshots. Worth a second look if a future link (e.g. a `/jury` TOC entry, or a journey-stop cross-link) ever needs to jump over the night scene in one motion.

Nothing cut — four stops matching the four `/app` tabs that aren't already covered elsewhere in the story (home is the hero/night-scene/day-21 arc itself) is the minimum that earns the section's own title, "one journey."

### 4.5 Not alone (§5)
One real bug from the first screenshot: the two featured posts (picked by filtering `COMMUNITY_POSTS` for a `verifiedMidwife` reply and taking the first two) both happened to have the same author, "Zilola, mother of a 5-year-old, Namangan" — invisible in the full 30-post `/community` feed where it's one row among many, but glaring side-by-side in a 2-card spotlight, since it reads as "the same mother posted twice" and undercuts the section's own point ("thousands of mothers"). Fixed by deduping on `author.pseudonym` while picking the two posts, so they're guaranteed to be different people. Left the generic padded replies alone even though "Sitora" ended up replying on both featured threads — that's realistic (the same commenter showing up across threads is normal forum behavior) and only the two lead authors needed to be distinct.

The moderation widget is deliberately not a copy of `ComposeBox` — it doesn't need the post/log callbacks or the example-picker dropdown that widget carries for the full `/community` page. It's a fixed real example (`EXAMPLE_MESSAGES` id `ex-misinfo`) with one button that calls the real `moderateText()` on click and renders the actual `MODERATION_EXPLANATIONS[result.category]` string keyed off the live result, not a hard-coded "held" label — chose the misinformation example over the crisis one specifically: crisis messaging is the right call to show in the deeper `/community` demo but reads as needlessly heavy for a five-second story-page moment, while misinformation demonstrates the same "held for a kind, human-reviewed reason" value without the weight.

Nothing needed cutting — three cards (two posts, one moderation example) plus a single link out is the same restrained shape as 4.3 and 4.4, and every number/name/reply in it traces back to `src/data/community.ts` or `src/lib/moderation.ts`.

### 4.6 Built with doctors (§5)
No bugs this time — reused two already-correct patterns directly: the `[Cpu, ShieldCheck, Stethoscope, Database]` icon mapping from the old `SafetySection.tsx` (kept the exact order so the icon-to-point pairing stays consistent with `/jury`, which will reuse the same component later), and the `text-lapis-700` + `opacity={0.06}` light-background `TileMotif` convention already established by `NotFound.tsx` — every prior `TileMotif` usage was on a dark background at `opacity={0.05}` with a white tile, so `NotFound.tsx` was the one precedent worth checking before inventing new numbers.

The varied-scale layout is one `SAFETY_POINTS[0]` ("audio processed on the device, never sent to the cloud" — the single most important trust claim) as a full-width featured card, the remaining three at a normal card size below — not the 4-up identical grid the old `/jury`-bound `SafetySection.tsx` uses, per the brief's explicit instruction for this section. The clinic KPI strip pulls exactly two live numbers, `CLINIC_KPIS.registeredMothers` (60) and `CLINIC_KPIS.activeMonitors` (6), framed honestly as "on one nurse's dashboard" rather than implying a national rollout — matches the demo's consistent honesty about scale (same instinct as the roadmap's real Sep–Oct 2026 dates, not invented growth numbers).

Nothing cut — one featured point, three supporting points, one KPI strip, one link is already the minimum shape for "here's why you can trust this," and every point traces to `SAFETY_POINTS` or `CLINIC_KPIS`, not invented copy.

### 4.7 Closing + assembling the story page (§5)
One real bug, caught immediately on the first full-page screenshot: `ClosingSection` (dark, `bg-lapis-900`) sits directly above `Footer` (also dark, `bg-lapis-900`), but `Footer` carried a `mt-24` from the old landing page, where it always followed a *light* section and needed the breathing room. Between two stacked dark sections that same margin showed up as a jarring pale gap — the page background showing through — right where the design wants one continuous dark closing passage. Removed `Footer`'s `mt-24` entirely rather than special-casing it, then re-screenshotted `/community`, `/clinic`, and `/app` (all end on light content before the footer) to confirm the separation still reads fine there without it — it does, since every page's last section already carries its own bottom padding via `Section`'s `py-16 sm:py-20`, so the extra margin was pure redundancy, not load-bearing.

Assembling the full page also surfaced dead i18n keys worth cleaning up while touching `Footer.tsx`: removing the old `PRODUCT_LINKS` column (redundant now that the header's "Demolar" menu covers the same four links — a nice side-effect of the Header task done earlier) left `nav.monitor`, `nav.community`, `nav.clinic`, and `footer.sections.product` with zero remaining references in either locale file. Confirmed via grep before deleting (same discipline as the earlier `nav.home` cleanup during the Header task) and left `nav.app` alone since `TabBar.tsx` still uses it for an unrelated aria-label. Net effect after all of 4.1-4.7: 365 keys per locale, still in sync.

Also deleted the four old landing section components fully superseded by the story sections (`Hero.tsx`, `PillarsSection.tsx`, `MonitorLearningSection.tsx`, `HealthSystemSection.tsx`) — confirmed zero remaining imports first. `ProblemTimeline.tsx`, `WhyDifferentSection.tsx`, `BusinessModelSection.tsx`, `RoadmapSection.tsx`, `TeamSection.tsx`, `SafetySection.tsx`, and `Section.tsx` stay for `/jury` (§6, next).

Full-page top-to-bottom read: dark hero → dark night-scene (tall, expected — it's the pinned scrollytelling container's true DOM height) → four light sections (day 21, journey, community, trust) → dark closing/footer. Four light sections in a row could read as monotonous in the abstract, but each has a distinct shape (chart+cards, card grid, posts+moderation demo, varied-scale safety cards with a tile-motif texture) and the grouping maps to the story's own logic — one long "night" followed by the ongoing daylight chapters of using the product. Left it alone rather than forcing an artificial color alternation the narrative doesn't ask for.

### `/jury` (§6)
Reused all six eligible old landing components (`ProblemTimeline`, `WhyDifferentSection`, `BusinessModelSection`, `RoadmapSection`, `TeamSection`, `SafetySection`) genuinely as-is, with one small, deliberate addition: each now accepts an optional `id` prop forwarded to its own `Section` wrapper, so the sticky TOC has real anchors to target — the smallest change that could satisfy "everything else imports from landing.ts / clinic.ts as-is."

Two real content additions, both new to `src/data/jury.ts` per plan: `MVP_STATUS` (five items, honestly labeled working / mockup / roadmap — the algorithms and every interactive screen are real; the physical device is a photo, not working hardware; the real Uzbek cry dataset and any backend don't exist yet) and `JURY_LIMITS` (a paragraph on cry-analysis' real limits — citing the ballpark accuracy published research reports for well-trained models, and framing every output as a caregiver-confirmable suggestion, never an unsupervised decision). This is exactly the kind of self-critical honesty the brief asked for, and it's the same instinct already established elsewhere in the project (the real device-anchor date, the real roadmap dates, the honest "60 mothers, one nurse's dashboard" framing in 4.6) — a jury reads a team that volunteers its own limits as more credible, not less.

Prepending the new `mvp` roadmap step (`ROADMAP` in `landing.ts`, "MVP & competition, Sep–Oct 2026") took the array from 5 to 6 items, which broke `RoadmapSection`'s `lg:grid-cols-5` single-row timeline — the horizontal connecting line and left-to-right numbering both assume exactly one row. Caught before it ever got captured in a screenshot by counting the new array length against the grid; changed to `lg:grid-cols-6`. This is the one dated roadmap entry — deliberately, since it's the only step anchored to a real, already-known date (the competition itself), unlike the other five steps which stay dateless by original design.

`SolutionPicture` (new, `/jury` §2 only) is the "compact 5-pillars-around-the-device diagram" the plan called for — built as a centered device illustration with a short connecting line down to a row of five `PILLARS` chips, rather than attempting true radial/orbit positioning around the device. A literal circular arrangement of 5 items around a center point doesn't divide evenly and risks looking broken at odd viewport widths; the simpler hub-and-spoke read (device above, its five capabilities below) says the same thing — "one device, five things it covers" — without the risk.

One layout bug caught before it ever reached a full page: my first pass at the business-model pricing placeholder note used a negative `-mt-6` margin to pull it up under the reused `BusinessModelSection`, which would have fought that component's own `py-16/20` bottom padding and risked a mismatched background seam (the note wasn't going to share `BusinessModelSection`'s `bg-(--bg-elevated)`). Caught it while writing the code, before screenshotting — replaced with a second `Section` sharing the same background class and `pt-0` so it sits flush underneath with no margin hacks, consistent with how every other section on the site handles spacing.

Verified the print stylesheet actually works, not just that `.no-print` classes were present: added `no-print` to the sitewide `Header` and `Footer` (previously only used inside `DoctorReport`'s own overlay) and screenshotted `/jury` under `page.emulateMedia({ media: 'print' })` — the header, sticky TOC bar, and print button all correctly disappear, leaving a clean document starting at the H1, exactly what a jury member printing this page to PDF would want.

Verified anchor navigation lands cleanly below both the sticky site header and the sticky TOC bar for every target, including the one nested case (`#safety` sits on a plain wrapping `<div>` around two `Section`s, not on a `Section` itself) — every target still has enough of its own top padding to absorb the TOC bar's extra height without clipping its heading, confirmed by clicking both a plain anchor (`#roadmap`) and the nested one.

Nothing cut here — eight sections is the minimum a jury/investor deep-dive needs (problem, solution, differentiation, honest MVP status, business model, roadmap, team, safety/limits), and every reused component already carries its own restraint from the original landing page.
