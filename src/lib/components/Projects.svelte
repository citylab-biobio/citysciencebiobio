<script>
  import { getContext, onMount } from 'svelte';

  const { t } = getContext('i18n');

  let gridEl;
  let revealed = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(gridEl);
    return () => observer.disconnect();
  });

  // Non-textual project data (logos/images/accents). Descriptions are pulled
  // from the dictionary by index ($t.projects.descriptions[i]); brand names and
  // proper-noun locations (sub) stay here untranslated.
  const projects = [
    {
      logo: 'https://citylabbiobio.cl/wp-content/uploads/2026/05/cityscope_fondo-oscuro.svg',
      logoSize: "50px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142328/CLBB-12-scaled.jpg',
      accent: '#ffcb05',
      link: '' // TODO: add project URL
    },
    {
      logo: 'https://citylabbiobio.cl/wp-content/uploads/2026/05/visor-trafico_fondo-oscuro.svg',
      logoSize: "70px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142940/01-1-scaled.png',
      accent: '#ffcc05',
      link: 'https://visor.citylabbiobio.cl' // TODO: add project URL
    },
    {
      logo: 'https://citylabbiobio.cl/wp-content/uploads/2026/05/cportuaria_fondo-oscuro.svg',
      logoSize: "80px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142349/tablet.png',
      accent: '#ffcc05',
      link: '' // TODO: add project URL
    },
    {
      logo: 'https://citylabbiobio.cl/wp-content/uploads/2026/05/visor-incendios_fondo-oscuro.svg',
      logoSize: "40px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142742/01-scaled.png',
      accent: '#ffcc05',
      link: 'https://reporteincendios.citylabbiobio.cl' // TODO: add project URL
    },
    {
      logo: 'https://citylabbiobio.cl/wp-content/uploads/2026/05/metropolitan_fondo-oscuro.svg',
      logoSize: "40px",
      name: '',
      sub: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142625/MSB-6-scaled.png',
      accent: '#ffcc05',
      link: '' // TODO: add project URL
    },
    {
      logo: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/04121644/DataScope_fondo-negro-scaled.png',
      logoSize: "30px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28170425/DataIS-Ckan.png',
      imgPos: '35% center',
      accent: '#ffcc05',
      link: 'https://datascope.citylabbiobio.cl' // TODO: add project URL
    },
    {
      logo: 'https://d26q11cgz8q0ri.cloudfront.net/2026/06/04121425/community-scaled.png',
      logoSize: "60px",
      name: '',
      img: 'https://d26q11cgz8q0ri.cloudfront.net/2026/05/28142449/Community-Scope-scaled.png',
      accent: '#ffcc05',
      link: 'https://youtu.be/dXba2RFf41Q' // TODO: add project URL
    }
  ];
</script>

<section id="proyectos" style="background: var(--bg);">
  <header class="proj-header">
    <h2 class="proj-title">{$t.projects.title}</h2>
    <p class="proj-intro">{$t.projects.intro}</p>
  </header>

  <div class="grid" bind:this={gridEl}>
    {#each projects as p, i}
      <a
        class="card"
        class:revealed
        href={p.link ?? '#'}
        style="--accent:{p.accent}; animation-delay:{i * 70}ms"
      >
        <div class="card-image">
          <img src={p.img} alt={p.name} loading="lazy" draggable="false" style={p.imgPos ? `object-position:${p.imgPos}` : ''} />
        </div>

        <div class="card-glass">
          <div class="card-logo-box">
            <img src={p.logo} alt="" class="card-logo" style={p.logoSize ? `height:${p.logoSize}` : ''} draggable="false" />
          </div>
          <div class="card-info">
            {#if p.sub}<span class="card-loc">{p.sub}</span>{/if}
            {#if p.name}<h3 class="card-name" style="color:{p.accent}">{p.name}</h3>{/if}
            <p class="card-desc">{$t.projects.descriptions[i]}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  section {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
  }

  /* ── Header ───────────────────────────────────────────────────────────── */
  .proj-header {
    padding: 1.5rem 2rem 1rem;
    text-align: center;
  }

  .proj-title {
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    font-weight: 700;
    margin-bottom: 0.3rem;
  }

  .proj-intro {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 400px;
    margin: 0 auto;
  }

  /* ── Grid ─────────────────────────────────────────────────────────────── */
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;
    padding: 0 2.5rem 2rem;
    min-height: 0;
  }

  /* ── Card ─────────────────────────────────────────────────────────────── */
  .card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    opacity: 0;
    transform: translateY(28px);
  }

  .card.revealed {
    animation: card-reveal 0.55s cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
  }

  @keyframes card-reveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card:hover {
    transform: scale(1.06);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    z-index: 2;
  }

  .card-image {
    position: absolute;
    inset: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    pointer-events: none;
    transition: transform 0.5s ease;
  }

  .card:hover .card-image img {
    transform: scale(1.12);
  }

  /* ── Glassmorphism overlay ────────────────────────────────────────────── */
  /* Grid rows: logo (auto) + info (collapsed to 0fr). Expanding the info row
     to 1fr on hover both reveals the text and pushes the logo upward, since
     the whole grid stays vertically centered via align-content. */
  .card-glass {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: auto 0fr;
    align-content: center;
    justify-items: center;
    text-align: center;
    padding: 1.25rem 1rem;
    background: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: backdrop-filter 0.35s ease, background 0.35s ease, grid-template-rows 0.45s ease;
  }

  .card:hover .card-glass {
    grid-template-rows: auto 1fr;
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }

  .card-logo-box {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-logo {
    max-height: 100%;
    width: auto;
    max-width: 70%;
    object-fit: contain;
    user-select: none;
    pointer-events: none;
  }

  .card-info {
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    overflow-y: auto;
    opacity: 0;
    padding-top: 0.6rem;
    transition: opacity 0.3s ease;
  }

  .card:hover .card-info {
    opacity: 1;
    transition: opacity 0.3s ease 0.1s;
  }

  .card-loc {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }

  .card-name {
    font-size: clamp(0.85rem, 1.3vw, 1.05rem);
    font-weight: 700;
    line-height: 1.2;
  }

  .card-desc {
    font-size: clamp(0.68rem, 0.95vw, 0.8rem);
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.4;
  }

  /* ── Mobile ───────────────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    section { height: auto; }

    .grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, minmax(180px, 1fr));
    }
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(7, minmax(220px, auto));
    }
  }
</style>
