<script>
  import '../app.css';
  import { onMount, setContext } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { dict } from '$lib/i18n/dictionaries.js';

  export let data;

  // Per-render locale store (SSR-safe: initialized from server-resolved data).
  const locale = writable(data.locale);
  const t = derived(locale, ($l) => dict[$l] ?? dict.es);

  // Manual override: update store, persist in cookie, reflect on <html lang>.
  function setLocale(next) {
    if (!dict[next]) return;
    locale.set(next);
    if (typeof document !== 'undefined') {
      document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax`;
      document.documentElement.lang = next;
    }
  }

  setContext('i18n', { locale, t, setLocale });

  onMount(async () => {
    const Lenis = (await import('lenis')).default;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { if (lenis) lenis.destroy(); };
  });
</script>

<slot />
