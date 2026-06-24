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
      galeria: 'Galería',
      aliados: 'Aliados',
      streaming: 'En Vivo',
      hub: 'Hub',
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

    streaming: {
      pill: '● Transmisión en vivo',
      title: 'Mira de nuevo el evento',
      description: 'Conecta con el streaming de City Science Biobío 2026 desde la Biblioteca Central de la Universidad de Concepción.'
    },

    hub: {
      sectionLabel: '● Hub del evento',
      title: 'Todo el evento, en un solo lugar',
      intro: 'Accede en tiempo real a la transmisión, el programa, las plataformas y los recursos para vivir City Science Biobío.',
      resources: {
        stream:   { title: 'Transmisión en vivo', desc: 'Sigue las jornadas en directo desde la Biblioteca UdeC.' },
        register: { title: 'Inscripción',         desc: 'Reserva tu cupo para las visitas guiadas y la Masterclass.' },
        program:  { title: 'Programa',            desc: 'Revisa la agenda día a día, del 15 al 18 de junio.' },
        venue:    { title: 'Cómo llegar',         desc: 'Biblioteca Central, Universidad de Concepción.' },
        data:     { title: 'Catálogo de datos',   desc: 'Explora DataScope y los datos territoriales abiertos del Biobío.' },
        press:    { title: 'Prensa y medios',     desc: 'Descarga el kit de prensa, logos e imágenes del evento.' }
      }
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
        'Desarrollamos una intefaz que permite sentarnos en torno a los datos para analizar, discutir y visualizar más de 1.500 indicadores del territorio de forma integrada. Una herramienta pensada para impulsar el encuentro entre la academia, tomadores de decisión y comunidades, transformando la información compleja en conversaciones para mejorar nuestra ciudad.',
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
        linkLabel: 'Mira la masterclass acá →'
      },
      footerQuote:
        'Tecnología urbana con impacto: una mirada a cuatro años de innovación aplicada al Biobío, del MIT Media Lab a las plataformas de datos territoriales del CLBB.',
      closeTime: 'Del 16 al 18 de junio',
      closeVenue: 'Biblioteca UdeC'
    },

    gallery: {
      sectionLabel: 'Galería',
      titleHtml: 'Cuatro años<br/>en imágenes',
      intro: 'Un recorrido visual por Expo City Science Biobío 2026'
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
        'City Science Biobío 2026 — Urban technology with real-world impact. City Lab Biobío showcases four years of urban innovation. Concepción, June 15–18.',
      ogDescription: 'Shaping the future of Biobío through city science.'
    },

    nav: {
      inicio: 'Home',
      nosotros: 'About',
      proyectos: 'Projects',
      masterclass: 'Masterclass',
      galeria: 'Gallery',
      aliados: 'Partners',
      streaming: 'Live',
      hub: 'Hub',
      menuAria: 'Navigation',
      langAria: 'Change language'
    },

    hero: {
      pill: 'Urban technology with real-world impact',
      leadHtml: 'City Lab Biobío showcases <strong>four years of urban innovation</strong>',
      dates: 'June 15–18, 2026',
      venue: 'Central Library, Universidad de Concepción',
      scrollHint: 'Scroll to explore'
    },

    streaming: {
      pill: '● Live stream',
      title: 'Watch the event again',
      description: 'Catch the City Science Biobío 2026 stream from the Central Library at Universidad de Concepción.'
    },

    hub: {
      sectionLabel: '● Event hub',
      title: 'The whole event, in one place',
      intro: 'Get real-time access to the livestream, the program, the platforms and everything you need to experience City Science Biobío.',
      resources: {
        stream:   { title: 'Live stream',    desc: 'Follow the sessions live from the UdeC Library.' },
        register: { title: 'Registration',   desc: 'Reserve your spot for the guided tours and the Masterclass.' },
        program:  { title: 'Program',        desc: 'Browse the day-by-day agenda, June 15–18.' },
        venue:    { title: 'Getting there',  desc: 'Central Library, Universidad de Concepción.' },
        data:     { title: 'Data catalog',   desc: 'Explore DataScope and Biobío\'s open territorial data.' },
        press:    { title: 'Press & media',  desc: 'Download the press kit, logos and event imagery.' }
      }
    },

    about: {
      pill: 'Who We Are',
      leadHtml:
        'Our core mission is <strong>scenario modeling to anticipate the consequences of urban decisions</strong> — putting data science to work in support of smarter, more equitable city planning.',
      transferHtml:
        'We pursue this through <strong>the technology and expertise developed at MIT City Science</strong>.',
      imgAlt: 'Urban data science in action',
      place: 'Concepción, Chile — June 2026',
      headlineHtml: 'Urban technology<br/>with impact',
      conceptoText:
        'The future of Biobío, reimagined through city science. We now have more data, sharper tools, and world-class expertise to address the urban challenges that will define the next generation.',
      expansionHtml:
        '<strong>City Science Biobío</strong> marks the beginning of a new chapter — as the lab and its platforms expand to cities across Chile and South America.'
    },

    projects: {
      title: 'Projects',
      intro:
        'Explore the technologies we have built for urban science at the southern tip of the world',
      descriptions: [
        'Built from thousands of LEGO bricks, this hands-on tool reframes the conversation about the city\'s future as something tangible, playful, and open to everyone. An invitation to imagine, challenge, and grasp the real-life impact that upcoming urban projects will have on daily life along the Costanera waterfront in Concepción.',
        'In partnership with Waze, we built a web-based viewer that reveals patterns of congestion and road accidents across Chilean cities. The platform transforms real-time data into a new way of reading urban mobility — prompting researchers and decision-makers to explore how straightforward, place-aware choices can reshape how people move.',
        'Working alongside the Port of Talcahuano, we created a digital platform that gives its technical teams the tools to assess existing urban projects and prototype new scenarios — using both static and live data to make the future legible before it is built.',
        'Together with Deep-Hub and Imagine-IT, we built an emergency viewer that tracks critical infrastructure and at-risk populations in real time during disaster events. A platform built for action: enabling fast, evidence-based decisions that can change the outcome when every minute counts.',
        'We built an interactive data platform that brings stakeholders together around more than 1,500 regional indicators in a shared, integrated view. Designed to bridge academia, policymakers, and communities, it turns complex datasets into productive conversations about the future of our city.',
        'We designed the most comprehensive and up-to-date territorial data catalog in the Biobío region — a free, open-access web platform where researchers, students, and technical teams from both public and private sectors can find the data they need to understand, interrogate, and plan for the territory\'s future.',
        'We built a digital platform centered on the co-design of public spaces, transforming civic participation into a collective, forward-looking experience. Backed by artificial intelligence, this creative research tool translates community ideas, aspirations, and tensions into concrete spatial scenarios — making it possible to build cities from the ground up, starting with the people who live in them.'
      ]
    },

    schedule: {
      masterclass: {
        caption: '#Masterclass',
        title: 'Designing the future of mobility',
        sub: 'Naroa Coretti — Research Scientist, MIT Media Lab',
        paras: [
          'What if we could stress-test the future of our cities before committing to build it? Naroa Coretti, Research Scientist at MIT City Science, will show how advanced simulation and data-driven models are changing the way we understand, design, and govern urban mobility systems.',
          'At City Science Biobío, she will demonstrate how city simulation enables teams to anticipate the outcomes of planning decisions and design more resilient, sustainable territories.'
        ],
        meta: 'Jun 16 · 2026 — Concepción, Chile',
        linkLabel: 'Watch the Masterclass here →'
      },
      footerQuote:
        'Urban technology with impact: four years of applied innovation in Biobío — from the MIT Media Lab to CLBB\'s suite of territorial data platforms.',
      closeTime: 'June 16–18',
      closeVenue: 'UdeC Library'
    },

    gallery: {
      sectionLabel: 'Gallery',
      titleHtml: 'Four years<br/>in pictures',
      intro: 'A visual tour through City Science Biobío Expo.'
    },

    agenda: {
      sectionLabel: '● Guided tours — Limited places per day',
      publicoObjetivo: 'Audience',
      objetivo: 'Goal',
      inscribirse: 'Register →',
      days: [
        {
          weekday: 'Tuesday',
          theme: 'Political and strategic leadership',
          audience: 'Regional government officials, ministerial secretariats, mayors, strategic partners, academia, and the regional innovation ecosystem.',
          objective: 'Showcase CLBB\'s project portfolio and demonstrate the lab\'s value as a platform for evidence-based territorial development.'
        },
        {
          weekday: 'Wednesday',
          theme: 'Executive leadership and technical validation',
          audience: 'Urban planning offices, public agencies, department heads, territorial analysts, GIS specialists, and researchers.',
          objective: 'Validate real-world applications, platform capabilities, and pathways for institutional adoption.'
        },
        {
          weekday: 'Thursday',
          theme: 'Academia, innovation and community',
          audience: 'Universities, innovation hubs, media, schools, neighborhood associations, and community organizations.',
          objective: 'Broaden the public narrative and connect the platform with citizens through education, outreach, and community-led territorial engagement.'
        }
      ]
    },

    partners: {
      sectionLabel: '● Organizers and partners',
      titleHtml: 'The organizations that make<br />this event possible',
      invita: 'Host',
      aliados: 'Partners',
      auspicia: 'Sponsor',
      patrocina: 'Endorsed by',
      mediaPartner: 'Media partner',
      tagline: 'City Lab Biobío — City science from the southern tip of the world',
      eventDate: 'June 15–18 · Concepción',
      venue: 'Central Library, Universidad de Concepción',
      copyright: '© 2026 City Lab Biobío. All rights reserved.'
    }
  },
  de: {
    meta: {
      description:
        'City Science Biobío 2026 – Urbane Technologie mit Wirkung. City Lab Biobío zeigt vier Jahre Stadtinnovation aus dem Süden der Welt. Concepción, 15.–18. Juni.',
      ogDescription: 'Die Zukunft von Biobío – gestaltet durch Stadtforschung.'
    },

    nav: {
      inicio: 'Startseite',
      nosotros: 'Über uns',
      proyectos: 'Projekte',
      masterclass: 'Masterclass',
      galeria: 'Galerie',
      aliados: 'Partner',
      streaming: 'Live',
      hub: 'Hub',
      menuAria: 'Navigation',
      langAria: 'Sprache wechseln'
    },

    hero: {
      pill: 'Urbane Technologie mit Wirkung',
      leadHtml: 'City Lab Biobío zeigt <strong>vier Jahre Stadtinnovation</strong>',
      dates: '15.–18. Juni 2026',
      venue: 'Zentralbibliothek, Universidad de Concepción',
      scrollHint: 'Scrollen und entdecken'
    },

    streaming: {
      pill: '● Live-Übertragung',
      title: 'Sehen Sie das Event erneut',
      description: 'Sehen Sie sich den Stream von City Science Biobío 2026 aus der Zentralbibliothek der Universidad de Concepción an.'
    },

    hub: {
      sectionLabel: '● Event-Hub',
      title: 'Das ganze Event an einem Ort',
      intro: 'Greifen Sie in Echtzeit auf den Livestream, das Programm, die Plattformen und alle Ressourcen rund um City Science Biobío zu.',
      resources: {
        stream:   { title: 'Livestream',      desc: 'Verfolgen Sie die Veranstaltungstage live aus der UdeC-Bibliothek.' },
        register: { title: 'Anmeldung',       desc: 'Sichern Sie sich Ihren Platz für die Rundgänge und die Masterclass.' },
        program:  { title: 'Programm',        desc: 'Sehen Sie sich das Tagesprogramm vom 15.–18. Juni an.' },
        venue:    { title: 'Anfahrt',         desc: 'Zentralbibliothek, Universidad de Concepción.' },
        data:     { title: 'Datenkatalog',    desc: 'Entdecken Sie DataScope und die offenen Geodaten der Region Biobío.' },
        press:    { title: 'Presse & Medien', desc: 'Laden Sie das Pressekit, Logos und Bildmaterial herunter.' }
      }
    },

    about: {
      pill: 'Wer wir sind',
      leadHtml:
        'Unser zentrales Ziel ist die <strong>Szenarienmodellierung zur Folgenabschätzung städtebaulicher Entscheidungen</strong> — als datengestützte Grundlage für eine zukunftsfähige Stadtplanung.',
      transferHtml:
        'Dabei setzen wir auf <strong>die Technologien und das Fachwissen von MIT City Science</strong>.',
      imgAlt: 'Urbane Datenanalyse in der Praxis',
      place: 'Concepción, Chile — Juni 2026',
      headlineHtml: 'Urbane Technologie<br/>mit Wirkung',
      conceptoText:
        'Die Zukunft von Biobío — neu gedacht mit den Methoden der Stadtforschung. Mit mehr Daten, leistungsfähigeren Werkzeugen und international anerkannter Expertise entwickeln wir Antworten auf die urbanen Herausforderungen der nächsten Generationen.',
      expansionHtml:
        '<strong>City Science Biobío</strong> markiert den Beginn eines neuen Kapitels: Das Labor und seine Plattformen wachsen über die Region hinaus — in weitere Städte Chiles und Südamerikas.'
    },

    projects: {
      title: 'Projekte',
      intro:
        'Entdecken Sie die Technologien, die wir für die Stadtforschung am südlichen Ende der Welt entwickelt haben',
      descriptions: [
        'Aus Tausenden von LEGO-Steinen gebaut, macht dieses Werkzeug Stadtplanung greifbar: Es verwandelt abstrakte Debatten über die Zukunft der Stadt in ein spielerisches, gemeinsames Erlebnis für alle. Eine Einladung, die konkreten Auswirkungen künftiger Stadtprojekte auf den Alltag am Costanera-Ufer in Concepción zu erkunden, zu hinterfragen — und mitzugestalten.',
        'Gemeinsam mit Waze haben wir einen webbasierten Viewer entwickelt, der Stau- und Unfallmuster in chilenischen Städten sichtbar macht. Die Plattform übersetzt Echtzeitdaten in ein neues Verständnis urbaner Mobilität — und zeigt Forschenden wie Entscheidungsträgern, wie gezielte, ortsbezogene Maßnahmen den städtischen Verkehr nachhaltig verändern können.',
        'Im Auftrag des Hafens von Talcahuano haben wir eine digitale Plattform entwickelt, mit der technische Teams bestehende Stadtprojekte bewerten und neue Szenarien entwickeln können — auf Basis statischer wie auch aktueller Daten, um Entscheidungen fundiert zu treffen, bevor sie umgesetzt werden.',
        'Zusammen mit Deep-Hub und Imagine-IT haben wir ein Einsatzwerkzeug für Katastrophenschutzlagen entwickelt: ein Echtzeit-Viewer, der kritische Infrastrukturen und gefährdete Bevölkerungsgruppen überwacht. Schnelle, datenbasierte Entscheidungen — genau dann, wenn es darauf ankommt.',
        'Wir haben eine interaktive Analyseplattform entwickelt, die Akteuren aus Wissenschaft, Politik und Zivilgesellschaft einen gemeinsamen Blick auf über 1.500 raumbezogene Indikatoren ermöglicht. Komplexe Daten werden so zu produktiven Gesprächen über die Zukunft unserer Stadt.',
        'Wir haben den umfassendsten und aktuellsten Geodatenkatalog der Region Biobío aufgebaut — eine frei zugängliche Webplattform, über die Forschungseinrichtungen, Studierende sowie Fachkräfte aus dem öffentlichen und privaten Sektor gezielt auf die Daten zugreifen können, die sie für Analyse, Planung und Entscheidungsfindung benötigen.',
        'Wir haben eine digitale Plattform zur ko-kreativen Gestaltung öffentlicher Räume entwickelt, die Bürgerbeteiligung neu definiert: kollektiv, innovativ und wirkungsorientiert. Unterstützt durch Künstliche Intelligenz, übersetzt dieses Forschungswerkzeug Ideen, Wünsche und Spannungen aus der Stadtgesellschaft in konkrete räumliche Szenarien — und macht es möglich, Städte von Grund auf mit und für ihre Bewohnerinnen und Bewohner zu gestalten.'
      ]
    },

    schedule: {
      masterclass: {
        caption: '#Masterclass',
        title: 'Mobilität der Zukunft — Szenarien, Daten, Entscheidungen',
        sub: 'Naroa Coretti — Research Scientist, MIT Media Lab',
        paras: [
          'Was wäre, wenn wir die Zukunft unserer Städte erproben könnten, bevor wir sie bauen? Naroa Coretti, Research Scientist am MIT City Science, zeigt, wie fortschrittliche Simulation und datengestützte Modelle die Planung, das Design und die Steuerung urbaner Mobilitätssysteme grundlegend verändern.',
          'Bei City Science Biobío präsentiert sie, wie Stadtsimulation Teams in die Lage versetzt, die Folgen von Planungsentscheidungen vorauszudenken und widerstandsfähigere, lebenswertere Stadtgebiete zu entwickeln.'
        ],
        meta: '16. Juni · 2026 — Concepción, Chile',
        linkLabel: 'Masterclass hier ansehen →'
      },
      footerQuote:
        'Urbane Technologie mit Wirkung: Vier Jahre angewandte Stadtforschung in Biobío — vom MIT Media Lab bis zu den raumbezogenen Datenplattformen des CLBB.',
      closeTime: '16.–18. Juni',
      closeVenue: 'Bibliothek der UdeC'
    },

    gallery: {
      sectionLabel: 'Galerie',
      titleHtml: 'Vier Jahre<br/>in Bildern',
      intro: 'Ein visueller Rundgang durch die City Science Biobío Expo.'
    },

    agenda: {
      sectionLabel: '● Geführte Rundgänge — Begrenzte Teilnehmerzahl pro Tag',
      publicoObjetivo: 'Zielgruppe',
      objetivo: 'Ziel',
      inscribirse: 'Anmelden →',
      days: [
        {
          weekday: 'Dienstag',
          theme: 'Politik, Strategie und Steuerung',
          audience: 'Regionalregierung, Ministerialbehörden, Bürgermeister, strategische Partner, Wissenschaft und das regionale Innovationsumfeld.',
          objective: 'Das Projektportfolio des CLBB vorstellen und den Mehrwert des Labors als Plattform für evidenzbasierte Regionalentwicklung aufzeigen.'
        },
        {
          weekday: 'Mittwoch',
          theme: 'Verwaltung, Fachebene und technische Validierung',
          audience: 'Stadtplanungsämter, Behörden, Führungskräfte, Geoinformationsspezialistinnen und -spezialisten, Raumanalysten sowie Forschende.',
          objective: 'Praxistauglichkeit, Funktionsumfang und Potenziale für die institutionelle Nutzung der Plattformen prüfen und validieren.'
        },
        {
          weekday: 'Donnerstag',
          theme: 'Wissenschaft, Innovation und Stadtgesellschaft',
          audience: 'Hochschulen, Innovationsnetzwerke, Medien, Schulen, Bürgervereine und zivilgesellschaftliche Organisationen.',
          objective: 'Die gesellschaftliche Relevanz des Labors stärken und die Plattform durch Bildung und partizipative Stadtentwicklung in der breiten Öffentlichkeit verankern.'
        }
      ]
    },

    partners: {
      sectionLabel: '● Veranstalter und Partner',
      titleHtml: 'Die Organisationen, die dieses<br />Event möglich machen',
      invita: 'Ausrichter',
      aliados: 'Partner',
      auspicia: 'Förderer',
      patrocina: 'Schirmherrschaft',
      mediaPartner: 'Medienpartner',
      tagline: 'City Lab Biobío — Stadtforschung vom südlichen Ende der Welt',
      eventDate: '15.–18. Juni · Concepción',
      venue: 'Zentralbibliothek, Universidad de Concepción',
      copyright: '© 2026 City Lab Biobío. Alle Rechte vorbehalten.'
    }
  }
};
