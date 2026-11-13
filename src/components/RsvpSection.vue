<template>
  <section id="rsvp" class="section rsvp">
    <div class="section__inner rsvp__inner">
      <NfLabel :label="c.rsvp.label" v-reveal />
      <h2 class="red-title rsvp__title" v-reveal>{{ c.rsvp.title }}</h2>
      <p class="rsvp__text" v-reveal>{{ fill(c.rsvp.text, { deadline: deadlineLong }) }}</p>

      <div class="rsvp__panel" v-reveal>
        <Transition name="swap" mode="out-in">
          <!-- Confirmation: a "ticket" -->
          <div v-if="rsvp.submitted" key="done" class="done" aria-live="polite">
            <svg class="done__check" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" />
              <path d="M14 27l8 8 16-17" />
            </svg>
            <h3 class="done__title">{{ doneTitle }}</h3>
            <p class="done__text">{{ doneText }}</p>

            <div v-if="rsvp.lastReply?.attending === 'yes'" class="ticket">
              <p class="ticket__label caps">{{ c.rsvp.ticketTitle }}</p>
              <p class="ticket__names script">{{ wedding.names }}</p>
              <p class="ticket__meta">{{ dateLong }} · {{ timeShort }}</p>
              <p class="ticket__guests">{{ c.rsvp.ticketGuests(rsvp.lastReply.guests) }}</p>
            </div>

            <button class="nf-btn nf-btn--ghost" type="button" @click="rsvp.reopen()">{{ c.rsvp.change }}</button>
          </div>

          <!-- Form -->
          <q-form v-else key="form" class="form" greedy @submit.prevent="onSubmit" @validation-error="onValidationError">
            <!-- Honeypot: hidden from people, bots tend to fill it -->
            <div class="sr-only" aria-hidden="true">
              <label>Website <input v-model="form.website" type="text" tabindex="-1" autocomplete="off"></label>
            </div>

            <q-input
              v-model="form.name"
              dark filled square
              :label="c.rsvp.name"
              autocomplete="name"
              :rules="[v => !!v && v.trim().length > 1 || c.rsvp.nameError]"
              lazy-rules="ondemand"
            />

            <q-input
              v-model="form.email"
              dark filled square
              type="email"
              :label="c.rsvp.email"
              :hint="c.rsvp.emailHint"
              autocomplete="email"
              :rules="[v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '') || c.rsvp.emailError]"
              lazy-rules="ondemand"
            />

            <fieldset class="form__group">
              <legend class="form__legend">{{ c.rsvp.attendingLegend }}</legend>
              <div class="choice">
                <button
                  type="button"
                  class="choice__btn"
                  :class="{ 'is-on': form.attending === 'yes' }"
                  :aria-pressed="form.attending === 'yes'"
                  @click="setAttending('yes')"
                >
                  <span class="material-icons" aria-hidden="true">check</span>{{ c.rsvp.yes }}
                </button>
                <button
                  type="button"
                  class="choice__btn"
                  :class="{ 'is-on': form.attending === 'no' }"
                  :aria-pressed="form.attending === 'no'"
                  @click="setAttending('no')"
                >
                  <span class="material-icons" aria-hidden="true">close</span>{{ c.rsvp.no }}
                </button>
              </div>
              <p v-if="attendingError" class="form__error" role="alert">{{ c.rsvp.attendingError }}</p>
            </fieldset>

            <Transition name="swap">
              <div v-if="form.attending === 'yes'" class="form__extra">
                <div class="stepper">
                  <span class="stepper__label" id="guests-label">{{ c.rsvp.guests }}</span>
                  <div class="stepper__ctrl" role="group" aria-labelledby="guests-label">
                    <button type="button" :aria-label="c.rsvp.guestsLess" :disabled="form.guests <= 1" @click="form.guests--">
                      <span class="material-icons" aria-hidden="true">remove</span>
                    </button>
                    <output class="stepper__value">{{ form.guests }}</output>
                    <button type="button" :aria-label="c.rsvp.guestsMore" :disabled="form.guests >= wedding.maxGuests" @click="form.guests++">
                      <span class="material-icons" aria-hidden="true">add</span>
                    </button>
                  </div>
                </div>

                <q-select
                  v-model="form.menu"
                  dark filled square emit-value map-options
                  :label="c.rsvp.menu"
                  :options="menuOptions"
                  :rules="[v => !!v || c.rsvp.menuError]"
                  lazy-rules="ondemand"
                />
              </div>
            </Transition>

            <q-input v-model="form.note" dark filled square autogrow :label="c.rsvp.note" />

            <button class="nf-btn nf-btn--red nf-btn--block" type="submit" :disabled="rsvp.submitting">
              <q-spinner v-if="rsvp.submitting" size="1.3rem" />
              <template v-else>{{ c.rsvp.submit }}</template>
            </button>
          </q-form>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useWeddingStore } from 'stores/wedding'
import { useRsvpStore } from 'stores/rsvp'
import { useContent, fill } from 'src/composables/useContent'
import NfLabel from 'components/NfLabel.vue'

