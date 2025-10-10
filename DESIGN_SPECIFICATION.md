# Mind.Law Editor - Design System Specification

## Executive Summary

This document provides comprehensive design specifications for the Mind.Law legal document editor mockup, aligned with the landing page design system at https://mind.law. The design follows a **minimalist black & white aesthetic** with professional typography, subtle animations, and clear visual hierarchy.

---

## 1. Design Philosophy

### Core Principles
- **Minimalist Elegance**: Pure black and white with subtle grays, no color gradients
- **Professional Authority**: Serif headings (Playfair Display) for gravitas, sans-serif body (Inter) for clarity
- **Subtle Sophistication**: Understated animations, clean borders, refined shadows
- **Functional Clarity**: Information hierarchy through typography and spacing, not color
- **Consistent Experience**: Seamless visual continuity from landing page to application

### Design Keywords
- Minimalist, Professional, Refined, Sophisticated, Clean, Authoritative, Timeless

---

## 2. Color Palette

### Primary Colors
```css
--black: #000000;           /* Primary text, buttons, borders */
--white: #FFFFFF;           /* Backgrounds, inverted text */
```

### Gray Scale (Neutral Palette)
```css
--gray-50: #FAFAFA;         /* Lightest backgrounds */
--gray-100: #F5F5F5;        /* Subtle backgrounds, hover states */
--gray-200: #E5E5E5;        /* Borders, dividers */
--gray-300: #D4D4D4;        /* Secondary borders */
--gray-400: #A3A3A3;        /* Placeholder text */
--gray-500: #737373;        /* Secondary text */
--gray-600: #525252;        /* Tertiary text */
--gray-700: #404040;        /* Dark secondary text */
--gray-800: #262626;        /* Very dark backgrounds */
--gray-900: #171717;        /* Darkest backgrounds, sidebar */
```

### Semantic Colors (Status/Feedback Only)
```css
--green-500: #22C55E;       /* Success states, "saved" indicator */
--green-600: #16A34A;       /* Success checkmarks */
--yellow-100: #FEF3C7;      /* Draft badge background */
--yellow-800: #92400E;      /* Draft badge text */
```

