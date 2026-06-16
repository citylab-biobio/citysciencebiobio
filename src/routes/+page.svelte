<script>
  import Hero from '$lib/components/Hero.svelte';
  import Streaming from '$lib/components/Streaming.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Schedule from '$lib/components/Schedule.svelte';
  import Agenda from '$lib/components/Agenda.svelte';
  import Partners from '$lib/components/Partners.svelte';
  import AnimatedSvg from '$lib/components/AnimatedSvg.svelte';
  import RadialNav from '$lib/components/RadialNav.svelte';
  import EventHub from "$lib/components/EventHub.svelte";
</script>

<RadialNav />

<main>
  <Hero />
  <!-- <Streaming /> -->
  <About />
  <AnimatedSvg preset="aboutProjects" />
  <Projects />
  <Schedule />
  <Agenda />
  <Partners />
</main>