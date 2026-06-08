// Single source of all user-facing copy, per locale.
// Namespaced by component. Arrays preserve order — components index by position.
// Values ending in `Html` contain trusted inline markup (<strong>/<br>) and are
// rendered with {@html}. Brand names, URLs, accents and numeric dates stay in
// the components, not here.

export const dict = {
  es: {
    meta: {
      description:
        'City Science Biobío 2026 — Tecnología urbana con impacto. City Lab Biobío expone 4 años de innovación en la ciudad. Concepción, 15 al 18 de junio.',
      ogDescription: 'El futuro del Biobío, visto con ciencia de ciudad.'
    },

    nav: {
      inicio: 'Inicio',
      nosotros: 'Nosotros',
      proyectos: 'Proyectos',
      masterclass: 'Masterclass',
      agenda: 'Agenda',
      aliados: 'Aliados',
      menuAria: 'Navegación',
      langAria: 'Cambiar idioma'
    },

    hero: {
      pill: 'Tecnología urbana con impacto',
      leadHtml: 'City Lab Biobío expone <strong>cuatro años de innovación</strong> en la ciudad',
      dates: '15 al 18 de junio, 2026',
      venue: 'Biblioteca Central, Universidad de Concepción',
      scrollHint: 'Desliza para conocer nuestro evento'
    },

    about: {
      pill: '¿Quiénes Somos?',
      leadHtml:
        'Nuestro principal objetivo es la <strong>modelación de escenarios para anticipar el impacto de las decisiones urbanas</strong>, como una forma de apoyar con ciencia de datos la planificación de las ciudades.',
      transferHtml:
        'Para ello, utiliza <strong>la tecnología y la transferencia de conocimientos del MIT City Science</strong>.',
      imgAlt: 'Modelación urbana con ciencia de datos',
      place: 'Concepción, Chile — junio 2026',
      headlineHtml: 'Tecnología urbana<br/>con impacto',
      conceptoText:
        'El futuro del Biobío, visto con ciencia de ciudad. Hoy, contamos con más datos, más herramientas y una capacidad instalada de clase mundial para construir soluciones a los desafíos urbanos de las próximas generaciones.',
      expansionHtml:
        'En <strong>City Science Biobío</strong> marcaremos el inicio de la expansión del laboratorio y sus tecnologías hacia otras ciudades del país y Sudamérica.'
    },

    projects: {
      title: 'Proyectos',
      intro:
        'Te invitamos a conocer las tecnologías desarrolladas para la ciencia de ciudad al sur del mundo',
      descriptions: [
        'A través de una maqueta construida con miles de piezas LEGO, esta herramienta transforma la conversación sobre el futuro de la ciudad en una experiencia tangible, lúdica y colectiva para todo público. Una invitación a imaginar, cuestionar y comprender el impacto real que tendrán los proyectos urbanos futuros en la vida cotidiana del sector de la Costanera de Concepción.',
        'En alianza con Waze, se desarrolló un visor web que permite comprender patrones de congestión y accidentes vehiculares en diferentes ciudades de Chile. Una plataforma que convierte datos en tiempo real en una nueva forma de entender la movilidad, invitando a académicos y tomadores de decisión a investigar y explorar, cómo la movilidad puede transformarse con decisiones simples y conectadas con un territorio dinámico.',
        'Junto a Puertos de Talcahuano se creó una plataforma digital que permite a sus equipos técnicos evaluar proyectos urbanos existentes e imaginar nuevos escenarios utilizando datos estáticos y en tiempo real, para hacer visible el futuro antes de construirlo.',
        'En alianza con Deep-Hub e Imagine-IT, creamos un visor de emergencia que permite monitorear en tiempo real infraestructuras críticas y población potencialmente en riesgo de verse afectada ante situaciones de desastres. Una plataforma pensada para actuar y tomar decisiones basadas en datos capaces de cambiar el desenlace en una situación de emergencia.',
        'Desarrollamos una mesa digital que permite sentarnos en torno a los datos para analizar, discutir y visualizar más de 1.500 indicadores del territorio de forma integrada. Una herramienta pensada para impulsar el encuentro entre la academia, tomadores de decisión y comunidades, transformando la información compleja en conversaciones para mejorar nuestra ciudad.',
        'Diseñamos el catálogo de datos territoriales actualizado más grande de la región del Biobío, una plataforma web de libre acceso para que la academia, estudiantes y equipos técnicos del sector público y privado puedan acceder, de forma simple y ordenada, a los datos que necesitan para entender el territorio, cuestionarlo y proyectar mejores decisiones para su futuro.',
        'Creamos una plataforma digital centrada en el diseño de espacios públicos que transforma la participación ciudadana en una experiencia colectiva e innovadora. Apoyada por inteligencia artificial, esta herramienta de investigación creativa, convierte ideas, deseos y tensiones urbanas en escenarios visibles, abriendo la posibilidad de construir ciudades también desde los sueños de quienes las habitan.'
      ]
    },

    schedule: {
      masterclass: {
        caption: '#Masterclass',
        title: 'Modelando el futuro de la movilidad',
        sub: 'Naroa Coretti - Research Scientist MIT Media Lab',
        paras: [
          '¿Qué pasaría si pudiéramos probar el futuro de nuestras ciudades antes de construirlo? Naroa Coretti, investigadora científica de MIT City Science explorará cómo la simulación avanzada y los modelos basados en datos están transformando la forma en que entendemos, diseñamos y gestionamos los sistemas de movilidad del futuro.',
          'En City Science Biobío presentará cómo la simulación de ciudad permite anticipar decisiones urbanas y diseñar territorios más sostenibles.'
        ],
        meta: '16 Jun · 2026 — Concepción, Chile',
        linkLabel: 'Inscribirse en la Masterclass →'
      },
      footerQuote:
        'Tecnología urbana con impacto: una mirada a cuatro años de innovación aplicada al Biobío, del MIT Media Lab a las plataformas de datos territoriales del CLBB.',
      closeTime: 'Del 16 al 18 de junio',
      closeVenue: 'Biblioteca UdeC'
    },

    agenda: {
      sectionLabel: '● Visitas guiadas - Cupos limitados por día',
      publicoObjetivo: 'Público objetivo',
      objetivo: 'Objetivo',
      inscribirse: 'Inscribirse →',
      days: [
        {
          weekday: 'Martes',
          theme: 'Dirección política y estratégica',
          audience: 'GORE, SEREMIs, alcaldes, aliados estratégicos, academia y ecosistema regional.',
          objective: 'Presentar los proyectos del CLBB y mostrar el valor del lab como plataforma para el desarrollo territorial.'
        },
        {
          weekday: 'Miércoles',
          theme: 'Dirección ejecutiva y validación técnica',
          audience: 'SECPLAN, servicios públicos, jefaturas, analistas territoriales, encargados SIG e investigadores.',
          objective: 'Validar aplicaciones prácticas, funcionalidades y oportunidades de uso institucional de las plataformas.'
        },
        {
          weekday: 'Jueves',
          theme: 'Academia, innovación y comunidad',
          audience: 'Universidades, ecosistema de innovación, comunicaciones, colegios, juntas de vecinos y organizaciones comunitarias.',
          objective: 'Fortalecer el relato público y acercar la plataforma a la ciudadanía desde la educación y participación territorial.'
        }
      ]
    },

    partners: {
      sectionLabel: '● Organizadores y aliados',
      titleHtml: 'Quienes hacen<br />posible el evento',
      invita: 'Invita',
      aliados: 'Aliados',
      auspicia: 'Auspicia',
      patrocina: 'Patrocina',
      mediaPartner: 'Media partner',
      tagline: 'City Lab Biobío — Ciencia de ciudad al sur del mundo',
      eventDate: '15 – 18 junio · Concepción',
      venue: 'Biblioteca Central, Universidad de Concepción',
      copyright: '© 2026 City Lab Biobío. Todos los derechos reservados.'
    }
  },

  en: {
    meta: {
      description:
        'City Science Biobío 2026 — Urban technology with impact. City Lab Biobío presents 4 years of innovation in the city. Concepción, June 15–18.',
      ogDescription: 'The future of Biobío, seen through city science.'
    },

    nav: {
      inicio: 'Home',
      nosotros: 'About',
      proyectos: 'Projects',
      masterclass: 'Masterclass',
      agenda: 'Agenda',
      aliados: 'Partners',
      menuAria: 'Navigation',
      langAria: 'Change language'
    },

    hero: {
      pill: 'Urban technology with impact',
      leadHtml: 'City Lab Biobío presents <strong>four years of innovation</strong> in the city',
      dates: 'June 15–18, 2026',
      venue: 'Central Library, Universidad de Concepción',
      scrollHint: 'Scroll to explore our event'
    },

    about: {
      pill: 'Who We Are',
      leadHtml:
        'Our main goal is the <strong>modeling of scenarios to anticipate the impact of urban decisions</strong>, as a way to support city planning with data science.',
      transferHtml:
        'To do so, it draws on <strong>the technology and knowledge transfer of MIT City Science</strong>.',
      imgAlt: 'Urban modeling with data science',
      place: 'Concepción, Chile — June 2026',
      headlineHtml: 'Urban technology<br/>with impact',
      conceptoText:
        'The future of Biobío, seen through city science. Today we have more data, more tools and world-class installed capacity to build solutions to the urban challenges of the coming generations.',
      expansionHtml:
        'At <strong>City Science Biobío</strong> we will mark the beginning of the lab\'s expansion and its technologies toward other cities across the country and South America.'
    },

    projects: {
      title: 'Projects',
      intro:
        'We invite you to discover the technologies developed for city science at the southern end of the world',
      descriptions: [
        'Through a model built with thousands of LEGO pieces, this tool turns the conversation about the future of the city into a tangible, playful and collective experience for everyone. An invitation to imagine, question and understand the real impact that future urban projects will have on everyday life along the Costanera waterfront in Concepción.',
        'In partnership with Waze, we developed a web viewer that helps understand patterns of congestion and traffic accidents across different cities in Chile. A platform that turns real-time data into a new way of understanding mobility, inviting academics and decision-makers to investigate and explore how mobility can be transformed through simple decisions connected to a dynamic territory.',
        'Together with the Port of Talcahuano, we built a digital platform that lets its technical teams evaluate existing urban projects and imagine new scenarios using static and real-time data, to make the future visible before building it.',
        'In partnership with Deep-Hub and Imagine-IT, we created an emergency viewer that monitors critical infrastructure and populations potentially at risk in real time during disaster situations. A platform designed to act and make data-driven decisions capable of changing the outcome in an emergency.',
        'We developed a digital table that lets us gather around the data to analyze, discuss and visualize more than 1,500 territorial indicators in an integrated way. A tool designed to foster encounters between academia, decision-makers and communities, turning complex information into conversations to improve our city.',
        'We designed the largest up-to-date catalog of territorial data in the Biobío region — a free, open web platform so that academia, students and technical teams from the public and private sectors can access, simply and clearly, the data they need to understand the territory, question it and project better decisions for its future.',
        'We created a digital platform focused on the design of public spaces that turns citizen participation into a collective and innovative experience. Powered by artificial intelligence, this creative research tool turns ideas, desires and urban tensions into visible scenarios, opening up the possibility of building cities also from the dreams of those who inhabit them.'
      ]
    },

    schedule: {
      masterclass: {
        caption: '#Masterclass',
        title: 'Modeling the future of mobility',
        sub: 'Naroa Coretti - Research Scientist, MIT Media Lab',
        paras: [
          'What if we could test the future of our cities before building it? Naroa Coretti, research scientist at MIT City Science, will explore how advanced simulation and data-driven models are transforming the way we understand, design and manage the mobility systems of the future.',
          'At City Science Biobío she will present how city simulation makes it possible to anticipate urban decisions and design more sustainable territories.'
        ],
        meta: 'Jun 16 · 2026 — Concepción, Chile',
        linkLabel: 'Register for the Masterclass →'
      },
      footerQuote:
        'Urban technology with impact: a look at four years of innovation applied to Biobío, from the MIT Media Lab to CLBB\'s territorial data platforms.',
      closeTime: 'June 16–18',
      closeVenue: 'UdeC Library'
    },

    agenda: {
      sectionLabel: '● Guided tours — Limited spots per day',
      publicoObjetivo: 'Target audience',
      objetivo: 'Objective',
      inscribirse: 'Register →',
      days: [
        {
          weekday: 'Tuesday',
          theme: 'Political and strategic leadership',
          audience: 'Regional government, ministerial secretariats, mayors, strategic partners, academia and the regional ecosystem.',
          objective: 'Present the CLBB projects and show the value of the lab as a platform for territorial development.'
        },
        {
          weekday: 'Wednesday',
          theme: 'Executive leadership and technical validation',
          audience: 'Planning departments, public services, managers, territorial analysts, GIS leads and researchers.',
          objective: 'Validate practical applications, features and opportunities for institutional use of the platforms.'
        },
        {
          weekday: 'Thursday',
          theme: 'Academia, innovation and community',
          audience: 'Universities, innovation ecosystem, communications, schools, neighborhood associations and community organizations.',
          objective: 'Strengthen the public narrative and bring the platform closer to citizens through education and territorial participation.'
        }
      ]
    },

    partners: {
      sectionLabel: '● Organizers and partners',
      titleHtml: 'The people who make<br />the event possible',
      invita: 'Host',
      aliados: 'Partners',
      auspicia: 'Sponsor',
      patrocina: 'Endorsed by',
      mediaPartner: 'Media partner',
      tagline: 'City Lab Biobío — City science at the southern end of the world',
      eventDate: 'June 15–18 · Concepción',
      venue: 'Central Library, Universidad de Concepción',
      copyright: '© 2026 City Lab Biobío. All rights reserved.'
    }
  }
};
