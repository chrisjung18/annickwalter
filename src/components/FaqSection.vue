<template>
  <section id="faq" class="section faq">
    <div class="section__inner">
      <p class="faq__note" v-reveal>{{ c.faq.note }}</p>
      <h2 class="red-title faq__title center" v-reveal>{{ c.faq.title }}</h2>

      <div class="faq__list">
        <div v-for="(item, i) in c.faq.items" :key="i" class="faq__item" :class="{ 'is-open': openIndex === i }" v-reveal>
          <h3 class="faq__q">
            <button type="button" :aria-expanded="openIndex === i" :aria-controls="`faq-a-${i}`" @click="toggle(i)">
              <span>{{ item.q }}</span>
              <span class="material-icons faq__icon" aria-hidden="true">add</span>
            </button>
          </h3>
          <div :id="`faq-a-${i}`" class="faq__a" role="region">
            <div class="faq__a-inner">
              <p>{{ answer(item.a) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent, fill } from 'src/composables/useContent'

defineOptions({
  name: 'FaqSection'
})

const wedding = useWeddingStore()
const { c, deadlineLong } = useContent()

const openIndex = ref(-1)
const toggle = i => { openIndex.value = openIndex.value === i ? -1 : i }

const answer = text => fill(text, { deadline: deadlineLong.value, hashtag: wedding.hashtag })
</script>

<style scoped lang="scss">
.faq {
  background: var(--black);
}

.faq__note {
  max-width: 36rem;
  margin: 0 auto 2.4rem;
  padding: 1rem 1.2rem;
  border-left: 3px solid var(--red);
  background: var(--panel);
  color: var(--grey);
  font-size: 0.88rem;
  line-height: 1.6;
}

.faq__title {
  margin: 0 0 1.6rem;
  font-size: clamp(2.4rem, 9vw, 4rem);
}

.faq__list {
  display: grid;
  gap: 0.5rem;
  max-width: 40rem;
  margin: 0 auto;
}

.faq__item {
  border-radius: 4px;
  background: var(--panel);
}

.faq__q {
  margin: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1.1rem 1.2rem;
    border: 0;
    background: none;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
  }
}

.faq__icon {
  flex: none;
  font-size: 1.7rem;
  transition: transform 0.35s var(--ease-out);
}

.faq__item.is-open .faq__icon {
  transform: rotate(135deg);
}

.faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s var(--ease-out);
}

.faq__item.is-open .faq__a {
  grid-template-rows: 1fr;
}

.faq__a-inner {
  overflow: hidden;

  p {
    margin: 0;
    padding: 0 1.2rem 1.3rem;
    color: var(--grey);
    font-size: 0.92rem;
    line-height: 1.7;
  }
}
</style>
