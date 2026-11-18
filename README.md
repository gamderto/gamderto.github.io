# Jacofac

The official Jacofac website: an independent digital design and development
portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Getting started

```sh
npm install
npm run dev
```

Create and type-check the production build with:

```sh
npm run build
```

## Project structure

- `src/App.tsx` contains the page sections and their small, local interactions.
- `src/styles.css` defines the visual system, responsive layouts, and motion.
- `tailwind.config.js` holds the shared theme tokens for future utility-based
  styling.

The contact form validates in the browser and prepares an email draft in the
visitor's email application; it does not transmit or store form data.
