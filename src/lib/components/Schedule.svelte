<script>
  import { onMount, getContext } from 'svelte';
  import AnimatedSvg from '$lib/components/AnimatedSvg.svelte';

  const { t } = getContext('i18n');

  const VIDEO_SRC = 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/03181954/movilidad.mp4';
  const VENUE_IMG = 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/03222713/bibliotecaudec-scaled.png';

  // Total px of scroll for the pinned section — matches Projects' SCROLL_PER_CARD pattern.
  // Longer on mobile so the masterclass dwells a bit before releasing.
  let SCROLL_PX = 3200;

  // Masterclass copy lives in the i18n dictionary ($t.schedule.masterclass).
  // Only the non-textual registration link stays here.
  const MASTERCLASS_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSeZebu6M_XhaHywPAalQmkijtbEwp1G0YHiBepzT269Yy48UA/viewform?usp=publish-editor';

  let sectionEl, videoEl, mountainEl;
  let footerEls = [];

  // ── Animation state ──
  let mw = 340, mh = 460, mr = 16, mscale = 1, darken = 0;
  // Overlay backdrop blooms in softly; each text element staggers in individually.
  let overlayOp = 0, overlayBlur = 0;
  let elR = [0, 0, 0, 0, 0, 0]; // caption, title, sub, text1, text2, meta+link
  let footerReveals = [0, 0];
  let mountainFade = 0, mountainLabel = 0;

  const clamp  = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp   = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutExpo  = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  onMount(() => {
    // Autoplay immediately — video is background from frame 0.
    videoEl?.play().catch(() => {});

    const setLen = () => { SCROLL_PX = window.innerWidth <= 767 ? 4200 : 3200; };
    setLen();
    window.addEventListener('resize', setLen);

    let rafId;

    function tick() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      if (sectionEl) {
        const rect  = sectionEl.getBoundingClientRect();
        const range = sectionEl.offsetHeight - vh;
        // p: 0 (section top hits viewport top) → 1 (section bottom hits viewport bottom)
        const p = range > 0 ? clamp(-rect.top / range) : 0;

        // Phase 2 (0.18 → 0.55): video frame expands.
        const e = easeOutExpo(clamp((p - 0.18) / 0.37));
        mw = lerp(Math.min(340, vw * 0.82), vw * 0.92, e);
        mh = lerp(Math.min(460, vh * 0.58), vh * 0.88, e);
        mr = lerp(16, 4, e);
        mscale = 1 + 0.08 * e;
        darken = 0.4 * e;

        // Phase 3 (0.54 → 0.88): overlay blooms in, then text staggers. Hold (0.88→1).
        // ┌─ TWEAK GUIDE ────────────────────────────────────────────────────────────┐
        // │ Start earlier / end later  →  change 0.54 and/or 0.34 (denominator)     │
        // │ Backdrop speed             →  change 0.55 (larger = slower bloom)        │
        // │ Blur ceiling               →  change * 8 (e.g. * 12 for more glass)     │
        // │ Text stagger gap           →  change 0.11 (larger = more spread apart)   │
        // │ Per-element reveal speed   →  change 0.34 (larger = each fades slower)   │
        // └──────────────────────────────────────────────────────────────────────────┘
        const pr = clamp((p - 0.54) / 0.34);
        // easeOutCubic (not Expo) keeps the bloom in sync with Lenis' own smooth
        // scroll easing — Expo front-loads motion and fights the physical scroll feel.
        overlayOp   = easeOutCubic(clamp(pr / 0.55));
        overlayBlur = overlayOp * 8;
        // Each element on its own gentle curve, 0.11 apart — longer window per element.
        const s = (offset) => easeOutCubic(clamp((pr - offset) / 0.34));
        elR = [0, 0.11, 0.22, 0.33, 0.44, 0.56].map(o => s(o));
      }

      // Footer text rises + unblurs on entry.
      footerReveals = footerEls.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return easeOutCubic(clamp(1 - r.top / (window.innerHeight * 0.85)));
      });

      // Closing shot: venue image fades in first, label follows.
      if (mountainEl) {
        const r  = mountainEl.getBoundingClientRect();
        const pm = easeOutCubic(clamp(1 - r.top / (window.innerHeight * 0.8)));
        mountainFade  = pm;                        // image opacity 0 → 1
        mountainLabel = clamp((pm - 0.45) / 0.4);  // text appears after image
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', setLen);
    };
  });
