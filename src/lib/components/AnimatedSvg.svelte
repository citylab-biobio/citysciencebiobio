<script>
  import { onMount } from 'svelte';
  import { decorations } from '$lib/decorations.js';

  // Reference a named preset from the registry. Pass `override` to tweak
  // a single instance without touching the registry (merged over the preset).
  export let preset = null;
  export let override = {};

  const DEFAULTS = {
    src:       null,
    direction: 'ltr',  // 'ltr' | 'rtl' | 'ttb' | 'btt' — which end reveals first
    width:     '100%',
    prerender: 0.5,    // 0–1 fraction shown immediately, rest on scroll
    reveal:    0.35    // viewport fraction over which the sweep completes
  };

  const cfg = { ...DEFAULTS, ...(preset ? decorations[preset] : {}), ...override };
  const { src, direction, width, prerender, reveal } = cfg;

  let wrapEl;

  onMount(() => {
    if (!src) {
      console.warn(`AnimatedSvg: no src (preset "${preset}" not found in registry)`);
      return;
    }

    let els   = [];
    let rafId;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function tick() {
      if (!els.length) return;

      const rect = wrapEl.getBoundingClientRect();
      const ih   = window.innerHeight;

      // p goes 0→1 as the divider's top edge sweeps from the viewport
      // bottom through `reveal`×100% of the viewport height.
      const p = Math.max(0, Math.min(1, (ih - rect.top) / (ih * reveal)));

      if (!reducedMotion) {
        const visible = Math.ceil(p * els.length);
        els.forEach((el, i) => {
          // Clearing inline opacity hands control back to the SVG's
          // CSS pulse animation for that element.
          el.style.opacity = i < visible ? '' : '0';
        });
      }

      rafId = requestAnimationFrame(tick);
    }

    fetch(src)
      .then(r => r.text())
      .then(markup => {
        const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
        const parsed = doc.querySelector('svg');
        if (!parsed) return;
        parsed.querySelectorAll('script').forEach(el => el.remove());
        parsed.querySelectorAll('*').forEach(el => {
          [...el.attributes].forEach(attr => {
            if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
          });
        });
        const svgEl = document.importNode(parsed, true);
        wrapEl.appendChild(svgEl);
        Object.assign(svgEl.style, { display: 'block', width: '100%', height: 'auto' });

        const horiz = direction === 'ltr' || direction === 'rtl';
        const desc  = direction === 'rtl' || direction === 'btt';

        // getBBox() gives element geometry in SVG user units — works for
        // any shape type (line, path, rect, circle, polygon …).
        const withPos = [
          ...svgEl.querySelectorAll('line, circle, path, rect, polygon, polyline, ellipse')
        ].map(el => {
          const b   = el.getBBox();
          const mid = horiz ? b.x + b.width  / 2
                             : b.y + b.height / 2;
          return { el, mid };
        }).sort((a, b) => desc ? b.mid - a.mid : a.mid - b.mid);

        // Randomly pick ~prerender% of elements to show immediately;
        // the rest reveal on scroll in sorted order.
        const shuffled = [...withPos].sort(() => Math.random() - 0.5);
        const splitAt  = Math.round(prerender * shuffled.length);
        const fixed    = new Set(shuffled.slice(0, splitAt).map(d => d.el));

        // Fixed elements keep no inline opacity, so their CSS pulse runs freely.
        els = withPos.filter(d => !fixed.has(d.el)).map(d => d.el);

        if (!reducedMotion) {
          els.forEach(el => {
            el.style.opacity    = '0';
            el.style.transition = 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
          });
        }

        rafId = requestAnimationFrame(tick);
      });

    return () => { if (rafId) cancelAnimationFrame(rafId); };
  });
</script>

<div bind:this={wrapEl} class="animated-svg" aria-hidden="true" style="width: {width}"></div>

<style>
  .animated-svg {
    line-height: 0; /* kill inline-block gap below SVG */
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }
</style>
