<template>
  <nav
    class="mt-4 bg-white shadow-blur navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl position-sticky top-0 z-index-sticky"
    navbar-scroll="true"
  >
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <!-- Default crumb -->
          <li class="breadcrumb-item text-md">
            <NuxtLink class="opacity-5 text-dark" to="/admin"
              >Dashboard</NuxtLink
            >
          </li>

          <!-- Active crumb -->
          <li
            class="breadcrumb-item text-md text-capitalize"
            aria-current="page"
            v-for="crumb in crumbs"
            :key="crumb.name"
          >
            <NuxtLink class="opacity-5 text-dark" :to="crumb.url">
              {{ crumb.name }}
            </NuxtLink>
          </li>
        </ol>
        <h6 class="font-weight-bolder mb-0 text-capitalize">
          {{ lastElement.name }}
        </h6>
      </nav>
      <div
        class="collapse navbar-collapse d-flex justify-content-end"
        id="navbar"
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="dropdown">
            <div
              class="dropdown-toggle"
              type="button"
              id="AdminProfileDrop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                class="avatar img-fit"
                :src="loggedInUser.profileImage"
                alt=""
              />
            </div>
            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
              aria-labelledby="AdminProfileDrop"
            >
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/profile"
                  >Profile</NuxtLink
                >
              </li>
              <li>
                <NuxtLink class="dropdown-item text-dark" to="/admin"
                  >Dash</NuxtLink
                >
              </li>
              <li>
                <div class="dropdown-divider border-dark opacity-4"></div>
              </li>
              <li>
                <div class="dropdown-item text-dark">
                  <NuxtLink class="btn btn-sm btn-danger m-0" to="/logout"
                    >Logout<i class="ms-2 fas fa-sign-out-alt text-xs"></i
                  ></NuxtLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
          <a
            href="javascript:;"
            class="nav-link text-body p-0"
            @click="sideBarToggler"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </a>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      crumbs: [],
      lastElement: {},
      utils: {
        // get crumbs from url
        getCrumbs(url) {
          return url.split('/', 3).filter((item) => item != '')
        },

        // get url from crumb
        getUrl(crumbs) {
          return ['', ...crumbs].join('/')
        },

        // get breadcrumbs list containing breadcrumb object with data
        getBreadCrumb(crumbs) {
          return crumbs.map((item, i) => {
            return {
              name: this.fixString(item),
              url: this.getUrl(crumbs.slice(0, i + 1)),
            }
          })
        },

        // last element of list
        lastElement(list) {
          return list[list.length - 1]
        },

        // fixes string error
        fixString(string) {
          const list = string.split('-')
          return list.map((item) => this.capitalizeString(item)).join(' ')
        },

        // capitalizes string
        capitalizeString(string) {
          const list = string.split('')
          list[0] = list[0].toUpperCase()
          return list.join('')
        },
      },
    }
  },
  computed: {
    crumbClass: function () {
      for (let item = 0; item < crumbs.length; item++) {
        if ((item = this.crumbs.length - 1)) {
          return 'active'
        }
        return ''
      }
    },
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    sideBarToggler() {
      document.body.classList.toggle('g-sidenav-pinned')
    },
  },

  mounted() {
    const url = this.$route.fullPath
    const crumbs = this.utils.getCrumbs(url)
    const breadCrumbs = this.utils.getBreadCrumb(crumbs)
    const lastElement = this.utils.lastElement(breadCrumbs)

    // changing data
    this.crumbs = breadCrumbs
    this.lastElement = lastElement
  },
}
</script>

<style scoped>
.img-fit {
  object-position: center;
  object-fit: cover;
}
</style>
