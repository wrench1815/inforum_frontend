<template>
  <aside
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white shadow-dark custom-shadow"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-xl-none"
        aria-hidden="true"
        @click="sideBarToggler"
      ></i>
      <NuxtLink class="navbar-brand m-0" to="/admin">
        <img
          src="/favicon.png"
          class="navbar-brand-img h-100"
          alt="main_logo"
        />
        <span class="ms-1 font-weight-bold text-dark">Inforum Dashboard</span>
      </NuxtLink>
    </div>
    <hr class="horizontal bg-dark mt-0 mb-2" />
    <div
      class="collapse navbar-collapse w-auto max-height-vh-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <!-- Start: Dashboard Home -->
        <li class="nav-item">
          <NuxtLink
            class="nav-link text-dark"
            to="/admin"
            :active-class="'fix-active-link-bug'"
          >
            <div
              class="text-dark text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-tachometer-alt"></i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </NuxtLink>
        </li>
        <!-- End: Dashboard Home -->

        <!-- Start:Dynamic Nav List -->
        <li class="nav-item" v-for="(route, index) in routes" :key="index">
          <NuxtLink class="nav-link text-dark" :to="'/admin' + route.link">
            <div
              class="text-dark text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i :class="'fas opacity-10' + ' ' + route.icon"></i>
            </div>
            <span class="nav-link-text ms-1">{{ route.name }}</span>
          </NuxtLink>
        </li>
        <!-- End:Dynamic Nav List -->
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0">
      <div class="mx-3">
        <a class="btn btn-dark w-100 text-capitalize" href="/">To Main Site</a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AsideNav',
  data() {
    return {
      routes: [
        {
          name: 'Blog Post',
          link: '/blogpost',
          icon: 'fa-pen-nib',
        },
        {
          name: 'Category',
          link: '/category',
          icon: 'fa-list',
        },
        {
          name: 'Comments',
          link: '/comments',
          icon: 'fa-comment',
        },
        {
          name: 'Contact Forms',
          link: '/contact-form',
          icon: 'fa-envelope-open-text',
        },
        {
          name: 'Forum',
          link: '/forum',
          icon: 'fa-comments',
        },
        {
          name: 'Home',
          link: '/home',
          icon: 'fa-home',
        },
        {
          name: 'Users',
          link: '/users',
          icon: 'fa-user',
        },
      ].sort(
        (first, second) => first.name.toLowerCase() > second.name.toLowerCase()
      ),
    }
  },
  methods: {
    sideBarToggler() {
      document.body.classList.toggle('g-sidenav-pinned')
    },
  },
  watch: {
    $route() {
      if (document.body.classList.contains('g-sidenav-pinned')) {
        this.sideBarToggler()
      }
    },
  },
}
</script>

<style scoped>
#sidenav-collapse-main {
  height: 70vh !important;
}

#sidenav-main .navbar-nav .nuxt-link-active {
  color: white !important;
  background-image: linear-gradient(195deg, #ec407a 0%, #d81b60 100%);
}

#sidenav-main .navbar-nav .nuxt-link-active i {
  color: white !important;
}

#sidenav-main .navbar-nav .nuxt-link-exact-active {
  color: white !important;
  background-image: linear-gradient(195deg, #ec407a 0%, #d81b60 100%);
}

#sidenav-main .navbar-nav .nuxt-link-exact-active i {
  color: white !important;
}
</style>
