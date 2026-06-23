<script>
  import { onMount, getContext } from 'svelte';

  const { t } = getContext('i18n');

  // Photo data. Paste your real CloudFront URLs into `src`.
  // `span: 'tall'` gives a tile extra height for a varied masonry rhythm.
  // `caption` is optional — it fades in over the image on hover.
  const photos = [
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173255/CSBB-1.jpg', alt: '', span: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173247/CSBB-24.jpg', alt: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173250/CSBB-25.jpg', alt: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173229/CSBB-21.jpg', alt: '', span: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173214/CSBB-19.jpg', alt: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173147/CSBB-15.jpg', alt: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173139/CSBB-13.jpg', alt: '', span: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173058/CSBB-7.jpg', alt: '', caption: '' },
    { src: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/22173027/CSBB-2.jpg', alt: '', caption: '' }
  ];

  let sectionEl;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="galeria" class="section-padding" class:visible bind:this={sectionEl}>
  <div class="container">

    <header class="header">
      <p class="section-label">{$t.gallery.sectionLabel}</p>
      <h2 class="section-title">{@html $t.gallery.titleHtml}</h2>
      <p class="intro">{$t.gallery.intro}</p>
    </header>

    <div class="masonry">
      {#each photos as photo, i}
        <figure class="tile" class:tall={photo.span === 'tall'} style="--i:{i}">
          <img src={photo.src} alt={photo.alt} loading="lazy" draggable="false" />
          {#if photo.caption}
            <figcaption>{photo.caption}</figcaption>
          {/if}
        </figure>
      {/each}
    </div>

  </div>
</section>

<style>
  .header {
    max-width: 520px;
    margin-bottom: 3rem;
  }

  .intro {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.5rem;
  }

  /* ── Masonry ─────────────────────────────────────────── */
  .masonry {
    column-count: 2;
    column-gap: 1rem;
  }

  @media (min-width: 900px) {
    .masonry { column-count: 3; }
  }

  @media (max-width: 459px) {
    .masonry { column-count: 1; }
  }

  /* ── Tile ────────────────────────────────────────────── */
  .tile {
    position: relative;
    margin: 0 0 1rem;
    break-inside: avoid;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    /* Placeholder height so the layout is previewable before real URLs load.
       Real images define their own height and override this. */
    min-height: 200px;
    /* Reveal on scroll, staggered by index. */
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease;
    transition-delay: calc(var(--i) * 55ms);
  }

  .tile.tall {
    min-height: 320px;
  }

  :global(.visible) .tile {
    opacity: 1;
    transform: translateY(0);
  }

  .tile:hover {
    border-color: var(--glass-border-yellow);
  }

  .tile img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    user-select: none;
    transition: transform 0.6s ease;
  }

  .tile:hover img {
    transform: scale(1.06);
  }

  /* ── Caption ─────────────────────────────────────────── */
  figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1.5rem 1rem 1rem;
    font-family: var(--font-heading), sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #fff;
    background: linear-gradient(to top, rgba(10, 10, 10, 0.85), transparent);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .tile:hover figcaption {
    opacity: 1;
    transform: translateY(0);
  }
</style>
