# Project & Site Template Rules

## Site Concept
- **Purpose:** [e.g., A portfolio site for an IT website developer with a focus on showcasing site display and interactivity and graphics skills, and a strong emphasis on fluidity and lush heavily themed designs]
- **Required Pages / Sections:**
  - [Home / Landing page focused as an interactive introduction to the site and its purpose including main navigation to main sections]
  - [Hero section with clear call-to-action and sub-navigation to other sub-sections]
  - [Interactive feature showcase / gallery grid]
  - [About / Bio section with skills and experience]
  - [Resume / CV section]
  - [Contact form with validation and submission handling]
  - [Footer with social links and copyright]

## Tech Stack
- Build from scratch using **Vite + React + TypeScript + Tailwind CSS and required dependencies**.
- Use Libraries / Frameworks only if necessary (e.g., React, Vue, or Svelte for interactivity and decoration).
- Use lucide-react for icons, and avoid using/mixing any other icon libraries.

## Visual & Design Standards
- **Aesthetic / Vibe:** - [ Modern, lush, and professional with a focus on details, animations, decoration, and interactivity]
                        - [Avoid generic templates, stock images, and overused design patterns]
                        - [Keep a strict skeumorphic or realistic design style, avoiding flat or minimalistic approaches, while   keeping the design modern yet full of life and character]
                        - [Keep a consistent visual language across all pages, including color, typography, and spacing]
- **Color Palette:** Use a strict 3-color system (background, surface, and one bold accent color, all coherently distanced from pure white and black), with exceptions for special elements and specific buttons and highlights.
- **Typography:** Load two complementary Google Fonts in `index.html` (one display font for headings, one clean font for body text).
- **Content Rule:** Write realistic, domain-accurate copy for every section—never use "Lorem ipsum" or placeholder text. Avoid self referential links and recycled redirects to content on the same page. Avoid generic or vague content, and ensure all text is relevant to the site concept and purpose. Keep separated curriculum vitae content in dedicated sections, and avoid mixing it with other content. 
Ensure there is examples and displays of features and skills that are fully interactive.
- **Responsiveness:** Ensure layouts adapt cleanly to mobile, tablet, and desktop screens, ensure the interactivity to be fluid, dynamic and animated, and avoid static or rigid layouts.

## Build & Quality Check
- After creating all files, run `npm install` and `npm run build` in the terminal.
- Fix any TypeScript, CSS, or bundling errors until the build finishes with zero errors.