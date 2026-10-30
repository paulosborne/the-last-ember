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

## Experience Refinement Scope

This refinement preserves the existing visual identity and client-side architecture. It improves editorial hierarchy, responsive navigation, the Village content model, profile-card presentation, and Chronicle publishing without adding a backend or rebuilding the site.

### Global Experience

- Improve the shared layout's spacing rhythm, readable line lengths, heading scale, button/link affordance, active navigation, focus states, and mobile behavior.
- Replace the horizontally scrolling mobile navigation with an accessible compact navigation control.
- Add a graceful not-found page for unknown client routes.
- Retain the established charcoal, ember, parchment, sage, and editorial serif/sans visual system.

### Home Refinement

- Retain the cinematic hero and its local Longkeep panorama placeholder, ready for an approved wide screenshot.
- Clarify that Longkeep is rebuilt and expanded around its ruins, with a direct Village-page action.
- Retain two placeholder-safe villager previews and one latest-Chronicle preview.
- Preserve the closing Discord call to action and do not render an invitation URL until configured.

### Village Record

- Present Old Town and New Longkeep as large, concise visual records.
- Add a data-driven `Around Longkeep` collection. A place supports a name, description, category/location, optional screenshots, and optional contributor attribution.
- Initially render only factual, clearly labelled placeholders for Great Hall, Communal Storage, Crafting Workshops, individual homes, and Frontier Outposts. Do not attach a contributor, achievement, or unverified detail until approved.
- Keep the model extensible to future settlements and locations without an interactive map or database.

### Villager Showcase

- Improve card composition around large portraits, layered home imagery, restrained gradients, clear editorial typography, and reduced-motion-safe hover treatment.
- Extend the profile model for an optional title/nickname, house location, and future ownership identifier while retaining placeholder-safe data.
- Clearly distinguish demonstration placeholders from authentic profiles. No real member facts will be represented until supplied.

### Chronicle Publication

- Treat `/chronicle` as a reverse-chronological issue archive and add article routes such as `/chronicle/week-one`.
- An issue supports issue number, slug, publication date, title, excerpt, optional featured media, and a local article body formed from sections, paragraphs, lists, optional images/captions, and acknowledgements.
- The archive will link to individual articles; articles will provide a readable editorial layout and a route back to the archive.
- The existing Week One summary is the only approved Chronicle source currently in the repository. The requested original update details, including Quick Slot Storage, named contributions, northern-outpost discussion, building spotlights, update compatibility, and closing acknowledgements, must be supplied before a complete Week One article can be published. The implementation must not infer or invent those details.

## Additional Acceptance Criteria

1. Unknown routes render a clear local not-found page with a route back home.
2. Mobile navigation opens and closes from a keyboard-operable control without horizontal page overflow.
3. `Around Longkeep` renders from typed local data and supports optional screenshots and contributor attribution without fabricated details.
4. Chronicle archive entries are reverse chronological and link to typed local article records.
5. The Week One article route is present, but any content not represented in approved local source material is explicitly held for inclusion rather than fabricated.

## Authenticated Events Proposal

### Product Summary

The Events feature gives verified Last Ember members a low-pressure place to arrange exploration, Shroud expeditions, boss encounters, resource gathering, collaborative building, and informal social time. It complements Discord rather than replacing it: joining is optional, leaving requires no explanation, and real life always comes first.

Public visitors can browse scheduled events. Discord-authenticated, verified members can create events, RSVP, and withdraw. Event creators can edit or cancel their own events, and administrators can manage every event.

### New Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/events` | Public | Browse upcoming scheduled events. |
| `/events/:slug` | Public | Read one event, attendee total, availability, and status. |
| `/events/new` | Verified member | Create an event. |
| `/events/:eventId/edit` | Creator or administrator | Edit or cancel an event. |

The `new` static route takes precedence over the public slug route. Public links use stable human-readable slugs; mutation endpoints and edit routes use immutable event IDs.

### Discord Authentication

- Use Discord OAuth2 authorization-code flow with PKCE and only the `identify` scope.
- Retrieve Discord ID, current display name, and avatar data. The Discord ID is the sole external identity key; display names are never unique identifiers.
- Verify guild membership server-side with a dedicated bot account using the configured Discord guild ID. This avoids requesting the OAuth `guilds` scope and allows protected requests to detect a member who has left the server.
- Create or update a local member record after successful verification; do not retain Discord access or refresh tokens after identity retrieval.
- Establish an opaque server-side session with an 8-hour idle expiry and 14-day absolute expiry. Logout revokes the session. Protected requests accept guild verification cached for at most 15 minutes; event creation, edit, cancellation, and administrator writes require a verification no older than 5 minutes. A failed check revokes the local session and marks membership unavailable.
- Discord does not provide an OAuth-grant revocation webhook. Revoking an OAuth grant invalidates previous Discord tokens but does not prevent a member from authorising a future login; local sessions are instead bounded by their expiry and server-side guild membership rechecks.
- Public Discord invitations remain separate from account login and are not treated as authentication.

