// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  srcDir: 'src/',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  plugins: [
    '~/plugins/pinia.ts',
    '~/plugins/vue-the-mask.js',
  ],

  components: [
    { path: './components/atoms/' },
    { path: './components/molecules/' },
    { path: './components/organisms/' },
    { path: './assets/image/svg' }
  ],

  css: [
    '~/assets/scss/common/reset.scss'
  ],

  sourcemap: {
    server: false,
    client: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/scss/main.scss" as *;',
          quietDeps: true
        }
      }
    }
  },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
})