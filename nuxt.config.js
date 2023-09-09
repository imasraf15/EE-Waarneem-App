export default {
  ssr: false,

  head: {
    title: 'EE-Waarneem-App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/css/style',
  ],

  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/common-utils'
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt'
  ],

}
