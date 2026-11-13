<template>
  <header class="top" :class="{ 'top--solid': solid }">
    <div class="top__progress" :style="{ transform: `scaleX(${pageProgress})` }" aria-hidden="true" />

    <button class="top__brand" type="button" :aria-label="c.top.home" @click="toTop">
      <BrandMark size="1.9rem" />
      <span class="top__names">{{ wedding.initials }}</span>
      <StarRow size="0.7rem" class="top__stars" />
    </button>

    <div class="top__lang" role="group" :aria-label="c.top.language">
      <button
        v-for="code in ['fr', 'en', 'it']"
        :key="code"
        class="top__lang-btn"
        type="button"
        :aria-pressed="lang === code"
        @click="settings.setLang(code)"
      >
        {{ code.toUpperCase() }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useSettingsStore } from 'stores/settings'
import { useContent } from 'src/composables/useContent'
import { useRafScroll, prefersReducedMotion } from 'src/composables/useScroll'
import { pageProgress } from 'src/composables/usePageProgress'
import BrandMark from 'components/BrandMark.vue'
import StarRow from 'components/StarRow.vue'

defineOptions({
  name: 'TopBar'
})

const wedding = useWeddingStore()
const settings = useSettingsStore()
const { c, lang } = useContent()

const solid = ref(false)

useRafScroll(y => {
  solid.value = y > 60
  const max = document.documentElement.scrollHeight - window.innerHeight
  pageProgress.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
})

function toTop () {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.6rem;
  padding: 0 max(var(--gutter), env(safe-area-inset-right, 0px)) 0 max(var(--gutter), env(safe-area-inset-left, 0px));
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
  transition: background-color 0.4s ease;

  &--solid {
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(8px);
  }
}

.top__progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--red);
  transform-origin: left;
  transform: scaleX(0);
}

.top__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--white);
  cursor: pointer;
}

.top__names {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.22em;
}

.top__lang {
  display: flex;
  gap: 0.15rem;
}

.top__lang-btn {
  padding: 0.45rem 0.6rem;
  border: 0;
  border-radius: 3px;
  background: none;
  color: var(--grey);
  font-family: var(--font-body);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: var(--white);
  }

  &[aria-pressed='true'] {
    background: var(--white);
    color: var(--black);
  }
}

@media (max-width: 380px) {
  .top__stars {
    display: none;
  }
}
</style>
