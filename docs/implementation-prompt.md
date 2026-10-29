# Project: The Last Ember — Community Website MVP

You are acting as a senior frontend engineer, UI/UX designer and technical architect.

Your task is to design and implement the first version of **The Last Ember**, a community website for a small, friendly Enshrouded gaming community.

You are working inside an existing Git repository containing a React, TypeScript and Vite application.

## 1. Project Background

The Last Ember is a relaxed, mature, cooperative PvE community playing Enshrouded.

Our community focuses on friendships, exploration, creativity, cooperative building and enjoying the game at our own pace.

We are not a competitive gaming clan, hardcore progression guild or formal roleplaying community.

Our philosophy is:

**"Real life comes first. The adventure will always be here."**

Our settlement is based around Longkeep, a ruined settlement in Embervale that we're gradually restoring and expanding.

There are two main areas:

**Old Town**
The original ruins of Longkeep, where players restore abandoned buildings and bring forgotten streets back to life.

**New Longkeep**
Our growing settlement outside the ruins, featuring a communal Great Hall, shared storage, crafting facilities and individual player homes.

Our community has already begun creating unique buildings, including a treehouse, restored ruins and individual cottages.

We also publish a community newsletter called **The Village Chronicle**, celebrating what members have been building and experiencing together.

## 2. Working Approach

Before implementing anything:

1. Inspect the existing repository, dependencies and project configuration.
2. Create a concise Product Requirements Document at `docs/prd.md`.
3. Document MVP scope, user needs, functional requirements, non-functional requirements, exclusions and acceptance criteria.
4. Produce a brief proposed technical design and implementation plan.
5. Present your proposed approach and wait for approval before making implementation changes.

Once approved, implement the MVP in small, logical increments.

Do not replace the existing project with an unrelated scaffold.

Preserve the existing React, TypeScript and Vite setup.

Use Node.js 24.

## 3. MVP Requirements

Build a visually appealing, responsive, single-page community website.

### Section A — Hero

A cinematic, atmospheric landing section.

Title:

**THE LAST EMBER**

Tagline:

*Every great story begins with a single spark.*

Supporting text:

"A home for adventurers. A village built together."

Include:

- A prominent Discord invitation button.
- Navigation to other homepage sections.
- A large atmospheric background image.
- A subtle dark overlay to maintain text readability.

The hero should feel like arriving at a warm medieval settlement after a long journey.

### Section B — Welcome to Longkeep

Introduce our settlement and its history.

Include two distinct areas:

**Old Town:** The ancient settlement, where ruined buildings are being restored.

**New Longkeep:** Our growing village, featuring shared facilities and player-owned homes.

Design this section to accommodate screenshots from our actual Enshrouded world.

Keep the content grounded in our community rather than inventing fictional events or history.

### Section C — Our Community

Explain what makes The Last Ember different.

Highlight these values:

- Friendship and kindness.
- Cooperative exploration and building.
- Individual creativity and personal homes.
- No pressure to play or progress.
- Real life always comes first.

Use warm, natural language rather than corporate marketing copy.

### Section D — Village Chronicle

Introduce our weekly community newsletter.

Feature an initial article:

**Week One — A Settlement Reborn**

Summarise our first week:

- Establishing Old Town and New Longkeep.
- Improving communal storage.
- Relocating craftspeople into the Great Hall.
- Creating individual homes.
- Beginning our network of frontier outposts.
- Welcoming new community members.

For the MVP, the content may be stored locally in a TypeScript or JSON data structure.

Avoid introducing a database, CMS or backend.

Structure the content so additional Chronicle entries can be introduced later without rewriting the UI.

Do not invent news, members or achievements.

### Section E — Server Status

Create a simple section introducing our existing server monitoring dashboard.

Explain that members can check server availability and performance history.

Provide a button labelled:

**View Server Dashboard**

Link to:

https://wisebedroom2511.grafana.net/public-dashboards/0f5d5d5db12748068a5f2a4582df5db4

Open the dashboard in a new tab.

Do not invent live server metrics or implement a separate monitoring backend.

### Section F — Join Our Community

A welcoming closing section encouraging visitors to join our Discord.

Suggested heading:

**There's Always Room by the Fire**

