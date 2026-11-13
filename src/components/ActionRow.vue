<template>
  <div class="actions" role="group">
    <!-- My list: opens a calendar event for the wedding -->
    <a
      class="actions__btn"
      :class="{ 'is-on': added }"
      :href="calendarUrl"
      target="_blank"
      rel="noopener"
      :aria-label="c.actions.listHint"
      @click="added = true"
    >
      <span class="material-icons actions__icon" aria-hidden="true">{{ added ? 'check' : 'add' }}</span>
      <span class="actions__label">{{ added ? c.actions.listAdded : c.actions.list }}</span>
    </a>

    <!-- Rate: a like button, remembered in this browser -->
    <button class="actions__btn" :class="{ 'is-on': liked }" type="button" :aria-pressed="liked" @click="toggleLike">
      <span :key="String(liked)" class="actions__icon actions__icon--pop" aria-hidden="true">
        <span :class="liked ? 'material-icons' : 'material-icons-outlined'">thumb_up</span>
      </span>
      <span class="actions__label">{{ liked ? c.actions.rated : c.actions.rate }}</span>
    </button>

    <!-- Share -->
    <button class="actions__btn" type="button" @click="share">
      <span class="material-icons-outlined actions__icon" aria-hidden="true">send</span>
      <span class="actions__label">{{ c.actions.share }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useWeddingStore } from 'stores/wedding'
import { useContent, fill } from 'src/composables/useContent'

defineOptions({
  name: 'ActionRow'
})

const LIKE_KEY = 'wedding-liked'

const $q = useQuasar()
const wedding = useWeddingStore()
const { c } = useContent()

const added = ref(false)
const liked = ref(false)

onMounted(() => {
  try {
    liked.value = localStorage.getItem(LIKE_KEY) === '1'
  } catch (e) {
    // Storage can be blocked. The button simply starts unliked.
  }
})

const calendarUrl = computed(() => {
  const stamp = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const start = wedding.date
  const end = new Date(start.getTime() + 8 * 3600 * 1000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: wedding.names,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: c.value.invite.text,
    location: `${wedding.venues[0].place}, ${wedding.venues[0].address}`
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
})

function toggleLike () {
  liked.value = !liked.value
  try {
    localStorage.setItem(LIKE_KEY, liked.value ? '1' : '0')
  } catch (e) {
    // Not remembered, but the button still works.
  }
}

async function share () {
  const url = window.location.href.split('#')[0]

  if (navigator.share) {
    try {
      await navigator.share({ title: wedding.names, text: c.value.invite.text, url })
      return
    } catch (e) {
      if (e && e.name === 'AbortError') return
    }
  }

  try {
    await navigator.clipboard.writeText(url)
    $q.notify({ message: c.value.actions.copied, icon: 'check', color: 'grey-10', textColor: 'white', position: 'bottom' })
  } catch (e) {
    $q.notify({
      message: fill(c.value.actions.copyFail, { url }),
      color: 'grey-10',
      textColor: 'white',
      position: 'bottom',
      timeout: 7000
    })
  }
}
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 9vw, 4.5rem);
}

.actions__btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  min-width: 4rem;
  padding: 0.4rem 0.25rem;
  border: 0;
  background: none;
  color: var(--grey);
  font-family: var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s var(--ease-out);

  &:hover,
  &:focus-visible {
    color: var(--white);
    transform: translateY(-2px);
  }

  &.is-on {
    color: var(--white);
  }
}

.actions__icon {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 1.9rem;
  line-height: 1;

  [class^='material-icons'],
  &.material-icons,
  &.material-icons-outlined {
    font-size: 1.9rem;
  }
}

.actions__icon--pop {
  animation: pop 0.45s var(--ease-out);
}

.actions__label {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

@keyframes pop {
  0% { transform: scale(0.6) rotate(-14deg); }
  60% { transform: scale(1.25) rotate(6deg); }
  100% { transform: scale(1) rotate(0); }
}

@media (prefers-reduced-motion: reduce) {
  .actions__icon--pop {
    animation: none;
  }
}
</style>
