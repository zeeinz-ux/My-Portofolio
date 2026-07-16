# AGENTS.md — My-Portofolio

## Commands

```bash
npm run dev                      # Dev server (bound to 0.0.0.0)
npm run build                    # Normal Next build; static export only if GITHUB_PAGES=true
npm run start
npm run lint                     # next lint (flat config via eslint-config-next)
node scripts/compress-images.mjs # Converts public/*.png → *.webp (skips logo* files)
```

No test or typecheck scripts exist.

## Architecture

- **Next.js 16 App Router**, single-page portfolio (sections: Hero, About, Skills, Projects, + CinematicFooter covering contact).
- **Static export only for GitHub Pages CI** (`next.config.mjs` sets `output: 'export'` + `basePath` when `GITHUB_PAGES=true`). Local dev and builds are normal Next.js.
- **`publicPath()` helper** at `lib/paths.ts` — prepends `NEXT_PUBLIC_BASE_PATH` to asset paths (needed by all static asset references for GH Pages to work).
- **Path alias**: `@/*` → project root.
- **shadcn/ui** via `components.json` — default style, slate base, CSS variables, lucide icons.
- **`cn()` utility** at `lib/utils.ts` using `clsx` + `tailwind-merge`.
- **Three.js hero** (`components/ui/woven-light-hero.tsx`) refreshes on theme toggle via `useTheme`.
- **framer-motion** + **GSAP** (dynamically imported) + **Lenis** (smooth scroll).

## Dependencies worth knowing

| Tool | Import pattern | Notes |
|------|---------------|-------|
| GSAP/ScrollTrigger | `await import("gsap")` inside `useEffect` | Never top-level. Always `ctx?.revert()` in cleanup. |
| Lenis | Dynamic import, connected to GSAP ticker | Replaces native scroll. Don't rely on `scroll-behavior: smooth`. |
| framer-motion | Static `import` | Used for section entrance animations. |

## Conventions & gotchas

- **`"use client"`**: Required in all interactive components. Layout is a Server Component. `providers/Providers.tsx` is the client boundary.
- **Dark mode**: `darkMode: "class"` in Tailwind. Inline `<script>` in `app/layout.tsx` `<head>` prevents flash by reading `localStorage` before React hydrates.
- **Custom cursor**: `cursor: none` via CSS media query `(hover: hover) and (pointer: fine)` — desktop only.
- **Navbar**: IntersectionObserver for active section. Smooth-scroll via `scrollIntoView`.
- **Portrait**: `/portrait.png` and `/portrait.webp` — `onError` fallback hides the `<img>` element.
- **Data files** (`data/skills.ts`, `projects.ts`, `social.ts`) — social links already have real URLs, not placeholders.
- **CV/Resume**: `/RESUME_ALIF FAHRI ADITYA(english_language).pdf` in `public/`.
- **`scripts/compress-images.mjs`**: Requires `sharp` (not in `package.json` — install with `npm install -D sharp` before running). Converts PNG/JPEG to WebP.
- **Providers tree**: `ThemeProvider` > `FaviconSwitcher` + `SmoothScrollProvider` (Lenis).
- **Structured data**: Schema.org `Person` JSON-LD in `app/layout.tsx` `<head>`.
- **Tailwind custom fonts**: `playfair` (Playfair Display) and `inter` (Inter) — both serif and sans-serif stacks.

## CI / Deploy

- **GitHub Pages** workflow (`.github/workflows/deploy-pages.yml`) sets `GITHUB_PAGES=true` during build, which triggers static export with `/My-Portofolio` base path.
- `NEXT_PUBLIC_BASE_PATH` used everywhere assets are referenced via `publicPath()`.
- Output directory: `out/`. Deployable to any static host.
