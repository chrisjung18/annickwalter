<template>
  <section id="venues" class="section venues">
    <div class="section__inner">
      <NfLabel :label="c.venues.label" v-reveal />
      <h2 class="red-title venues__title" v-reveal>{{ c.venues.title }}</h2>
      <p class="caps venues__sub" v-reveal>{{ c.venues.sub }}</p>

      <div class="venues__grid">
        <article v-for="(v, i) in wedding.venues" :key="v.place" class="venue" v-reveal="i % 2 ? 'right' : 'left'">
          <div class="venue__media">
            <img :src="v.image" :alt="v.place" loading="lazy">
          </div>
          <div class="venue__body">
            <p class="venue__kind caps">{{ c.venues.kinds[i] }}</p>
            <h3 class="venue__place">{{ v.place }}</h3>
            <p class="venue__addr">{{ v.address }}</p>
            <a class="nf-btn nf-btn--ghost venue__route" :href="mapsUrl(v)" target="_blank" rel="noopener">
              <span class="material-icons-outlined" aria-hidden="true">near_me</span>
              {{ c.venues.route }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'
import NfLabel from 'components/NfLabel.vue'

defineOptions({
  name: 'VenuesSection'
})

const wedding = useWeddingStore()
const { c } = useContent()

const mapsUrl = v =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.place}, ${v.address}`)}`
</script>

<style scoped lang="scss">
.venues {
  background: var(--black);
}

.venues__title {
  margin: 1.2rem 0 0;
  font-size: clamp(2.4rem, 9vw, 4rem);
}

.venues__sub {
  margin: 0.3rem 0 2.2rem;
  color: var(--grey);
  font-size: 0.75rem;
}

.venues__grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
}

.venue {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
}

.venue__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s var(--ease-out);
  }
}

.venue:hover .venue__media img {
  transform: scale(1.06);
}

.venue__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 1.3rem 1.3rem 1.5rem;
}

.venue__kind {
  margin: 0;
  color: var(--mint);
  font-size: 0.68rem;
}

.venue__place {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.venue__addr {
  margin: 0 0 0.8rem;
  color: var(--grey);
  font-size: 0.9rem;
}
</style>
