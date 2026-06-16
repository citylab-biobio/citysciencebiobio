# City Science Biobío 2026

Landing page for **City Science Biobío 2026**, the public-facing event hosted by
**City Lab Biobío (CLBB)**, affiliated with the **MIT Media Lab / MIT City Science**
group. The event takes place **June 15–18, 2026** at the Biblioteca Central,
Universidad de Concepción, Chile, and showcases four years of CLBB's urban
technology projects (CityScope, DataScope, CommunityScope, Metropolitan Scope
Biobío, traffic/fire viewers, port platforms, and more) to government,
academia, and the public.

The site is a single long-scroll page built around cinematic, scroll-driven
animation sequences, fully translated into **Spanish, English, and German**.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Why SvelteKit](#why-sveltekit)
- [Project structure](#project-structure)
- [Architecture](#architecture)
  - [Rendering mode](#rendering-mode)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Smooth scroll (Lenis)](#smooth-scroll-lenis)
  - [Scroll-driven animation pattern](#scroll-driven-animation-pattern)
  - [AnimatedSvg system](#animatedsvg-system)
- [Pages & components](#pages--components)
- [Styling / design system](#styling--design-system)
- [Static assets](#static-assets)
- [Infrastructure & deployment](#infrastructure--deployment)
- [Local development](#local-development)
- [Known issues / open items](#known-issues--open-items)

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **SvelteKit 2** + **Svelte 4.2** | Compiles to vanilla JS, no virtual DOM |
| Bundler / dev server | **Vite 5** | via `@sveltejs/vite-plugin-svelte` |
| Adapter | **`@sveltejs/adapter-static`** | Fully static export (`prerender = true`, `ssr = false`) |
| Smooth scroll | **Lenis 1.1** | Initialized globally in `+layout.svelte` |
| Animation | Hand-rolled **RAF loops + `getBoundingClientRect()`** | No GSAP / ScrollTrigger — kept Lenis-safe |
| i18n | Custom lightweight i18n (no library) | ES / EN / DE, cookie + `Accept-Language` detection |
| Hosting | **AWS Amplify** (static hosting/CDN) | builds from `amplify.yml` |
| Media CDN | **CloudFront** (`d26q11cgz8q0ri.cloudfront.net`) | all images & video |
| Fonts | Licensed **Chalet** + **DobraSlab**, served from `assets.citylabbiobio.cl` | `@font-face` in `src/app.css` |
| Analytics | Google tag (gtag.js) | injected directly in `src/app.html` |

### Why this stack

- `npm install --legacy-peer-deps` is required (Svelte 4 + some peer-dep mismatches in the adapter ecosystem).
- No CSS framework — everything is hand-written CSS using a small set of design tokens (CSS custom properties) and utility classes (`.glass`, `.pill`, `.section-title`, etc.).

---

## Why SvelteKit

This project deliberately avoids a heavier framework (React/Next, Vue/Nuxt) for a few concrete reasons that matter for a marketing/event landing page:

- **Compile-time framework, not a runtime one.** Svelte components compile down to small, imperative DOM-update functions — there's no virtual DOM diffing at runtime. For a page that's mostly static content with custom scroll animations, this means less JS shipped and less overhead competing with the RAF animation loops.
- **Truly reactive primitives without boilerplate.** `$:` reactive statements and Svelte stores (`writable`/`derived`) make the i18n layer (`locale` → `derived` dictionary) and per-component animation state (`elR`, `cardStyles`, `progress`, etc.) trivial to wire up — no `useState`/`useMemo`/`useEffect` dependency-array juggling.
- **Scoped CSS by default.** Every component's `<style>` block is automatically scoped, which is what makes the project's per-component design (Hero, Schedule, Projects each with very different visual languages) manageable without a CSS naming convention like BEM, and without a CSS-in-JS runtime cost.
- **`adapter-static` → genuinely static output.** The whole site prerenders to plain HTML/CSS/JS (`ssr = false`, `prerender = true`), so it can be served from any static host/CDN (here, AWS Amplify) with no server runtime, near-zero cold starts, and trivial scaling for an event with a traffic spike.
- **Small bundle size matters here.** The page is animation- and media-heavy (video, large hero images, multiple SVGs). Svelte's lack of framework runtime overhead leaves more of the budget for the actual content and the custom canvas/SVG animation code.
- **Easy interop with vanilla browser APIs.** Lenis, `IntersectionObserver`, `ResizeObserver`, `fetch`+`DOMParser` for inlining SVGs, `<canvas>` — all of this is plain JS inside `onMount()`, with no framework-specific abstraction getting in the way.

---

## Project structure

```
src/
├── app.html                  # HTML shell — meta tags, fonts preconnect, gtag, %lang% placeholder
├── app.css                   # Global styles, design tokens (CSS vars), @font-face, utility classes
├── hooks.server.js           # Resolves locale per request, stamps <html lang> + SEO meta (build-time only)
├── lib/
│   ├── decorations.js        # Registry of <AnimatedSvg> presets
│   ├── partners.js           # "Invitan" partner/sponsor data (logos)
│   ├── i18n/
│   │   ├── index.js          # LOCALES, detectFromHeader(), resolveLocale()
│   │   └── dictionaries.js    # All copy, namespaced per component, for es/en/de
│   └── components/
│       ├── Nav.svelte         # ⚠️ legacy top nav — currently unused (not imported anywhere)
│       ├── RadialNav.svelte    # Floating radial nav + language switcher (the nav actually used)
│       ├── Hero.svelte         # Landing hero: canvas circuit animation + scroll-revealed SVG bar
│       ├── Streaming.svelte      # YouTube livestream embed (responsive 16:9)
│       ├── About.svelte         # "Quiénes somos" + parallax image + "Concepto" split section
│       ├── AnimatedSvg.svelte    # Generic scroll-revealed SVG component (see decorations.js)
│       ├── Projects.svelte        # Stacked-card scroll-through of the 7 CLBB projects
│       ├── Schedule.svelte         # Masterclass cinematic scroll sequence + closing shot
│       ├── Agenda.svelte            # 3-day expo schedule (day cards)
│       ├── EventHub.svelte           # ⚠️ "Resources & links" launchpad — built but NOT wired into the page yet
│       └── Partners.svelte           # Sponsors/partners logo wall + site footer
└── routes/
    ├── +layout.js            # prerender = true, ssr = false
    ├── +layout.server.js     # passes resolved locale to the client
    ├── +layout.svelte        # global CSS import, i18n context, Lenis init
    └── +page.svelte          # composes all sections in order

static/
├── assets/                   # SVGs (favicon, decorative line art, logos, patterns)
├── *.otf / *.ttf              # Licensed fonts (gitignored — drop in manually for local dev)
└── .DS_Store

amplify.yml                   # AWS Amplify build spec
svelte.config.js              # adapter-static config (pages/assets → build/, fallback index.html)
vite.config.js                # SvelteKit Vite plugin
.github/workflows/notify-fork.yml  # On push to master, dispatches an event to a sync fork
```

---

## Architecture

### Rendering mode

`src/routes/+layout.js`:

```js
export const prerender = true;
export const ssr = false;
```

The entire site is **prerendered to static HTML at build time** and then hydrates
as a client-side SPA (`ssr = false`). This is required for `adapter-static` /
AWS Amplify static hosting — there is no Node server in production.

Because there's no server at runtime, `src/hooks.server.js` only runs **during
the build's prerender step**, not per real visitor request. It still serves a
purpose: it stamps the `<html lang="...">` attribute and the SEO `<meta
description>` / `og:description` tags into the static HTML using whatever
locale resolves at build time (no cookie / `Accept-Language` header present at
build time → always falls back to `es`).

### Internationalization (i18n)

Custom-built, no library — three locales: **`es`** (default), **`en`**, **`de`**.

- **`src/lib/i18n/index.js`**
  - `LOCALES = ['es', 'en', 'de']`, `DEFAULT_LOCALE = 'es'`
  - `detectFromHeader(acceptLanguage)` — parses an `Accept-Language` string and matches the first `en-`/`es-`/`de-` prefix
  - `resolveLocale(cookieValue, acceptLanguage)` — a valid `lang` cookie always wins; otherwise falls back to header detection

- **`src/lib/i18n/dictionaries.js`**
  - Single `dict` export with `dict.es / dict.en / dict.de`, each namespaced by component/section: `meta`, `nav`, `hero`, `streaming`, `about`, `projects`, `schedule`, `agenda`, `hub`, `partners`.
  - Arrays preserve order for indexed content (e.g. `projects.descriptions[i]`, `agenda.days[i]`).
  - Keys ending in `Html` contain trusted inline markup (`<strong>`, `<br/>`) and are rendered with Svelte's `{@html ...}`.
  - Brand names, proper nouns (Concepción, Talcahuano, San Pedro de la Paz, MIT Media Lab, CityScope, etc.), URLs, hex accent colors, and time slots are **not** translated — they live alongside the data in the component files, not in the dictionary.

- **`src/hooks.server.js`**
  - Reads the `lang` cookie + `Accept-Language` header, resolves a locale, stores it on `event.locals.locale`, and rewrites `%lang%`, `%meta_description%`, `%og_description%` placeholders in `app.html` via `transformPageChunk`.

- **`src/routes/+layout.server.js`** → passes `locale` to the client via `load()`.

- **`src/routes/+layout.svelte`**
  - Creates a per-render `writable(data.locale)` store (`locale`) and a `derived` store `t = derived(locale, $l => dict[$l] ?? dict.es)`.
  - Exposes `{ locale, t, setLocale }` via `setContext('i18n', ...)`.
  - `setLocale(next)` updates the store, writes a 1-year `lang` cookie (`samesite=lax`), and updates `document.documentElement.lang`.

- **Consumption pattern** (every component):
  ```js
  const { t } = getContext('i18n');
  ```
  ```svelte
  <h2>{$t.about.pill}</h2>
  <p>{@html $t.about.leadHtml}</p>
  ```

- **Language toggle**: a small `ES | EN | DE` pill inside **`RadialNav.svelte`**, shown above the radial menu trigger. The active language is muted/non-clickable; inactive languages render as yellow pills.

> **Adding new copy:** add the key to **all three** locale objects in `dictionaries.js` and reference it via `$t.<namespace>.<key>`. Never hardcode Spanish (or any language) strings directly in a component.

### Smooth scroll (Lenis)

Initialized once, globally, in `src/routes/+layout.svelte`'s `onMount`:

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
  orientation: 'vertical',
  smoothWheel: true
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

Every scroll-driven animation in the app reads `getBoundingClientRect()` inside
its own `requestAnimationFrame` loop — **not** scroll events — so it stays
perfectly in sync with Lenis's smoothed scroll position.

### Scroll-driven animation pattern

There is **no GSAP / ScrollTrigger** anywhere in the project. Every animated
section follows the same hand-written pattern:

```js
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutExpo  = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

// inside onMount, in a RAF loop:
const rect = el.getBoundingClientRect();
const p = clamp(/* 0 → 1 progress based on rect + viewport height */);
someReactiveVar = easeOutCubic(p); // or easeOutExpo
```

- `easeOutCubic` is used for anything that should **track Lenis's own easing**
  (long pinned sequences) — it stays visually "locked" to the scrollbar.
- `easeOutExpo` is used for **snappy one-shot reveals** (front-loaded motion) —
  used sparingly, since it can fight the smooth-scroll feel if overused.

All animation state is plain Svelte reactive variables (`let x = 0`), updated
imperatively inside one `requestAnimationFrame` loop per component, started in
`onMount` and cancelled on cleanup.

This pattern appears, with section-specific tuning, in:

- **`Hero.svelte`** — canvas "circuit board" background (independent pulse loop) + a scroll-revealed/fading SVG bar (`barra.svg`), pinned via a 220vh wrapper / `position: sticky` hero.
- **`About.svelte`** — parallax image (`STRENGTH = 0.25`) + a "Concepto" split-panel reveal (`easeOutCubic`).
- **`Projects.svelte`** — a long pinned section (`100vh + (N-1) * SCROLL_PER_CARD`) where 7 project cards animate through a 3D-ish stacked-card transition driven by a single `progress` value (0→1).
- **`Schedule.svelte`** — the most elaborate sequence: a pinned `100vh + 3200px` (4200px on mobile) section where a small video frame expands to near-fullscreen, an overlay blooms in with backdrop blur, and 6 text elements stagger in on individually-offset curves. Followed by a footer quote reveal, the CLBB logo (via `AnimatedSvg`), and a "closing shot" (venue photo fade-in + decorative SVG + label).
- **`AnimatedSvg.svelte`** — see below.
- **`Partners.svelte`** — simple `IntersectionObserver`-based fade-in for the background photo.

### AnimatedSvg system

`src/lib/components/AnimatedSvg.svelte` is a generic component that:

1. `fetch()`es a raw SVG file and inlines it into the DOM via `DOMParser` (stripping `<script>` tags and `on*` attributes for safety).
2. Reads every shape element's bounding box (`getBBox()`), sorts them along an axis (horizontal or vertical, ascending or descending depending on `direction`).
3. Pre-shows a random `prerender` fraction of elements immediately (their CSS pulse animations run freely).
4. Reveals the rest one-by-one (toggling `opacity`) as the component scrolls into view, over a `reveal` fraction of the viewport height — driven by the same RAF + `getBoundingClientRect()` pattern as everything else.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `preset` | `string \| null` | `null` | Key into the `decorations` registry |
| `override` | `object` | `{}` | Per-instance overrides merged over the preset |

**Config fields** (preset or override): `src`, `direction` (`'ltr' \| 'rtl' \| 'ttb' \| 'btt'`), `width`, `prerender` (0–1), `reveal` (0–1, default `0.35`).

**Registered presets** (`src/lib/decorations.js`):

| Preset | SVG | Direction | Width | Prerender | Used in |
|---|---|---|---|---|---|
| `aboutProjects` | `lateral.svg` | `rtl` | 60% | 0.3 | Between About & Projects sections |
| `scheduleDivider` | `lateral.svg` | `ltr` | 50% | 0.2 | ⚠️ Defined but currently **unused** — the divider block in Schedule is commented out |
| `clbbLogo` | `logo-clbb02.svg` | `ttb` | 170px | 0.15 | Schedule footer logo |
| `tramaEncabezado` | `trama_encabezado.svg` | `ltr` | 100% | 0.1 (reveal 0.5) | Schedule's closing "mountain footer" (hidden on mobile) |

> **CSS collision warning:** injected SVG `<style>` blocks become **document-global**. Any two SVGs that may render on the same page must use unique CSS class names inside the SVG markup. `logo-clbb02.svg` was renamed from `.cls-1` to `.clbb-logo` for this reason; `lateral.svg` uses `.cls-1`–`.cls-6`. When adding a new decorative SVG, rename its classes to avoid clobbering existing ones.

---

## Pages & components

### `src/routes/+page.svelte`

Composes the whole page, in order:

```
<RadialNav />
<main>
  <Hero />
  <Streaming />
  <About />
  <AnimatedSvg preset="aboutProjects" />
  <Projects />
  <Schedule />
  <Agenda />
  <Partners />
</main>
```

> **Not yet composed:** `EventHub.svelte` is finished but deliberately **not** imported here (and has no `RadialNav` link) to avoid a dead `#hub` anchor — see [Known issues / open items](#known-issues--open-items).

### `RadialNav.svelte`

The site's only active navigation. A floating circular button (bottom-right)
that expands into a radial arrangement of section links (`#streaming`,
`#aliados`, `#agenda`, `#programa`, `#proyectos`, `#quienes`, `#inicio`),
positioned via trigonometry (`Math.sin`/`Math.cos` around a 90° arc) so each
pill points outward from the trigger. Includes the **ES / EN / DE language
switcher**. Clicking a link smooth-scrolls to the section via `scrollIntoView`.

### `Hero.svelte`

- Full-viewport hero pinned for 220vh of scroll (`position: sticky` inside a tall wrapper).
- `<canvas>` background: a continuously animated field of pulsing dots/lines ("circuit board" aesthetic), yellow or gray, regenerated on resize via `ResizeObserver`.
- `barra.svg` is fetched, inlined (rotated 180°), and its `line`/`circle` elements reveal progressively as the user scrolls through the pin zone, then the whole bar fades + drifts right as the hero releases.
- Event title image, tagline (`{@html}`), event dates & venue, and a bouncing "scroll hint" arrow — all localized.

### `Streaming.svelte`

The event livestream, placed just after the hero (`id="streaming"`). A
localized `section-label` + title + intro above a responsive **16:9 YouTube
embed** (`padding-top: 56.25%` wrapper with an absolutely-positioned `<iframe>`).
The video ID is a hardcoded constant in the component (`RsoWuDxilww` →
`youtube.com/embed/<id>`); swap it to point at a different stream. Copy lives in
`dict.*.streaming`.

### `About.svelte`

- "¿Quiénes Somos?" intro text (sticky, `position: sticky`) with partner logos (from `src/lib/partners.js` + MIT Media Lab).
- A full-bleed parallax photo (mask-faded top & bottom edges) with `STRENGTH = 0.25` translateY parallax.
- "Concepto" section: a two-column (desktop) split with an animated vertical divider that scales in, the event logo, and headline/body copy that slide in from opposite sides.

### `Projects.svelte`

Showcases CLBB's **7 projects** (CityScope, traffic/accident viewer, Ciudad Portuaria, wildfire viewer, Metropolitan Scope Biobío, DataScope, CommunityScope). A long pinned section where cards transition through a stacked "depth" effect:

- Card 0 starts centered and visible.
- Each subsequent card slides in from the bottom-right while previously-shown cards shrink/offset/fade into a stack behind it (`STACK_X`, `STACK_Y`, `SCALE_DECAY`, `ALPHA_DECAY`, capped at `MAX_VISIBLE`).
- A progress counter (`01 / 07`) and dot indicators track which card is "active."
- `SCROLL_PER_CARD` is `1300px` on desktop, `1700px` on mobile (recalculated on resize).
- On narrow screens (`≤600px`), cards switch to a vertical (image on top, text below) layout and the inline logo replaces the overlay logo.

### `Schedule.svelte`

The centerpiece animation — a "masterclass" cinematic sequence (speaker: **Naroa
Coretti, Research Scientist, MIT Media Lab**):

1. **Pinned section** (`100vh + 3200px`, `4200px` on mobile): a small (≈340×460px) video frame (`movilidad.mp4`, preloaded via `<link rel="preload" as="video">`) expands toward near-fullscreen as the user scrolls (`easeOutExpo`), darkening as it grows.
2. **Overlay bloom**: once the frame is mostly expanded, a blurred dark overlay fades in (`easeOutCubic`, tracks Lenis), followed by 6 text elements (caption, title, subtitle, two body paragraphs, meta + registration link) staggering in on individually time-offset curves (0.11 apart).
3. **Hold phase**: everything stays pinned and fully visible until the section's scroll budget is exhausted.
4. **Footer**: a closing quote fades/rises/un-blurs into view, then the CLBB logo (`AnimatedSvg` preset `clbbLogo`).
5. **Closing shot** (60vh): a venue photo (Biblioteca UdeC) fades in (edges mask-blended), a decorative pattern (`tramaEncabezado`, desktop only) draws in over it, and a final label (event dates + logo + venue) fades in after.

A `TWEAK GUIDE` comment block in the component documents exactly which constants
to change to retime the bloom/stagger (start/end offsets, backdrop speed, blur
ceiling, stagger gap, per-element speed).

### `Agenda.svelte`

A 3-day guided-tour schedule (June 16–18) as three glass-morphism `day-card`s,
each with a weekday/theme header, target-audience + objective text, a grid of
time slots, and a "Register →" CTA linking to a per-day Google Form. On mobile,
a horizontal day-tab selector shows one card at a time.

### `EventHub.svelte` ⚠️ not yet wired

A "resources & links" launchpad (`id="hub"`) — a responsive auto-fill grid of
glass cards, each linking to a key event resource (livestream, registration,
program, venue/map, data catalog, press kit). Each card pairs an inline stroke
icon with a localized title/description and a directional arrow (`↗` external,
`→` internal). Cards reveal with a staggered `IntersectionObserver` fade-in
(opacity + lift) and highlight (border/glow) on hover — the two effects are kept
on separate CSS properties so they never conflict.

Resource metadata (href, icon, `external` flag) lives in the component; copy
lives in `dict.*.hub.resources`, keyed by resource name. **This component is
finished but intentionally NOT rendered yet** — it is not imported in
`+page.svelte` and has no `RadialNav` entry (the `nav.hub` label already exists
in the dictionary). Several resource hrefs are `#` placeholders awaiting real
URLs. See [Known issues / open items](#known-issues--open-items).

### `Partners.svelte`

A "logo wall" of organizers/sponsors split into rows (Invita / Aliados /
Auspicia / Patrocina / Media partner), fading in a background photo via
`IntersectionObserver` on first view, plus the site's closing footer (CLBB
logo, tagline, event date/venue, copyright).

### `AnimatedSvg.svelte` & `Nav.svelte`

See [AnimatedSvg system](#animatedsvg-system) above. `Nav.svelte` is a
fixed-top navigation bar with a hamburger menu — it exists in the codebase but
is **not currently rendered** anywhere (superseded by `RadialNav.svelte`).

---

## Styling / design system

Defined in `src/app.css`:

- **Colors**: `--bg: #0a0a0a` (near-black, used everywhere), `--yellow: #f5c518` (primary accent, also `#ffcc05` in places), grays for secondary text.
- **Glassmorphism**: `.glass` (semi-transparent background + `backdrop-filter: blur(16px)` + subtle border), `.glass-hover` (lift + border highlight on hover).
- **Typography**:
  - `--font: 'DobraSlab'` — body text (regular/medium/bold + italics)
  - `--font-heading: 'Chalet'` — all headings (`h1`–`h6`), weights 400/500/700
  - Both loaded via `@font-face` from `assets.citylabbiobio.cl`.
- **Pills**: `.pill`, `.pill-yellow` (solid accent), `.pill-outline` (bordered), `.pill-dot` (adds a leading dot).
- **Layout helpers**: `.container` (max-width 1200px, responsive padding), `.section-padding`, `.section-title`, `.section-label`.
- **Image edge blending**: full-bleed images (About's parallax photo, Schedule's venue shot) use `mask-image` / `-webkit-mask-image` linear gradients to fade into the background at the top/bottom — note the prefixed property uses `-webkit-linear-gradient(...)` syntax specifically to avoid IDE lint warnings.
- Mobile-first responsive breakpoints throughout (`767px`, `768px`, `1024px`, etc.), with most sections having dedicated mobile layouts (e.g. Projects' card orientation, Agenda's tab selector, Hero's hidden circuit/bar decorations).

---

## Static assets (`static/assets/`)

| File | Status |
|---|---|
| `favicon.svg` | used (`app.html`) |
| `lateral.svg` | used (`aboutProjects` preset) |
| `barra.svg` | used (`Hero.svelte`) |
| `logo-clbb02.svg` | used (`clbbLogo` preset, classes renamed to `.clbb-logo` to avoid collisions) |
| `trama_encabezado.svg` | used (`tramaEncabezado` preset, Schedule closing shot) |
| `barra superior.svg`, `trama diagonal.svg`, `trama inferior.svg`, `vertical.svg` | present, not yet wired up — staged for future use |

Licensed font files (`Chalet *.otf`, `DobraSlab-*.ttf`) live in `static/` for
local tooling but are **gitignored** — they must be added manually for local
development (the production build references them via the
`assets.citylabbiobio.cl` URLs in `app.css`, not the local copies).

---

## Infrastructure & deployment

- **Hosting**: AWS Amplify, configured via `amplify.yml`:
  ```yaml
  preBuild: npm ci
  build:    npm run build
  artifacts: build/**/*   # adapter-static output
  ```
- **CI sync**: `.github/workflows/notify-fork.yml` fires on every push to
  `master`, sending a `repository_dispatch` (`upstream-push`) event to
  `citylab-biobio/citysciencebiobio` (the repo Amplify actually builds from).
- **Media & video**: served from CloudFront (`d26q11cgz8q0ri.cloudfront.net`).
- **Fonts**: served from `assets.citylabbiobio.cl`.
- **Analytics**: Google tag (`G-4FS5M1CZNG`) injected directly in `app.html`.

---

## Local development

```bash
npm install --legacy-peer-deps   # required due to peer-dep mismatches
npm run dev                       # start Vite dev server
npm run build                     # static build → build/
npm run preview                   # preview the production build
```

Notes:

- Drop the licensed font files (`Chalet *.otf`, `DobraSlab-*.ttf`) into
  `static/` if you need them for local tooling/IDE checks — the app itself
  loads fonts remotely.
- Because `ssr = false` + `prerender = true`, `hooks.server.js` only affects
  the **build-time** prerendered HTML (locale defaults to `es` at build time
  since there's no request context). The client-side language switcher
  (`RadialNav`) works independently via the `lang` cookie.

---

## Known issues / open items

- `EventHub.svelte` is built but **intentionally not wired in** — not imported in `+page.svelte`, no `RadialNav` link (to avoid a dead `#hub` anchor). To activate: add `<EventHub />` to `+page.svelte` and `{ href: '#hub', key: 'hub' }` to the `sections` array in `RadialNav.svelte`. Before going live, fill the placeholder `#` hrefs in its `resources` array (registration, venue/map, data catalog, press kit).
- `Nav.svelte` is unused dead code (hardcoded Spanish, not i18n-aware) — kept in the repo but not imported by `+page.svelte`.
- The `scheduleDivider` `AnimatedSvg` preset is defined but currently unused (its usage in `Schedule.svelte` is commented out).
- `app.html`'s `og:url` (`cityscience.biobio.cl`) may not match the actual production domain (`cityscience.citylabbiobio.cl`) — verify before relying on either for SEO/sharing.
- Build produces harmless Rollup warnings referencing `hydratable`/`untrack`/`fork`/`settled` (Kit 2.6x referencing Svelte 5 symbols unused at runtime under Svelte 4) — not actionable, build still completes successfully.
