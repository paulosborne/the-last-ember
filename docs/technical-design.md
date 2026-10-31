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

## Experience Refinement Design

### Routes And Shared Modules

The route tree will add `/chronicle/:slug` for local typed Chronicle articles and a `*` route for a local not-found page. Individual villager routes remain out of scope.

`SiteHeader` will replace its horizontal-overflow mobile navigation with a keyboard-operable disclosure. The header remains the one navigation seam, retaining its active `NavLink` states, Grafana external link, and home join-link behavior.

The following modules are warranted because their content varies independently from page layout:

| Location | Responsibility |
| --- | --- |
| `src/components/PlaceCard.tsx` | Render one factual or clearly labelled placeholder Longkeep location. |
| `src/components/ArticleContent.tsx` | Render typed Chronicle editorial sections with semantic markup. |
| `src/pages/ChronicleArticlePage.tsx` | Resolve and render an article from its local slug. |
| `src/pages/NotFoundPage.tsx` | Provide an accessible recovery path for unknown routes. |
| `src/content/places.ts` | Hold typed Longkeep place records. |

### Content Models

`VillagerProfile` will add optional `title`, `houseLocation`, and future `ownerId` fields; all personal fields remain optional. `Place` records will have a stable slug, name, description, category, optional screenshots, optional contributor, and `isPlaceholder` marker.

Chronicle content will become an issue/article collection with a slug, issue number, publication date, excerpt, optional featured media, and typed sections. A section supports a heading, approved paragraphs, lists, and optional local image/caption metadata. The renderer will avoid interpretation or copy generation outside those fields.

The repository contains only the existing Week One summary and six high-level topics. The original Discord update or an approved editorial source is required before publishing the requested named contributions and detailed events. Until that source is supplied, the route may render only verified material and an explicit editorial placeholder.

### Implementation Sequence

1. Refine shared layout styles, focus/link states, mobile navigation, and the not-found route.
2. Improve Home hierarchy without duplicating the Village, Villager, or Chronicle content.
3. Add typed place data, `PlaceCard`, and `Around Longkeep` using placeholder-safe imagery.
4. Deepen the villager record and character-card composition while preserving unambiguous demonstration profiles.
5. Add Chronicle archive ordering, article routing, and a typed editorial renderer.
6. Update screenshot guidance and validate direct routes, keyboard operation, responsiveness, contrast, and reduced motion.

### Additional Verification

| Check | Expected result |
| --- | --- |
| Unknown URL | Renders the local not-found page rather than a blank screen. |
| Compact navigation | Opens and closes by keyboard, exposes its state, and causes no horizontal page overflow. |
| Place collection | Optional screenshots and contributor attribution render only when supplied. |
| Chronicle article | Archive ordering and article routes resolve matching local typed records. |

## Discord Authentication And Events Proposal

### Decision

Add a small same-origin TypeScript API process next to the existing static React application. Fastify is the preferred HTTP framework because it supplies a small, well-supported route/schema/plugin surface for OAuth callbacks, cookies, rate limiting, and REST APIs. Node 24's built-in `node:sqlite` is preferred over a native SQLite dependency; it remains release-candidate stability, so the supported runtime is pinned to Node `24.22.2` and its API is isolated behind a small repository layer. Drizzle is not initially justified because the schema is small, migrations can remain readable numbered SQL files, and query needs are straightforward.

The static Vite frontend remains responsible only for presentation and calls same-origin `/api` endpoints with cookies. It must never receive Discord client secrets, bot tokens, session-signing material, or OAuth tokens.

### Proposed Structure

| Location | Responsibility |
| --- | --- |
| `apps/api/src/server.ts` | Fastify server setup, safe error handling, request IDs, security plugins, and graceful shutdown. |
| `apps/api/src/auth/` | Discord OAuth start/callback, guild verification, session creation, logout, and member deletion. |
| `apps/api/src/events/` | Event validation, queries, authorization, transactional RSVP operations, and REST routes. |
| `apps/api/src/db/` | SQLite connection, transaction helpers, migration runner, and SQL repositories. |
| `apps/api/migrations/` | Ordered, committed, idempotent SQL migrations. |
| `apps/api/test/` | API, auth, authorization, migration, and RSVP-concurrency tests. |
| `src/api/` | Small typed browser fetch client for event/session endpoints only. |
| `src/pages/Events*.tsx` | Public listing/detail and protected create/edit route modules. |
| `src/components/EventCard.tsx` | Accessible village-noticeboard event summary. |
| `.env.example` | Non-secret environment variable names and local setup guidance. |

