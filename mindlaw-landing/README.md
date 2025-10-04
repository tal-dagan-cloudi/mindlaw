# mindlaw - AI-Powered Legal Intelligence Platform

A modern, professional landing page for mindlaw, a legal AI startup built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS 4
- **Smooth Animations**: Framer Motion for professional micro-interactions
- **Black & White Theme**: Professional, minimalist design focused on legal industry
- **Responsive Design**: Mobile-first approach with fluid typography
- **Performance Optimized**: Built with Turbopack for fast development and optimized production builds

## 📦 Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.14 with PostCSS
- **Animations**: Framer Motion 12.23.22
- **Fonts**: Inter (sans-serif) & Playfair Display (serif) from Google Fonts

## 🎨 Design Highlights

### Components Built
1. **Navbar** - Sticky navigation with scroll effects and smooth animations
2. **Hero Section** - Full-screen hero with animated grid background, gradient text, and trust indicators
3. **Features Section** - 6 feature cards with hover effects showcasing platform capabilities
4. **Problem/Solution Section** - Side-by-side comparison highlighting value proposition
5. **CTA Section** - Black background call-to-action with dual buttons
6. **Footer** - Multi-column footer with links and social media

### Design Principles
- **Professional**: Serif headers (Playfair Display) for authority, sans-serif body (Inter) for clarity
- **Technological**: Animated grid patterns, gradient effects, smooth transitions
- **Trust-focused**: Enterprise security badges, compliance indicators, professional imagery

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3001](http://localhost:3001) to view the site.

## 📁 Project Structure

```
mindlaw-landing/
├── app/
│   ├── globals.css          # Global styles with Tailwind imports
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Home page composition
├── components/
│   ├── Navbar.tsx            # Sticky navigation component
│   ├── Hero.tsx              # Hero section with animations
│   ├── Features.tsx          # Features showcase grid
│   ├── ProblemSolution.tsx   # Problem/solution comparison
│   ├── CTA.tsx               # Call-to-action section
│   └── Footer.tsx            # Footer with links
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.mjs        # PostCSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎯 Competitor Analysis

The design was informed by analyzing leading legal AI platforms:
- **Harvey.ai**: Enterprise-grade positioning, professional aesthetics
- **Lizzy.ai**: Feature-focused messaging, workflow automation emphasis

## 🔧 Configuration

### Tailwind CSS
- Custom black/white color scheme
- Extended font families for serif/sans-serif
- Utility classes for modern effects

### Next.js
- App Router for modern routing
- Turbopack for fast development
- Type-safe environment

## 📝 Notes

- Port 3001 is used (3000 may be occupied)
- Tailwind CSS 4 uses new PostCSS plugin (@tailwindcss/postcss)
- All components use 'use client' directive for Framer Motion animations
- Fonts are loaded via next/font/google for optimal performance

## 🚢 Deployment

This project is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

```bash
# Build the project
npm run build

# The output will be in the .next folder
```

## 📄 License

ISC

---

Built with ❤️ for the legal industry