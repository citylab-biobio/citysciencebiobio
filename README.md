# City Science Biobío 2026 {#city-science-biobío-2026-es}

**[English](#city-science-biobío-2026) | [Español](#city-science-biobío-2026-es)**

Landing page de **City Science Biobío 2026**, el evento público organizado por
**City Lab Biobío (CLBB)**, afiliado al grupo **MIT Media Lab / MIT City
Science**. El evento se realiza del **15 al 18 de junio de 2026** en la
Biblioteca Central de la Universidad de Concepción, Chile, y exhibe cuatro años
de proyectos de tecnología urbana de CLBB (CityScope, DataScope,
CommunityScope, Metropolitan Scope Biobío, visores de tránsito/incendios,
plataformas portuarias, entre otros) ante gobierno, academia y público general.

El sitio es una página larga de scroll único construida en torno a secuencias
de animación cinematográficas controladas por el scroll, completamente
traducida al **español, inglés y alemán**.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Por qué SvelteKit](#por-qué-sveltekit)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
  - [Modo de renderizado](#modo-de-renderizado)
  - [Internacionalización (i18n)](#internacionalización-i18n)
  - [Scroll suave (Lenis)](#scroll-suave-lenis)
  - [Patrón de animación por scroll](#patrón-de-animación-por-scroll)
  - [Sistema AnimatedSvg](#sistema-animatedsvg)
- [Páginas y componentes](#páginas-y-componentes)
- [Estilos / sistema de diseño](#estilos--sistema-de-diseño)
- [Recursos estáticos](#recursos-estáticos)
- [Infraestructura y despliegue](#infraestructura-y-despliegue)
- [Desarrollo local](#desarrollo-local)
- [Problemas conocidos / pendientes](#problemas-conocidos--pendientes)

---

## Stack tecnológico

| Capa | Elección | Notas |
|---|---|---|
| Framework | **SvelteKit 2** + **Svelte 4.2** | Compila a JS vanilla, sin virtual DOM |
| Bundler / servidor de desarrollo | **Vite 5** | vía `@sveltejs/vite-plugin-svelte` |
| Adaptador | **`@sveltejs/adapter-static`** | Exportación completamente estática (`prerender = true`, `ssr = false`) |
| Scroll suave | **Lenis 1.1** | Inicializado globalmente en `+layout.svelte` |
| Animación | Loops **RAF + `getBoundingClientRect()`** hechos a mano | Sin GSAP / ScrollTrigger — se mantiene compatible con Lenis |
| i18n | i18n propio y liviano (sin librería) | ES / EN / DE, detección por cookie + `Accept-Language` |
| Hosting | **AWS Amplify** (hosting estático/CDN) | build a partir de `amplify.yml` |
| CDN de medios | **CloudFront** (`d26q11cgz8q0ri.cloudfront.net`) | todas las imágenes y videos |
| Tipografías | **Chalet** y **DobraSlab** licenciadas, servidas desde `assets.citylabbiobio.cl` | `@font-face` en `src/app.css` |
| Analítica | Google tag (gtag.js) | inyectado directamente en `src/app.html` |

### Por qué este stack

- `npm install --legacy-peer-deps` es necesario (Svelte 4 + algunos desajustes de peer-deps en el ecosistema del adaptador).
- Sin framework CSS — todo es CSS escrito a mano usando un pequeño set de tokens de diseño (custom properties CSS) y clases utilitarias (`.glass`, `.pill`, `.section-title`, etc.).

---

## Por qué SvelteKit

Este proyecto evita deliberadamente un framework más pesado (React/Next, Vue/Nuxt) por razones concretas que importan para una landing page de marketing/evento:

- **Framework de tiempo de compilación, no de runtime.** Los componentes de Svelte compilan a funciones imperativas de actualización del DOM, pequeñas — no hay diffing de virtual DOM en runtime. Para una página que es mayormente contenido estático con animaciones de scroll personalizadas, esto significa menos JS enviado y menos overhead compitiendo con los loops de animación RAF.
- **Primitivas reactivas realmente reactivas, sin boilerplate.** Las declaraciones reactivas `$:` y los stores de Svelte (`writable`/`derived`) hacen que la capa de i18n (`locale` → diccionario `derived`) y el estado de animación por componente (`elR`, `cardStyles`, `progress`, etc.) sean triviales de conectar — sin manejo de arrays de dependencias de `useState`/`useMemo`/`useEffect`.
- **CSS con scope por defecto.** Cada bloque `<style>` de un componente tiene scope automático, lo que hace manejable el diseño por componente del proyecto (Hero, Schedule, Projects, cada uno con lenguajes visuales muy distintos) sin necesidad de una convención de nombres CSS como BEM, y sin el costo de runtime de CSS-in-JS.
- **`adapter-static` → salida verdaderamente estática.** Todo el sitio se prerenderiza a HTML/CSS/JS plano (`ssr = false`, `prerender = true`), por lo que puede servirse desde cualquier host/CDN estático (en este caso, AWS Amplify) sin runtime de servidor, cold starts casi nulos y escalamiento trivial para un evento con picos de tráfico.
- **El tamaño del bundle importa aquí.** La página tiene mucho contenido animado y multimedia (video, imágenes grandes de hero, múltiples SVGs). La falta de overhead de runtime de framework en Svelte deja más presupuesto para el contenido real y el código de animación de canvas/SVG.
- **Fácil interoperabilidad con APIs nativas del navegador.** Lenis, `IntersectionObserver`, `ResizeObserver`, `fetch`+`DOMParser` para inlinear SVGs, `<canvas>` — todo esto es JS plano dentro de `onMount()`, sin que ninguna abstracción específica de framework se interponga.

---

## Estructura del proyecto

```
src/
├── app.html                  # Shell HTML — meta tags, preconnect de fuentes, gtag, placeholder %lang%
├── app.css                   # Estilos globales, tokens de diseño (vars CSS), @font-face, clases utilitarias
├── hooks.server.js           # Resuelve el locale por request, escribe <html lang> + SEO meta (solo en build)
├── lib/
│   ├── decorations.js        # Registro de presets de <AnimatedSvg>
│   ├── partners.js           # Datos de "Invitan" partners/sponsors (logos)
│   ├── i18n/
│   │   ├── index.js          # LOCALES, detectFromHeader(), resolveLocale()
│   │   └── dictionaries.js    # Todo el copy, agrupado por componente, para es/en/de
│   └── components/
│       ├── Nav.svelte         # ⚠️ nav superior legado — actualmente sin uso (no se importa en ningún lado)
│       ├── RadialNav.svelte    # Nav radial flotante + selector de idioma (el nav que realmente se usa)
│       ├── Hero.svelte         # Hero principal: animación de canvas tipo circuito + barra SVG revelada por scroll
│       ├── Streaming.svelte      # Embed del livestream de YouTube (responsive 16:9)
│       ├── About.svelte         # "Quiénes somos" + imagen con parallax + sección dividida "Concepto"
│       ├── AnimatedSvg.svelte    # Componente genérico de SVG revelado por scroll (ver decorations.js)
│       ├── Projects.svelte        # Scroll apilado de los 7 proyectos de CLBB
│       ├── Schedule.svelte         # Secuencia cinematográfica de la masterclass + cierre
│       ├── Agenda.svelte            # Agenda de la expo de 3 días (tarjetas por día)
│       ├── EventHub.svelte           # ⚠️ Launchpad de "recursos y links" — construido pero SIN conectar aún a la página
│       └── Partners.svelte           # Muro de logos de sponsors/partners + footer del sitio
└── routes/
    ├── +layout.js            # prerender = true, ssr = false
    ├── +layout.server.js     # pasa el locale resuelto al cliente
    ├── +layout.svelte        # import de CSS global, contexto de i18n, init de Lenis
    └── +page.svelte          # compone todas las secciones en orden

static/
├── assets/                   # SVGs (favicon, line art decorativo, logos, patrones)
├── *.otf / *.ttf              # Tipografías licenciadas (ignoradas en git — agregar manualmente para dev local)
└── .DS_Store

amplify.yml                   # Especificación de build de AWS Amplify
svelte.config.js              # Config de adapter-static (pages/assets → build/, fallback index.html)
vite.config.js                # Plugin de Vite para SvelteKit
.github/workflows/notify-fork.yml  # Al hacer push a master, dispara un evento hacia un fork de sincronización
```

---

## Arquitectura

### Modo de renderizado

`src/routes/+layout.js`:

```js
export const prerender = true;
export const ssr = false;
```

Todo el sitio se **prerenderiza a HTML estático en tiempo de build** y luego
hace hydrate como una SPA del lado del cliente (`ssr = false`). Esto es
necesario para `adapter-static` / el hosting estático de AWS Amplify — no hay
servidor Node en producción.

Como no hay servidor en runtime, `src/hooks.server.js` solo se ejecuta
**durante el paso de prerender del build**, no por cada visita real. Aun así
cumple un propósito: escribe el atributo `<html lang="...">` y los meta tags
de SEO (`<meta description>` / `og:description`) en el HTML estático usando el
locale que se resuelva en tiempo de build (sin cookie ni header
`Accept-Language` presentes en build → siempre cae en `es`).

### Internacionalización (i18n)

Construido a medida, sin librería — tres locales: **`es`** (por defecto),
**`en`**, **`de`**.

- **`src/lib/i18n/index.js`**
  - `LOCALES = ['es', 'en', 'de']`, `DEFAULT_LOCALE = 'es'`
  - `detectFromHeader(acceptLanguage)` — parsea un string `Accept-Language` y hace match con el primer prefijo `en-`/`es-`/`de-`
  - `resolveLocale(cookieValue, acceptLanguage)` — una cookie `lang` válida siempre gana; si no, se hace fallback a la detección por header

- **`src/lib/i18n/dictionaries.js`**
  - Un único export `dict` con `dict.es / dict.en / dict.de`, cada uno agrupado por componente/sección: `meta`, `nav`, `hero`, `streaming`, `about`, `projects`, `schedule`, `agenda`, `hub`, `partners`.
  - Los arrays preservan el orden para contenido indexado (por ejemplo, `projects.descriptions[i]`, `agenda.days[i]`).
  - Las claves que terminan en `Html` contienen markup inline confiable (`<strong>`, `<br/>`) y se renderizan con `{@html ...}` de Svelte.
  - Nombres de marca, nombres propios (Concepción, Talcahuano, San Pedro de la Paz, MIT Media Lab, CityScope, etc.), URLs, colores hex de acento y horarios **no** se traducen — viven junto a los datos en los archivos de los componentes, no en el diccionario.

- **`src/hooks.server.js`**
  - Lee la cookie `lang` + el header `Accept-Language`, resuelve un locale, lo guarda en `event.locals.locale`, y reescribe los placeholders `%lang%`, `%meta_description%`, `%og_description%` en `app.html` vía `transformPageChunk`.

- **`src/routes/+layout.server.js`** → pasa el `locale` al cliente vía `load()`.

- **`src/routes/+layout.svelte`**
  - Crea un store `writable(data.locale)` por render (`locale`) y un store `derived` `t = derived(locale, $l => dict[$l] ?? dict.es)`.
  - Expone `{ locale, t, setLocale }` vía `setContext('i18n', ...)`.
  - `setLocale(next)` actualiza el store, escribe una cookie `lang` de 1 año (`samesite=lax`), y actualiza `document.documentElement.lang`.

- **Patrón de consumo** (en cada componente):
  ```js
  const { t } = getContext('i18n');
  ```
  ```svelte
  <h2>{$t.about.pill}</h2>
  <p>{@html $t.about.leadHtml}</p>
  ```

- **Selector de idioma**: un pequeño pill `ES | EN | DE` dentro de
  **`RadialNav.svelte`**, mostrado sobre el botón que activa el menú radial. El
  idioma activo aparece apagado/no clickeable; los idiomas inactivos se
  renderizan como pills amarillos.

> **Agregar copy nuevo:** agregar la clave a **los tres** objetos de locale en
> `dictionaries.js` y referenciarla vía `$t.<namespace>.<key>`. Nunca
> hardcodear strings en español (ni en ningún idioma) directamente en un
> componente.

### Scroll suave (Lenis)

Inicializado una sola vez, de forma global, en el `onMount` de
`src/routes/+layout.svelte`:

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out exponencial
  orientation: 'vertical',
  smoothWheel: true
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

Cada animación controlada por scroll en la app lee `getBoundingClientRect()`
dentro de su propio loop `requestAnimationFrame` — **no** eventos de scroll —
para mantenerse perfectamente sincronizada con la posición de scroll suavizada
por Lenis.

### Patrón de animación por scroll

**No hay GSAP / ScrollTrigger** en ninguna parte del proyecto. Cada sección
animada sigue el mismo patrón escrito a mano:

```js
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutExpo  = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

// dentro de onMount, en un loop RAF:
const rect = el.getBoundingClientRect();
const p = clamp(/* progreso 0 → 1 basado en rect + altura del viewport */);
someReactiveVar = easeOutCubic(p); // o easeOutExpo
```

- `easeOutCubic` se usa para todo lo que debe **seguir el propio easing de
  Lenis** (secuencias fijas/largas) — se mantiene visualmente "pegado" a la
  barra de scroll.
- `easeOutExpo` se usa para **revelados rápidos de una sola vez** (movimiento
  cargado al inicio) — se usa con moderación, ya que puede pelear contra la
  sensación de smooth-scroll si se abusa de él.

Todo el estado de animación son variables reactivas de Svelte planas
(`let x = 0`), actualizadas de forma imperativa dentro de un loop
`requestAnimationFrame` por componente, iniciado en `onMount` y cancelado en
el cleanup.

Este patrón aparece, con ajustes específicos por sección, en:

- **`Hero.svelte`** — fondo de canvas tipo "placa de circuito" (loop de pulso independiente) + una barra SVG revelada/desvanecida por scroll (`barra.svg`), fijada mediante un wrapper de 220vh / hero con `position: sticky`.
- **`About.svelte`** — imagen con parallax (`STRENGTH = 0.25`) + un revelado de panel dividido "Concepto" (`easeOutCubic`).
- **`Projects.svelte`** — una sección larga fijada (`100vh + (N-1) * SCROLL_PER_CARD`) donde 7 tarjetas de proyecto animan a través de una transición de tarjetas apiladas con efecto 3D, controlada por un único valor `progress` (0→1).
- **`Schedule.svelte`** — la secuencia más elaborada: una sección fijada de `100vh + 3200px` (`4200px` en mobile) donde un pequeño frame de video se expande hacia casi pantalla completa a medida que se hace scroll, un overlay florece con blur de fondo, y 6 elementos de texto aparecen en cascada sobre curvas con offset individual. Seguido por un revelado de cita en el footer, el logo de CLBB (vía `AnimatedSvg`), y un "closing shot" (fade-in de foto del recinto + SVG decorativo + etiqueta).
- **`AnimatedSvg.svelte`** — ver más abajo.
- **`Partners.svelte`** — fade-in simple basado en `IntersectionObserver` para la foto de fondo.

### Sistema AnimatedSvg

`src/lib/components/AnimatedSvg.svelte` es un componente genérico que:

1. Hace `fetch()` de un archivo SVG crudo y lo inserta en el DOM vía
   `DOMParser` (quitando tags `<script>` y atributos `on*` por seguridad).
2. Lee el bounding box (`getBBox()`) de cada elemento de forma, ordenándolos
   a lo largo de un eje (horizontal o vertical, ascendente o descendente
   según `direction`).
3. Pre-muestra una fracción aleatoria `prerender` de elementos de inmediato
   (sus animaciones de pulso CSS corren libremente).
4. Revela el resto uno por uno (alternando `opacity`) a medida que el
   componente entra en el viewport, a lo largo de una fracción `reveal` de la
   altura del viewport — controlado por el mismo patrón RAF +
   `getBoundingClientRect()` que el resto del sitio.

**Props:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `preset` | `string \| null` | `null` | Clave dentro del registro `decorations` |
| `override` | `object` | `{}` | Overrides por instancia, fusionados sobre el preset |

**Campos de configuración** (preset u override): `src`, `direction` (`'ltr' \| 'rtl' \| 'ttb' \| 'btt'`), `width`, `prerender` (0–1), `reveal` (0–1, default `0.35`).

**Presets registrados** (`src/lib/decorations.js`):

| Preset | SVG | Dirección | Ancho | Prerender | Usado en |
|---|---|---|---|---|---|
| `aboutProjects` | `lateral.svg` | `rtl` | 60% | 0.3 | Entre las secciones About y Projects |
| `scheduleDivider` | `lateral.svg` | `ltr` | 50% | 0.2 | ⚠️ Definido pero actualmente **sin uso** — el bloque divisor en Schedule está comentado |
| `clbbLogo` | `logo-clbb02.svg` | `ttb` | 170px | 0.15 | Logo del footer de Schedule |
| `tramaEncabezado` | `trama_encabezado.svg` | `ltr` | 100% | 0.1 (reveal 0.5) | "Mountain footer" de cierre de Schedule (oculto en mobile) |

> **Advertencia de colisión de CSS:** los bloques `<style>` de los SVGs
> inyectados se vuelven **globales al documento**. Dos SVGs que puedan
> renderizarse en la misma página deben usar nombres de clase CSS únicos
> dentro del markup del SVG. `logo-clbb02.svg` fue renombrado de `.cls-1` a
> `.clbb-logo` por esta razón; `lateral.svg` usa `.cls-1`–`.cls-6`. Al agregar
> un nuevo SVG decorativo, renombrar sus clases para evitar sobrescribir las
> existentes.

---

## Páginas y componentes

### `src/routes/+page.svelte`

Compone toda la página, en orden:

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

> **Aún no compuesto:** `EventHub.svelte` está terminado pero deliberadamente
> **no** se importa aquí (y no tiene link en `RadialNav`) para evitar un
> anchor `#hub` muerto — ver [Problemas conocidos / pendientes](#problemas-conocidos--pendientes).

### `RadialNav.svelte`

La única navegación activa del sitio. Un botón circular flotante (abajo a la
derecha) que se expande en una disposición radial de links a secciones
(`#streaming`, `#aliados`, `#agenda`, `#programa`, `#proyectos`, `#quienes`,
`#inicio`), posicionados mediante trigonometría (`Math.sin`/`Math.cos`
alrededor de un arco de 90°) para que cada pill apunte hacia afuera desde el
trigger. Incluye el **selector de idioma ES / EN / DE**. Al hacer clic en un
link se hace scroll suave hacia la sección vía `scrollIntoView`.

### `Hero.svelte`

- Hero a pantalla completa fijado durante 220vh de scroll (`position: sticky` dentro de un wrapper alto).
- Fondo `<canvas>`: un campo continuamente animado de puntos/líneas pulsantes (estética "placa de circuito"), amarillo o gris, regenerado al hacer resize vía `ResizeObserver`.
- `barra.svg` se obtiene, se inserta (rotado 180°), y sus elementos `line`/`circle` se revelan progresivamente a medida que el usuario hace scroll por la zona fijada, luego toda la barra se desvanece + se desplaza hacia la derecha cuando el hero se libera.
- Imagen del título del evento, tagline (`{@html}`), fechas y recinto del evento, y una flecha de "scroll hint" que rebota — todo localizado.

### `Streaming.svelte`

El livestream del evento, ubicado justo después del hero (`id="streaming"`).
Una `section-label` localizada + título + intro sobre un **embed de YouTube
responsive 16:9** (wrapper `padding-top: 56.25%` con un `<iframe>`
posicionado absolutamente). El ID del video es una constante hardcodeada en el
componente (`RsoWuDxilww` → `youtube.com/embed/<id>`); cambiarlo para apuntar
a otro stream. El copy vive en `dict.*.streaming`.

### `About.svelte`

- Texto introductorio "¿Quiénes Somos?" (sticky, `position: sticky`) con logos de partners (desde `src/lib/partners.js` + MIT Media Lab).
- Una foto con parallax a sangre completa (bordes difuminados arriba y abajo) con parallax de `translateY` de `STRENGTH = 0.25`.
- Sección "Concepto": un split de dos columnas (desktop) con un divisor vertical animado que escala hacia adentro, el logo del evento, y copy de título/cuerpo que entra desde lados opuestos.

### `Projects.svelte`

Muestra los **7 proyectos** de CLBB (CityScope, visor de tránsito/accidentes,
Ciudad Portuaria, visor de incendios forestales, Metropolitan Scope Biobío,
DataScope, CommunityScope). Una sección larga fijada donde las tarjetas
transicionan a través de un efecto de "profundidad" apilado:

- La tarjeta 0 comienza centrada y visible.
- Cada tarjeta siguiente se desliza desde abajo a la derecha mientras las tarjetas mostradas previamente se encogen/desplazan/desvanecen hacia una pila detrás de ella (`STACK_X`, `STACK_Y`, `SCALE_DECAY`, `ALPHA_DECAY`, con tope en `MAX_VISIBLE`).
- Un contador de progreso (`01 / 07`) y puntos indicadores muestran qué tarjeta está "activa".
- `SCROLL_PER_CARD` es `1300px` en desktop, `1700px` en mobile (recalculado al hacer resize).
- En pantallas angostas (`≤600px`), las tarjetas cambian a un layout vertical (imagen arriba, texto abajo) y el logo inline reemplaza al logo de overlay.

### `Schedule.svelte`

La animación central — una secuencia cinematográfica tipo "masterclass"
(oradora: **Naroa Coretti, Research Scientist, MIT Media Lab**):

1. **Sección fijada** (`100vh + 3200px`, `4200px` en mobile): un pequeño frame de video (≈340×460px) (`movilidad.mp4`, precargado vía `<link rel="preload" as="video">`) se expande hacia casi pantalla completa a medida que el usuario hace scroll (`easeOutExpo`), oscureciéndose mientras crece.
2. **Bloom de overlay**: una vez que el frame está mayormente expandido, un overlay oscuro difuminado se desvanece hacia adentro (`easeOutCubic`, sigue a Lenis), seguido de 6 elementos de texto (caption, título, subtítulo, dos párrafos de cuerpo, meta + link de registro) apareciendo en cascada sobre curvas con offset temporal individual (0.11 de separación).
3. **Fase de espera**: todo permanece fijado y completamente visible hasta que se agota el presupuesto de scroll de la sección.
4. **Footer**: una cita de cierre se desvanece/eleva/desenfoca hacia la vista, luego el logo de CLBB (`AnimatedSvg` preset `clbbLogo`).
5. **Closing shot** (60vh): una foto del recinto (Biblioteca UdeC) se desvanece hacia adentro (bordes mezclados con máscara), un patrón decorativo (`tramaEncabezado`, solo desktop) se dibuja sobre ella, y una etiqueta final (fechas del evento + logo + recinto) se desvanece hacia adentro al final.

Un bloque de comentario `TWEAK GUIDE` en el componente documenta exactamente
qué constantes cambiar para retimear el bloom/stagger (offsets de
inicio/fin, velocidad del backdrop, techo de blur, separación del stagger,
velocidad por elemento).

### `Agenda.svelte`

Una agenda guiada de 3 días (16 al 18 de junio) como tres `day-card` con
glassmorphism, cada una con un header de día de semana/tema, texto de público
objetivo + objetivo, una grilla de horarios, y un CTA "Register →" que enlaza
a un Google Form por día. En mobile, un selector horizontal de tabs por día
muestra una tarjeta a la vez.

### `EventHub.svelte` ⚠️ aún sin conectar

Un launchpad de "recursos y links" (`id="hub"`) — una grilla auto-fill
responsive de tarjetas de vidrio (glass), cada una enlazando a un recurso
clave del evento (livestream, registro, programa, recinto/mapa, catálogo de
datos, kit de prensa). Cada tarjeta combina un ícono de trazo inline con un
título/descripción localizados y una flecha direccional (`↗` externo, `→`
interno). Las tarjetas se revelan con un fade-in escalonado por
`IntersectionObserver` (opacidad + elevación) y se destacan (borde/glow) al
hacer hover — los dos efectos se mantienen en propiedades CSS separadas para
que nunca entren en conflicto.

Los metadatos de recursos (href, ícono, flag `external`) viven en el
componente; el copy vive en `dict.*.hub.resources`, indexado por nombre de
recurso. **Este componente está terminado pero intencionalmente NO se
renderiza aún** — no se importa en `+page.svelte` y no tiene entrada en
`RadialNav` (la etiqueta `nav.hub` ya existe en el diccionario). Varios hrefs
de recursos son placeholders `#` a la espera de URLs reales. Ver [Problemas
conocidos / pendientes](#problemas-conocidos--pendientes).

### `Partners.svelte`

Un "muro de logos" de organizadores/sponsors dividido en filas (Invita /
Aliados / Auspicia / Patrocina / Media partner), con un fade-in de foto de
fondo vía `IntersectionObserver` en la primera vista, además del footer de
cierre del sitio (logo de CLBB, tagline, fecha/recinto del evento,
copyright).

### `AnimatedSvg.svelte` y `Nav.svelte`

Ver [Sistema AnimatedSvg](#sistema-animatedsvg) más arriba. `Nav.svelte` es
una barra de navegación fija superior con menú hamburguesa — existe en el
código pero **actualmente no se renderiza** en ningún lado (reemplazada por
`RadialNav.svelte`).

---

## Estilos / sistema de diseño

Definido en `src/app.css`:

- **Colores**: `--bg: #0a0a0a` (negro casi puro, usado en todas partes), `--yellow: #f5c518` (acento primario, también `#ffcc05` en algunos lugares), grises para texto secundario.
- **Glassmorphism**: `.glass` (fondo semi-transparente + `backdrop-filter: blur(16px)` + borde sutil), `.glass-hover` (elevación + borde destacado al hacer hover).
- **Tipografía**:
  - `--font: 'DobraSlab'` — texto de cuerpo (regular/medium/bold + itálicas)
  - `--font-heading: 'Chalet'` — todos los encabezados (`h1`–`h6`), pesos 400/500/700
  - Ambas cargadas vía `@font-face` desde `assets.citylabbiobio.cl`.
- **Pills**: `.pill`, `.pill-yellow` (acento sólido), `.pill-outline` (con borde), `.pill-dot` (agrega un punto inicial).
- **Helpers de layout**: `.container` (max-width 1200px, padding responsive), `.section-padding`, `.section-title`, `.section-label`.
- **Difuminado de bordes de imágenes**: las imágenes a sangre completa (la foto de parallax de About, la foto del recinto en Schedule) usan gradientes lineales `mask-image` / `-webkit-mask-image` para difuminarse hacia el fondo arriba/abajo — notar que la propiedad prefijada usa específicamente la sintaxis `-webkit-linear-gradient(...)` para evitar warnings de lint del IDE.
- Breakpoints responsive mobile-first en todo el sitio (`767px`, `768px`, `1024px`, etc.), con la mayoría de las secciones teniendo layouts dedicados para mobile (por ejemplo, la orientación de las tarjetas de Projects, el selector de tabs de Agenda, las decoraciones de circuito/barra ocultas del Hero).

---

## Recursos estáticos (`static/assets/`)

| Archivo | Estado |
|---|---|
| `favicon.svg` | usado (`app.html`) |
| `lateral.svg` | usado (preset `aboutProjects`) |
| `barra.svg` | usado (`Hero.svelte`) |
| `logo-clbb02.svg` | usado (preset `clbbLogo`, clases renombradas a `.clbb-logo` para evitar colisiones) |
| `trama_encabezado.svg` | usado (preset `tramaEncabezado`, closing shot de Schedule) |
| `barra superior.svg`, `trama diagonal.svg`, `trama inferior.svg`, `vertical.svg` | presentes, aún sin conectar — reservados para uso futuro |

Los archivos de fuentes licenciadas (`Chalet *.otf`, `DobraSlab-*.ttf`) viven
en `static/` para tooling local pero están **ignorados en git** — deben
agregarse manualmente para desarrollo local (el build de producción los
referencia vía las URLs de `assets.citylabbiobio.cl` en `app.css`, no las
copias locales).

---

## Infraestructura y despliegue

- **Hosting**: AWS Amplify, configurado vía `amplify.yml`:
  ```yaml
  preBuild: npm ci
  build:    npm run build
  artifacts: build/**/*   # salida de adapter-static
  ```
- **Sincronización CI**: `.github/workflows/notify-fork.yml` se dispara en
  cada push a `master`, enviando un evento `repository_dispatch`
  (`upstream-push`) a `citylab-biobio/citysciencebiobio` (el repo desde el
  cual Amplify realmente construye).
- **Medios y video**: servidos desde CloudFront (`d26q11cgz8q0ri.cloudfront.net`).
- **Fuentes**: servidas desde `assets.citylabbiobio.cl`.
- **Analítica**: Google tag (`G-4FS5M1CZNG`) inyectado directamente en `app.html`.

---

## Desarrollo local

```bash
npm install --legacy-peer-deps   # necesario por desajustes de peer-deps
npm run dev                       # inicia el servidor de desarrollo de Vite
npm run build                     # build estático → build/
npm run preview                   # previsualiza el build de producción
```

Notas:

- Colocar los archivos de fuentes licenciadas (`Chalet *.otf`,
  `DobraSlab-*.ttf`) en `static/` si se necesitan para tooling/chequeos del
  IDE local — la app en sí carga las fuentes de forma remota.
- Como `ssr = false` + `prerender = true`, `hooks.server.js` solo afecta el
  HTML prerenderizado **en tiempo de build** (el locale por defecto es `es`
  en build ya que no hay contexto de request). El selector de idioma del
  lado del cliente (`RadialNav`) funciona de forma independiente vía la
  cookie `lang`.

---

## Problemas conocidos / pendientes

- `EventHub.svelte` está construido pero **intencionalmente sin conectar** —
  no se importa en `+page.svelte`, sin link en `RadialNav` (para evitar un
  anchor `#hub` muerto). Para activarlo: agregar `<EventHub />` a
  `+page.svelte` y `{ href: '#hub', key: 'hub' }` al array `sections` en
  `RadialNav.svelte`. Antes de salir a producción, completar los hrefs
  placeholder `#` en su array `resources` (registro, recinto/mapa, catálogo
  de datos, kit de prensa).
- `Nav.svelte` es código muerto sin usar (español hardcodeado, no
  compatible con i18n) — se mantiene en el repo pero no se importa desde
  `+page.svelte`.
- El preset `scheduleDivider` de `AnimatedSvg` está definido pero
  actualmente sin uso (su uso en `Schedule.svelte` está comentado).
- El `og:url` de `app.html` (`cityscience.biobio.cl`) puede no coincidir con
  el dominio real de producción (`cityscience.citylabbiobio.cl`) — verificar
  antes de confiar en cualquiera de los dos para SEO/compartir en redes.
- El build produce warnings inofensivos de Rollup referenciando
  `hydratable`/`untrack`/`fork`/`settled` (Kit 2.6x referenciando símbolos de
  Svelte 5 no usados en runtime bajo Svelte 4) — no es accionable, el build
  igual se completa con éxito.


# City Science Biobío 2026

**[English](#city-science-biobío-2026) | [Español](#city-science-biobío-2026-es)**

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

---
---