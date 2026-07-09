# Ashley's San Francisco 🌉🇨🇴

A curated, filterable guide to Ashley's favorite spots around San Francisco — wine bars,
breweries, cocktail lounges, speakeasies, restaurants, parks, and places still to explore.
Built as a modern single-page app with a clean editorial theme and un toquecito colombiano.

## Features

- **Category filtering** — animated chips for Wine, Beer, Cocktails & Vibes, Overall Vibes,
  Speakeasies, Restaurants, Nature & Scenic, and Places to Explore
- **Search** — instant fuzzy-ish text search across names and notes
- **"Been here" tracking** — tap the heart on any card; progress is saved in your browser
  (localStorage)
- **Smooth animations** — spring-based card entrances, layout transitions on filter, and
  hover lift, powered by Framer Motion
- **Colombian touch** — tricolor ribbon in flag proportions (2:1:1), warm palette, and a
  little Spanish sprinkled throughout

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for build & dev server
- [Framer Motion](https://motion.dev/) for animations
- Plain CSS with custom properties — no CSS framework

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # type-check + production build (outputs to dist/)
npm run preview    # serve the production build locally
npm run lint       # run oxlint
```

## Editing the list

All places live in [`src/data/places.ts`](src/data/places.ts). Each entry is one line:

```ts
place('Nopa', ['restaurants']),
place('Qua o La', ['wine'], 'new wine bar'),
place('Fools Errand', ['wine', 'beer']),   // multi-category is supported
```

Add, remove, or re-categorize places there and the filters, counts, and search update
automatically.

Hecho con amor para Ashley 💛💙❤️
