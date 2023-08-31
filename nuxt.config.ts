// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', [
    '@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }
  ]],
  app: {
    head: {
      title: '30 days of code with VickyJay - V2',
      link: [
        { rel: 'stylesheet', href: '/css/google-font.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto' }
      ],
      meta: [
        { name: 'viewport', content: "width=device-width, initial-scale=1, user-scalable=no" },
        { name: 'description', content: "Upload your work for the day" }
      ]
    },
  },
  imports: {
    presets: [
      { from: 'pinia', imports: ['storeToRefs', 'useStore'] }
    ]
  }
})
