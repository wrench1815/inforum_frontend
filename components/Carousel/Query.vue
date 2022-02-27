<template>
  <div class="container mt-6 card card-bod">
    <div class="row pt-4">
      <div class="col">
        <h3>See Popular Queries</h3>
        <section class="pb-7 pt-3 position-relative">
          <div id="popular-query-carousel" class="carousel slide carousel-team">
            <div class="carousel-inner">
              <div class="carousel-item active" v-if="showCaro_1">
                <CarouselQCard :query="popularQueryCaro_1" />
              </div>

              <div
                class="carousel-item"
                v-if="showRest"
                v-for="caro in popularQueryCaro_n"
                :key="caro.id"
              >
                <CarouselQCard :query="caro" />
              </div>

              <div class="carousel-item" :class="actionClass">
                <CarouselQCtaCard />
              </div>
            </div>

            <!-- Start:Carousel Controls -->
            <div class="position-relative mt-n6">
              <a
                class="carousel-control-prev text-dark position-absolute bottom-0 end-0 ms-auto"
                href="#popular-query-carousel"
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
                href="#popular-query-carousel"
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
  name: 'Query',

  data() {
    return {
      popularQuery: [],
      popularQueryCaro_1: {},
      popularQueryCaro_n: [],
      showCaro_1: false,
      showRest: false,
      popQEmpty: false,
      actionClass: '',
    }
  },

  mounted() {
    this.$axios
      .$get('ForumQuery?PageSize=5&voteSort=true')
      .then((popq) => {
        this.popularQuery = popq.forumQuery
        this.popularQueryCaro_1 = popq.forumQuery.slice(0, 1)[0]
        this.popularQueryCaro_n = popq.forumQuery.slice(1)
      })
      .then(() => {
        if (this.popularQueryCaro_1.length != 0) {
          this.showCaro_1 = true
        }

        if (this.popularQueryCaro_n.length != 0) {
          this.showRest = true
        }

        if (this.popularQuery.length == 0) {
          this.popQEmpty = true
          this.actionClass = 'active'
        }
      })
      .catch(() => {
        this.$swal({
          title: 'Error',
          icon: 'error',
          text: 'Failed to fetch Popular Queries',
        })
      })
  },
}
</script>

<style></style>