No Discord OAuth SDK is needed for one provider: native `fetch` can exchange codes and retrieve identity. Fastify JSON schemas validate HTTP inputs. Proposed additions at implementation time are Fastify, its cookie/rate-limit plugin(s), a TypeScript development runner, and a test runner; exact package versions will be pinned only after approval.

### Same-Origin Topology

Local WSL development uses Vite on `http://localhost:5173` and Fastify on a separate loopback port. Vite proxies `/api` to Fastify, so the browser always uses the Vite origin and cookies remain same-origin. The Discord callback registered for local development is `http://localhost:5173/api/auth/discord/callback`.

Production requires a supervised Node API process and an Nginx proxy before the SPA fallback:

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:3000;
}

location / {
  try_files $uri $uri/ /index.html;
}
```

This is a future deployment requirement, not an infrastructure change in this work. The SQLite file must live outside the release directory. This architecture remains suitable for one VPS and low write volume; it is not a multi-instance design.

### Discord OAuth And Membership Flow

1. `GET /api/auth/discord/start` creates a random state, PKCE verifier/challenge, and browser-bound transaction cookie; the server persists only short-lived transaction metadata and redirects to Discord.
2. Discord redirects to `GET /api/auth/discord/callback`. The server validates the state, transaction binding, expiry, and single use before exchanging the code.
3. The server requests only `identify`, obtains the Discord user ID/display name/avatar, and asks the Last Ember bot to look up that Discord ID in the configured guild.
4. On verified membership, the server upserts the member record by Discord ID, rotates to a new opaque session, clears the login transaction, and redirects to the frontend.
5. On failure, expiry, or missing guild membership, the server clears the transaction and returns a generic safe error. It never exposes Discord credentials or raw provider responses.

The bot token and guild ID are server environment values. The bot must already be a member of The Last Ember guild. Membership checks use the Discord guild-member REST endpoint. `identify` is the minimum OAuth scope because guild verification comes from the bot rather than the member's OAuth token.

### Database Schema

```text
members
  id TEXT PRIMARY KEY                 -- local UUID
  discord_id TEXT UNIQUE NULL
  display_name TEXT NULL
  avatar_hash TEXT NULL
  membership_status TEXT NOT NULL     -- verified, left, revoked, deleted
  verified_at TEXT NULL
  deleted_at TEXT NULL
  created_at TEXT NOT NULL
  updated_at TEXT NOT NULL

member_roles
  member_id TEXT NOT NULL REFERENCES members(id)
  role TEXT NOT NULL                  -- administrator
  assigned_by_member_id TEXT NULL REFERENCES members(id)
  assigned_at TEXT NOT NULL
  revoked_at TEXT NULL
  PRIMARY KEY (member_id, role, assigned_at)

sessions
  id_hash TEXT PRIMARY KEY
  member_id TEXT NOT NULL REFERENCES members(id)
  csrf_hash TEXT NOT NULL
  expires_at TEXT NOT NULL
  last_seen_at TEXT NOT NULL
  membership_verified_at TEXT NOT NULL
  revoked_at TEXT NULL
  created_at TEXT NOT NULL

oauth_login_transactions
  state_hash TEXT PRIMARY KEY
  transaction_cookie_hash TEXT NOT NULL
  pkce_verifier TEXT NOT NULL
  expires_at TEXT NOT NULL
  used_at TEXT NULL

