<script>
  import { onMount, getContext } from 'svelte';
  import { invitan } from '$lib/partners.js';

  const { t } = getContext('i18n');

  let sectionEl;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });

  const aliados = [
    { name: 'Universidad de Concepción', logo: 'https://d26q11cgz8q0ri.cloudfront.net/2025/09/24010158/UdeC.png' },
  ];

  const patrocinio = [
    { name: 'Ministerio de Ciencia, Tecnología,\nConocimiento e Innovación', logo: 'https://d26q11cgz8q0ri.cloudfront.net/2025/09/23232604/MIN-Ciencia.png' },
  ];

  const media = [
    { name: 'CNN Chile', logo: 'https://d26q11cgz8q0ri.cloudfront.net/2025/09/24051522/CNN-chile.png' },
  ];

  const auspicia = [
    { name: 'Camanchaca', logo: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/08135014/camanchaca_blanco.png'},
  ]
</script>

<section id="aliados" class="section-padding" class:visible bind:this={sectionEl}>
  <div class="container">

    <div class="header">
      <p class="section-label">{$t.partners.sectionLabel}</p>
      <h2 class="section-title">{@html $t.partners.titleHtml}</h2>
    </div>

    <!-- Photo-backed logo wall -->
    <div class="logo-wall">

      <!-- Invitan row -->
      <div class="wall-row">
        <span class="row-label">{$t.partners.invita}</span>
        <div class="row-cells">
          {#each invitan as p}
            <div class="cell">
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="logo-img" />
              {:else}
                <span class="placeholder-text">{p.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Aliados row -->
      <div class="wall-row">
        <span class="row-label">{$t.partners.aliados}</span>
        <div class="row-cells">
          {#each aliados as p}
            <div class="cell">
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="logo-img" />
              {:else}
                <span class="placeholder-text">{p.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Auspicia row -->
      <div class="wall-row">
        <span class="row-label">{$t.partners.auspicia}</span>
        <div class="row-cells">
          {#each auspicia as p}
            <div class="cell">
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="logo-img" />
                {:else}
                <span class="placeholder-text">{p.name}</span>
                {/if}
            </div>
            {/each}
        </div>
      </div>

      <!-- Patrocinio row
      <div class="wall-row">
        <span class="row-label">{$t.partners.patrocina}</span>
        <div class="row-cells">
          {#each patrocinio as p}
            <div class="cell">
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="logo-img" />
              {:else}
                <span class="placeholder-text">{p.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      -->

      <!-- Media row -->
      <div class="wall-row">
        <span class="row-label">{$t.partners.mediaPartner}</span>
        <div class="row-cells">
          {#each media as p}
            <div class="cell">
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="logo-img" />
              {:else}
                <span class="placeholder-text">{p.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>

    </div>

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="https://d26q11cgz8q0ri.cloudfront.net/2025/09/25000650/LOGO-CLBB-ORIGINAL-BLANCO-APAISADO.png" alt="City Lab Biobío" class="fl-clbb" />
          <span class="fl-sep">|</span>
          <p class="footer-tagline">{$t.partners.tagline}</p>
        </div>
      </div>
      <div class="footer-info">
        <p class="footer-event">City Science Biobío 2026</p>
        <p class="footer-date">{$t.partners.eventDate}</p>
        <p class="footer-venue">{$t.partners.venue}</p>
      </div>
    </div>
    <div class="footer-bar">
      <div class="container">
        <p>{$t.partners.copyright}</p>
      </div>
    </div>
  </div>
</section>

<style>
  /* ── Section background ──────────────────────── */
  section {
    position: relative;
  }

  section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      url('https://d26q11cgz8q0ri.cloudfront.net/2026/06/04110417/dji_export_20250723_183718_1753310238264_sphere_screenshot-scaled.jpg')
      center / cover no-repeat fixed;
    opacity: 0;
    transition: opacity 1.2s ease;
    z-index: 0;
    pointer-events: none;
  }

  section.visible::before {
    opacity: 1;
  }

  /* dark overlay on top of the photo */
  section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.82) 0%,
      rgba(10, 10, 10, 0.72) 50%,
      rgba(10, 10, 10, 0.88) 100%
    );
    z-index: 0;
    pointer-events: none;
  }

  .container, .footer {
    position: relative;
    z-index: 1;
  }

  .header {
    margin-bottom: 3.5rem;
  }

  /* ── Logo wall ───────────────────────────────── */
  .logo-wall {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 5rem;
  }

  /* ── Rows ────────────────────────────────────── */
  .wall-row {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .wall-row:last-child {
    border-bottom: none;
  }

  .row-label {
    flex-shrink: 0;
    width: 7rem;
    padding: 0 1.5rem;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }

  .row-cells {
    display: flex;
    flex: 1;
  }

  /* ── Cells ───────────────────────────────────── */
  .cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.75rem;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    transition: background 0.2s;
  }

  .cell:last-child {
    border-right: none;
  }

  .cell:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  /* ── Logos & placeholders ────────────────────── */
  .logo-img {
    max-width: 140px;
    max-height: 52px;
    width: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.75;
    transition: opacity 0.2s;
  }

  .cell:hover .logo-img {
    opacity: 1;
  }

  .placeholder-text {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.2);
    text-align: center;
    line-height: 1.5;
    white-space: pre-line;
  }

  /* ── Footer ──────────────────────────────────── */
  .footer {
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding-top: 3rem;
  }

  .footer-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    justify-content: space-between;
    padding-bottom: 3rem;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }

  .fl-clbb {
    height: 2rem;
    width: auto;
    display: block;
  }

  .fl-sep {
    color: rgba(255, 255, 255, 0.2);
    font-size: 1.2rem;
  }

  .footer-tagline {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
    max-width: 320px;
    line-height: 1.5;
  }

  .footer-event {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.35rem;
  }

  .footer-date {
    font-size: 0.88rem;
    color: var(--yellow);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .footer-venue {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .footer-bar {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1.25rem 0;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.25);
  }

  /* ── Responsive ──────────────────────────────── */
  @media (max-width: 640px) {
    .row-label { display: none; }

    .cell { padding: 1.5rem 1rem; }

    .logo-img { max-width: 100px; max-height: 40px; }
  }
</style>
