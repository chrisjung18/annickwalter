<template>
  <span class="stars" aria-hidden="true">
    <svg
      v-for="n in 5"
      :key="n"
      v-reveal="{ variant: 'scale', delay: n * 90 }"
      class="stars__s"
      viewBox="0 0 24 24"
      :style="{ width: size, height: size }"
    >
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7z" />
    </svg>
  </span>
</template>

<script setup>
defineOptions({
  name: 'StarRow'
})

defineProps({
  size: { type: String, default: '0.85rem' }
})
</script>

<style scoped lang="scss">
.stars {
  display: inline-flex;
  gap: 0.18rem;
  align-items: center;
}

.stars__s {
  display: block;
  fill: var(--red);
}
</style>
