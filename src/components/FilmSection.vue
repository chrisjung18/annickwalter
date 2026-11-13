<template>
  <section id="film" class="section film">
    <div class="section__inner">
      <div class="film__frame" v-reveal="'scale'">
        <video
          ref="videoRef"
          class="film__video"
          :src="wedding.video"
          :poster="wedding.images.filmPoster"
          playsinline
          preload="metadata"
          :controls="started"
          @play="playing = true"
          @pause="playing = false"
          @ended="onEnded"
        />

        <button
          v-if="!playing"
          class="film__play"
          type="button"
          :aria-label="ended ? c.film.replay : c.film.play"
          @click="play"
        >
          <span class="film__ring" aria-hidden="true">
            <span class="material-icons">{{ ended ? 'replay' : 'play_arrow' }}</span>
          </span>
          <span class="film__label caps">{{ ended ? c.film.replay : c.film.play }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'

defineOptions({
  name: 'FilmSection'
})

const wedding = useWeddingStore()
const { c } = useContent()

const videoRef = ref(null)
const playing = ref(false)
const started = ref(false)
const ended = ref(false)

async function play () {
  const v = videoRef.value
  if (!v) return
  started.value = true
  ended.value = false
  try {
    await v.play()
  } catch (e) {
    // Autoplay can be refused. The native controls are shown so the visitor can start it.
  }
}

function onEnded () {
  playing.value = false
  ended.value = true
}
</script>

<style scoped lang="scss">
.film {
  background: var(--black);
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.film__frame {
  position: relative;
  max-width: 56rem;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #050505;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.7), 0 0 4rem rgba(225, 20, 30, 0.12);
}

.film__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.film__play {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 0;
  background: rgba(0, 0, 0, 0.3);
  color: var(--white);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.12);

    .film__ring {
      transform: scale(1.08);
      border-color: var(--red);
    }
  }
}

.film__ring {
  display: grid;
  place-items: center;
  width: clamp(4.2rem, 14vw, 6rem);
  aspect-ratio: 1;
  border: 2px solid var(--white);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  transition: transform 0.3s var(--ease-out), border-color 0.3s ease;
  animation: ring 2.6s ease-out infinite;

  .material-icons {
    font-size: clamp(2.4rem, 8vw, 3.4rem);
  }
}

.film__label {
  font-size: 0.7rem;
  text-shadow: 0 0 0.8rem #000;
}

@keyframes ring {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.35); }
  100% { box-shadow: 0 0 0 1.6rem rgba(255, 255, 255, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .film__ring {
    animation: none;
  }
}
</style>
