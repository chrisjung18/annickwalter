<template>
  <section class="band" aria-label="date">
    <img class="band__img" :src="wedding.images.dateStrip" alt="">
    <div class="band__shade" aria-hidden="true" />
    <div class="band__inner">
      <p class="band__weekday caps" v-reveal="'fade'">{{ weekday }}</p>
      <p class="band__day" v-reveal="'rise'">{{ day }}</p>
      <p class="band__month caps reveal--track" v-reveal="'track'">{{ month }}</p>
      <p class="band__year" v-reveal="'fade'">{{ year }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'

defineOptions({
  name: 'DateBand'
})

const wedding = useWeddingStore()
const { locale } = useContent()

const part = opts => new Intl.DateTimeFormat(locale.value, { timeZone: wedding.timeZone, ...opts }).format(wedding.date)

const weekday = computed(() => part({ weekday: 'long' }))
const day = computed(() => part({ day: 'numeric' }))
const month = computed(() => part({ month: 'long' }))
const year = computed(() => part({ year: 'numeric' }))
</script>

<style scoped lang="scss">
.band {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 26rem;
  overflow: hidden;
  background: var(--ink);
  isolation: isolate;
}

.band__img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.6);
}

.band__shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, var(--black), rgba(0, 0, 0, 0.35) 30%, rgba(0, 0, 0, 0.35) 70%, var(--black));
}

.band__inner {
  position: relative;
  z-index: 2;
  padding: 3rem var(--gutter);
  text-align: center;
}

.band__inner p {
  margin: 0;
}

.band__weekday {
  color: var(--grey);
  font-size: 0.8rem;
  letter-spacing: 0.5em;
}

.band__day {
  font-family: var(--font-red);
  font-size: clamp(7rem, 34vw, 14rem);
  line-height: 0.95;
  color: var(--red);
  text-shadow: 0 0 2rem rgba(225, 20, 30, 0.4);
}

.band__month {
  color: var(--white);
  font-family: var(--font-red);
  font-size: clamp(2rem, 9vw, 3.6rem);
  letter-spacing: 0.3em;
}

.band__year {
  margin-top: 0.4rem !important;
  color: var(--gold);
  font-size: 1rem;
  letter-spacing: 0.4em;
}
</style>
