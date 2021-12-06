<template>
  <v-app id="admin">
    <v-navigation-drawer
      class="elevation-4 fill-height"
      v-model="drawer"
      fixed
      app
      left
    >
      <v-list dense height="94vh">
        <v-list-item class="text-h4">
          <img class="site-logo" src="../assets/img/icon.jpg" alt="" />
          <span class="ms-1 blue--text align-self-end">{{ title }}</span>
        </v-list-item>

        <v-divider class="mt-1 mt-md-3"></v-divider>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="text-center">
        <v-btn color="blue" class="white--text" to="/">
          <v-icon>mdi-home-outline</v-icon>to Main Site
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      :elevate-on-scroll="true"
      color="white"
      class="mx-4 mt-4"
      shaped
      fixed
      app
    >
      <!-- Start:Site Title -->
      <v-list class="d-lg-none" dense>
        <v-list-item class="text-lg-h4 text-h5 blue--text">
          <img class="img-2-rem" src="../assets/img/icon.jpg" alt="site Icon" />
          <span class="ms-1">{{ title }}</span></v-list-item
        >
      </v-list>
      <!-- End:Site Title -->
      <v-spacer />

      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-lg-none"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="mt-4">
      <v-container>
        <Nuxt />
      </v-container>

      <!-- Start:Footer -->
      <v-footer absolute color="white">
        <v-row>
          <v-col cols="12" align-self="center">
            <v-card-text class="d-flex align-center">
              <img class="img-2-rem" src="../assets/img/icon.jpg" alt="" />
              <span class="ms-2 align-self-end"
                >Inforum &copy; {{ new Date().getFullYear() }}</span
              >
            </v-card-text>
          </v-col>
        </v-row>
      </v-footer>
      <!-- End:Footer -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      title: 'Inforum',
      items: [
        {
          icon: 'mdi-view-dashboard-outline',
          title: 'Dashboard',
          to: '/admin',
        },

        {
          icon: 'mdi-test-tube',
          title: 'Test',
          to: '/admin/test',
        },
      ],
    }
  },
}
</script>

<style scoped>
.site-logo {
  width: 3rem;
}

.img-2-rem {
  width: 2rem;
}
</style>
