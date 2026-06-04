<script>
  import '../app.css';
  import { onMount } from 'svelte';

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
