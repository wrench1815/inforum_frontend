<template>
  <div class="text-center">
    <!-- Start:Popular Section -->
    <h3>Popular</h3>
    <div class="border-top mb-2"></div>
    <!-- Start:Loading -->
    <template v-if="loading">
      <h5>Loading....</h5>
    </template>
    <!-- End:Loading -->

    <!-- Start:Popular Queries-->
    <div v-else class="container-flui px-3">
      <template v-if="popularQueries">
        <ForumPopularQuery
          class="my-3"
          v-for="query in popularQueries.forumQuery"
          :key="query.id"
          :query="query"
        />
      </template>
      <div v-else>
        <p>No Popular Queries</p>
      </div>
    </div>
    <!-- End:Popular Queries-->

    <!-- End:Popular Section -->

    <div class="border-top my-2"></div>

    <!-- Start:Categories Section -->
    <h3>Categories</h3>
    <div class="border-top mb-2"></div>

    <!-- Start:Loading -->
    <template v-if="loading">
      <h5>Loading....</h5>
    </template>
    <!-- End:Loading -->

    <!-- Start:Categories -->
    <div class="pb-2" v-else>
      <template v-if="categories">
        <ForumRightSideItem
          v-for="cat in categories"
          :key="cat.id"
          :cat="cat"
          :typeBtn="true"
        />
      </template>
      <template else>
        <p>No Categories to show</p>
      </template>
    </div>
    <!-- End:Categories -->

    <!-- End:Categories Section -->
  </div>
</template>

<script>
export default {
  name: 'RightSideBar',

  data() {
    return {
      loading: true,
      categories: null,
      popularQueries: null,
    }
  },

  mounted() {
    this.$axios
      .$get(`ForumQuery?pageSize=5&voteSort=true`)
      .then((res) => {
        if (res.pagination.totalCount > 0) {
          this.popularQueries = res
        } else {
          this.popularQueries = null
        }
      })
      .then(() => {
        this.$axios
          .$get('/Categories')
          .then((cats) => {
            if (cats.length > 0) {
              this.categories = cats
            } else {
              this.categories = null
            }
          })
          .then(() => {
            this.loading = false
          })
          .catch((err) => {
            this.$swal({
              type: 'error',
              icon: 'error',
              title: 'Oops...',
              html: 'Something went wrong!<br/>Unable to fetch Categories.',
            })
          })
      })
      .catch((err) => {
        this.$swal({
          type: 'error',
          icon: 'error',
          title: 'Oops...',
          html: 'Something went wrong!<br/>Unable to fetch Popular Queries',
        })
      })
  },
}
</script>

<style scoped></style>
