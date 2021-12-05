<template>
  <v-app>
    <v-navigation-drawer
      class="d-lg-none"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          :exact-active-class="exactClassesSidebar"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      class="mx-4 mt-4 rounded-lg"
      :elevate-on-scroll="true"
      :clipped-right="clipped"
      color="white"
      fixed
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none" /> -->
      <v-list dense>
        <v-list-item class="text-lg-h4 text-h5" color="blue">{{
          title
        }}</v-list-item>
      </v-list>

      <v-spacer />

      <v-list class="d-inline-flex" dense>
        <v-list-item
          class="d-none d-lg-flex px-0 mx-3"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          :exact-active-class="exactClassesInline"
          :ripple="false"
        >
          <v-list-item-content>
            <v-list-item-title
              class="text-subtitle-2"
              v-text="item.title"
            /> </v-list-item-content
        ></v-list-item>
      </v-list>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none" />
    </v-app-bar>

    <v-main class="mt-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        // Home
        {
          icon: 'mdi-home-outline',
          title: 'Home',
          to: '/',
        },

        {
          icon: 'mdi-forum-outline',
          title: 'Forum',
          to: '/forum',
        },

        {
          icon: 'mdi-post-outline',
          title: 'Blog',
          to: '/blog',
        },

        {
          icon: 'mdi-contacts-outline',
          title: 'Contact',
          to: '/contact',
        },

        {
          icon: 'mdi-information-outline',
          title: 'About',
          to: '/about',
        },
        {
          icon: 'mdi-view-dashboard-outline',
          title: 'Admin',
          to: '/admin',
        },
      ],
      miniVariant: false,
      title: 'Inforum',
      exactClassesInline: 'custom-link',
      exactClassesSidebar: 'blue--text  text--accent',
    }
  },
}
</script>

<style scoped>
.custom-link::before {
  background: transparent;
}

.custom-link {
  color: #2196f3;
}

.custom-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2196f3;
  z-index: 1;
  min-height: auto;
}
</style>
