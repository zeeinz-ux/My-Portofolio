# AGENTS.md — My-Portofolio

## Commands

```bash
npm run dev      # Dev server (bound to 0.0.0.0)
npm run build    # Static export → `out/`
npm run start
npm run lint     # next lint (config-less via eslint-config-next)
```

No test or typecheck scripts exist.

## Architecture

- **Next.js 15 App Router**, single-page portfolio (sections: Home, About, Skills, Projects, Contact).
- **Static export** (`next.config.mjs`: `output: 'export'`). Images must be unoptimized (`images.unoptimized: true`).
- **Path alias**: `@/*` → project root (e.g. `@/components/...`).
- **shadcn/ui** via `components.json` — default style, slate base, CSS variables, lucide icons.
- **`cn()` utility** at `lib/utils.ts` using `clsx` + `tailwind-merge`.

## Structure

```
app/globals.css   # Tailwind + shadcn CSS variables + theme transitions
app/layout.tsx    # Inline theme-flash-prevention script in <head>
app/page.tsx      # Single-page composition of sections
components/
  layout/         # Navbar, LoadingScreen, CustomCursor, ScrollProgress, FaviconSwitcher
  sections/       # HeroSection, AboutSection, SkillsSection, ProjectsSection
  ui/             # cinematic-footer, loading-screen, woven-light-hero (Three.js)
data/             # Static content: projects.ts, skills.ts, social.ts
providers/        # ThemeProvider (Context), SmoothScrollProvider (Lenis), Providers wrapper
lib/utils.ts
```

## Conventions & gotchas

- **Dark mode**: Tailwind `darkMode: "class"`. Theme toggle in `ThemeProvider` writes to localStorage. Inline `<script>` in layout prevents flash.
- **GSAP/ScrollTrigger**: Dynamically imported (`await import("gsap")`) — never top-level. Registered inside `useEffect`; always call `ctx?.revert()` in cleanup.
- **Lenis**: Dynamically imported, connected to GSAP ticker. Replaces native scroll. Don't rely on `scroll-behavior: smooth`.
- **Custom cursor**: CSS `cursor: none` on devices with hover (`@media (hover: hover) and (pointer: fine)`).
- **Three.js hero**: In `woven-light-hero.tsx`. Uses `useTheme` — refreshes on theme toggle.
- **Navbar**: IntersectionObserver for active section highlighting. Smooth-scroll via `scrollIntoView`.
- **`"use client"`**: Used in all interactive components; layout is a Server Component.
- **Portrait image**: `/portrait.png` with `onError` fallback that hides the element.
- **Social links** in `data/social.ts` use placeholder URLs — update before deploy.
- **CV download**: Link to `/cv.pdf` — create this file before deployment.

## Static export notes

`next build` produces `out/`. Deployable to any static host (Vercel, Netlify, cPanel). No server-side features.
