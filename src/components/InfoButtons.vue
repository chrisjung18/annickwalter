<template>
  <div class="infobtns">
    <button class="nf-btn nf-btn--red" type="button" @click="$emit('play')">
      <span class="material-icons" aria-hidden="true">play_arrow</span>
      {{ playLabel }}
    </button>
    <button class="nf-btn nf-btn--ghost" type="button" :aria-expanded="expanded" @click="$emit('toggle')">
      <span class="material-icons-outlined" aria-hidden="true">info</span>
      {{ expanded ? lessLabel : infoLabel }}
    </button>
  </div>
</template>

<script setup>
defineOptions({
  name: 'InfoButtons'
})

defineProps({
  playLabel: { type: String, required: true },
  infoLabel: { type: String, required: true },
  lessLabel: { type: String, required: true },
  expanded: { type: Boolean, default: false }
})

defineEmits(['play', 'toggle'])
</script>

<style scoped lang="scss">
.infobtns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
</style>
