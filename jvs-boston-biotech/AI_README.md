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
2. **Vocabulary:** A searchable glossary of biopharma terminology.
3. **Study Materials:** In-depth reading materials powered by Markdown files.
4. **Knowledge Check:** A quiz system to test the user's understanding of the material.
5. **Localization (i18n) Ready:** Built-in support for multiple languages (English and Chinese structure exists, though Chinese content is currently using English placeholders).

## Project Structure
The application strictly separates data from UI components to make content updates easy.

```text
/src
  /components       # React components (UI, Layout, Views)
    MaterialView.tsx  # Renders markdown study materials
    VocabularyView.tsx # Renders categorized vocabulary terms
    ...
  /data             # Application data and content
    types.ts          # TypeScript interfaces for all data structures
    ui.ts             # UI string translations
    vocabulary.ts     # Groups vocabulary categories together
    process.ts        # Manufacturing stages and steps
    materials.ts      # Metadata for study materials (imports markdown)
    /materials        # Raw Markdown files for study content
      intro.md
      gmp.md
      facility.md
    /vocabulary       # Separated vocabulary files by category
      general.ts
      upstream.ts
      harvest.ts
      downstream.ts
      fill-finish.ts
```

## Key Architectural Decisions for AI/Developers

### 1. Markdown-Based Study Materials
Study materials are written in standard Markdown (`.md`) files located in `src/data/materials/`. 
- They are imported into `src/data/materials.ts` using Vite's `?raw` suffix (e.g., `import introContent from './materials/intro.md?raw';`).
- The `MaterialView.tsx` component uses `react-markdown` and Tailwind's `prose` class to render this raw string into styled HTML.
- **To add a new study material:** Create a new `.md` file in `src/data/materials/`, import it into `materials.ts`, and add a new entry to the `materialsEn` array.

### 2. Categorized Vocabulary
Vocabulary terms are separated into individual files based on their category (e.g., `upstream.ts`, `downstream.ts`) inside the `src/data/vocabulary/` folder.
- This removes the need to hardcode a `category` string on every single term.
- `src/data/vocabulary.ts` imports these individual files and groups them into `VocabularyCategory` objects.
- **To add a new vocabulary term:** Open the corresponding category file in `src/data/vocabulary/` and add the term to the array.

### 3. Centralized Data Layer
All content (UI strings, vocabulary, process steps, quiz questions) is stored in TypeScript files inside `src/data/`. 
- Do not hardcode text inside React components. Always pass data down via props or import it from the data layer.
- The `AppData` interface in `types.ts` defines the shape of the entire content payload.

### 4. Styling Guidelines
- Use Tailwind CSS utility classes for all styling.
- Avoid creating custom `.css` files.
- Use `lucide-react` for all icons.

### 5. Routing/Navigation
The app currently uses a simple state-based navigation system (e.g., tracking the `currentView` in the main App component) rather than a complex router like `react-router-dom`, keeping the architecture lightweight and focused on content delivery.
