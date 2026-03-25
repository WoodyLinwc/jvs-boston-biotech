# AI_README: Biopharma Training App

## Project Overview

This is a React-based educational web application designed to teach users about biopharmaceutical manufacturing processes, Good Manufacturing Practices (GMP), and facility design. It serves as an interactive study guide and knowledge-check tool.

## Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with `@tailwindcss/typography` for Markdown rendering)
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **Markdown Rendering:** `react-markdown`

## Core Features

1. **Process Stages:** Interactive breakdown of biopharma manufacturing stages (Upstream, Harvest, Downstream, Fill-Finish). Each stage includes specific steps and key terms.
2. **Vocabulary:** A searchable, categorized glossary of biopharma terminology (General, Upstream, Harvest, Downstream, Fill/Finish, Lab Supplies).
3. **Study Materials:** In-depth reading materials powered by Markdown files.
4. **Quiz:** Navigation and view are wired up — content implementation is pending.
5. **Class Materials:** Navigation and view are wired up — PDF upload implementation is pending.
6. **Localization (i18n) Ready:** Built-in support for multiple languages (English and Chinese structure exists, though Chinese content is currently using English placeholders).

## Project Structure

The application strictly separates data from UI components to make content updates easy.

```text
/src
  /components             # React components (UI, Layout, Views)
    MaterialView.tsx        # Renders markdown study materials
    VocabularyView.tsx      # Renders categorized, searchable vocabulary terms
    ProcessView.tsx         # Renders process stage steps and key terms
    QuizView.tsx            # Quiz view — currently shows a coming soon state
    PdfMaterialsView.tsx    # Class materials view — currently shows upload placeholder
  /data                   # Application data and content
    types.ts                # TypeScript interfaces for all data structures
    ui.ts                   # UI string translations
    vocabulary.ts           # Assembles vocabulary categories from individual files
    stages.en.ts            # Manufacturing stage and step content
    quiz.ts                 # Quiz question data
    materials.ts            # Metadata for study materials (imports markdown)
    /materials              # Raw Markdown files for study content
      intro.md
      gmp.md
      facility.md
    /vocabulary             # One file per vocabulary category
      general.ts
      upstream.ts
      harvest.ts
      downstream.ts
      fill-finish.ts
      lab-supplies.ts
```

## Key Architectural Decisions for AI/Developers

### 1. Markdown-Based Study Materials

Study materials are written in standard Markdown (`.md`) files located in `src/data/materials/`.

- They are imported into `src/data/materials.ts` using Vite's `?raw` suffix (e.g., `import introContent from './materials/intro.md?raw';`).
- The `MaterialView.tsx` component uses `react-markdown` and Tailwind's `prose` class to render this raw string into styled HTML.
- **To add a new study material:** Create a new `.md` file in `src/data/materials/`, import it into `materials.ts`, and add a new entry to the `materialsEn` array.

### 2. Categorized Vocabulary

Vocabulary terms are separated into individual files based on their category inside `src/data/vocabulary/`. Current categories: `general`, `upstream`, `harvest`, `downstream`, `fill-finish`, `lab-supplies`.

- This removes the need to hardcode a `category` string on every single term.
- `src/data/vocabulary.ts` imports these individual files and groups them into `VocabularyCategory` objects.
- **To add a new vocabulary category:** Create a new file in `src/data/vocabulary/`, export a `VocabularyTerm[]` array, then import it in `vocabulary.ts` and add a new entry to `vocabularyEn`.
- **To add a new term to an existing category:** Open the corresponding file in `src/data/vocabulary/` and add the term to the array.

### 3. Centralized Data Layer

All content (UI strings, vocabulary, process steps, quiz questions) is stored in TypeScript files inside `src/data/`.

- Do not hardcode text inside React components. Always pass data down via props or import it from the data layer.
- The `AppData` interface in `types.ts` defines the shape of the entire content payload.
- UI label strings (including nav item names) live in `src/data/ui.ts` under the `UIStrings` interface. Adding a new nav item requires adding its string there first.