### Events And Attendance

An event records an immutable ID, unique slug, title, description, category, UTC start, optional UTC end, IANA display timezone, optional participant limit, creator member ID, status, and creation/modification timestamps. The initial UI defaults to `Europe/London`; UTC persistence and IANA timezone formatting preserve daylight-saving correctness.

- Status is one of `scheduled`, `cancelled`, or `completed`.
- Verified members can join once, withdraw at any time, see participants, and see availability.
- Visitors see scheduled upcoming events in the list and can open a stable direct URL for scheduled, cancelled, or completed events. Attendee identities are never public.
- Verified members see the current Discord display name and avatar of other attendees only after an explicit RSVP disclosure in the interface. A deleted member is rendered as `Former member`.
- The server rejects duplicate RSVPs, RSVPs to non-scheduled events, and full-event RSVPs. Limits are enforced transactionally, not in browser state.

### Permissions

| Actor | Browse | View attendee names | RSVP | Create | Edit/cancel own | Manage all |
| --- | --- | --- | --- | --- | --- | --- |
| Visitor | Yes | No | No | No | No | No |
| Verified member | Yes | Yes | Yes | No | No | No |
| Event creator | Yes | Yes | Yes | Yes | Yes | No |
| Administrator | Yes | Yes | Yes | Yes | Yes | Yes |

Administrators are explicit local assignments by Discord ID, not inferred from display names or automatically synchronised Discord roles. A server-side administrative CLI bootstraps the first administrator and grants/revokes administrator access; role changes are auditable and are not exposed as a browser feature in this release. Verified members do not need a role to create events.

### Data And Privacy

- Store only Discord ID, current display name, avatar reference, membership state, and role assignments needed for this feature.
- Never store Discord OAuth access or refresh tokens after login.
- Members can request account deletion. The system revokes sessions, removes active role assignments and RSVPs, nulls the Discord ID, display name, and avatar reference, and preserves only the non-identifying local member ID needed by event history. A later login creates a new member record with no inherited roles.
- SQLite backups are encrypted or access-restricted, retained on a documented schedule, and tested through restore drills.

### Non-Functional And Security Requirements

- All permission checks and capacity checks run on the server.
- OAuth state is one-time, short-lived, bound to the initiating browser, and validated before exchanging a code.
- Session identifiers are random opaque values; only their hashes are stored. Cookies are `HttpOnly`, `SameSite=Lax`, scoped to the API, and `Secure` under HTTPS.
- State-changing endpoints require an origin check and CSRF token; validation errors are safe and actionable while internal failures are logged without secrets.
- Authentication and write routes are rate limited. Input is schema validated server-side. Event writes use short SQLite transactions with a busy timeout and retry-safe conflict responses.
- Event updates are transactional. A participant limit cannot be reduced below the current RSVP count; cancellation prevents new RSVPs while retaining history, and time or description changes remain visible to existing participants without any obligation to attend.
- Events are accessible with semantic, keyboard-operable noticeboard-style cards and responsive forms. Local times state their timezone clearly.

### Out Of Scope And Future Discord Integration

- Discord Scheduled Event publishing, attendee synchronisation, reminders, role synchronisation, and Discord authentication ownership of villager profiles are deferred.
- The website database is the initial event and RSVP source of truth. A future Discord integration should choose exactly one RSVP source before synchronisation is enabled; preferred options are either a website event linking to a Discord Scheduled Event without duplicate attendance, or Discord as the source of truth with read-only website display.
- Approval of this feature supersedes the earlier static-only constraint for the Events surface only. A production release remains blocked until an owner accepts the API process, `/api` proxy, TLS/patching, monitoring, migration, and backup/restore runbook; this planning task does not configure any infrastructure.

### Events Acceptance Criteria

1. Public users can list and read scheduled events without a session.
2. Discord login verifies guild membership using server-held credentials and creates or updates the local member by Discord ID.
3. OAuth state, PKCE, secure session expiry, logout, and revoked/left-member handling have automated server tests.
4. Only verified members can RSVP; duplicate RSVP, full event, cancelled event, and concurrent capacity races return safe conflict responses.
5. Verified members can create events; creators can edit/cancel their own; administrators can manage all; each rule is enforced and tested server-side.
6. Event times persist as UTC and display correctly in Europe/London through daylight-saving transitions.
7. Event data, RSVPs, and sessions use committed SQL migrations and SQLite backups have a documented restore procedure.
8. No OAuth secret, bot token, session secret, or user token is emitted to the browser, committed, or logged.
