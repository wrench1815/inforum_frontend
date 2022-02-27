<template>
  <div class="">
    <loading class="mt-7 bg-transparent shadow-none" v-if="loading" />

    <template v-if="!loading">
      <!-- Header:Start -->
      <header>
        <div class="page-header min-vh-100">
          <div
            class="header-bg-image w-lg-55 w-md-50 w-sm-100 w-100 position-absolute fixed-top ms-auto h-100 z-index-0"
            loading="lazy"
            :style="{
              'background-image': 'url(' + homeData.headerImage + ')',
            }"
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
        <div class="container mt-6 card card-bod">
          <div class="row pt-4">
            <div class="col">
              <h3>See Popular Queries</h3>
              <section class="pb-7 position-relative">
                <div
                  id="carousel-testimonials"
                  class="carousel slide carousel-team"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <div class="container">
                        <div class="row align-items-center">
                          <div class="col-md-5 ms-lg-auto">
                            <div class="p-3">
                              <img
                                class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                                src="https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                                alt="First slide"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div class="col-md-5 me-lg-auto position-relative">
                            <h6
                              class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                            >
                              First Step
                            </h6>
                            <h1
                              class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                            >
                              Give your best
                            </h1>
                            <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                              Give your best to create something unique with
                              high impact.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="container">
                        <div class="row align-items-center">
                          <div class="col-md-5 ms-lg-auto">
                            <div class="p-3">
                              <img
                                class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                                src="https://images.unsplash.com/photo-1602781975725-cab34bd38d94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                                alt="Second slide"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div class="col-md-5 me-lg-auto position-relative">
                            <h6
                              class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                            >
                              Second Step
                            </h6>
                            <h1
                              class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                            >
                              Plan your work
                            </h1>
                            <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                              As we live, our hearts turn colder. Cause pain is
                              what we go through.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="container">
                        <div class="row align-items-center">
                          <div class="col-md-5 ms-lg-auto">
                            <div class="p-3">
                              <img
                                class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                                src="https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=974&amp;q=80"
                                alt="Third slide"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div class="col-md-5 me-lg-auto position-relative">
                            <h6
                              class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                            >
                              Third Step
                            </h6>
                            <h1
                              class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                            >
                              Follow your dreams
                            </h1>
                            <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                              The time is now for it to be okay to be great.
                              People in this world shun people.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="container">
                        <div class="row align-items-center">
                          <div class="col-md-5 ms-lg-auto">
                            <div class="p-3">
                              <img
                                class="w-100 border-radius-xl max-height-600 fadeIn2 fadeInBottom"
                                src="https://images.unsplash.com/photo-1579523616974-c2b09289c27e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=966&amp;q=80"
                                alt="Fourth slide"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div class="col-md-5 me-lg-auto position-relative">
                            <h6
                              class="opacity-7 text-uppercase font-weight-bolder text-sm fadeIn4 fadeInBottom"
                            >
                              Fourth Step
                            </h6>
                            <h1
                              class="text-dark display-3 font-weight-bolder fadeIn2 fadeInBottom"
                            >
                              Never give up
                            </h1>
                            <p class="my-4 lead text-dark fadeIn2 fadeInBottom">
                              Everyone’s born confident, and everything’s taken
                              away from you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Start:Carousel Controls -->
                  <div class="position-relative mt-n6">
                    <a
                      class="carousel-control-prev text-dark position-absolute bottom-0 end-0 ms-auto"
                      href="#carousel-testimonials"
                      role="button"
                      data-bs-slide="prev"
                      style=""
                    >
                      <i
                        class="fas fa-2x fa-chevron-left position-absolute start-0 ms-3 mt-7 mt-md-0 ms-n5 ms-md-0"
                        aria-hidden="true"
                      ></i>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next text-dark position-absolute bottom-0 end-0 ms-auto ms-4"
                      href="#carousel-testimonials"
                      role="button"
                      data-bs-slide="next"
                      style=""
                    >
                      <i
                        class="fas fa-2x fa-chevron-right mt-7 mt-md-0"
                        aria-hidden="true"
                      ></i>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <!-- End:Carousel Controls -->
                </div>
              </section>
            </div>
          </div>
        </div>
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
  background-size: fit;
}
</style>
