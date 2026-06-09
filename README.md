# HCL-CRAIGLIST

Mini Craigslist — interactive usability-redesign prototype (HCI term project).

A redesigned, clickable Craigslist NYC marketplace built as a single-page prototype:
all eight categories are browsable, listings open detail views, and filters,
favorites, compare, and search routing work end to end.

## Features

- **8 working categories:** Housing, Vehicles, For Sale, Jobs, Services, Community, Forums, Free Stuff
- Clickable listings with detail pages / modals
- Live filters (make/model, price, year, bedrooms, RAM, condition, …) with active-filter chips
- Favorites, laptop **Compare**, toast notifications
- Smart search routing from the home page
- **Back** button + browser history support
- SVG-generated artwork for every listing (no external images required)

## Run locally

```bash
npm start
# open http://localhost:4173
```

The prototype is fully static; `server.mjs` just serves the files. Icons load
from the Tabler Icons CDN, so an internet connection is needed for icons.

## Files

- `index.html` — markup / page structure
- `styles.css` — styles
- `app.js` — all interaction logic and demo data
- `server.mjs` — minimal static file server
- `data/listings.json` — sample listing data
