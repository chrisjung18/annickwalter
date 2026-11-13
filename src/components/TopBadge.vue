<template>
  <span class="badge">{{ text }}</span>
</template>

<script setup>
defineOptions({
  name: 'TopBadge'
})

defineProps({
  text: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.badge {
  display: inline-block;
  padding: 0.38rem 0.7rem 0.36rem;
  background: var(--red);
  color: var(--white);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;
}
</style>