defineOptions({
  name: 'RsvpSection'
})

const $q = useQuasar()
const wedding = useWeddingStore()
const rsvp = useRsvpStore()
const { c, dateLong, deadlineLong, timeShort } = useContent()

const attendingError = ref(false)

const form = reactive({
  name: '',
  email: '',
  attending: null,
  guests: 1,
  menu: null,
  note: '',
  website: ''
})

const menuOptions = computed(() =>
  Object.entries(c.value.rsvp.menus).map(([value, label]) => ({ value, label }))
)

const firstName = computed(() => (rsvp.lastReply?.name || form.name).trim().split(/\s+/)[0] || '')

const doneTitle = computed(() =>
  fill(rsvp.lastReply?.attending === 'yes' ? c.value.rsvp.doneYesTitle : c.value.rsvp.doneNoTitle, { name: firstName.value })
)

const doneText = computed(() =>
  rsvp.lastReply?.attending === 'yes'
    ? fill(c.value.rsvp.doneYesText, { date: dateLong.value })
    : c.value.rsvp.doneNoText
)

function setAttending (value) {
  form.attending = value
  attendingError.value = false
}

// Quasar only calls submit when every field is valid, so flag the toggle here too
function onValidationError () {
  attendingError.value = !form.attending
}

async function onSubmit () {
  if (!form.attending) {
    attendingError.value = true
    return
  }

  // A bot filled the hidden field: pretend it worked and send nothing
  if (form.website) {
    rsvp.lastReply = { name: form.name, attending: form.attending, guests: form.guests }
    rsvp.submitted = true
    return
  }

  const reply = {
    name: form.name.trim(),
    email: form.email.trim(),
    attending: form.attending,
    guests: form.attending === 'yes' ? form.guests : 0,
    menu: form.attending === 'yes' ? form.menu : null,
    note: form.note.trim()
  }

  try {
    await rsvp.submit(reply)
  } catch (e) {
    $q.notify({ type: 'negative', position: 'top', message: c.value.rsvp.error })
  }
}
</script>

<style scoped lang="scss">
.rsvp {
  background: linear-gradient(180deg, var(--black), #12090a 60%, var(--black));
}

.rsvp__inner {
  max-width: 38rem;
  text-align: center;
}

.rsvp__title {
  margin: 1.2rem 0 0;
  font-size: clamp(2.4rem, 9vw, 3.8rem);
}

.rsvp__text {
  margin: 0.8rem 0 2rem;
  color: var(--grey);
  font-size: 0.92rem;
  line-height: 1.7;
}

.rsvp__panel {
  padding: clamp(1.3rem, 4vw, 2.2rem);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
  text-align: left;
}

.form {
  display: grid;
  gap: 1.1rem;
}

.form__group {
  margin: 0;
  padding: 0;
  border: 0;
}

.form__legend {
  margin-bottom: 0.5rem;
  padding: 0;
  color: var(--grey);
  font-size: 0.85rem;
}

.form__error {
  margin: 0.5rem 0 0;
  color: #ff6b73;
  font-size: 0.78rem;
}

.form__extra {
  display: grid;
  gap: 1.1rem;
}

.choice {
  display: grid;
  gap: 0.6rem;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
}

.choice__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: transparent;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.92rem;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease;

  &:hover {
    border-color: var(--grey);
  }

  &.is-on {
    border-color: var(--red);
    background: rgba(225, 20, 30, 0.18);
  }
}

.stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.stepper__label {
  color: var(--grey);
  font-size: 0.85rem;
}

.stepper__ctrl {
  display: flex;
  align-items: center;
  gap: 0.4rem;

  button {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid var(--line);
    border-radius: 50%;
    background: none;
    color: var(--white);
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }
  }
}

.stepper__value {
  min-width: 2.4rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

/* Confirmation */
.done {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
}

.done__check {
  width: 4.2rem;
  height: 4.2rem;
  fill: none;
  stroke: var(--mint);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;

  circle,
  path {
    stroke-dasharray: 160;
    stroke-dashoffset: 160;
    animation: draw 0.9s var(--ease-out) forwards;
  }

  path {
    animation-delay: 0.35s;
  }
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

.done__title {
  margin: 0;
  font-family: var(--font-red);
  font-size: 2.2rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--red);
}

.done__text {
  margin: 0;
  color: var(--grey);
  font-size: 0.92rem;
}

.ticket {
  width: 100%;
  margin: 0.6rem 0;
  padding: 1.2rem;
  border: 1px dashed var(--gold);
  border-radius: 6px;
  background: #0b0b0b;

  p {
    margin: 0;
  }
}

.ticket__label {
  color: var(--gold);
  font-size: 0.65rem;
}

.ticket__names {
  margin: 0.2rem 0 !important;
  font-size: 2.2rem;
}

.ticket__meta {
  color: var(--grey);
  font-size: 0.85rem;
}

.ticket__guests {
  margin-top: 0.4rem !important;
  font-size: 0.85rem;
  font-weight: 600;
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s var(--ease-out);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
