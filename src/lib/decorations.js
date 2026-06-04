// Central registry of animated-SVG decorations.
// Each preset is consumed by <AnimatedSvg preset="..." />.
//
// Fields (all optional except src):
//   src        path to the SVG in /static                        (required)
//   direction  reveal order: 'ltr' | 'rtl' | 'ttb' | 'btt'       (default 'ltr')
//   width      CSS width of the wrapper                          (default '100%')
//   prerender  0–1 fraction shown immediately, rest reveal       (default 0.5)
//   reveal     viewport fraction over which the sweep completes  (default 0.35)
//
// To add a decoration: drop the SVG in /static/assets, give the lines/dots
// pulse classes (see lateral.svg), then add a named entry here.
export const decorations = {
  aboutProjects: {
    src: '/assets/lateral.svg',
    direction: 'rtl',
    width: '60%',
    prerender: 0.3
  },
  // Same line graphic, rendered rotated 90° (see Schedule.svelte) as a
  // vertical divider. 'ltr' sweeps top→bottom once rotated.
  scheduleDivider: {
    src: '/assets/lateral.svg',
    direction: 'ltr',
    width: '50%',
    prerender: 0.2
  },
  // CLBB logo — its 17 parts reveal top→bottom on scroll.
  clbbLogo: {
    src: '/assets/logo-clbb02.svg',
    direction: 'ttb',
    width: '170px',
    prerender: 0.15
  },
  // Trama header — reveals left→right as the closing shot enters the viewport.
  tramaEncabezado: {
    src: '/assets/trama_encabezado.svg',
    direction: 'ltr',
    width: '100%',
    prerender: 0.1,
    reveal: 0.5
  }
};
