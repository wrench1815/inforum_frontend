<template>
  <!-- Navbar -->
  <div class="fixed-top">
    <!-- Navbar Light -->
    <div class="container position-sticky z-index-sticky top-0">
      <div class="row">
        <div class="col-12">
          <nav
            class="navbar-light navbar navbar-expand-lg border-radius-xl position-absolute my-3 start-0 end-0 top-0 border-bottom z-index-3 shadow mx-4"
            id="nav"
          >
            <div class="container">
              <NuxtLink class="navbar-brand fs-4" to="/">
                <img
                  data-src="@/assets/icon.jpg"
                  width="25rem"
                  alt="logo"
                  class="mb-1"
                  v-lazy-load
                />
                <span>Inforum</span>
              </NuxtLink>

              <button
                class="navbar-toggler shadow-none ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon mt-2">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
                </span>
              </button>
              <div
                class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
                id="navigation"
              >
                <ul class="navbar-nav navbar-nav-hover ms-auto">
                  <!-- Home Link -->
                  <li class="nav-item mx-2">
                    <NuxtLink
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center text-md"
                      to="/"
                    >
                      Home
                    </NuxtLink>
                  </li>

                  <li class="nav-item mx-2">
                    <NuxtLink
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center text-md"
                      to="/signup"
                    >
                      Signup
                    </NuxtLink>
                  </li>

                  <li class="nav-item mx-2">
                    <NuxtLink
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center text-md"
                      to="/login"
                    >
                      Login
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <!-- End Navbar -->
        </div>
      </div>
    </div>
  </div>
  <!-- Navbar -->
</template>

<script>
export default {
  name: 'NavBar',
  props: {},
  watch: {
    $route() {
      document.querySelectorAll('.nav-item').forEach(() => {
        document.querySelector('#navigation').classList.remove('show')
        document.querySelector('.navbar-toggler').classList.add('collapsed')
        document
          .querySelector('.navbar-toggler')
          .setAttribute('aria-expanded', false)
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-border {
  border-radius: 1.5rem 0.3rem 1.5rem 0.3rem;
}

#nav .navbar-nav .nuxt-link-exact-active {
  color: #e91e63;
}
</style>
