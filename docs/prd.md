# The Last Ember MVP PRD

## Product Summary

The Last Ember needs a welcoming online home for its small, mature, cooperative Enshrouded community. The site should help a prospective member understand the community's character, learn about Longkeep and its two areas, discover the Village Chronicle, check the existing server dashboard, and find the route to Discord when an invitation is configured.

The MVP is a responsive, static, single-page website. It is not a recruitment funnel, live game-status application, or content-management product.

## Goals

- Communicate the community's relaxed, kind, cooperative identity.
- Establish Longkeep, Old Town, and New Longkeep as the community's real shared setting.
- Give the Village Chronicle a maintainable initial presentation.
- Direct members to the existing Grafana dashboard.
- Make joining Discord easy once its real invitation URL is supplied.
- Deliver a polished, accessible site suitable for static Nginx hosting.

## Users And Needs

| User | Need |
| --- | --- |
| Curious Enshrouded player | Understand whether the community's pace, values, and style suit them. |
| New or returning member | Find the Discord invitation when available, server dashboard, and Chronicle. |
| Community organiser | Replace local image placeholders, set the Discord invitation, and add Chronicle entries without restructuring the page. |

## MVP Scope

### Hero

- Show `THE LAST EMBER`, the supplied tagline, and supplied supporting text.
- Create an atmospheric arrival feeling using a local placeholder image treatment and dark contrast overlay.
- Provide section navigation and a primary Discord call to action.

### Welcome To Longkeep

- Introduce Longkeep without inventing events or history.
- Present distinct Old Town and New Longkeep content.
- Reserve clear, documented local-image locations for genuine community screenshots.

### Our Community

- Explain friendship, kindness, cooperative exploration and building, individual creativity, personal homes, and no pressure to play or progress.
- Present the real-life-first principle in warm, non-corporate language.

### Village Chronicle

- Present `Week One - A Settlement Reborn`.
- Cover only the supplied week-one subjects: Old Town and New Longkeep, communal storage, Great Hall craftspeople, individual homes, frontier outposts, and new members.
- Read Chronicle content from local structured data, separate from the rendering module.

### Server Status

- Explain that the existing dashboard shows availability and performance history.
- Link `View Server Dashboard` to the supplied Grafana public dashboard in a new tab using safe external-link attributes.
- Do not show claimed live data, fabricated metrics, or a separate monitoring implementation.

### Join And Footer

- Close with `There's Always Room by the Fire`.
- Repeat the configurable Discord call to action.
- Include community branding, Discord and monitoring links, and the supplied Keen Games disclaimer.

## Confirmed Decisions

- The Discord invitation URL is unknown. A single local configuration value will own it. While it is unset, Discord calls to action must clearly communicate that an invitation is not yet available and must not link to a fabricated or empty URL.
- No approved community screenshots are currently available. The MVP will use clearly named local placeholders with replacement guidance. It will not hotlink or use unlicensed third-party game imagery.
- Supporting copy may be written only from facts in the supplied project brief. It must not add claims, members, testimonials, achievements, history, statistics, or live metrics.
- The current project has no test runner. The rendered homepage is the verification seam; TypeScript, Oxlint, the production build, and a documented manual accessibility and responsive check will verify this static MVP without adding test dependencies.
- The page will use the current React, TypeScript, Vite, and CSS stack with no added runtime or UI-library dependency.

## Functional Requirements

- All primary sections are reachable through keyboard-accessible in-page navigation.
- The page has a meaningful document title and meta description.
- A real, configured Discord URL opens through each Discord action; an absent URL is represented honestly.
- The Grafana URL opens in a separate tab.
- Chronicle entries are typed local data and can be added without modifying presentation markup.
- Image placeholders provide suitable alternative text and are straightforward to replace.

## Non-Functional Requirements

- Work on mobile, tablet, and desktop layouts.
- Use semantic landmarks, ordered headings, visible focus indicators, adequate contrast, and keyboard-operable navigation.
- Respect `prefers-reduced-motion`.
- Define reusable CSS custom properties for colour, spacing, typography, and shared layout values.
- Keep loading sensible: decorative imagery is non-critical, meaningful imagery has dimensions, and no external font or image request is needed.
- `npm run build` outputs a static `dist/` directory with no production Node.js runtime requirement.

## Out Of Scope

- Backend, database, CMS, authentication, member profiles, or admin interface.
- Live server-status fetching or monitoring infrastructure.
- A real-time Discord integration, Discord widget, or invented invite URL.
- Deployment, Nginx/VPS changes, GitHub Actions deployment configuration, and secrets.
- New Chronicle entries beyond the required initial entry.
- Fictional social proof, membership numbers, game statistics, or invented lore.

## Acceptance Criteria

1. A coherent single-page homepage contains Hero, Welcome to Longkeep, Our Community, Village Chronicle, Server Status, Join, and Footer sections.
2. The page reflects the specified charcoal, ember, parchment, and sage visual direction without resembling an esports or generic recruitment site.
3. Old Town and New Longkeep are distinct and image replacement locations are documented.
4. The only Chronicle entry is locally maintained structured data for the supplied week-one content.
5. The Grafana dashboard link is correct and opens in a new tab.
6. Discord destinations come from one configuration value and no invented invitation URL is rendered.
7. No invented statistics, testimonials, live metrics, member identities, or fictional events are displayed.
8. Keyboard navigation, focus treatment, semantic structure, text contrast, image alternative text, and reduced-motion behavior are checked manually.
9. `npm run lint` and `npm run build` pass using Node.js 24.
10. `dist/` is a deployable static output suitable for Nginx.

## Risks And Follow-Up Inputs

- The visual result will remain intentionally restrained until approved Longkeep screenshots are supplied. Replacing the placeholders is the main post-MVP visual-content task.
- A Discord invitation URL is needed before the primary join actions can become active links.
- Server dashboard access remains the responsibility of the existing Grafana public dashboard.
