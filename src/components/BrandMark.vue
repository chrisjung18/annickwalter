<template>
  <!-- The couple's initial as a tall red letter. It stands in for a streaming-service logo. -->
  <span class="mark" :style="{ fontSize: size }" aria-hidden="true">{{ wedding.monogram }}</span>
</template>

<script setup>
import { useWeddingStore } from 'stores/wedding'

defineOptions({
  name: 'BrandMark'
})

defineProps({
  size: { type: String, default: '1.8rem' }
})

const wedding = useWeddingStore()
</script>

<style scoped lang="scss">
.mark {
  display: inline-block;
  font-family: var(--font-red);
  line-height: 0.8;
  color: var(--red);
  transform: scaleY(1.18);
  transform-origin: bottom;
  text-shadow: 0.07em 0 0 var(--red-deep), 0 0 0.6em rgba(225, 20, 30, 0.35);
}
</style>
