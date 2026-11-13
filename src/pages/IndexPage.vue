<template>
  <q-page class="page">
    <IntroOverlay v-if="intro" @leaving="live = true" @done="intro = false" />

    <TopBar />
    <main>
      <HeroSection :live="live" />
      <InviteSection />
      <DateBand />
      <FilmSection />
      <VenuesSection />
      <ProgrammeSection />
      <StorySection />
      <DressSection />
      <StaySection />
      <FaqSection />
      <RsvpSection />
    </main>
    <EndSection />
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useWeddingStore } from 'stores/wedding'
import { useSettingsStore } from 'stores/settings'
import { useContent } from 'src/composables/useContent'
import { prefersReducedMotion } from 'src/composables/useScroll'
import IntroOverlay from 'components/IntroOverlay.vue'
import TopBar from 'components/TopBar.vue'
import HeroSection from 'components/HeroSection.vue'
import InviteSection from 'components/InviteSection.vue'
import DateBand from 'components/DateBand.vue'
import FilmSection from 'components/FilmSection.vue'
import VenuesSection from 'components/VenuesSection.vue'
import ProgrammeSection from 'components/ProgrammeSection.vue'
import StorySection from 'components/StorySection.vue'
import DressSection from 'components/DressSection.vue'
import StaySection from 'components/StaySection.vue'
import FaqSection from 'components/FaqSection.vue'
import RsvpSection from 'components/RsvpSection.vue'
import EndSection from 'components/EndSection.vue'

defineOptions({
  name: 'IndexPage'
})

const wedding = useWeddingStore()
const settings = useSettingsStore()
settings.init(wedding.defaultLang)

const { c } = useContent()

// Skip the intro with ?nointro (handy while editing) or when the visitor prefers reduced motion
const skip = typeof window !== 'undefined' &&
  (new URLSearchParams(window.location.search).has('nointro') || prefersReducedMotion())

const intro = ref(wedding.showIntro && !skip)
const live = ref(!intro.value)

watchEffect(() => {
  document.title = c.value.docTitle(wedding.names)
})
</script>
