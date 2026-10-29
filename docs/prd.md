# The Last Ember Multi-Page Website PRD

## Product Summary

The Last Ember is a welcoming online home for a small, mature, cooperative Enshrouded community. This iteration evolves the existing static landing page into a small client-side website, giving Longkeep, its people, and the Village Chronicle appropriate room to grow without introducing a backend or content-management system.

The site remains a responsive React, TypeScript, Vite application deployed as static files. It is not a recruitment funnel, live game-status application, social network, or profile-management product.

## Goals

- Preserve the established charcoal, ember, parchment, and sage visual identity.
- Give visitors clear routes to the village, villagers, Chronicle, Discord, and external server monitoring.
- Present villager profiles as maintainable local data, ready for future individual profile pages.
- Keep the homepage a concise welcome rather than a duplicate of the full site.
- Support direct visits and browser refreshes at every route when served by Nginx.

## Users And Needs

| User | Need |
| --- | --- |
| Curious Enshrouded player | Understand the community's pace, settlement, people, and recent activity. |
| New or returning member | Find the village, Chronicle, Discord invitation when configured, and monitoring dashboard. |
| Community organiser | Add an approved screenshot, villager, or Chronicle entry locally without restructuring page markup. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | A concise introduction to The Last Ember. |
| `/village` | The fuller story of Longkeep, Old Town, New Longkeep, shared spaces, homes, and future outposts. |
| `/villagers` | The People of Longkeep gallery. |
| `/chronicle` | The Village Chronicle archive, initially containing Week One. |

Server Status remains the supplied external Grafana dashboard link and is not a route.

## Scope

### Shared Site Structure

- Use a persistent header, primary navigation, footer, shared Discord action, and established design tokens across every page.
- Mark the active internal navigation destination accessibly.
- Keep the Grafana destination external, opening in a new tab with safe link attributes and accessible disclosure.
- Preserve keyboard navigation, focus styling, responsive behavior, and reduced-motion support.
- Set a meaningful route-specific document title for every page.

### Home

- Retain the cinematic hero, supplied title, tagline, supporting copy, placeholder image, and Discord action.
- Give a short introduction to Longkeep with a route to `/village`.
- Preview villagers without presenting invented people; link to `/villagers`.
- Preview the latest Chronicle entry; link to `/chronicle`.
- End with the existing welcoming Discord invitation.
- Do not repeat detailed village descriptions, the full values grid, or the complete Chronicle article.

### The Village

- Move detailed Old Town and New Longkeep content from the current homepage to `/village`.
- Retain only established facts: restoration of Old Town; New Longkeep's Great Hall, storage, crafting facilities, and homes.
- Reserve documented local image locations for approved screenshots of settlement areas, buildings, homes, and frontier outposts.
- Do not invent settlement history, events, or lore.

### The People Of Longkeep

- Present the heading `The People of Longkeep` and subtitle `Every home has a story. Every adventurer has a place.`
- Render responsive, atmospheric profile cards from typed local data.
- Support a profile's stable future slug, display name, preferred class or playstyle, portrait, home image, house name or location, and optional biography or motto.
- Use clearly labelled profile placeholders until authentic member information and approved images are supplied. Do not invent names, personal details, classes, achievements, or homes.
- Cards should use layered local imagery, gradients, serif typography, and restrained hover treatment rather than rankings, statistics, or esports conventions.
- Design the data to support a future route such as `/villagers/inata`, without implementing individual profile routes in this iteration.

### Village Chronicle

- Move the complete Chronicle rendering to `/chronicle`.
- Feature `Week One - A Settlement Reborn` and only its supplied subjects: establishing Old Town and New Longkeep, communal storage, Great Hall craftspeople, individual homes, frontier outposts, and new members.
- Keep entries in typed local data so additional entries can be added without rewriting rendering markup.

## Confirmed Decisions

- Discord invitation configuration remains nullable and owned by one local configuration value. Its unavailable state must be honest and non-navigable.
- No approved community screenshots or villager details are available. Local, documented placeholders are required; external game imagery will not be hotlinked.
- React Router is the one justified new runtime dependency. No UI library, CMS, database, authentication, or server runtime is needed.
- Browser history routing requires the Nginx SPA fallback `try_files $uri $uri/ /index.html;` for direct navigation and refreshes. This project will document that requirement but will not modify production infrastructure.
- The existing project has no test runner. TypeScript, Oxlint, the production build, and manual route/accessibility/responsive checks remain the verification seam.

## Non-Functional Requirements

- Work on mobile, tablet, and desktop without horizontal overflow or unusable navigation.
- Use semantic landmarks, one ordered page heading, visible focus indicators, adequate contrast, and keyboard-operable controls.
- Respect `prefers-reduced-motion`.
- Define reusable CSS custom properties for colours, spacing, typography, and shared layout values.
- Build to a static `dist/` directory with no production Node.js runtime requirement.

## Out Of Scope

- Individual villager profile pages and dynamic `/villagers/:slug` route handling.
- Backend, database, CMS, authentication, member profiles, or an admin interface.
- Live server-status fetching, monitoring infrastructure, or fabricated metrics.
- A real-time Discord integration, Discord widget, or invented invite URL.
- Deployment, Nginx/VPS changes, GitHub Actions deployment configuration, secrets, pushing, or merging.
- Fictional social proof, membership numbers, game statistics, member identities, achievements, or fictional lore.

## Acceptance Criteria

1. `/`, `/village`, `/villagers`, and `/chronicle` render the requested distinct content under a shared header and footer.
2. Header navigation exposes current-page state and remains keyboard-operable on mobile and desktop.
3. Direct route loading and refresh work when Nginx uses the documented SPA fallback.
4. The homepage retains its hero but only previews village, villager, and Chronicle content.
5. The Village page distinguishes Old Town and New Longkeep without invented lore.
6. The Villagers page renders responsive, placeholder-safe cards from local typed data and does not implement profile detail routes.
7. Chronicle content remains local typed data, with Week One as the only entry.
8. Discord actions use one configuration value and the Grafana dashboard opens in a new tab.
9. Each page has an appropriate document title; semantic structure, focus treatment, contrast, image text alternatives, and reduced-motion behavior are checked manually.
10. `npm run lint` and `npm run build` pass using Node.js 24, and `dist/` remains deployable to Nginx.

## Follow-Up Inputs

- Approved Discord invitation URL.
- Approved Longkeep, home, and character portrait screenshots.
- Authentic villager display names, playstyles, home names/locations, and optional biographies or mottos.