Include a Discord link placeholder that can be configured later.

Do not invent a Discord invitation URL.

### Footer

Include community branding, Discord and monitoring links, and the following disclaimer:

"An independent Enshrouded community. Not affiliated with Keen Games."

## 4. Visual Design Requirements

The website should feel like an atmospheric medieval frontier settlement.

Think:

- Ancient stone buildings.
- Timber-framed houses.
- Warm torchlight.
- Crackling fireplaces.
- Forests and wilderness.
- A village gradually being restored.
- A safe refuge within a dangerous world.

It should feel cinematic, mature, welcoming and authentic.

Avoid a generic gaming/esports appearance.

### Colour palette

Use these colours as a starting point:

- Charcoal: `#171A19`
- Ember orange: `#C66D36`
- Parchment: `#E6D7BA`
- Sage green: `#6D7860`

Define reusable CSS custom properties for colours, spacing and typography.

### Typography

Use a distinctive but readable serif font for headings and a clean sans-serif font for body content.

Typography should feel atmospheric without compromising usability.

### Images

Use local image assets and provide clearly documented placeholders where genuine community screenshots are unavailable.

Do not hotlink unrelated artwork or use copyrighted game imagery from external websites without suitable permission.

Make replacing placeholders straightforward.

### Visual quality

Prioritise:

- Strong visual hierarchy.
- Elegant typography.
- Generous spacing.
- Atmospheric imagery.
- Subtle animation.
- Responsive layouts.
- High-quality mobile presentation.

Avoid unnecessary visual effects, excessive animations and generic UI component libraries.

## 5. Technical Requirements

Use the existing technology stack:

- React
- TypeScript
- Vite
- CSS

Prefer native browser features and straightforward React patterns.

Do not introduce additional dependencies unless there is a clear technical justification.

No Tailwind, Next.js, backend framework, CMS or database is required for this MVP.

Use semantic HTML and accessible components.

Ensure:

- Responsive design across mobile, tablet and desktop.
- Keyboard-accessible navigation.
- Visible focus states.
- Appropriate heading hierarchy.
- Sufficient text contrast.
- Accessible image descriptions.
- Reduced-motion support.
- Sensible image loading and optimisation.
- Basic SEO metadata.
- A meaningful document title and description.

Keep components cohesive and avoid unnecessary abstraction.

Separate content from presentation where doing so improves maintainability.

## 6. Deployment Constraints

The site will eventually be deployed to a Hetzner CX23 VPS running Linux and Nginx.

GitHub Actions will perform the production build and deployment.

For now:

- Ensure `npm run build` produces a deployable static website in `dist/`.
- Do not introduce runtime dependencies requiring Node.js on the production server.
- Do not configure or modify the remote VPS.
- Do not create a GitHub Actions deployment pipeline as part of this task.
- Do not commit credentials, tokens or secrets.
- Do not make changes to production infrastructure.

Deployment will be handled as a separate task.

## 7. Git Workflow

We use GitHub for source control.

The `main` branch represents our stable codebase.

Implement changes on the existing feature branch or create an appropriately named feature branch if necessary.

Do not push, merge or deploy without explicit approval.

Make changes in logical increments and provide clear summaries of each increment.

## 8. Quality & Acceptance Criteria

The MVP is complete when:

1. The homepage renders correctly locally.
2. All agreed sections are implemented.
3. The design is responsive and visually coherent.
4. The site clearly communicates our community's identity.
5. The Discord link is configurable.
6. The Grafana dashboard link works.
7. Chronicle content can be maintained without modifying presentation components.
8. No fictional statistics, testimonials or live metrics are displayed.
9. TypeScript validation passes.
10. The repository's lint checks pass.
11. `npm run build` succeeds.
12. The production output is suitable for static hosting through Nginx.

## 9. Important Guiding Principle

This website should not feel like a commercial gaming platform or a generic Discord recruitment page.

It should feel like **the online home of a small community building something meaningful together**.

The visual and written experience should make a visitor feel as though they've arrived at a welcoming settlement, where there's a warm fire, good company and a place for them if they choose to stay.

Start by inspecting the repository and creating the PRD and technical proposal.

**Do not begin implementation until I have reviewed and approved the approach.**
