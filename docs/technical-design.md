# The Last Ember MVP Technical Design

## Architecture

Retain the existing Vite, React, TypeScript, and CSS application as a static single page. No router, backend, data fetching, CMS, UI framework, or additional dependency is needed.

The homepage is the one public seam: visitors interact with the rendered document, and acceptance checks verify that document's navigation, links, content, responsive layouts, and accessibility behavior. This has high leverage for the MVP because there is no domain logic that warrants a lower-level test seam.

## Proposed Structure

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Compose the semantic page landmarks and section modules. |
| `src/content/chronicle.ts` | Hold typed, local Village Chronicle entries. |
| `src/config/community.ts` | Hold the Discord invitation configuration and the fixed server dashboard URL. |
| `src/components/` | Hold only cohesive presentational modules when they improve readability, such as site navigation, a Discord action, and Chronicle rendering. |
| `src/App.css` | Hold page and section layout, component styles, responsive rules, and motion rules. |
| `src/index.css` | Hold design tokens, global reset, typography defaults, focus treatment, and base element styles. |
| `public/images/` | Hold clearly named image placeholders and a short replacement guide for approved community screenshots. |
| `index.html` | Hold title, description, and other basic static metadata. |

The implementation should keep simple, one-use markup in `App.tsx`; it should not introduce a component for every visual fragment. The Chronicle's data/rendering separation and the community configuration are real seams because each varies independently from page layout.

## Content And Configuration

- Chronicle entries are an exported typed collection. Each entry contains only editorial fields the rendering module needs, such as a title, week label, summary, and supplied highlights.
- Community configuration exports a nullable Discord invitation URL and the Grafana dashboard URL. The Discord action determines its active or unavailable presentation from that single value.
- The unavailable Discord state must be keyboard clear and must not be an anchor with an empty `href`.
- Placeholder assets use descriptive names that state their intended replacement location. The adjacent guide identifies the asset, desired subject, and replacement procedure.

## Visual System

- Use CSS custom properties for `#171A19`, `#C66D36`, `#E6D7BA`, and `#6D7860`, plus tonal variants needed for contrast.
- Use a locally available, distinctive serif system stack for headings and a clean system sans-serif stack for body copy. This avoids external font requests while preserving static-hosting simplicity.
- Build atmosphere through composition, warm colour contrast, restrained texture/overlay treatment, and generous spacing rather than image-heavy effects, parallax, or animation.
- Use one small set of transition values, disable nonessential transitions under `prefers-reduced-motion`, and retain visible focus indicators.

## Accessibility And SEO

- Use `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks.
- Give every section an ordered heading and every control an accessible name.
- Use a skip link where it improves navigation through the persistent header.
- Ensure external links that open new tabs use `rel="noreferrer"` and communicate that behavior accessibly.
- Treat purely decorative images as empty-alt imagery; give meaningful placeholder images descriptive alternative text that identifies the intended screenshot subject.
- Set a meaningful page title, description, language, viewport, and social-preview-ready base metadata without requiring a hosted image.

## Implementation Plan

1. Replace the Vite starter UI and global styles with the design-token layer, base semantics, metadata, and static page skeleton.
2. Add the community configuration and Chronicle data, then render the Hero, Longkeep, values, Chronicle, dashboard, join, and footer sections from the confirmed PRD content.
3. Add documented local image placeholders and apply the responsive atmospheric visual treatment across phone, tablet, and desktop breakpoints.
4. Perform manual acceptance checks at the homepage seam: keyboard navigation, focus, link behavior, absent and configured Discord states, reduced motion, contrast, and responsive layouts.
5. Run `npm run lint` and `npm run build` under Node.js 24. Address failures, then present the implementation for review without pushing, merging, or deploying.

## Verification Plan

No test runner will be added for this content-led MVP. The build and lint commands provide structural verification; manual browser checks provide user-facing verification.

| Check | Expected result |
| --- | --- |
| Desktop, tablet, mobile viewport | No clipped content, unusable navigation, or horizontal overflow. |
| Keyboard only | Skip/navigation/links are reachable in a logical order with visible focus. |
| Discord URL absent | Calls to action clearly state that the invite is unavailable and do not navigate to an invented destination. |
| Discord URL configured | All Discord calls lead to the configured invitation. |
| Dashboard action | Opens the supplied Grafana public dashboard in a new tab. |
| Reduced motion | Nonessential transitions and animation are removed or reduced. |
| `npm run lint` | Oxlint exits successfully. |
| `npm run build` | TypeScript and Vite produce a static `dist/` directory successfully. |

## Rejected Alternatives

- **CMS or database:** adds operations and an editing interface before the community needs them.
- **Client-side routing:** there is one page and in-page navigation is sufficient.
- **Server-status API:** duplicates the existing Grafana dashboard and risks presenting stale or invented data.
- **External image/font services:** create avoidable availability, privacy, and licensing dependencies.
- **Automated UI test framework:** introduces tooling with low leverage for this first static page; reassess if interactions or stateful features are added.
