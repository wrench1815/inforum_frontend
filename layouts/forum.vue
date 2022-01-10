<template>
  <div>
    <LazyForumNavBar />
    <Nuxt />
    <LazyFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'bg-light',
      },
      link: [
        // Material Design css
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/material_kit/css/material-kit.min.css',
        },
      ],
      script: [
        // Material Design js
        {
          type: 'text/javascript',
          src: '/material_kit/js/material-kit.min.js',
        },
      ],
    }
  },
}
</script>

<style scoped>
</style>
