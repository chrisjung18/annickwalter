import { defineStore } from 'pinia'

const KEY = 'wedding-lang'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    lang: 'fr'
  }),

  actions: {
    // Called once when the page opens: the visitor's last choice wins over the default
    init (defaultLang) {
      let saved = null
      try {
        saved = localStorage.getItem(KEY)
      } catch (e) {
        // Storage can be blocked. The default language is used.
      }
      this.lang = ['fr', 'en', 'it'].includes(saved) ? saved : defaultLang
    },

    setLang (lang) {
      this.lang = lang
      try {
        localStorage.setItem(KEY, lang)
      } catch (e) {
        // Not a problem: the choice just is not remembered.
      }
    }
  }
})
