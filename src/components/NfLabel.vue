<template>
  <div class="nflabel">
    <BrandMark size="1.7rem" />
    <span class="nflabel__text">{{ label }}</span>
    <StarRow />
  </div>
</template>

<script setup>
import BrandMark from 'components/BrandMark.vue'
import StarRow from 'components/StarRow.vue'

defineOptions({
  name: 'NfLabel'
})

defineProps({
  label: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.nflabel {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}

.nflabel__text {
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.34em;
  text-transform: uppercase;
}
</style>
