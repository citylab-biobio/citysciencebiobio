<script>
  import { getContext } from 'svelte';

  const { t } = getContext('i18n');

  const videoId = 'RsoWuDxilww';
</script>

<section id="streaming" class="section-padding">
  <div class="container">
    <p class="section-label">{$t.streaming.pill}</p>
    <h2 class="section-title yellow">{$t.streaming.title}</h2>
    <p class="body-text">{$t.streaming.description}</p>

    <div class="video-wrapper">
      <iframe
        src="https://www.youtube.com/embed/{videoId}"
        title={$t.streaming.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</section>

<style>
  .body-text {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.75;
    margin-bottom: 2rem;
    max-width: 640px;
  }

  .video-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 */
    border-radius: var(--radius-md);
    overflow: hidden;
    background: #000;
    border: 1px solid var(--glass-border);
  }

  .video-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
