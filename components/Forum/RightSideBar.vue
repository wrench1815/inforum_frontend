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
      <ForumPopularQuery
        class="my-3"
        v-for="query in popularQueries.forumQuery"
        :key="query.id"
        :query="query"
      />
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
    <template v-else>
      <ForumRightSideItem
        v-for="cat in categories"
        :key="cat.id"
        :cat="cat"
        :typeBtn="true"
      />
    </template>
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
      categories: {},
      popularQueries: {},
    }
  },

  mounted() {
    this.$axios
      .$get(`ForumQuery?pageSize=5&voteSort=true`)
      .then((res) => {
        this.popularQueries = res
      })
      .then(() => {
        this.$axios
          .$get('/Categories')
          .then((cats) => {
            this.categories = cats
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
