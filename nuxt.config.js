export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Inforum',
    htmlAttrs: {
      lang: 'en',
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Roboto Font
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/global/css/fonts.css',
      },

      // Nucleo Icons css
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/global/css/nucleo-icons.css',
      },

      // Nucleo Icons svg
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/global/css/nucleo-svg.css',
      },
    ],

    script: [
      // Font Awesome
      {
        type: 'text/javascript',
        src: '/global/js/font-awesome.js',
      },

      // Bootstrap Bundle js
      {
        type: 'text/javascript',
        src: '/global/js/bootstrap.bundle.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // sweetalert2 configuration: https://sweetalert2.github.io
  sweetalert: {
    confirmButtonColor: '#4caf50',
    cancelButtonColor: '#f44335',
    allowOutsideClick: false,
    allowEscapeKey: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    axios: {
      baseUrl: 'http://localhost:5064/api',
    },
  },
}
