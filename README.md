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

### The secret admin panel (for Ashley 🤫)

There are two ways in:

- Add `#admin` to the site URL, or
- Tap the little Colombian flag in the footer **5 times fast**

Inside the panel you can add new spots, rename them, edit their notes, toggle their
categories, and delete them. Edits preview instantly on the page behind the panel and are
saved as a draft on your device — nothing goes live until you hit **Publish to the site**.

Publishing requires a GitHub token (this is what keeps the panel actually secret — anyone
can open it, but only someone with the token can change the live site):

1. Get added as a collaborator on this repo (Settings → Collaborators)
2. Create a fine-grained token at
   [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new):
   scope it to **only this repository** with **Contents: Read and write** permission
3. Paste it into the field at the bottom of the panel — it's stored only in your
   browser's localStorage, never in the code

When you publish, the panel commits the updated list to the repo and the site redeploys
automatically within a minute or two.

### Editing the data directly

All places live in [`public/places.json`](public/places.json), fetched by the app at
runtime. Each entry looks like:

```json
{ "id": "qua-o-la", "name": "Qua o La", "categories": ["wine"], "note": "new wine bar" }
```

Multi-category is supported (e.g. Fools Errand is `["wine", "beer"]`). Edit the file and
push to `main` — filters, counts, and search update automatically after the deploy.

Hecho con amor para Ashley 💛💙❤️