events
  id TEXT PRIMARY KEY                 -- immutable UUID
  slug TEXT UNIQUE NOT NULL
  title TEXT NOT NULL
  description TEXT NOT NULL
  category TEXT NOT NULL
  starts_at_utc TEXT NOT NULL
  ends_at_utc TEXT NULL
  timezone TEXT NOT NULL              -- IANA name, default Europe/London
  max_participants INTEGER NULL CHECK (max_participants > 0)
  status TEXT NOT NULL                -- scheduled, cancelled, completed
  creator_member_id TEXT NOT NULL REFERENCES members(id)
  created_at TEXT NOT NULL
  updated_at TEXT NOT NULL

event_rsvps
  event_id TEXT NOT NULL REFERENCES events(id)
  member_id TEXT NOT NULL REFERENCES members(id)
  created_at TEXT NOT NULL
  PRIMARY KEY (event_id, member_id)

schema_migrations
  version TEXT PRIMARY KEY
  applied_at TEXT NOT NULL
```

Member deletion revokes sessions, removes RSVP rows, and revokes active role assignments before nulling the Discord ID, display name, and avatar reference. The non-identifying local member row remains for event history, and a later OAuth login creates a new row without historical privilege. A server-side administrative CLI bootstraps the first administrator and records role grants/revocations; browser-based role administration is deferred.

Sessions expire after 8 idle hours or 14 absolute days. Guild verification is cached for at most 15 minutes; event creation, edit, cancellation, and administrator writes trigger a fresh check when the last successful check is older than 5 minutes. SQLite uses WAL mode, foreign keys, a busy timeout, and short `BEGIN IMMEDIATE` write transactions. Numbered migrations run transactionally and are recorded in `schema_migrations`; they run once before an API restart, never implicitly during a request.

### REST Interface And Authorisation

| Method and path | Session | Rule |
| --- | --- | --- |
| `GET /api/me` | Optional | Return current member/session-safe data only. |
| `GET /api/events` | No | Return public scheduled upcoming events with attendee totals and availability. |
| `GET /api/events/:slug` | No | Return stable public detail for scheduled, cancelled, or completed events; attendee identities are omitted. |
| `GET /api/events/:slug/attendees` | Verified | Return attendee display details after RSVP privacy disclosure; deleted members appear as `Former member`. |
| `POST /api/events` | Verified | Validate and create an event; creator is session member. |
| `PATCH /api/events/:id` | Creator/admin | Validate and update; forbid unauthorised status changes. |
| `POST /api/events/:id/rsvps` | Verified | Transactionally RSVP the current member. |
| `DELETE /api/events/:id/rsvps/me` | Verified | Remove the current member RSVP. |
| `POST /api/auth/logout` | Authenticated | Revoke current session and clear cookie. |
| `DELETE /api/me` | Authenticated | Revoke sessions and start local data deletion. |

Event RSVP uses one short write transaction: load the scheduled event, reject a reached limit using an in-transaction count, insert the composite-key RSVP, and commit. A unique-key collision is a duplicate RSVP conflict. Cancellation/completion and membership-status checks happen inside the same authorization path. Event updates also use a short write transaction and reject any new participant limit lower than the active RSVP count; cancellation blocks new RSVPs while retaining the historical records.

### Security Controls

- OAuth state records expire after 10 minutes, are single use, and require the matching `HttpOnly`, `SameSite=Lax` transaction cookie. PKCE binds the authorization code exchange to the initiating server transaction.
- Session IDs and CSRF tokens use cryptographically secure random bytes. The cookie stores only the opaque session ID; SQLite stores its hash. Regenerate sessions after authentication, expire after 8 idle hours or 14 absolute days, and revoke on logout or failed membership recheck.
- All unsafe methods require an exact allowed `Origin`, a session-bound CSRF header token, JSON schema validation, and rate limiting by IP and session/member where present.
- Disable CORS for the browser API because it is same-origin. Use safe generic OAuth/API error messages and redact authorization headers, cookies, tokens, and secrets from logs.
- Validate timezone as an IANA value, UTC timestamps/end-after-start, category/status enums, string bounds, and normalized slugs server-side.
- Use HTTPS-only `Secure` cookies in production. Local HTTP is allowed only for `localhost` development.
- Back up the database on a documented schedule, restrict backup/database file permissions, test restore procedures, and monitor migration status.

### Discord Developer Portal: Local Setup

1. Create or select the Discord application. Copy the Application/Client ID; create a client secret only for the server environment.
2. Add exactly `http://localhost:5173/api/auth/discord/callback` as an OAuth2 redirect. `localhost` and `127.0.0.1` are distinct redirect values; register only the URL actually used.
3. Request the `identify` OAuth2 scope only. Do not enable implicit flow or expose a client secret in Vite configuration.
4. Create a bot for the application and add it to The Last Ember's guild with the least permissions needed to read a guild member through Discord's REST API. Do not grant administrator or message-management permissions for this feature.
5. Record the Discord guild ID, bot token, client ID, client secret, API session-secret material, and local API URL in an ignored local environment file. Commit `.env.example` with variable names only.
6. Verify WSL-to-browser localhost forwarding before testing OAuth, because the registered redirect URI must match the browser-visible origin exactly.

