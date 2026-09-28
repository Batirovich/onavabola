# Design reference notes

`design-references/` contained no screenshots when this redesign started, so these notes are written directly from the brief's own direction (redesign prompt, section 3: "One night, one mother") rather than from example images. If real references are added later, update this file with what specifically makes them feel premium, and check the built sections against it.

## What "premium" means for this redesign, operationally

Not a mood board — a checklist to hold every section against before calling it done:

1. **One idea, one visual, ≤2 sentences.** If a section needs a third sentence to make its point, the point is wrong, not the sentence count.
2. **Restraint reads as confidence.** A product that explains itself in one calm line feels more trustworthy than one that argues its case with five bullet points. Cutting text is not losing information — the information moves to `/jury`, where a reader has opted into detail.
3. **Real interaction over illustration.** Wherever the brief allows it, prefer wiring up the actual `predictReasons()` / `moderateText()` / EPDS scoring logic over drawing a picture of what the product "would" do. A jury that clicks a button and sees the real classifier respond trusts the team more than one shown a mockup.
4. **Whitespace is the layout, not the gap between layout elements.** Roughly double the padding instinct from the old landing page. When in doubt, remove a paragraph before adding more padding to compensate for it.
5. **Color has a job.** Lapis/night = structure and night-time. Linen = daytime calm. Turquoise = secondary data, never a headline color. Apricot = exactly one thing per screen (the device glow, or the one primary action) — if apricot appears twice on one viewport, one of them is wrong.
6. **Motion earns its place.** The night-scene scroll sequence (4.2) is the one orchestrated moment on the whole site — because it's the one place motion tells part of the story itself (the passage from a cry to a calm answer). Everywhere else, motion is a direct response to a click, not a page-load flourish.
7. **Numbers must be real.** Every stat in the story and jury pages traces back to `src/data/`. If a number can't be found in the data layer, the copy is rewritten to not need it rather than a new number being invented.

## Self-check before shipping each section

- Could I delete this section and would the story still make sense? (If yes to a *supporting* section, it's not pulling weight — cut or merge it.)
- Does the headline work without the body copy? (If the headline needs the paragraph to make sense, the headline is too vague.)
- Is there a row of 3+ visually identical cards? (If yes, vary scale/treatment by importance, per the brief.)
- Would this survive being read in 5 seconds while scrolling past on a phone?
