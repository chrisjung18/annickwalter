import { computed } from 'vue'
import { useSettingsStore } from 'stores/settings'
import { useWeddingStore } from 'stores/wedding'
import fr from 'src/content/fr.js'
import en from 'src/content/en.js'
import it from 'src/content/it.js'

const dictionaries = { fr, en, it }
const locales = { fr: 'fr-FR', en: 'en-GB', it: 'it-IT' }

/** Replaces {name} style placeholders in a text. */
export function fill (text, vars = {}) {
  return String(text).replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : ''))
}

/**
 * Gives a component the texts in the current language (`c`), and helpers to
 * format the wedding date and the RSVP deadline in that language.
 */
export function useContent () {
  const settings = useSettingsStore()
  const wedding = useWeddingStore()

  const c = computed(() => dictionaries[settings.lang] || fr)
  const lang = computed(() => settings.lang)
  const locale = computed(() => (locales[settings.lang] || 'fr-FR'))

  const fmt = (options, date = wedding.date) =>
    new Intl.DateTimeFormat(locale.value, { timeZone: wedding.timeZone, ...options }).format(date)

  const dateLong = computed(() => fmt({ day: 'numeric', month: 'long', year: 'numeric' }))
  const deadlineLong = computed(() =>
    fmt({ day: 'numeric', month: 'long', year: 'numeric' }, wedding.deadline)
  )
  const timeShort = computed(() => fmt({ hour: '2-digit', minute: '2-digit', hour12: false }))

  return { c, lang, locale, fmt, dateLong, deadlineLong, timeShort }
}