Required server-only variables: `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_GUILD_ID`, `DISCORD_BOT_TOKEN`, `SESSION_SECRET`, `DATABASE_PATH`, `APP_ORIGIN`, and `API_ORIGIN`.

### Incremental Implementation And Tests

1. Add environment hygiene, server workspace, migrations, local dev proxy, health check, and test runner.
2. Implement OAuth transaction/session/member lifecycle with mocked Discord HTTP tests for state, expiry, guild membership, logout, and missing/revoked membership.
3. Implement event schema, repository, authorization middleware, public list/detail, and event management endpoints with integration tests.
4. Implement transactional RSVP and concurrency tests that issue simultaneous joins against the final remaining space.
5. Add frontend session state, noticeboard event pages/cards/forms, protected-route UX, timezone formatting, and accessibility tests/manual checks.
6. Document the required production runbook for a supervised API process, `/api` proxy, TLS/cookie settings, patching, migration, monitoring, backup/restore, and Discord Scheduled Event source-of-truth decision. Do not deploy in this feature.

### Deferred Decisions

- Synchronising website events, reminders, or RSVPs to Discord Scheduled Events.
- Automatic mapping of Discord roles to organiser roles.
- Multiple guilds, recurring events, waitlists, notifications, calendar exports, image uploads, and event comments.
- Multi-host database operation, background jobs, and a managed database.

## Approved Issue #2 Amendment: Chronicle Markdown Design

This amendment supersedes earlier Chronicle route and typed-content design where they conflict. The route tree will use `/chronicles` and `/chronicles/:slug` as the canonical public archive and article routes. Client-side legacy handling redirects `/chronicle` to `/chronicles`; `/chronicle/:slug` redirects only to an existing published article, with drafts, fixtures, unknown canonical slugs, and unavailable legacy articles using the local not-found page. The archive sorts published records by date descending and renders an honest empty state; the homepage preview also remains empty-state safe. Week One has no public record until its source, date, and human publication approval are complete.

The build path will select only `content/chronicles/published/*.md` for the client bundle. `content/chronicles/drafts/` and `content/chronicles/fixtures/` are excluded from public imports and contain only repository-reader-safe material. Editorial evidence, private/raw Discord data, unapproved attribution, sensitive material, and Custodian records are separate from public Markdown. The Village Custodian has no publishing, deployment, or website-article modification authority.

`gray-matter` parses published frontmatter and `react-markdown` renders the Markdown body without raw HTML. Required frontmatter includes slug, title, summary, publication date, publication status, and publication-approval metadata; acknowledgements must be explicitly approved. The validation seam performs ordinary build-time checks for required fields, unique filename-matching slugs, valid calendar dates, approval metadata, approved acknowledgements, existing local cover assets, and safe link forms. Cover-only local images require alt text and may have captions; inline body images, HTML/MDX, embeds, and arbitrary components are deferred.

Planned verification includes tests for ordering, empty corpus, public filtering, canonical and legacy routing, invalid metadata diagnostics, and safe Markdown/link/cover rendering, plus manual accessibility and navigation checks. `npm run lint` and `npm run build` will remain required checks once implementation is approved. Implementation awaits UX approval.
