import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    // Boot files run before the app starts (src/boot/*.js)
    boot: ['fonts', 'reveal'],

    css: ['app.scss'],

    // Icon fonts used by Quasar components and the action buttons
    extras: ['material-icons', 'material-icons-outlined'],

    build: {
      // 'history' gives clean URLs. Your host needs an SPA fallback to index.html
      // (a Netlify _redirects file is already included in /public).
      // Switch to 'hash' if your host cannot do that.
      vueRouterMode: 'history',

      // Lets your own .js files import './folder' without writing './folder/index.js'
      extendWebpack (cfg) {
        cfg.module.rules.push({ test: /\.m?js$/, resolve: { fullySpecified: false } })
      }
    },

    devServer: {
      open: false
    },

    framework: {
      // The whole site is dark, so Quasar components (inputs, dialogs) are dark too
      config: { dark: true },
      plugins: ['Notify', 'Dialog']
    },

    animations: []
  }
})
