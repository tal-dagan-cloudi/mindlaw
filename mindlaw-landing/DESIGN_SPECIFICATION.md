# mindlaw Landing Page - UI/UX Design Specification
**Redesign: Black & White Color Scheme (Tiptap.dev Inspired)**

**Version:** 1.0
**Date:** 2025-10-05
**Designer:** Claude Code
**Target Implementation:** Next.js 15 + Tailwind CSS 4

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout System](#spacing--layout-system)
5. [Component Specifications](#component-specifications)
6. [Animation & Interaction Patterns](#animation--interaction-patterns)
7. [Responsive Design Guidelines](#responsive-design-guidelines)
8. [Accessibility Requirements](#accessibility-requirements)
9. [Implementation Notes](#implementation-notes)

---

## Design Philosophy

### Core Principles
1. **High Contrast Clarity** - Pure black and white create maximum readability and professional gravitas
2. **Minimalist Sophistication** - Reduce visual noise, let content and structure speak
3. **Purposeful Motion** - Subtle animations guide attention without distraction
4. **Content Hierarchy** - Clear visual flow from most to least important information
5. **Professional Authority** - Design conveys trust, precision, and legal expertise

### Tiptap.dev Design Patterns Adopted
- **Bold Typography Hierarchy** - Large, impactful headlines with clear size differentiation
- **Generous Whitespace** - Breathing room between sections creates visual rhythm
- **Card-Based Layouts** - Clean borders and subtle shadows for content grouping
- **Minimal Color Accents** - Black/white with subtle gray variations only
- **Clean Grid Systems** - Structured layouts with consistent alignment
- **Subtle Depth** - Box shadows and borders instead of heavy gradients

---

## Color System

### Primary Palette

#### Pure Black & White
```css
--color-black: #000000;        /* Primary text, backgrounds, buttons */
--color-white: #FFFFFF;        /* Backgrounds, button text, cards */
```

#### Grayscale Variations
```css
--color-gray-50: #FAFAFA;      /* Subtle backgrounds, hover states */
--color-gray-100: #F5F5F5;     /* Section backgrounds, alternating rows */
--color-gray-200: #E5E5E5;     /* Borders, dividers */
--color-gray-300: #D4D4D4;     /* Disabled states, secondary borders */
--color-gray-400: #A3A3A3;     /* Placeholder text, secondary icons */
--color-gray-500: #737373;     /* Supporting text, captions */
--color-gray-600: #525252;     /* Secondary text */
--color-gray-700: #404040;     /* Primary text alternative */
--color-gray-800: #262626;     /* Rich black alternative */
--color-gray-900: #171717;     /* Deep backgrounds */
```

### Tailwind CSS Color Mapping
```typescript
// tailwind.config.ts
colors: {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
}
```

### Color Usage Guidelines

| Element | Background | Text | Border |
|---------|------------|------|--------|
| **Primary Button** | `bg-black` | `text-white` | `border-black` |
| **Secondary Button** | `bg-white` | `text-black` | `border-black` (2px) |
| **Card (Default)** | `bg-white` | `text-gray-900` | `border-gray-200` |
| **Card (Hover)** | `bg-white` | `text-black` | `border-black` |
| **Section (Light)** | `bg-white` | `text-gray-900` | - |
| **Section (Dark)** | `bg-black` | `text-white` | - |
| **Section (Subtle)** | `bg-gray-50` | `text-gray-900` | - |

---

## Typography System

### Font Families
- **Sans-Serif (Inter)** - Primary UI text, body copy, navigation
  `font-family: var(--font-inter), system-ui, sans-serif`

- **Serif (Playfair Display)** - Headlines, section titles, brand emphasis
  `font-family: var(--font-playfair), Georgia, serif`

### Type Scale & Hierarchy

#### Heading Levels
```css
/* H1 - Hero Headlines */
font-size: 72px (4.5rem);
line-height: 1.1;
font-weight: 700 (bold);
font-family: Playfair Display (serif);
letter-spacing: -0.02em;
color: #000000;

/* H2 - Section Titles */
font-size: 48px (3rem);
line-height: 1.2;
font-weight: 700 (bold);
font-family: Playfair Display (serif);
letter-spacing: -0.01em;
color: #000000;

/* H3 - Subsection Titles */
font-size: 32px (2rem);
line-height: 1.3;
font-weight: 700 (bold);
font-family: Playfair Display (serif);
color: #000000;

/* H4 - Card Titles */
font-size: 24px (1.5rem);
line-height: 1.4;
font-weight: 600 (semibold);
font-family: Inter (sans);
color: #000000;

/* H5 - Component Titles */
font-size: 20px (1.25rem);
line-height: 1.4;
font-weight: 600 (semibold);
font-family: Inter (sans);
color: #171717;
```

#### Body Text
```css
/* Body Large - Hero Subheadlines */
font-size: 24px (1.5rem);
line-height: 1.6;
font-weight: 400 (regular);
font-family: Inter;
color: #525252;

/* Body Default - Paragraph Text */
font-size: 18px (1.125rem);
line-height: 1.7;
font-weight: 400 (regular);
font-family: Inter;
color: #404040;

/* Body Small - Supporting Text */
font-size: 16px (1rem);
line-height: 1.6;
font-weight: 400 (regular);
font-family: Inter;
color: #525252;

/* Caption - Meta Information */
font-size: 14px (0.875rem);
line-height: 1.5;
font-weight: 400 (regular);
font-family: Inter;
color: #737373;

/* Label - UI Elements */
font-size: 14px (0.875rem);
line-height: 1.4;
font-weight: 500 (medium);
font-family: Inter;
color: #000000;
letter-spacing: 0.01em;
```

### Tailwind Typography Classes
```html
<!-- Hero Headline -->
<h1 class="text-7xl font-serif font-bold leading-tight tracking-tight">

<!-- Section Title -->
<h2 class="text-5xl font-serif font-bold leading-tight tracking-tight">

<!-- Card Title -->
<h4 class="text-2xl font-sans font-semibold leading-snug">

<!-- Body Large -->
<p class="text-2xl font-sans leading-relaxed text-gray-600">

<!-- Body Default -->
<p class="text-lg font-sans leading-relaxed text-gray-700">

<!-- Caption -->
<p class="text-sm font-sans text-gray-500">
```

---

## Spacing & Layout System

### Spacing Scale (Tailwind Units)
```
4px   = spacing-1
8px   = spacing-2
12px  = spacing-3
16px  = spacing-4
24px  = spacing-6
32px  = spacing-8
48px  = spacing-12
64px  = spacing-16
96px  = spacing-24
128px = spacing-32
```

### Layout Grid
- **Container Max Width:** 1280px (`max-w-7xl`)
- **Container Padding:** 24px mobile, 48px tablet+ (`px-6 lg:px-12`)
- **Grid Columns:** 12-column system
- **Grid Gap:** 32px default (`gap-8`)

### Section Spacing
```css
/* Section Padding (Vertical) */
py-24 (96px)  - Standard section spacing
py-32 (128px) - Hero sections
py-16 (64px)  - Compact sections

/* Component Spacing */
mb-16 (64px)  - Between section header and content
mb-12 (48px)  - Between major content blocks
mb-8 (32px)   - Between cards/items
mb-6 (24px)   - Between paragraphs
```

### Container Patterns
```html
<!-- Standard Section Container -->
<section class="py-24">
  <div class="container mx-auto px-6 max-w-7xl">
    <!-- Content -->
  </div>
</section>

<!-- Centered Content Container -->
<div class="max-w-3xl mx-auto text-center">
  <!-- Centered content -->
</div>

<!-- Wide Content Container -->
<div class="max-w-6xl mx-auto">
  <!-- Wide content -->
</div>
```

---

## Component Specifications

### 1. Navbar

#### Design Requirements
- **Position:** Fixed top, sticky navigation
- **Height:** 80px (h-20)
- **Background (Scrolled):** White with subtle shadow
- **Background (Top):** Transparent with backdrop blur
- **Border:** 1px solid gray-200 when scrolled

#### Visual Specifications
```
┌─────────────────────────────────────────────────────────────┐
│ Mind.Law    Platform  Solutions  Customers  Company  [Demo] │
│                                                              │ 80px
└─────────────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Logo:**
- Font: Inter, 24px (text-2xl), font-medium
- Color: Black (#000000)
- Dot separator: Gray-400 (#A3A3A3)
- Hover: Scale up slightly (scale: 1.02)

**Navigation Links:**
- Font: Inter, 14px (text-sm), font-medium
- Color: Gray-700 (#404040)
- Hover: Black (#000000) with 2px underline
- Spacing: 32px gap (space-x-8)
- Underline animation: Width 0 → 100% over 300ms

**CTA Button:**
- Background: Black (#000000)
- Text: White, 14px, font-medium
- Padding: 10px 24px (px-6 py-2.5)
- Border Radius: 6px (rounded-md)
- Hover: Background gray-900 (#171717), scale 1.05

#### Scroll Behavior
```typescript
// State transitions on scroll > 50px
Initial (top):
  - background: transparent
  - no shadow
  - no border

Scrolled:
  - background: white/95 with backdrop-blur-md
  - shadow: shadow-sm
  - border-bottom: 1px solid gray-200
```

#### Tailwind Implementation
```tsx
<nav className={cn(
  "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
  isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
    : "bg-transparent"
)}>
  <div className="container mx-auto px-6 max-w-7xl">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <a href="#" className="text-2xl font-medium text-black hover:scale-[1.02] transition-transform">
        Mind<span className="text-gray-400">.</span>Law
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-sm font-medium text-gray-700 hover:text-black relative group">
          Platform
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      {/* CTA */}
      <button className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 hover:scale-105 transition-all">
        Request Demo
      </button>
    </div>
  </div>
</nav>
```

---

### 2. Hero Section

#### Design Requirements
- **Height:** Full viewport (min-h-screen)
- **Background:** White with subtle grid pattern
- **Layout:** Centered content, vertical alignment
- **Key Elements:** Badge, headline, subheadline, dual CTAs, trust indicators

#### Visual Specifications
```
┌───────────────────────────────────────────────────────┐
│                                                       │
│                                                       │
│              [● Transforming Legal AI]               │
│                                                       │
│           Professional Class Legal AI                │
│                                                       │
│     Domain-specific AI platform built for law        │
│     firms, legal professionals, and corporate        │
│     legal departments...                             │
│                                                       │
│     [Request a Demo]  [View Platform]                │
│                                                       │
│     Trusted by leading law firms worldwide           │
│     ✓ Enterprise   ✓ SOC 2   ✓ 99.9%   ✓ GDPR      │
│                                                       │
│                        ↓                             │
└───────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Background Treatment:**
```css
Background: Pure white (#FFFFFF)
Grid Pattern:
  - Color: rgba(0,0,0,0.03)
  - Size: 64px × 64px
  - Style: Subtle lines via linear-gradient
```

**Badge (Status Indicator):**
- Background: Gray-100 (#F5F5F5)
- Border: 1px solid gray-200
- Padding: 8px 16px (px-4 py-2)
- Border Radius: Full (rounded-full)
- Font: Inter, 14px, font-medium
- Color: Gray-700
- Indicator Dot: 8px, green-500, pulse animation

**Main Headline:**
- Font: Playfair Display, 72px (text-7xl), bold
- Line Height: 1.1 (leading-tight)
- Letter Spacing: -0.02em (tracking-tight)
- Color: Black (#000000)
- Max Width: None (full width)
- Animation: Fade up, delay 200ms

**Subheadline:**
- Font: Inter, 24px (text-2xl), regular
- Line Height: 1.6 (leading-relaxed)
- Color: Gray-600 (#525252)
- Max Width: 768px (max-w-3xl)
- Animation: Fade up, delay 300ms

**CTA Buttons:**
- Layout: Horizontal flex, 16px gap
- Animation: Fade up, delay 400ms

Primary Button:
- Background: Black (#000000)
- Text: White, 16px, font-medium
- Padding: 16px 32px (px-8 py-4)
- Border Radius: 8px (rounded-lg)
- Shadow: Large (shadow-lg)
- Hover: Background gray-900, scale 1.05

Secondary Button:
- Background: White (#FFFFFF)
- Text: Black, 16px, font-medium
- Padding: 16px 32px (px-8 py-4)
- Border: 2px solid black
- Border Radius: 8px (rounded-lg)
- Hover: Background gray-50, scale 1.05

**Trust Indicators:**
- Section Border: 1px solid gray-200 (top border)
- Padding Top: 32px (pt-8)
- Margin Top: 64px (mt-16)
- Label: Text-sm, gray-500
- Items Layout: Flex wrap, 48px gap
- Checkmark: Green-600, 20px icon
- Text: Gray-700, 14px, font-medium

**Scroll Indicator:**
- Position: Absolute bottom, centered
- Size: 24px × 40px
- Border: 2px solid gray-300
- Border Radius: Full (rounded-full)
- Inner Dot: Gray-400, 6px, animated bounce

#### Tailwind Implementation
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
  {/* Grid Background */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-7xl">
    <div className="max-w-4xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700 mb-8">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Transforming Legal Intelligence with AI
      </div>

      {/* Headline */}
      <h1 className="text-7xl font-serif font-bold leading-tight tracking-tight text-black mb-6">
        Professional Class Legal AI
      </h1>

      {/* Subheadline */}
      <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        Domain-specific AI platform built for law firms, legal professionals,
        and corporate legal departments. Accelerate research, automate document
        analysis, and deliver superior outcomes.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <button className="px-8 py-4 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-900 hover:scale-105 transition-all shadow-lg">
          Request a Demo
        </button>
        <button className="px-8 py-4 bg-white text-black text-base font-medium rounded-lg border-2 border-black hover:bg-gray-50 hover:scale-105 transition-all">
          View Platform
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-6">
          Trusted by leading law firms worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Trust items */}
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
    </div>
  </div>
</section>
```

---

### 3. Features Section

#### Design Requirements
- **Background:** Gray-50 (#FAFAFA) - subtle contrast from white
- **Layout:** 3-column grid (responsive: 1 → 2 → 3 columns)
- **Cards:** White background, black border on hover
- **Total Items:** 6 features in grid

#### Visual Specifications
```
┌─────────────────────────────────────────────────────────┐
│                Built for Legal Excellence                │
│     Comprehensive AI capabilities designed for legal    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  [Icon]  │  │  [Icon]  │  │  [Icon]  │             │
│  │  Title   │  │  Title   │  │  Title   │             │
│  │  Desc... │  │  Desc... │  │  Desc... │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  [Icon]  │  │  [Icon]  │  │  [Icon]  │             │
│  │  Title   │  │  Title   │  │  Title   │             │
│  │  Desc... │  │  Desc... │  │  Desc... │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Section Header:**
- Background: Gray-50
- Container: max-w-3xl, centered
- Margin Bottom: 64px (mb-16)

Title:
- Font: Playfair Display, 48px (text-5xl), bold
- Color: Black
- Margin Bottom: 24px (mb-6)

Subtitle:
- Font: Inter, 20px (text-xl)
- Color: Gray-600
- Line Height: 1.6

**Feature Cards:**
- Background: White (#FFFFFF)
- Border: 1px solid gray-200 (default)
- Border (Hover): 1px solid black
- Border Radius: 16px (rounded-2xl)
- Padding: 32px (p-8)
- Shadow: None (default), shadow-xl (hover)
- Transition: All properties 300ms

Card Icon:
- Size: 32px (w-8 h-8)
- Color: Black
- Stroke Width: 1.5
- Margin Bottom: 16px (mb-4)
- Hover: Scale 1.1

Card Title:
- Font: Playfair Display, 20px (text-xl), bold
- Color: Black
- Margin Bottom: 12px (mb-3)

Card Description:
- Font: Inter, 16px (text-base)
- Color: Gray-600
- Line Height: 1.7 (leading-relaxed)

**Grid Layout:**
- Columns: 1 (mobile) → 2 (md) → 3 (lg)
- Gap: 32px (gap-8)
- Max Width: 1280px (max-w-7xl)

**Hover Effects:**
- Border color transition: gray-200 → black
- Shadow appearance: none → shadow-xl
- Icon scale: 1 → 1.1
- Bottom border accent: Width 0 → 100%, black, 2px height

#### Animation Pattern
```typescript
// Stagger animation on scroll into view
Card 1: delay 0ms
Card 2: delay 100ms
Card 3: delay 200ms
Card 4: delay 300ms
Card 5: delay 400ms
Card 6: delay 500ms

Initial state: { opacity: 0, y: 50 }
Animated state: { opacity: 1, y: 0 }
Duration: 500ms
```

#### Tailwind Implementation
```tsx
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-6 max-w-7xl">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-5xl font-serif font-bold mb-6 text-black">
        Built for Legal Excellence
      </h2>
      <p className="text-xl text-gray-600 leading-relaxed">
        Comprehensive AI capabilities designed specifically for legal practice
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature Card */}
      <div className="group relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all duration-300">
        {/* Icon */}
        <div className="mb-4 text-black group-hover:scale-110 transition-transform duration-300">
          {/* SVG Icon */}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-bold mb-3 text-black">
          Intelligent Document Analysis
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed">
          AI-powered contract review, due diligence, and document comparison...
        </p>

        {/* Hover Bottom Border */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  </div>
</section>
```

---

### 4. Problem/Solution Section

#### Design Requirements
- **Background:** White (#FFFFFF)
- **Layout:** 2-column split (side-by-side comparison)
- **Visual Distinction:** Red accents for problems, green for solutions
- **Responsive:** Stacked on mobile, side-by-side on desktop

#### Visual Specifications
```
┌──────────────────────────────────────────────────────────┐
│              Transform Legal Workflows                   │
│     From time-consuming work to intelligent automation   │
│                                                           │
│  ┌──────────────────┐  │  ┌──────────────────┐          │
│  │ Traditional      │  │  │ mindlaw          │          │
│  │ Challenges       │  │  │ Solutions        │          │
│  │                  │  │  │                  │          │
│  │ ✕ Problem 1      │  │  │ ✓ Solution 1     │          │
│  │ ✕ Problem 2      │  │  │ ✓ Solution 2     │          │
│  │ ✕ Problem 3      │  │  │ ✓ Solution 3     │          │
│  │ ✕ Problem 4      │  │  │ ✓ Solution 4     │          │
│  └──────────────────┘  │  └──────────────────┘          │
│                                                           │
│                  [See How It Works]                      │
└──────────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Section Header:**
- Same pattern as Features section
- Background: White
- Container: max-w-3xl, centered

**Column Layout:**
- Grid: 2 columns on lg breakpoint
- Gap: 48px (gap-12)
- Max Width: 1152px (max-w-6xl)

**Problem Column (Left):**

Badge:
- Background: Red-50 (#FEF2F2)
- Text: Red-700 (#B91C1C)
- Font: Inter, 14px, font-medium
- Padding: 8px 16px (px-4 py-2)
- Border Radius: Full (rounded-full)
- Margin Bottom: 16px (mb-4)

Problem Items:
- Background: Gray-50 (#FAFAFA)
- Padding: 24px (p-6)
- Border Radius: 12px (rounded-xl)
- Spacing: 24px gap (space-y-6)

Icon:
- Size: 24px (w-6 h-6)
- Color: Red-500 (#EF4444)
- Type: X mark (cross)

Text:
- Font: Inter, 16px, font-medium
- Color: Gray-700
- Line Height: 1.6

**Solution Column (Right):**

Badge:
- Background: Green-50 (#F0FDF4)
- Text: Green-700 (#15803D)
- Font: Inter, 14px, font-medium
- Padding: 8px 16px (px-4 py-2)
- Border Radius: Full (rounded-full)
- Margin Bottom: 16px (mb-4)

Solution Items:
- Background: White (#FFFFFF)
- Border: 1px solid gray-200
- Padding: 24px (p-6)
- Border Radius: 12px (rounded-xl)
- Spacing: 24px gap (space-y-6)
- Hover: Border green-200

Icon:
- Size: 24px (w-6 h-6)
- Color: Green-600 (#16A34A)
- Type: Checkmark

Text:
- Font: Inter, 16px, font-medium
- Color: Gray-900
- Line Height: 1.6

**CTA Button (Bottom):**
- Same styling as Hero primary button
- Centered alignment
- Margin Top: 64px (mt-16)

#### Animation Pattern
```typescript
// On scroll into view
Section Header: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }, delay 0ms
Problem Column: { opacity: 0, x: -50 } → { opacity: 1, x: 0 }, delay 200ms
Solution Column: { opacity: 0, x: 50 } → { opacity: 1, x: 0 }, delay 200ms

// Individual items stagger
Problem Item 1: delay 300ms
Problem Item 2: delay 400ms
Problem Item 3: delay 500ms
Problem Item 4: delay 600ms

Solution Item 1: delay 300ms
Solution Item 2: delay 400ms
Solution Item 3: delay 500ms
Solution Item 4: delay 600ms

CTA Button: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }, delay 800ms
```

#### Tailwind Implementation
```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-6 max-w-7xl">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-5xl font-serif font-bold mb-6 text-black">
        Transform Legal Workflows
      </h2>
      <p className="text-xl text-gray-600">
        From time-consuming manual work to intelligent automation
      </p>
    </div>

    {/* Two Column Layout */}
    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Problem Column */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-sm font-medium text-red-700">
          Traditional Challenges
        </div>

        {/* Problem Items */}
        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5">
            {/* X icon */}
          </svg>
          <p className="text-gray-700 font-medium">
            Hours spent on manual document review
          </p>
        </div>
      </div>

      {/* Solution Column */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700">
          mindlaw Solutions
        </div>

        {/* Solution Items */}
        <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-green-200 transition-colors">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5">
            {/* Check icon */}
          </svg>
          <p className="text-gray-900 font-medium">
            AI-powered document analysis in minutes
          </p>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-16">
      <button className="px-8 py-4 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-900 hover:scale-105 transition-all shadow-lg">
        See How It Works
      </button>
    </div>
  </div>
</section>
```

---

### 5. CTA Section

#### Design Requirements
- **Background:** Pure Black (#000000)
- **Text:** White with gray variants
- **Grid Pattern:** Subtle white grid overlay
- **Emphasis:** High contrast inversion from main sections

#### Visual Specifications
```
┌──────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                       │
│      Ready to Transform Your Legal Practice?        │
│                                                       │
│   Join leading law firms leveraging AI to deliver   │
│   exceptional outcomes. Request a demo today.        │
│                                                       │
│    [Request a Demo]    [Contact Sales]              │
│                                                       │
│   No credit card • Enterprise-ready • Onboarding    │
│                                                       │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Background Treatment:**
```css
Background: Black (#000000)
Grid Pattern:
  - Color: rgba(255,255,255,0.03)
  - Size: 64px × 64px
  - Opacity: 10%
```

**Section Headline:**
- Font: Playfair Display, 56px (text-5xl md:text-6xl), bold
- Color: White (#FFFFFF)
- Line Height: 1.2
- Margin Bottom: 24px (mb-6)
- Max Width: 896px (max-w-4xl)

**Section Subheadline:**
- Font: Inter, 20px (text-xl)
- Color: Gray-300 (#D4D4D4)
- Line Height: 1.7 (leading-relaxed)
- Margin Bottom: 48px (mb-12)

**CTA Buttons:**
- Layout: Horizontal flex, 16px gap
- Responsive: Stack on mobile (flex-col sm:flex-row)

Primary Button (Inverted):
- Background: White (#FFFFFF)
- Text: Black, 16px, font-medium
- Padding: 16px 40px (px-10 py-4)
- Border Radius: 8px (rounded-lg)
- Shadow: Extra large (shadow-xl)
- Hover: Background gray-100, scale 1.05

Secondary Button:
- Background: Transparent
- Text: White, 16px, font-medium
- Padding: 16px 40px (px-10 py-4)
- Border: 2px solid white
- Border Radius: 8px (rounded-lg)
- Hover: Background white/10, scale 1.05

**Trust Indicators (Bottom):**
- Font: Inter, 14px (text-sm)
- Color: Gray-400 (#A3A3A3)
- Margin Top: 32px (mt-8)
- Separator: Bullet points (•)

#### Animation Pattern
```typescript
// On scroll into view
Headline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }, delay 0ms
Subheadline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }, delay 100ms
Buttons: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }, delay 200ms
Trust Text: { opacity: 0 } → { opacity: 1 }, delay 400ms
```

#### Tailwind Implementation
```tsx
<section className="py-24 bg-black text-white relative overflow-hidden">
  {/* Grid Background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>

  <div className="container mx-auto px-6 relative z-10 max-w-7xl">
    <div className="max-w-4xl mx-auto text-center">
      {/* Headline */}
      <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">
        Ready to Transform Your Legal Practice?
      </h2>

      {/* Subheadline */}
      <p className="text-xl text-gray-300 mb-12 leading-relaxed">
        Join leading law firms and legal departments leveraging AI to deliver
        exceptional outcomes. Request a personalized demo today.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="px-10 py-4 bg-white text-black text-base font-medium rounded-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
          Request a Demo
        </button>
        <button className="px-10 py-4 bg-transparent text-white text-base font-medium rounded-lg border-2 border-white hover:bg-white/10 hover:scale-105 transition-all">
          Contact Sales
        </button>
      </div>

      {/* Trust Indicators */}
      <p className="mt-8 text-sm text-gray-400">
        No credit card required • Enterprise-ready • White-glove onboarding included
      </p>
    </div>
  </div>
</section>
```

---

### 6. Footer

#### Design Requirements
- **Background:** White (#FFFFFF)
- **Border:** Top border gray-200
- **Layout:** Multi-column link grid + bottom bar
- **Sections:** Brand, Platform, Solutions, Company, Legal

#### Visual Specifications
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│  Mind.Law        Platform    Solutions   Company  Legal│
│  Professional    Assistant   Law Firms   About    Privacy
│  class AI...     Research    In-House    Customers Terms │
│                  Documents   Litigation  Security Cookie │
│                  Workflows   Transact.   Careers  Comply │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  © 2025 Mind.Law          LinkedIn  Twitter  GitHub    │
└────────────────────────────────────────────────────────┘
```

#### Component Breakdown

**Main Footer Container:**
- Background: White (#FFFFFF)
- Border Top: 1px solid gray-200
- Padding: 64px vertical (py-16)

**Brand Column:**
- Width: Spans 1 column on large screens
- Logo: Same as navbar (text-3xl, font-medium)
- Tagline: Text-sm, gray-600, leading-relaxed
- Margin Bottom: 24px (mb-6)

**Link Columns:**
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 32px (gap-8)

Column Header:
- Font: Inter, 14px (text-sm), font-semibold
- Color: Black
- Margin Bottom: 16px (mb-4)

Links:
- Font: Inter, 14px (text-sm), regular
- Color: Gray-600
- Hover: Black
- Spacing: 12px vertical (space-y-3)
- Transition: Color 200ms

**Bottom Bar:**
- Border Top: 1px solid gray-200
- Padding Top: 32px (pt-8)
- Margin Top: 48px (mt-12)
- Layout: Flex row, space-between

Copyright Text:
- Font: Inter, 14px (text-sm)
- Color: Gray-600

Social Links:
- Font: Inter, 14px (text-sm)
- Color: Gray-600
- Hover: Black
- Spacing: 24px gap (gap-6)

#### Tailwind Implementation
```tsx
<footer className="bg-white border-t border-gray-200">
  <div className="container mx-auto px-6 py-16 max-w-7xl">
    {/* Main Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
      {/* Brand Column */}
      <div className="col-span-2 md:col-span-4 lg:col-span-1">
        <h3 className="text-3xl font-medium text-black mb-4">
          Mind<span className="text-gray-400">.</span>Law
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Professional-class AI built for the legal industry.
        </p>
      </div>

      {/* Link Column */}
      <div>
        <h4 className="font-semibold mb-4 text-sm text-black">Platform</h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Assistant
            </a>
          </li>
          {/* More links */}
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          © 2025 Mind.Law. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
            Twitter
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## Animation & Interaction Patterns

### Scroll-Based Animations

**Fade Up Pattern:**
```typescript
// Default entry animation for most content
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: 'easeOut' }
```

**Slide In From Sides:**
```typescript
// For Problem/Solution columns
Left side:  { opacity: 0, x: -50 } → { opacity: 1, x: 0 }
Right side: { opacity: 0, x: 50 } → { opacity: 1, x: 0 }
```

**Stagger Children:**
```typescript
// For card grids and lists
parent: {
  staggerChildren: 0.1  // 100ms delay between each child
}

child: {
  initial: { opacity: 0, y: 50 }
  animate: { opacity: 1, y: 0 }
  transition: { duration: 0.5 }
}
```

### Hover States

**Button Hover:**
```css
/* Primary Button */
default: bg-black, text-white
hover: bg-gray-900, scale-105
active: scale-95

/* Secondary Button */
default: bg-white, border-black-2px
hover: bg-gray-50, scale-105
active: scale-95

/* Inverted Button (CTA section) */
default: bg-white, text-black
hover: bg-gray-100, scale-105
active: scale-95
```

**Card Hover:**
```css
default:
  border: gray-200
  shadow: none
  icon: scale-100

hover:
  border: black
  shadow: shadow-xl
  icon: scale-110
  bottom-border: width 0 → 100%
```

**Link Hover:**
```css
/* Navigation Links */
default: text-gray-700
hover: text-black, underline animation (0 → 100% width)

/* Footer Links */
default: text-gray-600
hover: text-black
```

### Transition Durations

| Element | Duration | Easing |
|---------|----------|--------|
| **Button Hover** | 200ms | ease-out |
| **Card Border** | 300ms | ease-in-out |
| **Link Color** | 200ms | ease-out |
| **Icon Scale** | 300ms | ease-out |
| **Scroll Fade** | 600ms | ease-out |
| **Stagger Delay** | 100ms | - |

### Loading States

**Skeleton Pattern:**
```css
background: linear-gradient(
  90deg,
  gray-100 0%,
  gray-200 50%,
  gray-100 100%
)
animation: shimmer 2s infinite
border-radius: 8px
```

---

## Responsive Design Guidelines

### Breakpoint System

```typescript
// Tailwind default breakpoints
sm: 640px   // Mobile landscape, small tablets
md: 768px   // Tablets
lg: 1024px  // Small desktops, landscape tablets
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

### Component Responsive Behavior

**Navbar:**
```
Mobile (<768px):
  - Logo: text-xl
  - Nav Links: Hidden (hamburger menu recommended)
  - CTA: Full width or hidden

Tablet (768px - 1024px):
  - Logo: text-2xl
  - Nav Links: Visible, reduced spacing
  - CTA: Visible

Desktop (>1024px):
  - Logo: text-2xl
  - Nav Links: Full spacing
  - CTA: Visible
```

**Hero:**
```
Mobile (<640px):
  - Headline: text-4xl (36px)
  - Subheadline: text-lg (18px)
  - Buttons: Stacked vertically, full width
  - Trust indicators: Stacked

Tablet (640px - 1024px):
  - Headline: text-5xl (48px)
  - Subheadline: text-xl (20px)
  - Buttons: Side-by-side
  - Trust indicators: 2-column grid

Desktop (>1024px):
  - Headline: text-7xl (72px)
  - Subheadline: text-2xl (24px)
  - Buttons: Side-by-side
  - Trust indicators: 4-column flex
```

**Features Grid:**
```
Mobile (<768px):
  - 1 column (grid-cols-1)
  - Gap: 24px (gap-6)

Tablet (768px - 1024px):
  - 2 columns (md:grid-cols-2)
  - Gap: 32px (gap-8)

Desktop (>1024px):
  - 3 columns (lg:grid-cols-3)
  - Gap: 32px (gap-8)
```

**Problem/Solution:**
```
Mobile (<1024px):
  - Stacked layout (grid-cols-1)
  - Problem column first
  - Solution column second
  - Gap: 48px (gap-12)

Desktop (>1024px):
  - Side-by-side (lg:grid-cols-2)
  - Equal width columns
  - Gap: 48px (gap-12)
```

**Footer:**
```
Mobile (<640px):
  - 1 column (grid-cols-1)
  - All sections stacked
  - Social links stacked

Tablet (640px - 1024px):
  - 2 columns (md:grid-cols-2)
  - Brand full width
  - Social links horizontal

Desktop (>1024px):
  - 5 columns (lg:grid-cols-5)
  - Brand takes 1 column
  - Link sections 1 column each
  - Social links horizontal
```

### Container Padding

```css
/* Responsive padding pattern */
mobile:  px-6  (24px sides)
tablet:  px-8  (32px sides)
desktop: px-12 (48px sides) or container max-width constraint
```

### Typography Scaling

```css
/* Responsive headline scaling */
h1: text-4xl sm:text-5xl md:text-6xl lg:text-7xl
h2: text-3xl sm:text-4xl md:text-5xl
h3: text-2xl sm:text-3xl
body: text-base sm:text-lg
```

---

## Accessibility Requirements

### Color Contrast

All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text):

```
✓ Black text (#000000) on White background (#FFFFFF) = 21:1
✓ Gray-900 (#171717) on White (#FFFFFF) = 16.8:1
✓ Gray-700 (#404040) on White (#FFFFFF) = 10.3:1
✓ Gray-600 (#525252) on White (#FFFFFF) = 7.9:1
✓ White text (#FFFFFF) on Black background (#000000) = 21:1
✓ Gray-300 (#D4D4D4) on Black (#000000) = 8.6:1
```

### Focus States

All interactive elements must have visible focus indicators:

```css
/* Button Focus */
focus-visible:ring-2
focus-visible:ring-black
focus-visible:ring-offset-2
focus-visible:outline-none

/* Link Focus */
focus-visible:outline-2
focus-visible:outline-black
focus-visible:outline-offset-4
```

### Keyboard Navigation

- All interactive elements accessible via Tab
- Navbar links navigable with arrow keys (recommended)
- Skip to main content link for screen readers
- Modal/overlay elements trap focus

### ARIA Labels

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <button aria-label="Toggle navigation menu" aria-expanded="false">

<!-- Buttons -->
<button aria-label="Request a demo of mindlaw platform">

<!-- Links -->
<a href="#platform" aria-label="Jump to platform features section">

<!-- Icons -->
<svg aria-hidden="true" focusable="false">
<span class="sr-only">Checkmark indicating completed feature</span>
```

### Screen Reader Considerations

- Semantic HTML (header, nav, main, section, footer)
- Heading hierarchy (h1 → h2 → h3) without skipping levels
- Alt text for all decorative images (or aria-hidden="true")
- Loading states announced with aria-live regions
- Form labels explicitly associated with inputs

### Motion Preferences

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Notes

### Tailwind CSS 4 Configuration

**Update tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Framer Motion Best Practices

**Viewport Intersection Observer:**
```typescript
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ref = useRef(null);
const isInView = useInView(ref, {
  once: true,        // Animate only once
  margin: '-100px'   // Trigger 100px before element enters viewport
});
```

**Reduced Motion Support:**
```typescript
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

const variants = {
  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 },
  visible: { opacity: 1, y: 0 }
};
```

### Performance Optimization

**Image Loading:**
```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority={false}  // Only true for hero images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Lazy Loading Sections:**
```typescript
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});
```

### Code Organization

**Component File Structure:**
```
components/
├── Navbar.tsx
├── Hero.tsx
├── Features/
│   ├── index.tsx
│   ├── FeatureCard.tsx
│   └── features.data.ts
├── ProblemSolution/
│   ├── index.tsx
│   ├── ProblemItem.tsx
│   └── SolutionItem.tsx
├── CTA.tsx
└── Footer/
    ├── index.tsx
    ├── FooterColumn.tsx
    └── footerLinks.data.ts
```

**Shared Utilities:**
```typescript
// lib/animations.ts
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// lib/constants.ts
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    // ... rest of palette
  }
};
```

### Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Progressive Enhancement:**
- CSS Grid with flexbox fallback
- CSS custom properties with fallback colors
- IntersectionObserver with polyfill
- Framer Motion with reduced motion fallback

---

## Design Handoff Checklist

### Before Implementation
- [ ] Review all color values in design system
- [ ] Verify typography scales across breakpoints
- [ ] Confirm spacing values in layout system
- [ ] Test color contrast ratios
- [ ] Validate component states (hover, focus, active, disabled)
- [ ] Check animation timing and easing functions

### During Implementation
- [ ] Install exact font versions (Inter, Playfair Display)
- [ ] Configure Tailwind with custom color palette
- [ ] Set up Framer Motion with reduced motion support
- [ ] Implement all hover states as specified
- [ ] Add proper ARIA labels and semantic HTML
- [ ] Test keyboard navigation flow
- [ ] Verify responsive behavior at all breakpoints

### After Implementation
- [ ] Run Lighthouse accessibility audit (aim for 95+ score)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Validate HTML semantics
- [ ] Check color contrast with automated tools
- [ ] Test on mobile devices (iOS + Android)
- [ ] Verify animations respect prefers-reduced-motion
- [ ] Ensure all interactive elements have 44×44px touch targets
- [ ] Test page load performance (aim for <3s LCP)

---

## Design Rationale

### Why Black & White?

1. **Professional Authority** - Legal industry demands trust and precision; black and white convey seriousness and expertise
2. **Maximum Clarity** - High contrast ensures readability across all devices and lighting conditions
3. **Timeless Aesthetic** - Avoids trendy colors that may feel dated quickly
4. **Brand Differentiation** - Most legal tech uses blue/corporate colors; black/white stands out
5. **Content Focus** - Minimal color distractions keep attention on messaging and value proposition

### Typography Decisions

1. **Playfair Display for Headlines** - Serif font adds gravitas and sophistication appropriate for legal context
2. **Inter for Body Text** - Highly legible sans-serif optimized for screens, professional without being corporate
3. **Large Type Scales** - Bold, confident sizing conveys authority and makes scanning easier
4. **Generous Line Heights** - Legal content is dense; extra breathing room improves comprehension

### Layout Philosophy

1. **Generous Whitespace** - Prevents visual overwhelm, guides eye through content hierarchy
2. **Grid-Based Alignment** - Creates order and professionalism expected in legal services
3. **Card-Based Components** - Clear information grouping makes complex features digestible
4. **Section Alternation** - White → Gray-50 → White → Black creates rhythm and visual breaks

### Animation Strategy

1. **Subtle Entrance Animations** - Adds polish without distraction
2. **Scroll-Triggered Reveals** - Creates sense of discovery as user explores
3. **Stagger Delays** - Prevents overwhelming simultaneous motion
4. **Performance First** - CSS transforms and opacity only (GPU-accelerated)
5. **Respect User Preferences** - Honors prefers-reduced-motion for accessibility

---

## Next Steps for Development

1. **Phase 1: Foundation**
   - Update Tailwind configuration with new color palette
   - Verify font loading (Inter + Playfair Display)
   - Set up base animation utilities

2. **Phase 2: Component Updates**
   - Navbar: Update colors, refine hover states
   - Hero: Simplify background, update button styles
   - Features: Redesign cards with new border/shadow system
   - Problem/Solution: Update badge colors (red/green accent removal optional)
   - CTA: Invert to black background
   - Footer: Simplify to white background

3. **Phase 3: Polish**
   - Add all hover animations
   - Implement scroll-based reveal animations
   - Test responsive behavior
   - Accessibility audit and fixes

4. **Phase 4: Testing**
   - Cross-browser testing
   - Mobile device testing
   - Screen reader testing
   - Performance optimization

---

**End of Design Specification**

For questions or clarifications during implementation, reference this document's specific sections. All design decisions are documented with rationale to support consistent execution across the entire landing page.