### 4. Navigation / Tab System

The app uses a simple state-based navigation system in `App.tsx` — a single `activeTab` state string determines which view renders. There is no router library.

- The `Tab` union type in `App.tsx` covers all valid tab IDs: `StageId | MaterialId | 'vocabulary' | 'quiz' | 'pdf-materials'`.
- **To add a new top-level view:** (1) add its ID to the `Tab` type, (2) add a `NavButton` entry in the appropriate sidebar section, (3) create the view component, (4) add a conditional render in `<main>`.
- Nav items are rendered via a reusable `NavButton` component defined inside `App.tsx` to keep the sidebar DRY.
- The sidebar has three sections: **Study Materials**, **Process Stages**, and **Self Learning**. Currently under Self Learning: Vocabulary, Quiz, Class Materials.

### 5. Pending Implementations

Two views are structurally present but not yet functional:

- **`QuizView.tsx`** — Shows a "Coming Soon" empty state. When implementing, wire in questions from `src/data/quiz.ts` and replace the empty state with the quiz UI. The full quiz interaction logic already exists in the codebase as a reference (see the original `QuizView` in git history or `quiz.ts` for question data shape).
- **`PdfMaterialsView.tsx`** — Shows a drag-and-drop upload zone shell and a greyed-out example file list. When implementing, wire up file input handling, storage (local or cloud), and the file list rendering.

### 6. Styling Guidelines

- Use Tailwind CSS utility classes for all styling.
- Avoid creating custom `.css` files.
- Use `lucide-react` for all icons.

### 7. Responsive Design

The app is fully responsive across mobile (≥320px), tablet (≥768px), and desktop (≥1024px) without horizontal scrolling. Key patterns used:

- **Sidebar layout (`App.tsx`):**
  - The sidebar is hidden on mobile and replaced with a slide-down overlay menu triggered by a hamburger button.
  - On `md` (768px+) the sidebar is `w-64`; on `lg` (1024px+) it widens to `w-72`. The main content area adjusts with matching `md:ml-64 lg:ml-72`.
  - `overflow-x-hidden` is set on the root container to prevent any horizontal scroll bleed.
  - Nav items use `truncate` on their labels and `shrink-0` on icons to prevent layout breaking.

- **Process view (`ProcessView.tsx`):**
  - Stacks vertically (`flex flex-col`) on mobile and tablet. Switches to a 3-column CSS Grid only at `lg` (1024px+).
  - Key Terms cards use a 2-column sub-grid at `sm` (640px+) to avoid excessive vertical space on tablet.

- **Vocabulary view (`VocabularyView.tsx`):**
  - The header row stacks vertically on mobile, switching to a side-by-side layout at `sm`.
  - Filter chips use `whitespace-nowrap` and wrap naturally via `flex-wrap` — no horizontal scroll required.
  - Term cards use a single column on mobile and 2 columns from `sm` up.
  - Category badges use `shrink-0` to prevent them from crushing the term title on narrow screens.

- **Material view (`MaterialView.tsx`):**
  - Padding scales progressively: `p-4` (mobile) → `p-6` (sm) → `p-8` (md) → `p-10` (lg).
  - Prose uses `prose-sm` on mobile and `prose-base` on `sm+` for comfortable reading at all sizes.

- **Quiz and Class Materials views (`QuizView.tsx`, `PdfMaterialsView.tsx`):**
  - All padding, icon sizes, and button sizes are scaled using `sm:` prefixes.
  - Empty state cards are centered with `min-h-64` to avoid collapsed layouts on large screens.

- **General Tailwind breakpoint reference used throughout:**
  | Prefix | Min-width |
  |--------|-----------|
  | `sm` | 640px |
  | `md` | 768px |
  | `lg` | 1024px |
