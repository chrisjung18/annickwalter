<template>
  <section id="stay" class="section stay">
    <div class="section__inner">
      <h2 class="script stay__title center" v-reveal>{{ c.stay.title }}</h2>
      <p class="caps stay__sub center" v-reveal>{{ c.stay.sub }}</p>

      <InfoButtons
        :play-label="c.stay.play"
        :info-label="c.stay.info"
        :less-label="c.stay.less"
        :expanded="open"
        @play="scrollToSection('rsvp')"
        @toggle="open = !open"
      />
      <Transition name="more">
        <p v-if="open" class="stay__more">{{ c.stay.more }}</p>
      </Transition>

      <div class="stay__grid">
        <article v-for="(h, i) in wedding.hotels" :key="h.name" class="hotel" v-reveal="'rise'" :style="{ '--reveal-delay': `${(i % 2) * 120}ms` }">
          <img class="hotel__img" :src="h.image" :alt="h.name" loading="lazy">
          <div class="hotel__body">
            <h3 class="hotel__name">{{ h.name }}</h3>
            <p class="hotel__cat">{{ h.category }}</p>
            <p class="hotel__dist">{{ c.stay.distance(h.distanceMin) }}</p>
            <p class="hotel__price"><span class="caps">{{ c.stay.from }}</span> {{ h.price }}</p>
            <div class="hotel__btns">
              <a class="hotel__btn" :href="mapsUrl(h)" target="_blank" rel="noopener">{{ c.stay.maps }}</a>
              <a class="hotel__btn hotel__btn--red" :href="h.bookUrl" target="_blank" rel="noopener">{{ c.stay.book }}</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'
import { scrollToSection } from 'src/composables/useScroll'
import InfoButtons from 'components/InfoButtons.vue'

defineOptions({
  name: 'StaySection'
})

const wedding = useWeddingStore()
const { c } = useContent()
const open = ref(false)

const mapsUrl = h =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.name}, ${h.address}`)}`
</script>

<style scoped lang="scss">
.stay {
  background: linear-gradient(180deg, var(--ink), var(--black));
}

.stay__title {
  margin: 0;
  font-size: clamp(3rem, 11vw, 4.6rem);
}

.stay__sub {
  margin: 0.2rem 0 1.6rem;
  color: var(--grey);
  font-size: 0.75rem;
}

.stay__more {
  max-width: 38rem;
  margin: 1.4rem auto 0;
  color: var(--grey);
  font-size: 0.92rem;
  line-height: 1.7;
  text-align: center;
}

.more-enter-active,
.more-leave-active {
  transition: opacity 0.4s ease, transform 0.4s var(--ease-out);
}

.more-enter-from,
.more-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.stay__grid {
  display: grid;
  gap: 1.2rem;
  margin-top: 2.4rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
}

.hotel {
  overflow: hidden;
  border-radius: 6px;
  background: #fff;
  color: #111;
}

.hotel__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.hotel__body {
  padding: 1.1rem 1.2rem 1.3rem;
}

.hotel__body p {
  margin: 0;
}

.hotel__name {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
}

.hotel__cat {
  margin-top: 0.15rem !important;
  color: #666;
  font-size: 0.82rem;
}

.hotel__dist {
  margin-top: 0.5rem !important;
  font-size: 0.85rem;
}

.hotel__price {
  margin-top: 0.6rem !important;
  font-size: 1.2rem;
  font-weight: 700;

  .caps {
    color: #777;
    font-size: 0.62rem;
    font-weight: 500;
  }
}

.hotel__btns {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}

.hotel__btn {
  flex: 1;
  padding: 0.7rem 0.5rem;
  border: 1px solid #111;
  border-radius: 4px;
  color: #111;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #111;
    color: #fff;
  }

  &--red {
    border-color: var(--red);
    background: var(--red);
    color: #fff;

    &:hover {
      background: var(--red-bright);
      border-color: var(--red-bright);
    }
  }
}
</style>
