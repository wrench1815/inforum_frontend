<template>
  <!-- Start:Root -->
  <v-app>
    <!-- Start:Nav Drawer -->
    <v-navigation-drawer
      class="d-lg-none"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :disable-resize-watcher="true"
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
    <!-- End:Nav Drawer -->

    <!-- Start:Nav Bar -->
    <v-app-bar
      class="mx-4 mt-4 rounded-lg"
      :elevate-on-scroll="true"
      :clipped-right="clipped"
      color="white"
      fixed
      app
    >
      <!-- Start:Site Title -->
      <v-list dense>
        <v-list-item class="text-lg-h4 text-h5" color="blue">{{
          title
        }}</v-list-item>
      </v-list>
      <!-- End:Site Title -->

      <v-spacer />

      <!-- Start:Nav Items -->
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
      <!-- End:Nav Items -->

      <!-- Start:Nav Drawer Icon -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none" />
      <!-- End:Nav Drawer Icon -->
    </v-app-bar>
    <!-- End:Nav Bar -->

    <!-- Start:Main -->
    <v-main class="mt-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- End:Main -->

    <!-- Start:Footer -->
    <v-footer :absolute="!fixed" app color="white" max-height="40vh">
      <v-row>
        <v-col cols="12" md="3">
          <div class="d-flex flex-column align-center align-md-start">
            <p class="text-h4 d-flex align-center">
              <img class="foot-image" src="../assets/img/icon.jpg" alt="" />
              Inforum
            </p>
            <a href="mailto:contact@inforum.com"
              ><span class="">Email</span> contact@inforum.com</a
            >
          </div>
        </v-col>
        <v-spacer />

        <v-col cols="4" md="3">
          <v-list>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
          </v-list>
        </v-col>
        <v-col cols="4" md="3">
          <v-list>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
          </v-list>
        </v-col>
        <v-col cols="4" md="3">
          <v-list>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
            <v-list-item>Home</v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" align-self="center">
          <v-card-text class="text-center">
            <span>&copy; Inforum {{ new Date().getFullYear() }}</span>
          </v-card-text>
        </v-col>
      </v-row>
    </v-footer>
    <!-- End:Footer -->
  </v-app>
  <!-- End:Root -->
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

.foot-image {
  width: 2rem !important;
}
</style>
