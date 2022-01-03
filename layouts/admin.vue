<template>
  <div v-if="display">
    <AdminAsideNav class="aside-index" />
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >
      <!-- <AdminNavBar /> -->
      <Nuxt />
      <AdminFooter />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      display: false,
    }
  },
  created() {
    if (!(this.isAuthenticated && this.loggedInUser)) {
      this.$router.push('/login')
    } else {
      this.display = true
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'g-sidenav-show  bg-gray-200',
      },
      link: [
        // Material Design css
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/material_dashboard/css/material-dashboard.min.css',
        },
      ],
      script: [
        // Material Design js
        {
          type: 'text/javascript',
          src: '/material_dashboard/js/material-dashboard.min.js',
        },
      ],
    }
  },
}
</script>

<style scoped>
.aside-index {
  z-index: 1021;
}
</style>