### Color Usage Rules
1. **NO color gradients** (remove purple/blue gradients from current design)
2. **Black & white dominance**: 90% of UI uses black, white, and grays
3. **Semantic colors sparingly**: Only for status indicators and feedback
4. **Borders**: Gray-200 (#E5E5E5) for most borders, Black for emphasis

---

## 3. Typography

### Font Families
```css
/* Primary Sans-Serif */
--font-sans: 'Inter', system-ui, sans-serif;

/* Display Serif (Headers) */
--font-serif: 'Playfair Display', Georgia, serif;

/* Monospace (Code/Legal Citations) */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale & Weights

#### Display/Headings (Playfair Display - Serif)
- **Display Large**: 72px / 700 / -0.02em (Hero only)
- **H1**: 36px / 700 / -0.01em / 1.2 line-height
- **H2**: 24px / 600 / -0.01em / 1.3 line-height
- **H3**: 20px / 600 / 0 / 1.4 line-height

#### Body/UI (Inter - Sans-Serif)
- **Body Large**: 18px / 400 / 0 / 1.75 line-height
- **Body**: 16px / 400 / 0 / 1.75 line-height
- **Body Small**: 14px / 400 / 0 / 1.6 line-height
- **Caption**: 12px / 500 / 0.02em / 1.4 line-height
- **Label**: 14px / 500 / 0 / 1.5 line-height

#### Document Content (Editor)
- **Document H1**: 32px / 700 / -0.01em / 1.2
- **Document H2**: 24px / 600 / 0 / 1.3
- **Document H3**: 20px / 600 / 0 / 1.4
- **Document Body**: 16px / 400 / 0 / 1.75 (relaxed reading)
- **Legal Citations**: 14px / 400 / mono / 1.6

### Typography Usage
- **Serif (Playfair)**: Logos, major headings, document titles
- **Sans (Inter)**: All UI, body text, navigation, buttons
- **Monospace**: Legal citations, code blocks, metadata

---

## 4. Spacing System

### Base Unit: 4px (0.25rem)

```css
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-16: 64px;  /* 4rem */
--space-20: 80px;  /* 5rem */
--space-24: 96px;  /* 6rem */
```

### Component Spacing
- **Section Padding**: 96px vertical (space-24)
- **Container Padding**: 24px horizontal (space-6)
- **Card Padding**: 32px (space-8)
- **Button Padding**: 12px 24px (space-3 space-6)
- **Input Padding**: 12px 16px (space-3 space-4)
- **Element Gaps**: 16px-24px (space-4 to space-6)

---

## 5. Shadows & Elevation

### Shadow System
```css
/* Subtle shadows - black with low opacity */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Elevation Layers
- **Level 0 (Flat)**: No shadow - default state
- **Level 1 (Hover)**: shadow-sm - interactive elements on hover
- **Level 2 (Cards)**: shadow-md - feature cards, panels
- **Level 3 (Dropdowns)**: shadow-lg - dropdown menus, tooltips
- **Level 4 (Modals)**: shadow-xl - modal dialogs, overlays
- **Level 5 (Popovers)**: shadow-2xl - context menus, critical overlays

---

## 6. Border Radius

### Radius Scale
```css
--radius-sm: 4px;    /* Small elements, badges */
--radius-md: 6px;    /* Buttons, inputs */
--radius-lg: 8px;    /* Cards, panels */
--radius-xl: 12px;   /* Large containers */
--radius-2xl: 16px;  /* Feature cards */
--radius-full: 9999px; /* Pills, avatars */
```

### Usage Guidelines
- **Buttons**: 6px (rounded-md)
- **Input Fields**: 6px (rounded-md)
- **Cards**: 16px (rounded-2xl)
- **Badges/Pills**: 9999px (rounded-full)
- **Panels**: 8px (rounded-lg)
- **Avatar**: 9999px (rounded-full)

---

## 7. Animation & Transitions

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);        /* Smooth exit */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);      /* Balanced */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy */
```

### Duration Scale
```css
--duration-fast: 150ms;     /* Micro-interactions */
--duration-normal: 300ms;   /* Standard transitions */
--duration-slow: 600ms;     /* Page entry animations */
```

### Animation Patterns

#### Hover States
```css
/* Standard hover - scale + shadow */
transition: transform 150ms ease-out, box-shadow 150ms ease-out;
transform: scale(1.02);
box-shadow: var(--shadow-md);
```

#### Entry Animations
```javascript
// Framer Motion pattern from landing page
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

#### Stagger Delays
- First element: 0.1s delay
- Subsequent elements: +0.1s increment
- Maximum delay: 0.6s

---

## 8. Component Design Specifications

### 8.1 Left Sidebar (Document Navigation)

#### Container
```css
background: #FFFFFF;              /* Changed from zinc-900 to white */
border-right: 1px solid #E5E5E5;  /* Gray-200 */
width: 288px;                     /* 18rem, collapsible to 64px */
```

#### Logo/Header
```css
font-family: 'Playfair Display', serif;
font-size: 24px;
font-weight: 600;
color: #000000;
padding: 16px 24px;
border-bottom: 1px solid #E5E5E5;

/* Logo format: Mind.Law with dot separator */
Mind<span style="color: #A3A3A3">.</span>Law
```

#### New Document Button
```css
background: #000000;
color: #FFFFFF;
padding: 12px 16px;
border-radius: 6px;
font-weight: 500;
font-size: 14px;
transition: all 150ms ease-out;

/* Hover state */
&:hover {
  background: #171717;  /* gray-900 */
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

#### Navigation Items
```css
/* Inactive state */
background: transparent;
color: #525252;        /* gray-600 */
padding: 8px 12px;
border-radius: 6px;
font-size: 14px;
transition: all 150ms ease-out;

/* Hover state */
&:hover {
  background: #F5F5F5;  /* gray-100 */
  color: #000000;
}

