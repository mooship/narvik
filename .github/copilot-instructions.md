# Project Guidelines

## Build & Run

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build
npm run format    # Prettier (astro, organize-imports, packagejson plugins)
```

No tests. CI runs `npm run build` on Node 22.x and 24.x.

## Architecture

Static Astro site (output: `static`, Rust compiler enabled) deployed to Cloudflare Pages. One content collection of markdown chapter files rendered via a single dynamic route.

| Path | Purpose |
|------|---------|
| `src/config.ts` | Single source of truth for site metadata (title, author, URL) |
| `src/content.config.ts` | Zod schema for chapter frontmatter; validates on build |
| `src/content/chapters/*.md` | Markdown chapters with frontmatter: `title`, `order` (1–10), optional `description`, `epigraph`, `epigraphAuthor` |
| `src/pages/chapters/[slug].astro` | `getStaticPaths()` pre-builds all chapter routes; passes prev/next chapter props |
| `src/layouts/Layout.astro` | Base HTML shell (meta, OG, fonts, skip link) |
| `src/layouts/ChapterLayout.astro` | Chapter chrome: header, epigraph, pagination, license footer, localStorage reading progress |
| `src/styles/global.css` | Design tokens (`:root` custom properties), light/dark theme, prose styling |
| `functions/_middleware.js` | Cloudflare edge middleware blocking AI training crawlers (403) |

## Content

Adding a chapter: create a new `.md` file in `src/content/chapters/` with the required frontmatter (`title`, `order`). The glob loader auto-discovers it; no routing changes needed. New frontmatter fields require updating `content.config.ts` or Astro will throw a validation error.

## Design System

All colours, spacing, and typography are CSS custom properties in `src/styles/global.css` `:root`. Every component references `var(--*)` tokens — never hardcode colours or sizes. The palette has dark/light variants via `@media (prefers-color-scheme: light)`.

Font stack: Lora Variable (prose), Playfair Display Variable (headings/drop cap), DM Sans Variable (UI) — loaded via Astro's native font system in `astro.config.mjs`.

Typography and spacing use fluid `clamp()` scaling — no CSS breakpoints.

## Code Style

- No inline or block comments unless functionally required
- Always use curly braces for `if`/`else` blocks
- Prettier enforces: 100-char width, double quotes, LF line endings, trailing commas (ES5)

## Conventions & Pitfalls

- **JSON-LD** is native `<script type="application/ld+json" set:html={...}>` — no third-party schema library
- **Site metadata** lives in `src/config.ts` — don't duplicate or hardcode values from it
- **Bot blocking** is intentional and multi-layered (middleware + robots.txt + CSP headers) — do not remove
- **License** is CC BY-NC-SA 4.0, shown in footer and `package.json`
- Chapter slug is the filename minus `.md` (e.g., `01-the-invasion.md` → `/chapters/01-the-invasion`)
- `localStorage.narvik_lastRead` tracks the reader's last-visited chapter for the homepage "Continue reading" button
