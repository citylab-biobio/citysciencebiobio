<script>
  import { onMount, getContext } from 'svelte';

  const { t } = getContext('i18n');

  // Non-textual resource data. Copy (title/desc) lives in the dictionary,
  // keyed by `key` → $t.hub.resources[key]. The `#` hrefs are intentional
  // placeholders — fill in the real registration / map / data / press URLs
  // before this section is wired into the page.
  const resources = [
    { key: 'stream',   href: '#streaming', icon: 'broadcast', external: false },
    { key: 'register', href: '#',          icon: 'ticket',    external: true  },
    { key: 'program',  href: '#agenda',    icon: 'calendar',  external: false },
    { key: 'venue',    href: '#',          icon: 'pin',       external: true  },
    { key: 'data',     href: '#',          icon: 'database',  external: true  },
    { key: 'press',    href: '#',          icon: 'media',     external: true  }
  ];

  // Inline stroke icons (24×24, currentColor) — trusted local markup.
  const icons = {
    broadcast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>',
    ticket:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a3 3 0 0 0 0 6v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a3 3 0 0 1 0-6V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><line x1="13" y1="6" x2="13" y2="18" stroke-dasharray="1.5 3"/></svg>',
    calendar:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="3" y1="9.5" x2="21" y2="9.5"/></svg>',
    pin:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    database:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>',
    media:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3.5" width="18" height="17" rx="2"/><circle cx="8.5" cy="9" r="1.8"/><path d="m21 16-5-5L5 21"/></svg>'
  };

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
</script>

<section id="hub" class="section-padding" class:visible bind:this={sectionEl}>
  <div class="container">

    <div class="header">
      <p class="section-label">{$t.hub.sectionLabel}</p>
      <h2 class="section-title">{$t.hub.title}</h2>
      <p class="hub-intro">{$t.hub.intro}</p>
    </div>

    <div class="grid">
      {#each resources as r, i}
        <a
          class="card glass"
          href={r.href}
          target={r.external ? '_blank' : null}
          rel={r.external ? 'noopener noreferrer' : null}
          style="--i:{i}"
        >
          <span class="icon" aria-hidden="true">{@html icons[r.icon]}</span>
          <span class="card-body">
            <span class="card-title">{$t.hub.resources[r.key].title}</span>
            <span class="card-desc">{$t.hub.resources[r.key].desc}</span>
          </span>
          <span class="arrow" aria-hidden="true">{r.external ? '↗' : '→'}</span>
        </a>
      {/each}
    </div>

  </div>
</section>

<style>
  .header {
    max-width: 640px;
    margin-bottom: 3rem;
  }

  .hub-intro {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    margin-top: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  /* ── Card ─────────────────────────────────────────── */
  .card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.4rem 1.5rem;
    text-decoration: none;
    color: inherit;
    /* reveal — opacity + lift only, so hover (border/glow) never fights it */
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease,
                border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    transition-delay: calc(var(--i) * 60ms);
  }

  :global(section.visible) .card {
    opacity: 1;
    transform: translateY(0);
  }

  .card:hover {
    border-color: var(--glass-border-yellow);
    background: var(--glass-bg-hover);
    box-shadow: 0 0 0 4px rgba(245, 197, 24, 0.07);
  }

  /* ── Icon ─────────────────────────────────────────── */
  .icon {
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: var(--radius-sm);
    background: rgba(245, 197, 24, 0.1);
    color: var(--yellow);
    transition: background 0.25s ease;
  }

  .icon :global(svg) {
    width: 22px;
    height: 22px;
  }

  .card:hover .icon {
    background: rgba(245, 197, 24, 0.18);
  }

  /* ── Body ─────────────────────────────────────────── */
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
  }

  .card-title {
    font-family: var(--font-heading), sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }

  .card-desc {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  /* ── Arrow ────────────────────────────────────────── */
  .arrow {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.25s ease, transform 0.25s ease;
  }

  .card:hover .arrow {
    color: var(--yellow);
    transform: translateX(3px);
  }

  /* ── Mobile ───────────────────────────────────────── */
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
