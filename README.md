# Smart Travel Planner (Express + EJS)

A server-rendered travel planning website built with Express + EJS, with client-side JavaScript for interactive itinerary generation and live weather lookups.

## What the website does

The homepage lets a user:

- Enter a destination, budget, and number of days
- Choose a travel style and interests
- Generate a multi-day itinerary with time-of-day suggestions
- See destination suggestions while typing
- Fetch live weather for the chosen destination (via Open-Meteo APIs)
- Click featured destination cards to auto-fill the planner
- Save personal notes alongside the generated itinerary

## How it works (high level)

- Server-side rendering (SSR): Express renders the initial HTML via EJS so the page loads fast and predictably.
- Client-side interaction: `public/script.js` handles form actions, itinerary generation, destination suggestions, and weather calls.
- Static assets: CSS and JS are served from `public/` by Express.

## Run locally

```powershell
npm install
npm start
```

Open `http://localhost:3000`.

## Dev mode (auto-reload)

```powershell
npm install
npm run dev
```

## Website feature walkthrough (manual test)

Use this checklist to verify the site is working:

1. Load `/` and confirm the page renders with styling.
2. Type in Destination and confirm you see suggestions.
3. Fill Budget + Days, then submit to generate the itinerary cards.
4. Confirm weather appears for the selected destination.
5. Click a destination card (Paris/Tokyo/Bali/New York) and confirm it auto-fills and generates a plan.
6. Click a travel tip and confirm it appends into the notes area.

## Website development plan

This is a practical plan for building and evolving the site in a structured way.

### Phase 1: Foundation (current)

- Establish Express server and SSR entry route (`GET /`).
- Render the homepage from an EJS template.
- Serve static assets from `public/`.

### Phase 2: Core planner experience

- Form validation and user input UX (required fields, constraints, helpful messaging).
- Itinerary generation algorithm:
  - Allocate daily budget guidance
  - Choose activities based on travel style and interest
  - Produce a consistent time-of-day structure (morning/afternoon/evening)
- Notes area:
  - Keep user notes independent from regenerated itineraries
  - Support quick-add notes from tips and cards

### Phase 3: Destination intelligence

- Improve suggestions:
  - Better ranking and matching (prefix matches first, fuzzy matches later)
  - Show country/region in suggestion items if available
- Expand curated destination presets and attraction sets.
- Add an “Explore” section flow:
  - Clicking a destination card should set all inputs and scroll to the planner

### Phase 4: Live weather and resiliency

- Weather integration:
  - Geocoding search for destination -> lat/lon
  - Forecast fetch with current conditions + daily highs/lows
  - Display loading, success, and error states
- Reliability:
  - Handle “no results” destinations gracefully
  - Handle network/API failures without breaking the rest of the page

### Phase 5: Server-rendered upgrades (optional)

These upgrades keep the site “SSR-first” while preserving interactivity:

- Render featured destinations from server data (EJS loop) instead of hardcoding HTML.
- Add shareable URLs:
  - Example: `/plan?destination=Paris&days=3&budget=1200`
  - Server renders the page with pre-filled values; client JS hydrates and generates on load.

### Phase 6: Production readiness (optional)

- Security headers (e.g. via `helmet`) and sensible caching for static assets.
- Basic automated checks:
  - lint formatting
  - a smoke test that asserts `/` returns 200
- Deployment:
  - `npm start` as the production entrypoint
  - PORT set via environment (`process.env.PORT`)

## Project structure

- `server.js`: Express server and routes
- `views/index.ejs`: SSR page template
- `public/styles.css`: Site styling
- `public/script.js`: Client-side functionality (itinerary + suggestions + weather)
