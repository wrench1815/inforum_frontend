<template>
  <div class="">
    <loading class="mt-7 bg-transparent shadow-none" v-if="loading" />

    <template v-if="!loading">
      <!-- Header:Start -->
      <header>
        <div class="page-header min-vh-100">
          <div
            class="header-bg-image w-lg-65 w-md-80 w-sm-100 w-100 position-absolute fixed-top ms-auto h-100 z-index-0 border-radius-bottom-start-md-circle border-radius-top-end-md-circle border-radius-bottom-start-pill border-radius-top-end-pill shadow-blur"
            loading="lazy"
            :lazy-background="homeData.headerImage"
          ></div>
          <div class="container">
            <div class="row">
              <div class="col-lg-7">
                <div class="card card-body blur shadow-lg p-5 my-5">
                  <h1>
                    Welcome to
                    <span class="text-gradient bg-gradient-primary"
                      >Inforum</span
                    >
                  </h1>
                  <p class="lead text-bold">
                    {{ homeData.subHeading }}
                    <!-- An Information Exchange for Students by Students. -->
                  </p>
                  <div class="buttons">
                    <NuxtLink
                      class="btn bg-gradient-primary mt-4"
                      to="/forum"
                      v-if="isAuthenticated"
                    >
                      Get Started
                    </NuxtLink>
                    <NuxtLink
                      class="btn bg-gradient-primary mt-4"
                      to="/signup"
                      v-if="!isAuthenticated"
                    >
                      Join Today
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Header:End -->

      <!-- Recent Forum Queries:Start -->
      <div class="mx-3 mx-md-4">
        <CarouselQuery />
      </div>
      <!-- Recent Forum Queries:End -->

      <div class="mx-3 mx-md-4">
        <CarouselPost />
      </div>
    </template>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
import { mapGetters } from 'vuex'

export default {
  components: { Loading },

  data() {
    return {
      homeData: {},
      loading: true,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated']),
  },

  mounted() {
    this.$axios
      .$get('/home')
      .then((res) => {
        this.homeData = res[0] || {
          subHeading: 'Information Exchange For Students by Students.',
          headerImage:
            'https://res.cloudinary.com/inforum/image/upload/v1644820069/Defaults/img-1_nvdef7.jpg',
        }
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$nuxt.error(err)
      })
  },
}
</script>

<style scoped>
.header-bg-image {
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
}
</style>