/* Active state */
&.active {
  background: #FAFAFA;  /* gray-50 */
  color: #000000;
  border-left: 2px solid #000000;
}
```

#### Document List Items
```css
background: transparent;
padding: 12px;
border-radius: 6px;
transition: all 150ms ease-out;

/* Hover state */
&:hover {
  background: #FAFAFA;  /* gray-50 */
}

/* Title */
font-size: 14px;
font-weight: 500;
color: #000000;

/* Status badge - minimal style */
padding: 2px 8px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;

/* Badge colors */
.draft {
  background: #FEF3C7;  /* yellow-100 */
  color: #92400E;       /* yellow-800 */
}

.in_review {
  background: #F5F5F5;  /* gray-100 */
  color: #525252;       /* gray-600 */
}

.finalized {
  background: #F0FDF4;  /* green-50 */
  color: #166534;       /* green-700 */
}
```

#### Section Headers
```css
font-size: 12px;
font-weight: 600;
color: #737373;        /* gray-500 */
text-transform: uppercase;
letter-spacing: 0.05em;
margin-bottom: 8px;
```

#### User Profile (Bottom)
```css
padding: 16px;
border-top: 1px solid #E5E5E5;

/* Avatar */
width: 40px;
height: 40px;
background: #000000;
color: #FFFFFF;
border-radius: 9999px;
font-size: 14px;
font-weight: 600;

/* Name */
font-size: 14px;
font-weight: 500;
color: #000000;

/* Role */
font-size: 12px;
color: #737373;  /* gray-500 */
```

---

### 8.2 Center Panel (Document Editor)

#### Toolbar/Header
```css
background: #FFFFFF;
border-bottom: 1px solid #E5E5E5;
padding: 12px 24px;

/* Document title */
font-family: 'Playfair Display', serif;
font-size: 20px;
font-weight: 600;
color: #000000;

/* Status badge */
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;
background: #FEF3C7;
color: #92400E;
```

#### Editor Toolbar (Tiptap Controls)
```css
background: #FAFAFA;        /* gray-50 */
border-bottom: 1px solid #E5E5E5;
padding: 8px 16px;
display: flex;
gap: 4px;

/* Button group styling */
button {
  padding: 6px 10px;
  border-radius: 4px;
  background: transparent;
  color: #525252;           /* gray-600 */
  transition: all 150ms ease-out;
}

button:hover {
  background: #E5E5E5;      /* gray-200 */
  color: #000000;
}

button.active {
  background: #000000;
  color: #FFFFFF;
}

/* Divider between groups */
.divider {
  width: 1px;
  height: 24px;
  background: #E5E5E5;
  margin: 0 8px;
}
```

#### Document Content Area
```css
background: #FFFFFF;
max-width: 896px;         /* 56rem - optimal reading width */
margin: 0 auto;
padding: 64px 48px;       /* Generous reading padding */

/* Prose styling */
font-family: 'Inter', sans-serif;
font-size: 16px;
line-height: 1.75;
color: #171717;           /* gray-900 */

/* Selection highlight */
::selection {
  background: rgba(0, 0, 0, 0.1);
}
```

#### Status Bar (Bottom)
```css
background: #FAFAFA;      /* gray-50 */
border-top: 1px solid #E5E5E5;
padding: 8px 24px;
font-size: 12px;
color: #737373;           /* gray-500 */

/* Separator dots */
.separator {
  color: #D4D4D4;         /* gray-300 */
}

/* Saved indicator */
.saved {
  color: #16A34A;         /* green-600 */
  display: flex;
  align-items: center;
  gap: 6px;
}

.saved-dot {
  width: 8px;
  height: 8px;
  background: #16A34A;
  border-radius: 9999px;
  animation: pulse 2s infinite;
}
```

#### AI Assistant Toggle Button
```css
/* REMOVE gradient - use solid black */
background: #000000;
color: #FFFFFF;
padding: 8px 16px;
border-radius: 6px;
font-size: 14px;
font-weight: 500;
transition: all 150ms ease-out;

