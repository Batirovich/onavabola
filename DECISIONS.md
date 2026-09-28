# Decisions log

Autonomous decisions made while building, with brief rationale. Newest at the bottom.

- **React 19 / Vite 8 / TS ~6.0 (whatever `create vite@latest` scaffolded today)** instead of pinning older majors — no reason to fight the toolchain's current defaults for a greenfield demo.
- **Tailwind v4 (CSS-first `@theme`, `@tailwindcss/vite` plugin)** instead of v3 + `tailwind.config.js` — the brief wants a fully custom token palette with no default Tailwind colors in the UI; v4's `@theme` block is the more direct way to define that and avoids shipping the default color ramp at all.
- **Fonts: Alegreya (display) + Source Sans 3 (text)**, chosen after programmatically checking ~25 Google Fonts candidates for the U+02BB glyph (see `DESIGN.md`). Popular first choices (Fraunces, Newsreader, Inter, Roboto, Rubik, Karla) do not ship that codepoint at all and were rejected before any UI work.
- **React Router in `BrowserMode` (createBrowserRouter)** with a `_redirects`/`vercel.json` rewrite for static hosting, rather than hash routing — cleaner URLs (`/monitor`, `/community`) for a jury demo, and both Netlify and Vercel support SPA rewrites trivially.
- **Project folder name:** `Ona va Bola` on the Desktop (as the user requested), package name `ona-va-bola` inside `package.json`.
