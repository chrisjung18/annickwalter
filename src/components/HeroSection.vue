<template>
  <section id="top" class="hero" :class="{ 'is-live': live }">
    <img class="hero__photo" :src="wedding.images.hero" alt="">
    <div class="hero__shade" aria-hidden="true" />

    <div class="hero__inner">
      <div class="hero__head">
        <p class="hero__wedding caps">{{ c.top.label }}</p>
        <TopBadge :text="c.top.badge" />
      </div>

      <div class="hero__center">
        <p v-if="!done" class="hero__count-label caps">{{ c.hero.countdown }}</p>
        <p v-else class="hero__count-label hero__count-label--done">{{ c.hero.today }}</p>

        <div class="hero__count" role="timer" aria-live="off">
          <span class="sr-only">{{ parts[0].value }} {{ c.hero.days.toLowerCase() }}</span>
          <template v-for="(p, i) in parts" :key="p.key">
            <span v-if="i > 0" class="hero__colon" aria-hidden="true">:</span>
            <div class="hero__unit" :class="{ 'hero__unit--red': p.key === 'seconds' }" aria-hidden="true">
              <span class="hero__digits">
                <Transition name="tick">
                  <span :key="p.value" class="hero__digit">{{ pad(p.value) }}</span>
                </Transition>
              </span>
              <span class="hero__unit-label">{{ c.hero[p.key] }}</span>
            </div>
          </template>
        </div>
      </div>

      <div class="hero__names-wrap">
        <h1 class="hero__names script" :aria-label="wedding.names">
          <span aria-hidden="true">{{ wedding.names }}</span>
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'
import { useCountdown } from 'src/composables/useCountdown'
import TopBadge from 'components/TopBadge.vue'

defineOptions({
  name: 'HeroSection'
})

defineProps({
  // The entrance animation starts when the intro lets go of the page
  live: { type: Boolean, default: true }
})

const wedding = useWeddingStore()
const { c } = useContent()
const { parts, done } = useCountdown(wedding.date)

const pad = n => String(n).padStart(2, '0')
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: var(--black);
  isolation: isolate;
}

.hero__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  filter: grayscale(1) contrast(1.05) brightness(0.9);
  transform: scale(1.14);
  transition: transform 22s cubic-bezier(0.2, 0.6, 0.2, 1);
}

.hero.is-live .hero__photo {
  transform: scale(1);
}

.hero__shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0.1) 52%, rgba(0, 0, 0, 0.92) 100%);
}

.hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  min-height: 100vh;
  min-height: 100svh;
  padding: 5.2rem var(--gutter) clamp(2.5rem, 7vh, 4.5rem);
}

.hero__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.hero__wedding {
  margin: 0;
  letter-spacing: 0.5em;
  font-size: 0.68rem;
  color: var(--grey);
}

.hero__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  text-align: center;
}

.hero__count-label {
  margin: 0;
  font-size: 0.7rem;
  color: var(--grey);
}

.hero__count-label--done {
  font-family: var(--font-script);
  font-size: 2.2rem;
  color: var(--white);
}

.hero__count {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(0.2rem, 1.4vw, 0.7rem);
}

.hero__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-width: clamp(3.4rem, 15vw, 6rem);
}

.hero__digits {
  position: relative;
  display: block;
  height: 1.05em;
  overflow: hidden;
  font-size: clamp(2.6rem, 12vw, 5.4rem);
  font-weight: 300;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
}

.hero__digit {
  display: block;
}

.hero__unit--red .hero__digits {
  color: var(--red);
  font-weight: 400;
}

.hero__unit-label {
  font-size: 0.5rem;
  letter-spacing: 0.22em;
  color: var(--grey-dim);
}

.hero__colon {
  padding-top: 0.1em;
  font-size: clamp(2.2rem, 10vw, 4.6rem);
  font-weight: 200;
  line-height: 1.12;
  color: var(--grey-dim);
}

.hero__names-wrap {
  overflow: hidden;
  padding: 0.1em 0 0.25em;
}

.hero__names {
  display: block;
  font-size: clamp(3.6rem, 15vw, 9rem);
  text-align: center;
  text-shadow: 0 0.04em 0.5em rgba(0, 0, 0, 0.7);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 2.4s var(--ease-cine) 0.9s;
}

.hero.is-live .hero__names {
  clip-path: inset(0 0 0 0);
}

/* Entrance of the small items */
.hero__head,
.hero__center {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 1.1s ease 0.4s, transform 1.2s var(--ease-out) 0.4s;
}

.hero__center {
  transition-delay: 0.7s;
}

.hero.is-live .hero__head,
.hero.is-live .hero__center {
  opacity: 1;
  transform: none;
}

.tick-enter-active,
.tick-leave-active {
  transition: transform 0.35s var(--ease-out), opacity 0.35s ease;
}

.tick-leave-active {
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  text-align: center;
}

.tick-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.tick-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

@media (min-width: 900px) {
  .hero__photo {
    object-position: 50% 18%;
  }

  .hero__inner {
    max-width: 78rem;
    margin: 0 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__photo,
  .hero__names,
  .hero__head,
  .hero__center,
  .tick-enter-active,
  .tick-leave-active {
    transition: none;
  }

  .hero__photo {
    transform: none;
  }

  .hero__names {
    clip-path: none;
  }

  .hero__head,
  .hero__center {
    opacity: 1;
    transform: none;
  }
}
</style>