&:hover {
  background: #171717;    /* gray-900 */
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

---

### 8.3 Right Panel (AI Chat)

#### Container
```css
background: #FFFFFF;
border-left: 1px solid #E5E5E5;
width: 384px;             /* 24rem */
display: flex;
flex-direction: column;
```

#### Header
```css
padding: 16px;
border-bottom: 1px solid #E5E5E5;

/* Title */
font-size: 16px;
font-weight: 600;
color: #000000;

/* Provider subtitle */
font-size: 12px;
color: #737373;           /* gray-500 */

/* Icon container - REMOVE gradient */
width: 32px;
height: 32px;
background: #000000;
border-radius: 6px;
color: #FFFFFF;
```

#### Provider Selector
```css
background: #FAFAFA;      /* gray-50 */
border-bottom: 1px solid #E5E5E5;
padding: 16px;

/* Label */
font-size: 12px;
font-weight: 500;
color: #525252;           /* gray-600 */
text-transform: uppercase;
letter-spacing: 0.05em;

/* Select dropdown */
background: #FFFFFF;
border: 1px solid #E5E5E5;
border-radius: 6px;
padding: 8px 12px;
font-size: 14px;
color: #000000;

&:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}
```

#### Message Bubbles

**User Messages**
```css
background: #000000;
color: #FFFFFF;
padding: 12px 16px;
border-radius: 12px 12px 4px 12px;  /* Sharp corner bottom-right */
max-width: 85%;
margin-left: auto;
font-size: 14px;
line-height: 1.6;
```

**Assistant Messages**
```css
background: #F5F5F5;      /* gray-100 */
color: #171717;           /* gray-900 */
padding: 12px 16px;
border-radius: 12px 12px 12px 4px;  /* Sharp corner bottom-left */
max-width: 85%;
margin-right: auto;
font-size: 14px;
line-height: 1.6;

/* Provider indicator */
.provider-badge {
  font-size: 11px;
  color: #737373;         /* gray-500 */
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.provider-dot {
  width: 6px;
  height: 6px;
  background: #16A34A;    /* green-600 */
  border-radius: 9999px;
}
```

**Citations**
```css
border-top: 1px solid #E5E5E5;
margin-top: 12px;
padding-top: 12px;

.citation-label {
  font-size: 11px;
  font-weight: 600;
  color: #525252;         /* gray-600 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.citation-link {
  font-size: 12px;
  color: #000000;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;

  &:hover {
    text-decoration-thickness: 2px;
  }
}
```

#### Action Buttons (Copy, Insert)
```css
font-size: 12px;
color: #737373;           /* gray-500 */
padding: 4px 8px;
border-radius: 4px;
transition: all 150ms ease-out;

&:hover {
  background: #F5F5F5;    /* gray-100 */
  color: #000000;
}
```

#### Input Area
```css
background: #FFFFFF;
border-top: 1px solid #E5E5E5;
padding: 16px;

/* Textarea */
textarea {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;

  &::placeholder {
    color: #A3A3A3;       /* gray-400 */
  }

  &:focus {
    outline: none;
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }
}

/* Send button */
button {
  background: #000000;
  color: #FFFFFF;
  padding: 12px;
  border-radius: 6px;
  transition: all 150ms ease-out;

  &:hover:not(:disabled) {
    background: #171717;  /* gray-900 */
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

---

## 9. Interactive States

### Button States (Primary Black)
```css
/* Default */
background: #000000;
color: #FFFFFF;
transform: scale(1);

/* Hover */
background: #171717;      /* gray-900 */
transform: scale(1.05);
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Active/Pressed */
transform: scale(0.95);

/* Disabled */
background: #E5E5E5;      /* gray-200 */
color: #A3A3A3;           /* gray-400 */
cursor: not-allowed;
```

### Button States (Secondary/Outline)
```css
/* Default */
background: #FFFFFF;
color: #000000;
border: 2px solid #000000;

/* Hover */
background: #FAFAFA;      /* gray-50 */
border-color: #000000;
transform: scale(1.05);

/* Active */
transform: scale(0.95);
```

### Input States
```css
/* Default */
border: 1px solid #E5E5E5;
background: #FFFFFF;

/* Hover */
border-color: #D4D4D4;    /* gray-300 */

/* Focus */
border-color: #000000;
box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
outline: none;

/* Error */
border-color: #DC2626;    /* red-600 */
box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
```

### Card/Panel Hover
```css
/* Default */
border: 1px solid #E5E5E5;
box-shadow: none;

/* Hover */
border-color: #000000;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
transform: translateY(-2px);
transition: all 300ms ease-out;
```

---

## 10. Accessibility

### Focus Indicators
```css
/* Keyboard focus - visible ring */
&:focus-visible {
  outline: 2px solid #000000;
  outline-offset: 2px;
}

/* Remove focus for mouse users */
&:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast
- **Black on White**: 21:1 (AAA - Excellent)
- **Gray-900 on White**: 16.1:1 (AAA)
- **Gray-600 on White**: 7.2:1 (AA Large)
- **Gray-500 on White**: 4.7:1 (AA - Minimum)

### ARIA Labels
- All interactive elements have aria-labels
- Icon-only buttons include descriptive labels
- Form inputs have associated labels
- Status messages use aria-live regions

---

## 11. Grid & Layout

### Container System
```css
.container {
  max-width: 1280px;      /* 80rem */
  margin: 0 auto;
  padding: 0 24px;        /* space-6 */
}

/* Breakpoints */
@media (min-width: 640px)  { padding: 0 32px; }
@media (min-width: 1024px) { padding: 0 48px; }
```

### Editor Layout Grid
```css
/* Three-column layout */
display: grid;
grid-template-columns: 288px 1fr 384px;  /* sidebar | editor | chat */
height: 100vh;

/* Collapsed sidebar */
grid-template-columns: 64px 1fr 384px;

/* Hidden chat */
grid-template-columns: 288px 1fr;
```

---

## 12. Icons & Illustrations

### Icon System
- **Library**: Heroicons (outline style preferred)
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Stroke Width**: 1.5px (medium weight)
- **Color**: Inherit from parent text color

### Icon Usage
```css
/* Standard icon */
.icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
  color: currentColor;
}

/* Icon in button */
.icon-button {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

---

## 13. Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Editor Responsive Behavior
- **< 768px**: Stack panels vertically, collapsible sidebar
- **768px - 1024px**: Sidebar + Editor OR Editor + Chat (toggle)
- **> 1024px**: Full three-panel layout

---

## 14. Loading & Empty States

### Loading Spinner
```css
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #E5E5E5;
  border-top-color: #000000;
  border-radius: 9999px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F5F5F5 25%,
    #E5E5E5 50%,
    #F5F5F5 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 6px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Empty States
```css
.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: #737373;         /* gray-500 */
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  color: #D4D4D4;         /* gray-300 */
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #171717;         /* gray-900 */
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: #737373;         /* gray-500 */
}
```

---

## 15. Scroll Behavior

### Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### Custom Scrollbars
```css
/* Webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #FAFAFA;    /* gray-50 */
}

::-webkit-scrollbar-thumb {
  background: #D4D4D4;    /* gray-300 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A3A3A3;    /* gray-400 */
}
```

---

## 16. Special Effects

### Grid Background (Like Landing Page)
```css
.grid-background {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 4rem 4rem;
  pointer-events: none;
}
```

### Underline Animation (Navigation)
```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 300ms ease-out;
}

.nav-link:hover::after {
  width: 100%;
}
```

### Card Bottom Line Animation
```css
.feature-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 500ms ease-out;
}

.feature-card:hover::after {
  width: 100%;
}
```

---

## 17. Implementation Checklist

### Phase 1: Color System
- [ ] Remove all purple/blue gradients
- [ ] Replace with black/white/gray palette
- [ ] Update sidebar from zinc-900 to white
- [ ] Update all borders to gray-200 (#E5E5E5)
- [ ] Update text colors to black/gray hierarchy

### Phase 2: Typography
- [ ] Apply Playfair Display to logo and headings
- [ ] Apply Inter to all UI text
- [ ] Update font sizes per type scale
- [ ] Adjust line heights for readability

### Phase 3: Components
- [ ] Redesign sidebar with white background
- [ ] Update navigation items with subtle hover states
- [ ] Redesign AI Assistant button (remove gradient)
- [ ] Update chat panel header (remove gradient icon)
- [ ] Refactor message bubbles (black for user, gray-100 for assistant)

### Phase 4: Spacing & Layout
- [ ] Apply 4px spacing system
- [ ] Update padding/margins per specifications
- [ ] Ensure consistent gap spacing
- [ ] Optimize editor content width (896px max)

### Phase 5: Interactions
- [ ] Implement subtle hover animations
- [ ] Add underline navigation effects
- [ ] Apply scale transforms on buttons
- [ ] Add focus indicators for accessibility

### Phase 6: Polish
- [ ] Custom scrollbars
- [ ] Loading states
- [ ] Empty states
- [ ] Responsive breakpoints
- [ ] Final accessibility audit

---

## 18. Code Examples

### Tailwind CSS Classes (Quick Reference)

#### Sidebar
```jsx
<aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
  <div className="p-4 border-b border-gray-200">
    <h1 className="text-xl font-serif font-semibold">
      Mind<span className="text-gray-400">.</span>Law
    </h1>
  </div>

  <button className="mx-4 mt-4 px-4 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-900 hover:-translate-y-0.5 hover:shadow-md transition-all">
    New Document
  </button>

  <nav className="flex-1 p-4 space-y-1">
    <button className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black rounded-md transition-colors">
      All Documents
    </button>
  </nav>
</aside>
```

#### AI Assistant Button
```jsx
<button className="px-4 py-2 bg-black text-white text-sm rounded-md font-medium hover:bg-gray-900 hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-2">
  <ChatIcon className="w-4 h-4" />
  AI Assistant
</button>
```

#### Message Bubble (User)
```jsx
<div className="flex justify-end">
  <div className="max-w-[85%] px-4 py-3 bg-black text-white rounded-xl rounded-br-sm text-sm">
    {message.content}
  </div>
</div>
```

#### Message Bubble (Assistant)
```jsx
<div className="flex justify-start">
  <div className="max-w-[85%]">
    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
      claude
    </div>
    <div className="px-4 py-3 bg-gray-100 text-gray-900 rounded-xl rounded-bl-sm text-sm">
      {message.content}
    </div>
  </div>
</div>
```

---

## 19. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E5E5E5;
  --color-gray-300: #D4D4D4;
  --color-gray-400: #A3A3A3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 20. Final Notes

### Key Design Changes from Current Mockup
1. **Remove all color gradients** - Replace purple/blue with solid black
2. **White sidebar** - Change from dark zinc-900 to clean white
3. **Refined borders** - Use consistent gray-200 (#E5E5E5)
4. **Typography hierarchy** - Serif for headings, sans for body
5. **Subtle animations** - Scale, translate, and underline effects
6. **Professional badges** - Minimal colored pills for status

### Design Rationale
- **Black & White Foundation**: Creates timeless, professional aesthetic matching legal industry expectations
- **Serif Headlines**: Playfair Display adds authority and sophistication
- **Minimal Color**: Semantic colors only where functionally necessary
- **Generous Spacing**: Breathing room improves focus and readability
- **Subtle Interactions**: Professional polish without distraction

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Considerations
- Use CSS transforms for animations (GPU-accelerated)
- Implement lazy loading for document lists
- Debounce scroll events
- Optimize font loading with `font-display: swap`

---

## Contact & Resources

**Design System Source**: https://mind.law
**Landing Page Codebase**: `/Users/tald/Projects/mindlaw/mindlaw-landing/`
**Editor Mockup**: `/Users/tald/Projects/mindlaw/app/`
**Figma Reference**: [Link to design files if available]

---

*This specification document ensures pixel-perfect consistency between the Mind.Law landing page and the legal document editor application. All measurements, colors, and behaviors are derived from the production landing page design system.*

**Version**: 1.0
**Last Updated**: 2025-10-05
**Design System**: Mind.Law Black & White Minimalist
