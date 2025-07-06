// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    'vue-yandex-maps/nuxt'
  ],
  yandexMaps: {
    apikey: 'de0ee812-515f-4988-a580-639be65741a6',
  },
  runtimeConfig: {
    public: {
      SITE_URL: process.env.SITE_URL || 'https://space.gleede.ru/'
    }
  }
});
