<template>
  <div class="intro" :class="`intro--${phase}`" role="dialog" aria-modal="true" :aria-label="c.intro.openLabel">
    <!-- 1. The opening line -->
    <p class="intro__hook">{{ c.intro.hook }}</p>

    <!-- 2. The sealed envelope -->
    <div class="stage">
      <button
        ref="envRef"
        class="env"
        :class="{ 'is-open': opened }"
        type="button"
        :aria-label="c.intro.openLabel"
        :disabled="opened"
        @click="open"
      >
        <span class="env__back" />

        <span class="env__card">
          <span class="env__card-names script">{{ wedding.names }}</span>
          <span class="env__card-date caps">{{ dateLong }}</span>
        </span>

        <span class="env__front" />
        <span class="env__flap" />
        <span class="env__label">{{ wedding.initials }}</span>

        <span class="env__seal">
          <span class="env__seal-ring">{{ wedding.monogram }}</span>
        </span>
      </button>

      <p class="stage__cta caps">{{ c.intro.open }}</p>
    </div>

    <!-- 3. The monogram flash and zoom -->
    <div class="splash" aria-hidden="true">
      <span class="splash__mark">{{ wedding.monogram }}</span>
    </div>

    <button class="intro__skip" type="button" @click="finish">{{ c.intro.skip }}</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useContent } from 'src/composables/useContent'

defineOptions({
  name: 'IntroOverlay'
})

const emit = defineEmits(['leaving', 'done'])

const wedding = useWeddingStore()
const { c, dateLong } = useContent()

// hook -> envelope -> opening -> splash -> leaving
const phase = ref('hook')
const opened = ref(false)
const envRef = ref(null)
const timers = []
let finished = false

const later = (fn, ms) => timers.push(setTimeout(fn, ms))

