# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains the **mindlaw** landing page - an AI-powered legal intelligence platform built with Next.js 15, TypeScript, and Tailwind CSS 4.

The landing page is located in the `mindlaw-landing/` subdirectory.

## Development Commands

```bash
# Navigate to the landing page directory
cd mindlaw-landing

# Development
npm run dev              # Start development server with Turbopack (port 3001)

# Production
npm run build            # Build production bundle
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint checks
```

## Architecture

### Tech Stack
- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.2.0** with TypeScript 5.9.3
- **Tailwind CSS 4.1.14** with custom black/white theme
- **Framer Motion 12.23.22** for animations
- **Fonts**: Inter (sans-serif via `--font-inter`) and Playfair Display (serif via `--font-playfair`)

### Project Structure
```
mindlaw/
├── mindlaw-landing/          # Landing page Next.js application
│   ├── app/
│   │   ├── layout.tsx       # Root layout with font definitions and metadata
│   │   ├── page.tsx         # Home page - composes all sections
│   │   └── globals.css      # Global styles with Tailwind directives
│   ├── components/
│   │   ├── Navbar.tsx       # Sticky navigation with scroll effects
│   │   ├── Hero.tsx         # Full-screen hero with animated grid background
│   │   ├── Features.tsx     # 6-card feature showcase grid
│   │   ├── ProblemSolution.tsx  # Side-by-side value proposition
│   │   ├── CTA.tsx          # Call-to-action section
│   │   └── Footer.tsx       # Multi-column footer
│   ├── lib/
│   │   └── utils.ts         # cn() utility for className merging
│   └── package.json         # Next.js dependencies and scripts
├── nixpacks.toml            # Railway build configuration
└── railway.json             # Railway deployment settings
```

### Key Design Patterns

**Component Architecture:**
- All components use `'use client'` directive for Framer Motion animations
- Page composition follows: Navbar → Hero → Features → ProblemSolution → CTA → Footer
- Path alias `@/*` maps to project root for clean imports

**Styling System:**
- Custom color scheme: primary (black), secondary (white), accent (zinc-900)
- Font variables: `var(--font-inter)` and `var(--font-playfair)` defined in layout
- `cn()` utility in `lib/utils.ts` merges Tailwind classes via clsx + tailwind-merge

**Animation Strategy:**
- Framer Motion `initial`, `animate`, `transition` for entry animations
- Stagger delays (0.1-0.6s) for sequential element appearance
- `whileHover` and `whileTap` for interactive button states
- Grid background with gradient overlays for depth

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` points to root directory
- Module resolution: `bundler` (Next.js optimized)
- Target: ES2020 with ESNext modules

### Tailwind Configuration
- Custom `primary`, `secondary`, `accent` colors for black/white theme
- Extended `fontFamily` with `sans` and `serif` variables
- All components/app files included in content paths

## Development Notes

**Port Configuration:**
- Development server runs on **port 3001** (default 3000 may be occupied)

**Turbopack:**
- Fast development server enabled via `--turbopack` flag in dev script
- Significantly faster hot-reload compared to webpack

**Font Loading:**
- Fonts loaded via `next/font/google` for automatic optimization
- CSS variables injected into `<html>` tag in layout.tsx
- Display strategy: `swap` for fast initial render

**All Components Require Client Directive:**
- Due to Framer Motion dependency, components need `'use client'`
- Only page.tsx and layout.tsx are server components

## Working with This Codebase

**Adding New Sections:**
1. Create component in `components/` with `'use client'` directive
2. Import Framer Motion: `import { motion } from 'framer-motion'`
3. Use `cn()` from `lib/utils.ts` for className merging
4. Add to `app/page.tsx` in desired order
5. Follow existing animation patterns (initial/animate/transition)

**Modifying Styles:**
- Edit `tailwind.config.ts` for theme-level changes (colors, fonts)
- Use custom color classes: `bg-primary`, `text-secondary`, `bg-accent`
- Font classes: `font-sans` (Inter), `font-serif` (Playfair Display)

**Component Patterns:**
- Wrap sections in `<section>` with `relative` positioning
- Use container pattern: `container mx-auto px-6`
- Apply responsive classes: `text-xl md:text-2xl lg:text-3xl`
- Motion divs with stagger delays for visual hierarchy

**SEO and Metadata:**
- Metadata defined in `app/layout.tsx` with OpenGraph support
- Title: "mindlaw - AI-Powered Legal Intelligence Platform"
- Update metadata for production deployment

## Deployment

### Railway Deployment
This project is configured for Railway deployment with:
- **nixpacks.toml**: Defines build phases and Node.js 20 environment
- **railway.json**: Specifies nixpacksPath and deployment settings

The configuration automatically:
1. Installs dependencies in `mindlaw-landing/`
2. Builds the Next.js application
3. Starts the production server

### Alternative Platforms
Build output located in `.next/` folder after running `npm run build` in the `mindlaw-landing/` directory. Also compatible with Vercel, Netlify, or any Next.js-compatible platform.
