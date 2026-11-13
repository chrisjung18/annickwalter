<template>
  <section id="programme" class="section programme">
    <div class="section__inner">
      <h2 class="script programme__title" v-reveal>{{ c.programme.title }}</h2>
      <p class="caps programme__sub" v-reveal>{{ c.programme.sub }}</p>

      <ul class="programme__list">
        <li v-for="(s, i) in wedding.schedule" :key="s.start" class="prog" v-reveal="'rise'">
          <div class="prog__media"><img :src="s.image" alt="" loading="lazy"></div>
          <div class="prog__body">
            <p class="prog__time">{{ s.start }} <span>→</span> {{ s.end }}</p>
            <h3 class="prog__name">{{ c.programme.items[i] }}</h3>
            <p class="prog__place">{{ wedding.venues[i].place }}</p>
          </div>
        </li>
      </ul>

      <InfoButtons
        :play-label="c.programme.play"
        :info-label="c.programme.info"
        :less-label="c.programme.less"
        :expanded="open"
        @play="scrollToSection('venues')"
        @toggle="open = !open"
      />

      <Transition name="more">
        <p v-if="open" class="programme__more">{{ c.programme.more }}</p>
      </Transition>
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
  name: 'ProgrammeSection'
})

const wedding = useWeddingStore()
const { c } = useContent()
const open = ref(false)
</script>

<style scoped lang="scss">
.programme {
  background: linear-gradient(180deg, var(--black), var(--ink));
  text-align: center;
}

.programme__title {
  margin: 0;
  font-size: clamp(3rem, 11vw, 4.6rem);
}

.programme__sub {
  margin: 0.2rem 0 2rem;
  color: var(--grey);
  font-size: 0.75rem;
}

.programme__list {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
  margin: 0 auto 2rem;
  padding: 0;
  list-style: none;
}

.prog {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
  text-align: left;
}

.prog__media {
  flex: 0 0 38%;
  align-self: stretch;
  min-height: 6.5rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.prog__body {
  padding: 0.8rem 1rem 0.8rem 0;
}

.prog__time {
  margin: 0;
  color: var(--gold);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.06em;

  span {
    color: var(--grey-dim);
  }
}

.prog__name {
  margin: 0.2rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.prog__place {
  margin: 0.15rem 0 0;
  color: var(--grey);
  font-size: 0.82rem;
}

.programme__more {
  max-width: 38rem;
  margin: 1.6rem auto 0;
  color: var(--grey);
  font-size: 0.92rem;
  line-height: 1.7;
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
</style>
