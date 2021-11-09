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

      // Font
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material_kit/css/fonts.css',
      },

      // Nucleo Icons css
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material_kit/css/nucleo-icons.css',
      },

      // Nucleo Icons svg
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material_kit/css/nucleo-svg.css',
      },

      // Font Awesome css
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material_kit/css/font-awesome.min.css',
      },

      // Material Design css
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material_kit/css/material-kit.min.css',
      },
    ],

    script: [
      // Popper js
      {
        type: 'text/javascript',
        src: '/material_kit/js/core/popper.min.js',
      },

      // Bootstrap js
      {
        type: 'text/javascript',
        src: '/material_kit/js/core/bootstrap.min.js',
      },

      // Material Design js
      {
        type: 'text/javascript',
        src: '/material_kit/js/material-kit.min.js',
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
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