</script>

<svelte:head>
  <link rel="preload" as="video" href={VIDEO_SRC} type="video/mp4" />
</svelte:head>

<!-- px-height section so sticky inner dwell matches Projects' SCROLL_PER_CARD pattern -->
<section id="programa" class="launch" bind:this={sectionEl} style="height: calc(100vh + {SCROLL_PX}px);">

  <div class="sticky-wrap">

    <!-- Video (rendered first, always visible) -->
    <div class="media-frame" style="width:{mw}px; height:{mh}px; border-radius:{mr}px;">
      <video
        class="media-vid"
        bind:this={videoEl}
        src={VIDEO_SRC}
        loop muted playsinline autoplay preload="auto"
        style="transform: scale({mscale});"
      ></video>
      <div class="media-darken" style="background: rgba(0,0,0,{darken});"></div>

      <!-- Overlay: blooms in softly, then text staggers (desktop) -->
      <div class="media-overlay" style="opacity:{overlayOp}; backdrop-filter:blur({overlayBlur}px); -webkit-backdrop-filter:blur({overlayBlur}px);">
        <span class="ov-caption" style="opacity:{elR[0]}; transform:translateY({(1-elR[0])*22}px);">
          {$t.schedule.masterclass.caption}
        </span>
        <div class="ov-content">
          <h3 class="ov-title yellow" style="opacity:{elR[1]}; transform:translateY({(1-elR[1])*22}px);">{$t.schedule.masterclass.title}</h3>
          <p class="ov-sub" style="opacity:{elR[2]}; transform:translateY({(1-elR[2])*18}px);">{$t.schedule.masterclass.sub}</p>
          {#each $t.schedule.masterclass.paras as para, i}
            <p class="ov-text" style="opacity:{elR[3 + i]}; transform:translateY({(1-elR[3 + i])*16}px);">{para}</p>
          {/each}
          <p class="ov-meta" style="opacity:{elR[5]}; transform:translateY({(1-elR[5])*14}px);">{$t.schedule.masterclass.meta}</p>
          <a class="ov-link" style="opacity:{elR[5]}; transform:translateY({(1-elR[5])*14}px);" href={MASTERCLASS_LINK} target="_blank" rel="noopener noreferrer">
            {$t.schedule.masterclass.linkLabel}
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

<section id="cta">
<!-- Quote + credits -->
<div class="footer-content">
  <div
    class="fc-quote"
    bind:this={footerEls[0]}
    style="opacity:{footerReveals[0]}; transform: translateY({(1 - footerReveals[0]) * 16}px); filter: blur({(1 - footerReveals[0]) * 5}px);"
  >
    <p>
      {$t.schedule.footerQuote}
    </p>
  </div>

  <!-- divider
  <div class="fc-divider">
    <AnimatedSvg preset="scheduleDivider" />
  </div>
  -->
</div>

<!-- Logo -->
<div class="footer-logo">
  <AnimatedSvg preset="clbbLogo" />
</div>

<!-- Closing shot -->
<div class="mountain-footer" bind:this={mountainEl}>
  <!-- 1. Venue image fades in (no parallax / no wipe) -->
  <div class="mf-media" style="opacity:{mountainFade};">
    <img src={VENUE_IMG} alt="Biblioteca Central, Universidad de Concepción" />
  </div>

  <!-- 2. Decorative pattern draws in from the sides on scroll, on top -->
  <div class="mf-trama">
    <AnimatedSvg preset="tramaEncabezado" override={{ width: '100%', prerender: 0 }} />
  </div>

  <!-- 3. Label -->
  <div class="mf-label" style="opacity:{mountainLabel};">
    <span class="mf-time">{$t.schedule.closeTime}</span>
    <img src="https://d26q11cgz8q0ri.cloudfront.net/2026/05/28152803/logo-scaled.png" alt="City Science Biobío 2026" class="title-close" />
    <span class="mf-time">{$t.schedule.closeVenue}</span>
    </div>
</div>

</section>

<style>
  .launch {
    background: var(--bg);
    overflow: visible; /* section is taller than viewport, overflow must be visible */
  }

  /* Sticky inner — pinned at 100vh while the section scrolls past */
  .sticky-wrap {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* ── Video frame ── */
  .media-frame {
    position: relative;
    overflow: hidden;
    background: var(--bg);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0);
    will-change: width, height;
    flex-shrink: 0;
  }

  .media-vid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
  }

  .media-darken { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

  .media-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4.5rem 2rem 2rem;
    background:
      radial-gradient(ellipse at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.68) 100%),
      linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 55%);
    will-change: opacity;
    /* backdrop-filter driven by inline style so it grows smoothly */
  }

  .ov-caption {
    position: absolute;
    top: 2rem; left: 0; width: 100%;
    font-family: var(--font-heading), sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--yellow);
    will-change: transform, opacity;
    display: block;
  }

  .ov-content > * { will-change: transform, opacity; }

  .ov-content { max-width: 46ch; will-change: transform, filter; }

  .ov-title {
    font-size: clamp(2rem, 5.5vw, 3.75rem);
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 0.75rem;
  }

  .ov-sub {
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.85);
    margin-bottom: 1.5rem;
  }

  .ov-text {
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.85);
    margin-bottom: 1.1rem;
  }

  .ov-meta {
    font-family: var(--font-heading), sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin: 0.5rem 0 1.75rem;
  }

  .ov-link {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--glass-border-yellow);
    border-radius: var(--radius-full);
    color: var(--yellow);
    font-size: 0.82rem;
    font-weight: 600;
    transition: background 0.25s, color 0.25s;
  }
  .ov-link:hover { background: var(--yellow); color: #0a0a0a; }

  /* ── Logo ── */
  .footer-logo {
    display: flex;
    justify-content: center;
    padding: 2rem 1.5rem 0;
  }

  /* ── Footer text ── */
  .footer-content {
    max-width: 680px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .fc-quote {
    font-size: clamp(1.15rem, 2.4vw, 1.6rem);
    line-height: 1.7;
    color: rgba(255,255,255,0.85);
    will-change: opacity, transform, filter;
  }

  /* ── Closing shot ── */
  .mountain-footer { position: relative; height: 60vh; overflow: hidden; }

  /* Layer 1 — venue image, fades in */
  .mf-media {
    position: absolute; inset: 0;
    z-index: 1;
    will-change: opacity;
    /* Blend top and bottom edges into the background */
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 18%,
      black 82%,
      transparent 100%
    );
    -webkit-mask-image: -webkit-linear-gradient(
      to bottom,
      transparent 0%,
      black 18%,
      black 82%,
      transparent 100%
    );
  }

  .mf-media img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
  }

  /* Layer 2 — decorative pattern, revealed from the sides */
  .mf-trama {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    z-index: 2;
    pointer-events: none;
  }

  /* Hide the decorative trama over the venue image on mobile */
  @media (max-width: 767px) {
    .mf-trama { display: none; }
  }

  /* Layer 3 — label */
  .mf-label {
    position: absolute; inset: 0;
    z-index: 3;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.6rem; text-align: center;
    will-change: opacity;
  }

  .mf-time {
    font-family: var(--font-heading), sans-serif;
    font-size: clamp(1.6rem, 4.5vw, 2.75rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
  }


  .title-close {
    height: clamp(80px, 5vw, 180px);
    width: auto;
    max-width: 100%;
    object-fit: contain;
    object-position: left center;
    margin-bottom: 1.5rem;
    display: block;
  }
</style>
