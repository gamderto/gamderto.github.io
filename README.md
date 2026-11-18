# J. F. — Software, Spatial Systems & Field Notes

A responsive portfolio and curriculum vitae built with React, TypeScript and
Vite. Client-side navigation uses `HashRouter` so all pages work on GitHub Pages.

## Pages

- `/` — Intro sequence, technical overview, practice bio and quick routes.
- `/cv` — Education, Corageo experience, interactive skill matrix and print view.
- `/projects` — Filterable engineering case studies with selectable architecture
  layers. The cases are representative studies, not claims of deployed products.
- `/expeditions` — Interactive Java waypoint explorer and field notes.

## Development

```sh
npm install
npm run dev
npm run build
```

The home intro is shown once per browser session and can be skipped. The shared
footer contact form validates fields in the browser and prepares an email draft;
it does not transmit or store form data.