onMounted(() => {
  document.body.style.overflow = 'hidden'

  later(() => {
    phase.value = 'envelope'
    nextTick(() => envRef.value && envRef.value.focus({ preventScroll: true }))
  }, 3300)

  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

function onKeydown (e) {
  if (e.key === 'Escape') finish()
}

function open () {
  if (opened.value) return
  // The visitor may click before the opening line is over
  timers.forEach(clearTimeout)
  timers.length = 0
  phase.value = 'envelope'
  opened.value = true

  later(() => { phase.value = 'opening' }, 50)
  later(() => { phase.value = 'splash' }, 2000)
  later(finish, 4300)
}

function finish () {
  if (finished) return
  finished = true
  timers.forEach(clearTimeout)
  phase.value = 'leaving'
  emit('leaving')
  later(() => emit('done'), 700)
}
</script>

<style scoped lang="scss">
.intro {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--black);
  transition: opacity 0.7s ease;

  &--leaving {
    opacity: 0;
    pointer-events: none;
  }
}

/* 1. Opening line ------------------------------------------------ */
.intro__hook {
  position: absolute;
  margin: 0;
  padding: 0 var(--gutter);
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 8.5vw, 4rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-align: center;
  opacity: 0;
  filter: blur(10px);
  animation: hook-in 1.6s var(--ease-out) 0.3s forwards;
  transition: opacity 0.6s ease, filter 0.6s ease;
}

.intro:not(.intro--hook) .intro__hook {
  animation: none;
  opacity: 0;
  filter: blur(8px);
}

@keyframes hook-in {
  from { opacity: 0; filter: blur(10px); letter-spacing: 0.14em; }
  to { opacity: 1; filter: blur(0); letter-spacing: 0.02em; }
}

/* 2. Envelope ----------------------------------------------------- */
.stage {
  --w: min(86vw, 25rem);
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  pointer-events: none;
  transition: opacity 0.9s ease, transform 1.2s var(--ease-out);
}

.intro--envelope .stage,
.intro--opening .stage {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.intro--splash .stage {
  opacity: 0;
  transform: scale(1.7);
  transition: opacity 0.9s ease, transform 1.4s var(--ease-cine);
}

.stage__cta {
  margin: 0;
  color: var(--mint);
  font-size: 0.72rem;
  animation: blink 2.4s ease-in-out infinite;
}

.intro--opening .stage__cta {
  opacity: 0;
  animation: none;
  transition: opacity 0.4s ease;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.env {
  position: relative;
  width: var(--w);
  aspect-ratio: 3 / 2;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  perspective: 1400px;
  filter: drop-shadow(0 1.6rem 2.2rem rgba(0, 0, 0, 0.7));
  transition: transform 0.4s var(--ease-out);

  &:not(:disabled):hover {
    transform: scale(1.025) rotate(-0.6deg);
  }

  &:disabled {
    cursor: default;
  }

  > span {
    position: absolute;
    display: block;
  }
}

.env__back {
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(160deg, #123740, #0a1f26);
}

.env__card {
  left: 7%;
  right: 7%;
  top: 10%;
  bottom: 10%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: 1px solid rgba(232, 193, 90, 0.7);
  border-radius: 2px;
  background: #0b0b0b;
  text-align: center;
  transition: transform 1s var(--ease-out) 0.55s;
}

.env__card-names {
  font-size: clamp(1.7rem, 7vw, 2.4rem);
}

.env__card-date {
  max-width: 90%;
  color: var(--gold);
  font-size: 0.58rem;
  letter-spacing: 0.22em;
}

.env.is-open .env__card {
  transform: translateY(-38%);
}

.env__front {
  inset: 0;
  z-index: 3;
  border-radius: 4px;
  background: linear-gradient(170deg, #1b4a55 0%, #103039 60%, #0c242b 100%);
  clip-path: polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%);
}

.env__flap {
  top: 0;
  left: 0;
  right: 0;
  height: 56%;
  z-index: 4;
  background: linear-gradient(180deg, #235663, #17404b);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transition: transform 0.9s var(--ease-cine), z-index 0s 0.45s;
}

.env.is-open .env__flap {
  z-index: 1;
  transform: rotateX(180deg);
}

.env__label {
  left: 0;
  right: 0;
  top: 17%;
  z-index: 5;
  font-family: var(--font-red);
  font-size: clamp(1.8rem, 8vw, 2.6rem);
  letter-spacing: 0.3em;
  text-align: center;
  text-indent: 0.3em;
  color: var(--red);
  text-shadow: 0 0 1rem rgba(225, 20, 30, 0.55);
  transition: opacity 0.3s ease;
}

.env__seal {
  left: 50%;
  top: 56%;
  z-index: 6;
  width: 19%;
  aspect-ratio: 1;
  margin: -9.5% 0 0 -9.5%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ff4a52, #c1121b 55%, #7d0910);
  box-shadow: 0 0.4rem 0.9rem rgba(0, 0, 0, 0.55), inset 0 -0.2rem 0.4rem rgba(0, 0, 0, 0.35);
  transition: transform 0.5s var(--ease-out), opacity 0.4s ease;
}

.env__seal-ring {
  position: absolute;
  inset: 14%;
  display: grid;
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  font-family: var(--font-red);
  font-size: clamp(1.1rem, 5vw, 1.7rem);
  line-height: 1;
  color: rgba(255, 255, 255, 0.85);
}

.env.is-open .env__seal,
.env.is-open .env__label {
  opacity: 0;
}

.env.is-open .env__seal {
  transform: scale(0.5);
}

/* 3. Monogram splash ----------------------------------------------- */
.splash {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  pointer-events: none;
}

.intro--splash .splash,
.intro--leaving .splash {
  opacity: 1;
}

.splash__mark {
  display: block;
  font-family: var(--font-red);
  font-size: 34vmin;
  line-height: 0.8;
  color: var(--red);
  text-shadow: 0.06em 0 0 var(--red-deep), 0 0 0.5em rgba(225, 20, 30, 0.6);
  transform: scaleY(1.18) scale(0.7);
  opacity: 0;
}

.intro--splash .splash__mark {
  animation:
    splash-in 0.9s var(--ease-out) forwards,
    splash-zoom 1.4s var(--ease-cine) 1s forwards;
}

@keyframes splash-in {
  from { opacity: 0; transform: scaleY(1.18) scale(0.7); filter: blur(10px); }
  to { opacity: 1; transform: scaleY(1.18) scale(1); filter: blur(0); }
}

@keyframes splash-zoom {
  from { opacity: 1; transform: scaleY(1.18) scale(1); }
  to { opacity: 0; transform: scaleY(1.18) scale(46); }
}

/* Skip ------------------------------------------------------------ */
.intro__skip {
  position: absolute;
  right: max(1rem, env(safe-area-inset-right, 0px));
  bottom: max(1rem, env(safe-area-inset-bottom, 0px));
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: var(--grey);
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;

  &:hover,
  &:focus-visible {
    color: var(--white);
    border-color: var(--white);
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro__hook,
  .stage,
  .env__card,
  .env__flap,
  .splash__mark {
    animation: none !important;
    transition: none !important;
  }

  .intro__hook {
    opacity: 1;
    filter: none;
  }
}
</style>
