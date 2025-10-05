# UI Mockup - mind.law Legal Document Editor

**Status**: ✅ Complete and Running
**URL**: http://localhost:3002
**Last Updated**: 2025-10-05

## Overview

This is a fully functional UI mockup of the mind.law legal document editor, showcasing the three-panel layout specified in the product requirements.

## Layout Structure

### 1. Left Sidebar (288px, collapsible to 64px)
**Color Scheme**: Dark theme (zinc-900 background, white text)

**Features**:
- ✅ mind.law branding (serif font)
- ✅ Collapsible toggle button
- ✅ "New Document" primary action button
- ✅ Navigation menu:
  - 📄 All Documents (active state shown)
  - ⭐ Favorites
  - 📋 Templates
  - 🗂️ Recent
- ✅ Recent Documents list with:
  - Document titles (truncated if too long)
  - Status badges (draft/in_review/finalized)
  - Last updated timestamp
  - Color-coded status indicators
- ✅ User profile section:
  - Avatar with initials
  - User name: "John Doe"
  - Role: "Attorney"

**Sample Documents Shown**:
1. Commercial Lease Agreement - Acme Corp (draft, 2 hours ago)
2. Service Contract - Tech Solutions Inc (in_review, 1 day ago)
3. Employment Agreement - Jane Doe (finalized, 3 days ago)

### 2. Center Panel - Document Editor (flex-1)
**Color Scheme**: White background with gray accents

**Top Bar**:
- Document title: "Commercial Lease Agreement - Acme Corp"
- Status badge: "Draft" (yellow)
- Version indicator: "Version 1.2"
- Auto-save status: "Saved" (green with pulse animation)

**Editing Toolbar**:
- Text formatting: Bold, Italic, Underline
- Headings: H1, H2
- Lists: Bullet, Numbered
- "AI Assistant" button (blue, prominent)

**Editor Area**:
- Large text area with serif font (Playfair Display)
- Sample content: Commercial Lease Agreement template
- Clean, distraction-free editing experience
- Full width up to 4xl container (896px)

**Status Bar** (bottom):
- Word count: 1,247 words
- Character count: 6,892 characters
- Last edited by: John Doe
- Jurisdiction: US-CA
- Practice area: Contract

### 3. Right Sidebar - AI Chat (384px, toggleable)
**Color Scheme**: White background with gray borders

**Header**:
- AI Assistant branding with gradient icon (purple to blue)
- Current provider display: "Powered by claude"
- Close button

**Provider Selector**:
- Dropdown with 3 options:
  - Claude (Anthropic) - selected
  - GPT-4 (OpenAI)
  - GLM-4
- Gray background section for visual separation

**Chat Messages**:
- Sample conversation showing:
  1. Welcome message from AI
  2. User question about rent escalation clauses
  3. AI response with legal information and citation
- User messages: Blue background (right-aligned)
- AI messages: Gray background (left-aligned)
- Provider indicator on AI messages (green dot)
- Citations shown inline with clickable links

**Actions on AI Messages**:
- Copy button
- "Insert into Document" button

**Input Area**:
- Multi-line textarea (3 rows)
- Placeholder: "Ask about legal clauses, citations, or drafting..."
- Send button (blue)
- Enter to send, Shift+Enter for new line

## Visual Design

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: White (#ffffff)
- **Accent**: Zinc-900 (#18181b)
- **Success**: Green-600 (saved indicator)
- **Warning**: Yellow-500 (draft status)
- **Info**: Blue-600 (in_review status)
- **Done**: Green-500 (finalized status)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code/Legal**: Monospace for citations

### Status Badge Colors
- **Draft**: Yellow background with yellow-800 text
- **In Review**: Blue background with blue-500 text
- **Finalized**: Green background with green-500 text

## Interactive Features (Mockup)

### Working Features:
- ✅ Sidebar collapse/expand
- ✅ AI chat panel toggle (via toolbar button)
- ✅ Text editing in main editor
- ✅ AI message sending (simulated response)
- ✅ Provider selection (updates UI)
- ✅ Close AI chat panel

### Placeholder Features (visual only):
- Document navigation (buttons visible but not wired)
- Version history (indicator shown)
- Citation links (displayed but not functional)
- Copy/Insert buttons (UI present)
- User profile menu

## Responsive Behavior

### Desktop (>1280px)
- All three panels visible
- Sidebar: 288px
- Editor: Flex-1 (remaining space)
- AI Chat: 384px

### Collapsed Sidebar
- Sidebar: 64px (icons only)
- Editor expands to use additional space

### No AI Chat
- Full width for editor when chat is closed
- Toggle button in toolbar to reopen

## Technical Implementation

### Framework
- **Next.js 15**: App Router with Server Components
- **React 19**: Client components with 'use client' directive
- **TypeScript 5.7**: Full type safety

### Styling
- **Tailwind CSS 4.x**: Utility-first CSS
- **Custom theme**: Extended with primary/secondary/accent colors
- **Font loading**: Next.js font optimization

### State Management
- **useState**: Local component state
- **Props**: Parent-child communication
- No global state needed for mockup

### Components Structure
```
app/page.tsx (entry point)
└── EditorLayout (orchestrator)
    ├── Sidebar (left panel)
    │   ├── NavItem
    │   └── DocumentItem
    ├── DocumentEditor (center panel)
    │   └── ToolbarButton
    └── AIChat (right panel)
        └── Message
```

## Next Steps for Production

### Phase 3.2 - Tests (Before Implementation)
1. Write contract tests for API endpoints
2. Write integration tests for user flows
3. Write security tests for RLS policies

### Phase 3.3 - Real Implementation
1. Replace textarea with Tiptap rich text editor
2. Connect to real Supabase backend
3. Integrate actual AI provider APIs
4. Implement document versioning
5. Add offline support with IndexedDB
6. Implement real-time collaboration

### Features to Add
- Document search and filtering
- Template instantiation flow
- Version history panel
- Export to PDF/DOCX
- User settings and preferences
- Keyboard shortcuts
- Drag-and-drop file upload
- Real-time collaboration cursors
- Comments and annotations

## Viewing the Mockup

**Local Development**:
```bash
cd /Users/tald/Projects/mindlaw
npm run dev
```

Then open: http://localhost:3002

**Build for Production**:
```bash
npm run build
npm start
```

## Screenshots

*To be added: Screenshots of each panel and key features*

## Feedback Collection

When showing this mockup to stakeholders, focus on:
1. ✅ Overall layout and visual hierarchy
2. ✅ Color scheme and branding
3. ✅ Information density
4. ✅ Interaction patterns (collapse, toggle)
5. ⏳ Missing features or desired improvements
6. ⏳ Usability concerns
7. ⏳ Legal workflow compatibility

---

**Mockup Status**: Ready for demonstration and stakeholder feedback
**Next Phase**: Write tests (Phase 3.2) before implementing real functionality
