<template>
  <div class="container mt-6 card">
    <div class="row pt-4">
      <div class="col">
        <h3>See Popular Blog Posts</h3>
        <section class="pb-7 pt-3 position-relative">
          <div id="carousel-popular-posts" class="carousel slide carousel-team">
            <div class="carousel-inner">
              <div class="carousel-item active" v-if="showCaro_1">
                <CarouselPCard :post="popularPostCaro_1" />
              </div>

              <div
                class="carousel-item"
                v-if="showRest"
                v-for="caro in popularPostCaro_n"
                :key="caro.id"
              >
                <CarouselPCard :post="caro" />
              </div>

              <div class="carousel-item" :class="actionClass">
                <CarouselPCtaCard />
              </div>
            </div>

            <!-- Start:Carousel Controls -->
            <div class="position-relative mt-n6">
              <a
                class="carousel-control-prev text-dark position-absolute bottom-0 end-0 ms-auto"
                href="#carousel-popular-posts"
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
                href="#carousel-popular-posts"
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
</template>

<script>
export default {
  name: 'Post',

  data() {
    return {
      popularPost: [],
      popularPostCaro_1: {},
      popularPostCaro_n: [],
      showCaro_1: false,
      showRest: false,
      popPEmpty: false,
      actionClass: '',
    }
  },

  mounted() {
    this.$axios
      .$get('BlogPosts?PageSize=5&starSort=true')
      .then((pop) => {
        this.popularPost = pop.posts
        this.popularPostCaro_1 = pop.posts.slice(0, 1)[0]
        this.popularPostCaro_n = pop.posts.slice(1)
      })
      .then(() => {
        if (this.popularPostCaro_1.length != 0) {
          this.showCaro_1 = true
        }

        if (this.popularPostCaro_n.length != 0) {
          this.showRest = true
        }

        if (this.popularPost.length == 0) {
          this.popPEmpty = true
          this.actionClass = 'active'
        }
      })
      .catch(() => {
        this.$swal({
          title: 'Error',
          icon: 'error',
          text: 'Failed to fetch Popular Posts',
        })
      })
  },
}
</script>

<style></style>
