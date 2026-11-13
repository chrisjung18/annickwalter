<template>
  <section id="invite" class="section invite">
    <div class="section__inner center">
      <NfLabel :label="c.top.label" v-reveal />

      <h2 class="invite__script script" v-reveal="'blur'">{{ c.invite.script }}</h2>
      <p class="invite__lead" v-reveal>{{ c.invite.lead }}</p>
      <p class="invite__date caps" v-reveal>{{ fill(c.invite.dateLead, { date: dateLong }) }}</p>
      <p class="invite__text" v-reveal>{{ c.invite.text }}</p>
      <p class="invite__tag" v-reveal>{{ c.invite.tag }}</p>

      <div class="invite__cta" v-reveal="'scale'">
        <button class="nf-btn nf-btn--white nf-btn--block" type="button" @click="scrollToSection('rsvp')">
          <span class="material-icons" aria-hidden="true">play_arrow</span>
          {{ c.invite.rsvp }}
        </button>
      </div>

      <div class="invite__actions" v-reveal>
        <ActionRow />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContent, fill } from 'src/composables/useContent'
import { scrollToSection } from 'src/composables/useScroll'
import NfLabel from 'components/NfLabel.vue'
import ActionRow from 'components/ActionRow.vue'

defineOptions({
  name: 'InviteSection'
})

const { c, dateLong } = useContent()
</script>

<style scoped lang="scss">
.invite {
  background: var(--black);
}

.invite__script {
  margin: 1.6rem 0 0.4rem;
  font-size: clamp(3rem, 12vw, 5.2rem);
  line-height: 1.05;
}

.invite__lead {
  margin: 0;
  color: var(--grey);
  font-size: 0.95rem;
}

.invite__date {
  margin: 0.4rem 0 0;
  color: var(--gold);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
}

.invite__text {
  max-width: 34rem;
  margin: 1.4rem auto 0;
  color: var(--grey);
  font-size: 0.95rem;
  line-height: 1.7;
}

.invite__tag {
  margin: 1rem 0 0;
  color: var(--mint);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
}

.invite__cta {
  max-width: 24rem;
  margin: 2rem auto 0;
}

.invite__actions {
  margin-top: 2.2rem;
}
</style>
