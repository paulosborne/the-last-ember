# The Last Ember Multi-Page Technical Design

## Architecture

Retain the existing Vite, React, TypeScript, and CSS application. Add React Router with browser-history routing; it is the minimal dependency that gives the four required URLs correct history, active navigation, and page-level metadata behavior.

The router is the routing seam. Route modules receive no URL concerns beyond their own content; `SiteLayout` owns shared chrome and renders the current page through an outlet. Content collections are separate seams because they vary independently from layout and rendering.

## Proposed Structure

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Define the route tree and shared site layout route. |
| `src/components/SiteHeader.tsx` | Render wordmark, responsive internal navigation, active route state, and the join action. |
| `src/components/SiteFooter.tsx` | Render community branding, configured Discord state, monitoring link, and disclaimer. |
| `src/components/DiscordAction.tsx` | Render the configured Discord action or its honest unavailable state. |
| `src/components/PageTitle.tsx` | Set title and optional description for the active route. |
| `src/components/VillagerCard.tsx` | Render a profile or clearly labelled placeholder from one villager record. |
| `src/pages/HomePage.tsx` | Render the concise hero and content previews. |
| `src/pages/VillagePage.tsx` | Render Longkeep, Old Town, New Longkeep, and future screenshot locations. |
| `src/pages/VillagersPage.tsx` | Render the People of Longkeep gallery. |
| `src/pages/ChroniclePage.tsx` | Render the Chronicle archive. |
| `src/content/chronicle.ts` | Hold typed Chronicle entries. |
| `src/content/villagers.ts` | Hold typed, placeholder-safe villager records. |
| `src/config/community.ts` | Hold nullable Discord configuration and the fixed Grafana URL. |
| `src/App.css` | Hold shared, layout, page, and card styles with responsive rules. |
| `src/index.css` | Hold global design tokens, reset, typography, focus treatment, and base styles. |
| `public/images/` | Hold documented local screenshot and profile-image placeholders. |

No router wrapper, page-specific header/footer variants, repository layer, or generic card framework is needed. Those would reduce locality without a concrete varying need.

## Routing

`BrowserRouter` will render a layout route with an index route and three child routes:

```text
/
|-- index             HomePage
|-- village           VillagePage
|-- villagers         VillagersPage
`-- chronicle         ChroniclePage
```

The Grafana dashboard remains an ordinary external anchor, not a route. No `/villagers/:slug` route is registered in this iteration; each record's `slug` is reserved for that future extension.

For direct requests such as `/village`, Nginx must serve `index.html` when no matching static asset exists:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

This is a deployment requirement only. It will be documented in the README or deployment handoff, not applied to infrastructure in this task.

## Content Models

The existing `ChronicleEntry` model remains the archive source. A new `VillagerProfile` model will have a small optional interface:

```ts
type VillagerProfile = {
  slug: string
  name?: string
  playstyle?: string
  portraitImage: string
  homeImage: string
  homeName?: string
  biography?: string
  motto?: string
  isPlaceholder?: boolean
}
```

The implementation will initially contain clearly identified placeholders only. The card module will centralise fallback labels, text alternatives, and image treatment so replacing a placeholder record with an authentic profile is a local data change.

## Homepage Refactor

The current hero transfers directly into `HomePage`. The detailed Old Town/New Longkeep card grid moves to `VillagePage`; the full values grid is reduced to introductory copy or removed from home; the full Chronicle article moves to `ChroniclePage`; and server-status explanation moves out of the homepage, leaving the external dashboard link in shared navigation/footer where appropriate.

Home will render a small village introduction, a deliberately limited villager teaser, and the latest Chronicle record selected from the typed collection. This avoids parallel copies of data and content.

## Visual And Accessibility Design

- Retain the current CSS custom-property palette, serif/sans typography, dark hero overlay, responsive spacing, focus indicator, and reduced-motion rule.
- Give each page a single `h1`; use `main`, `section`, `article`, `header`, `nav`, and `footer` landmarks appropriately.
- Use `NavLink` so active state is both visible and conveyed with `aria-current="page"`.
- Keep the skip link targeting the layout's main content container.
- Set route-specific document titles through a small page-title module; preserve the static default metadata in `index.html`.
- Render profile home images as supplementary visuals and portraits with descriptive placeholder alternatives until authentic image descriptions are provided.
- Restrict card motion to opacity, transform, and gradient changes, disabling it under reduced motion.

## Implementation Plan

1. Install React Router and introduce the route tree, layout, shared header/footer, shared Discord action, active states, and title handling.
2. Extract the existing hero into the concise home page; add route previews and remove detailed duplicate content.
3. Create Village and Chronicle pages from the existing data and settlement content.
4. Add the typed villager model, documented local placeholders, and responsive character-card gallery.
5. Document the Nginx history fallback, perform manual direct-route, keyboard, active-navigation, responsive, contrast, and reduced-motion checks.
6. Run lint and production build under Node.js 24, review the changes, and present them for approval without pushing, merging, or deploying.

## Verification Plan

| Check | Expected result |
| --- | --- |
| Every internal URL | Renders the intended page through client-side navigation and direct SPA entry. |
| Browser back/forward | Restores the expected route and active navigation state. |
| Keyboard only | Skip link, navigation, page links, and external actions have a logical order and visible focus. |
| Narrow viewport | Header navigation and villager gallery stay usable with no horizontal overflow. |
| Placeholder villagers | Explicitly communicate unavailable authentic information; no fabricated profile data is visible. |
| Discord URL absent/configured | Actions are respectively unavailable or link to the configured invitation. |
| Dashboard action | Opens the supplied public Grafana URL in a new tab. |
| Reduced motion | Nonessential transition and animation are removed or reduced. |
| `npm run lint` and `npm run build` | Complete successfully under Node.js 24. |
