# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build
npm run format    # Prettier (astro, organize-imports, packagejson plugins)
```

There are no tests. CI runs `npm run build` on Node 22.x and 24.x.

## Architecture

Static Astro site. One content collection (`src/content/chapters/`) of markdown files with frontmatter: `title`, `order` (1–10), and optional `description`, `epigraph`, `epigraphAuthor`. The dynamic route `src/pages/chapters/[slug].astro` renders each chapter via `ChapterLayout.astro`.

**Build pipeline** (order matters):
1. `@playform/inline` — inlines critical CSS into HTML
2. `astro-purgecss` — removes unused CSS from the inlined output
3. `astro-compressor` — gzip/brotli/zstd compresses all assets

**PurgeCSS gotcha:** `@playform/inline` runs first and strips CSS attribute selectors (e.g. `[data-theme]`) it considers dead code because they don't appear in static HTML. Workaround: inject theme-dependent CSS via `<Fragment set:html={...}>` inside `Layout.astro` to bypass the optimizer.

## Design System

All colours, spacing, and typography are CSS custom properties defined in `src/styles/global.css` `:root`. Every component uses `var(--*)` — colour changes only require updating the tokens. Current palette is a warm dark theme (dark brownish-black background, cream text, amber accent).

Font stack: Lora Variable (prose), Playfair Display Variable (headings/drop cap), DM Sans Variable (UI). Loaded via `@fontsource-variable/*` packages.

## Code Style

- No inline or block comments unless functionally required
- Always use curly braces for `if`/`else` blocks
- Prettier enforces: 100-char width, double quotes, LF line endings, trailing commas (ES5)
