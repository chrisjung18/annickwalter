<template>
  <section id="story" class="section story">
    <div class="section__inner">
      <h2 class="script story__title center" v-reveal>{{ c.story.title }}</h2>

      <div class="story__collage">
        <img
          v-for="(src, i) in wedding.storyPhotos"
          :key="src"
          :class="`story__photo story__photo--${i + 1}`"
          :src="src"
          alt=""
          loading="lazy"
          v-reveal="i === 1 ? 'scale' : (i === 0 ? 'left' : 'right')"
        >
      </div>

      <div class="story__text">
        <p v-for="(p, i) in c.story.paragraphs" :key="i" v-reveal>{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'

defineOptions({
  name: 'StorySection'
})

const wedding = useWeddingStore()
const { c } = useContent()
</script>

<style scoped lang="scss">
.story {
  background: var(--ink);
}

.story__title {
  margin: 0 0 2rem;
  font-size: clamp(3rem, 11vw, 4.6rem);
}

.story__collage {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.6rem;
  max-width: 46rem;
  margin: 0 auto 2.4rem;
}

.story__photo {
  display: block;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  filter: grayscale(0.2);
}

.story__photo--1 {
  grid-column: 1 / 4;
  aspect-ratio: 3 / 4;
}

.story__photo--2 {
  grid-column: 4 / 7;
  aspect-ratio: 3 / 4;
  margin-top: 2.4rem;
}

.story__photo--3 {
  grid-column: 2 / 6;
  aspect-ratio: 16 / 10;
}

.story__text {
  max-width: 36rem;
  margin: 0 auto;
  text-align: center;

  p {
    margin: 0 0 1.1rem;
    color: var(--grey);
    font-size: 0.98rem;
    line-height: 1.8;
  }
}
</style>
