<script>
  import { onMount, getContext } from 'svelte';
  import { invitan } from '$lib/partners.js';

  const { t } = getContext('i18n');

  let imgEl;
  let conceptoEl;
  let parallax = 0;
  let cp = 0;

  const STRENGTH = 0.25;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  onMount(() => {
    let rafId;
    function tick() {
      if (imgEl) {
        const rect = imgEl.parentElement.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        parallax = center * STRENGTH;
      }
      if (conceptoEl) {
        const rect = conceptoEl.getBoundingClientRect();
        const raw = 1 - rect.top / (window.innerHeight * 0.85);
        cp = easeOut(Math.max(0, Math.min(1, raw)));
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  });
</script>

<section id="quienes" class="section-padding">
  <div class="container">

    <!-- ¿Quiénes Somos? -->
    <div class="quienes-text">
      <p class="pill pill-outline pill-dot" style="margin-bottom: 1.5rem">{$t.about.pill}</p>
      <h2 class="section-title yellow">City Lab Biobío</h2>
      <p class="body-text">
        {@html $t.about.leadHtml}
      </p>
      <p class="body-text">
        {@html $t.about.transferHtml}
      </p>
      <div class="partners-logos">
        {#each invitan as p}
          <div class="partner-cell" class:large={p.large}>
            <img src={p.logo} alt={p.name} class="partner-logo" />
          </div>
        {/each}
        <div class="partner-cell">
          <img src="https://d26q11cgz8q0ri.cloudfront.net/2025/11/25160018/mit-media_1_white-scaled.png" alt="MIT Media Lab" class="partner-logo-mit" />
        </div>
      </div>
    </div>

  </div>

  <!-- Full-bleed parallax image -->
  <div class="quienes-image">
    <img
      bind:this={imgEl}
      src="https://d26q11cgz8q0ri.cloudfront.net/2025/12/29081452/dji_fly_20250723_182732_0500_1753310141484_photo-scaled.png"
      alt={$t.about.imgAlt}
      loading="lazy"
      style="transform: translateY({parallax}px)"
    />
    <div class="image-overlay"></div>
    <div class="image-blur-fade"></div>
  </div>

  <!-- Concepto -->
  <div class="concepto" bind:this={conceptoEl}>

    <div
      class="concepto-left"
      style="opacity:{cp}; transform: translateX({(1 - cp) * -70}px)"
    >
      <img
        src="https://d26q11cgz8q0ri.cloudfront.net/2026/05/28152803/logo-scaled.png"
        alt="City Science Biobío"
        class="event-logo"
      />
      <p class="concepto-place">{$t.about.place}</p>
    </div>

    <div
      class="concepto-divider"
      style="transform: scaleY({cp}); opacity:{cp}"
    ></div>

    <div
      class="concepto-right"
      style="opacity:{cp}; transform: translateX({(1 - cp) * 70}px)"
    >
      <h3 class="concepto-headline">{@html $t.about.headlineHtml}</h3>
      <p class="concepto-text">
        {$t.about.conceptoText}
      </p>
      <p class="concepto-text">
        {@html $t.about.expansionHtml}
      </p>
    </div>

  </div>

</section>

<style>
  .quienes-text {
    max-width: 640px;
    margin-bottom: 0;
    position: sticky;
    top: 3000px;
    z-index: 1;
  }

  .body-text {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.75;
    margin-bottom: 1rem;
  }

  .body-text strong {
    color: var(--yellow);
    font-weight: 600;
  }

  .partners-logos {
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.07);
  }

  .partner-cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* uniform bounding box — every logo fits within this, regardless of shape */
    max-width: 120px;
    height: 52px;
  }

  .partner-cell img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.85;
  }

  .partner-cell.large {
    max-width: 160px;
    height: 70px;
  }

  /* Full-bleed parallax */
  .quienes-image {
    position: relative;
    width: 100%;
    height: 70vh;
    overflow: hidden;
    margin-top: -220px;
    margin-bottom: 0;
    z-index: 0;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 50%,
      black 50%,
      transparent 100%
    );
    -webkit-mask-image: -webkit-linear-gradient(
      to bottom,
      transparent 0%,
      black 50%,
      black 50%,
      transparent 100%
    );
  }

  .quienes-image img {
    position: absolute;
    inset: -15% 0;
    width: 100%;
    height: 130%;
    object-fit: cover;
    filter: brightness(0.75);
    will-change: transform;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,10,10,0.75) 0%,
      rgba(10,10,10,0.2) 40%,
      transparent 60%,
      rgba(10,10,10,0.7) 80%,
      rgba(10,10,10,1) 100%
    );
  }

  .image-blur-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
    -webkit-mask-image: -webkit-linear-gradient(to bottom, transparent 0%, black 100%);
    pointer-events: none;
  }

  /* Concepto */
  .concepto {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: clamp(4rem, 10vw, 7rem) clamp(1.25rem, 5vw, 3rem);
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .concepto {
      grid-template-columns: 1fr 1px 1fr;
      gap: 4rem;
      align-items: center;
    }
  }

  .concepto-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    will-change: transform, opacity;
  }

  .event-logo {
    height: clamp(70px, 12vw, 140px);
    width: auto;
    max-width: 100%;
    object-fit: contain;
    object-position: center center;
  }

  .concepto-place {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .concepto-divider {
    display: none;
    width: 1px;
    background: rgba(245,197,24,0.25);
    transform-origin: top center;
    will-change: transform, opacity;
    align-self: stretch;
  }

  @media (min-width: 768px) {
    .concepto-divider { display: block; }
  }

  .concepto-right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    will-change: transform, opacity;
  }

  .concepto-headline {
    font-family: var(--font-heading), sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    color: #fff;
  }

  .concepto-text {
    font-size: 1rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.8;
  }

  .concepto-text strong {
    color: #fff;
    font-weight: 600;
  }

  /* ── Mobile ──────────────────────────────────────── */
  @media (max-width: 767px) {
    /* Partner logos stack vertically, centered */
    .partners-logos {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .partner-cell {
      max-width: 160px;
      height: 52px;
    }
  }
</style>
