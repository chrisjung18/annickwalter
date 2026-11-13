<template>
  <section id="dress" class="section dress">
    <div class="section__inner">
      <NfLabel :label="c.dress.label" v-reveal />
      <h2 class="red-title dress__title" v-reveal>{{ c.dress.title }}</h2>
      <p class="script dress__theme" v-reveal>{{ c.dress.theme }}</p>

      <div class="dress__row" v-reveal>
        <p class="dress__line">
          <span class="caps">{{ c.dress.dayLabel }}</span>
          <strong>{{ c.dress.dayValue }}</strong>
          <em>{{ c.dress.dayNote }}</em>
        </p>
        <div class="dress__imgs">
          <img v-for="(src, i) in wedding.dressDay" :key="src" :src="src" :alt="c.dress.dayAlt" loading="lazy" v-reveal="'rise'" :style="{ '--reveal-delay': `${i * 120}ms` }">
        </div>
      </div>

      <div class="dress__row" v-reveal>
        <p class="dress__line">
          <span class="caps">{{ c.dress.eveningLabel }}</span>
          <strong>{{ c.dress.eveningValue }}</strong>
          <em>{{ c.dress.eveningNote }}</em>
        </p>
        <div class="dress__imgs">
          <img v-for="(src, i) in wedding.dressEvening" :key="src" :src="src" :alt="c.dress.eveningAlt" loading="lazy" v-reveal="'rise'" :style="{ '--reveal-delay': `${i * 120}ms` }">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'
import NfLabel from 'components/NfLabel.vue'

defineOptions({
  name: 'DressSection'
})

const wedding = useWeddingStore()
const { c } = useContent()
</script>

<style scoped lang="scss">
.dress {
  background: var(--black);
  text-align: center;
}

.dress__title {
  margin: 1.2rem 0 0;
  font-size: clamp(2.4rem, 9vw, 4rem);
}

.dress__theme {
  margin: 0.2rem 0 2.2rem;
  font-size: clamp(1.8rem, 6.5vw, 2.6rem);
}

.dress__row {
  max-width: 46rem;
  margin: 0 auto 2.4rem;
}

.dress__line {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0 0 1rem;

  .caps {
    color: var(--grey);
    font-size: 0.7rem;
  }

  strong {
    color: var(--gold);
    font-size: 1.2rem;
    font-weight: 600;
  }

  em {
    color: var(--grey);
    font-size: 0.85rem;
  }
}

.dress__imgs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>
