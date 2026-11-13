<template>
  <footer class="end">
    <img class="end__photo" :src="wedding.images.end" alt="">
    <div class="end__shade" aria-hidden="true" />

    <div class="end__inner">
      <p class="end__script script" v-reveal="'blur'">{{ c.end.script }}</p>
      <p class="end__hashtag" v-reveal>{{ fill(c.end.shareHashtag, { hashtag: wedding.hashtag }) }}</p>

      <nav class="end__links" aria-label="legal">
        <button type="button" @click="dialog = 'terms'">{{ c.end.terms }}</button>
        <button type="button" @click="dialog = 'privacy'">{{ c.end.privacy }}</button>
      </nav>
      <p class="end__copy">© {{ new Date().getFullYear() }} {{ wedding.names }}</p>
    </div>

    <q-dialog :model-value="!!dialog" @update:model-value="dialog = null">
      <q-card class="legal" dark>
        <q-card-section>
          <h3 class="legal__title">{{ dialog === 'privacy' ? c.end.privacy : c.end.terms }}</h3>
          <p class="legal__text">{{ c.end.legalText }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat no-caps color="white" :label="c.end.close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent, fill } from 'src/composables/useContent'

defineOptions({
  name: 'EndSection'
})

const wedding = useWeddingStore()
const { c } = useContent()
const dialog = ref(null)
</script>

<style scoped lang="scss">
.end {
  position: relative;
  display: grid;
  place-items: end center;
  min-height: 34rem;
  overflow: hidden;
  background: var(--black);
  isolation: isolate;
}

.end__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.7);
}

.end__shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, var(--black), rgba(0, 0, 0, 0.1) 35%, rgba(0, 0, 0, 0.9));
}

.end__inner {
  position: relative;
  z-index: 2;
  padding: 3rem var(--gutter) 2rem;
  text-align: center;

  p {
    margin: 0;
  }
}

.end__script {
  font-size: clamp(3.2rem, 13vw, 6rem);
  text-shadow: 0 0.04em 0.5em rgba(0, 0, 0, 0.8);
}

.end__hashtag {
  margin-top: 0.6rem !important;
  color: var(--mint);
  font-size: 0.9rem;
}

.end__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.6rem;
  margin-top: 2.4rem;

  button {
    padding: 0.3rem;
    border: 0;
    background: none;
    color: var(--grey);
    font-family: var(--font-body);
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      color: var(--white);
      text-decoration: underline;
    }
  }
}

.end__copy {
  margin-top: 1rem !important;
  color: var(--grey-dim);
  font-size: 0.72rem;
}

.legal {
  width: min(92vw, 28rem);
  background: var(--panel-2);
}

.legal__title {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
}

.legal__text {
  margin: 0;
  color: var(--grey);
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
