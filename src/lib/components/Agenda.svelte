<script>
  const days = [
    {
      day: 16,
      weekday: 'Martes',
      theme: 'Dirección política y estratégica',
      audience: 'GORE, SEREMIs, alcaldes, aliados estratégicos, academia y ecosistema regional.',
      objective: 'Presentar los proyectos del CLBB y mostrar el valor del lab como plataforma para el desarrollo territorial.',
      accent: '#f5c518',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdBp26IefYcL3pRc88K6VaPlMAjoTXSQvZfiw47PshnFvkj6g/viewform?usp=publish-editor',
      slots: ['12:00 hrs', '15:00 hrs', '17:00 hrs'],
    },
    {
      day: 17,
      weekday: 'Miércoles',
      theme: 'Dirección ejecutiva y validación técnica',
      audience: 'SECPLAN, servicios públicos, jefaturas, analistas territoriales, encargados SIG e investigadores.',
      objective: 'Validar aplicaciones prácticas, funcionalidades y oportunidades de uso institucional de las plataformas.',
      accent: '#4a9eff',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSf5KqBz11Vk9uuXZdAHam3zBRSWGTZ1VbYDKIunogJKv6tXOA/viewform?usp=publish-editor',
      slots: ['10:00 hrs', '12:00 hrs', '15:00 hrs', '17:00 hrs'],
    },
    {
      day: 18,
      weekday: 'Jueves',
      theme: 'Academia, innovación y comunidad',
      audience: 'Universidades, ecosistema de innovación, comunicaciones, colegios, juntas de vecinos y organizaciones comunitarias.',
      objective: 'Fortalecer el relato público y acercar la plataforma a la ciudadanía desde la educación y participación territorial.',
      accent: '#a78bfa',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSejBcpBZeQ2CJNifavFoJToA4FWovg6mgjcll4OjF3eO7zV4Q/viewform?usp=publish-editor',
      slots: ['10:00 hrs', '12:00 hrs', '15:00 hrs', '17:00 hrs'],
    }
  ];
</script>

<section id="agenda" class="section-padding" style="background: var(--bg)">
  <div class="container">

    <div class="header">
      <p class="section-label">● Visita guiadas - Cupos limitados por día</p>
      <h2 class="section-title">City Science Biobío Expo</h2>
    </div>

    <div class="days-grid">
      {#each days as d (d.day)}
        <div class="day-card glass" style="--accent: {d.accent}">
          <div class="day-header">
            <div class="day-num" style="color: {d.accent}">{d.weekday} {d.day}</div>
            <h3 class="day-theme">{d.theme}</h3>
          </div>

          <div class="day-body">
            <div class="day-section">
              <p class="day-section-label">Público objetivo</p>
              <p class="day-section-text">{d.audience}</p>
            </div>
            <div class="day-section">
              <p class="day-section-label">Objetivo</p>
              <p class="day-section-text">{d.objective}</p>
            </div>

            <div class="slots-grid">
              {#each d.slots as hour}
                <div class="slot">
                  <span class="slot-time" style="background: {d.accent}">{hour}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="day-footer">
            <a class="day-cta" href={d.link} target="_blank" rel="noopener noreferrer" style="--accent: {d.accent}">
              Inscribirse →
            </a>
          </div>

          <div class="day-accent-line" style="background: {d.accent}"></div>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .header {
    margin-bottom: 3rem;
  }

  .days-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 680px) {
    .days-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    .days-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .day-card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s, border-color 0.3s;
    border-bottom: 3px solid transparent;
    padding: 0;
  }

  .day-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
  }

  .day-header {
    padding: 1.75rem 1.75rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .day-num {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .day-theme {
    font-size: 1.05rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.3;
  }

  .day-body {
    padding: 1.5rem 1.75rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .day-section-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.35);
    margin-bottom: 0.35rem;
  }

  .day-section-text {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .slot {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
    text-align: center;
  }

  .slot-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.5);
  }

  .slot-time {
    display: inline-block;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #0a0a0a;
    letter-spacing: 0.02em;
  }

  .day-footer {
    padding: 0 1.75rem 1.5rem;
  }

  .day-cta {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 0.65rem 1.25rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--accent);
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    transition: background 0.25s, color 0.25s;
  }

  .day-cta:hover {
    background: var(--accent);
    color: #0a0a0a;
  }

  .day-accent-line {
    height: 3px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .day-card:hover .day-accent-line {
    opacity: 1;
  }
</style>
