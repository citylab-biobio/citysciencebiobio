<script>
  let open = false;

  const sections = [

    { href: '#aliados',    label: 'Aliados'      },
    { href: '#agenda',   label: 'Agenda'    },
    { href: '#programa', label: 'Programa'   },
    { href: '#programa',  label: 'Masterclass' },
    { href: '#proyectos',    label: 'proyectos'      },
    { href: '#quienes',   label: 'Nosotros'     },
    { href: "#inicio", label: 'Inicio'      },
  ];

  const R = 158;

  const items = sections.map((s, i) => {
    const deg = (i / (sections.length - 1)) * 90; // 0° (up) → 90° (left)
    const rad = (deg * Math.PI) / 180;
    const x = -Math.sin(rad) * R;
    const y = -Math.cos(rad) * R;

    // Radial orientation, like the D3 sunburst arc labels: align the text
    // with the spoke from the center, then flip 180° so it never renders
    // upside-down (kept within the readable [-90°, 90°] range).
    let rot = (Math.atan2(y, x) * 180) / Math.PI;
    while (rot >  90) rot -= 180;
    while (rot <= -90) rot += 180;

    return { ...s, x, y, rot, idx: i };
  });

  function goto(href) {
    open = false;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

{#if open}
  <div class="backdrop" role="presentation" on:click={() => (open = false)}></div>
{/if}

<div class="radial-nav">
  {#each items as it}
    <div class="item" class:visible={open} style="--tx:{it.x}px; --ty:{it.y}px; --i:{it.idx}">
      <a
        href={it.href}
        class="item-link"
        style="transform: rotate({it.rot}deg)"
        aria-label={it.label}
        on:click|preventDefault={() => goto(it.href)}
      >{it.label}</a>
    </div>
  {/each}

  <button
    class="trigger"
    class:open
    aria-label="Navegación"
    on:click={() => (open = !open)}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 198;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: backdrop-in 0.25s ease forwards;
  }

  @keyframes backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .radial-nav {
    position: fixed;
    bottom: 2.5rem;
    right: 2.5rem;
    width: 52px;
    height: 52px;
    z-index: 199;
  }

  /* ── Trigger ─────────────────────────────────────── */
  .trigger {
    position: absolute;
    inset: 0;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(10, 10, 10, 0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    z-index: 2;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .trigger:hover {
    border-color: rgba(245, 197, 24, 0.45);
    box-shadow: 0 0 0 4px rgba(245, 197, 24, 0.08);
  }

  .trigger.open {
    border-color: rgba(245, 197, 24, 0.55);
    background: rgba(18, 18, 18, 0.95);
  }

  .trigger span {
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity   0.25s ease,
                width     0.25s ease;
    transform-origin: center;
  }

  .trigger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .trigger.open span:nth-child(2) { opacity: 0; width: 0; }
  .trigger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Items ───────────────────────────────────────── */
  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    /* closed: collapsed at trigger center */
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity   0.22s ease;
    transition-delay: 0ms;
  }

  .item.visible {
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1);
    opacity: 1;
    pointer-events: auto;
    transition-delay: calc(var(--i) * 40ms);
  }

  /* pill button — carries the static radial rotation via inline style */
  .item-link {
    display: inline-block;
    padding: 7px 14px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    font-family: var(--font-heading);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;
    background: rgba(10, 10, 10, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
  }

  .item-link:hover {
    background: var(--yellow);
    border-color: var(--yellow);
    color: #0a0a0a;
    box-shadow: 0 4px 20px rgba(245, 197, 24, 0.35);
  }

  /* ── Mobile ──────────────────────────────────────── */
  @media (max-width: 480px) {
    .radial-nav {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
</style>
