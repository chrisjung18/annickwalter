<template>
  <div class="lost">
    <p class="lost__code">404</p>
    <p class="lost__text">This page does not exist. The show is on the home page.</p>
    <q-btn unelevated no-caps color="primary" label="Back to the invitation" to="/" />
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
})
</script>

<style scoped lang="scss">
.lost {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding: var(--gutter);
  background: var(--black);
  color: var(--white);
}

.lost__code {
  margin: 0;
  font-family: var(--font-red);
  font-size: clamp(6rem, 24vw, 16rem);
  line-height: 0.9;
  color: var(--red);
}

.lost__text {
  margin: 0;
  color: var(--grey);
}
</style>
