<template>
  <div class="card-body pt-0">
    <h3 class="card card-body d-flex flex-row mb-3">
      Blog Post by <span class="text-primary ms-2">You</span>
    </h3>
    <div class="row g-4">
      <div v-if="loading" class="col-lg-4 col-md-6">
        <h5>Loading....</h5>
      </div>

      <div
        v-if="!loading"
        class="col-lg-4 col-md-6"
        v-for="post in blogPost.posts"
        :key="post.id"
      >
        <LazyBlogPostCard :dashCard="true" :post="post" />
      </div>

      <div class="text-center" v-if="!loading">
        <p
          v-if="blogPost.pagination.hasNext"
          @click="loadMorePost"
          class="d-inline-block cursor-pointer text-primary"
        >
          Load More....
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dash',

  data() {
    return {
      blogPost: {},
      loading: true,
      pageNumber: 1,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    loadMorePost() {
      this.pageNumber = this.pageNumber + 1

      this.$axios
        .$get(
          `/BlogPosts?userId=${this.loggedInUser.id}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          this.blogPost.posts = this.blogPost.posts.concat(res.posts)
          this.blogPost.pagination = res.pagination
        })
    },
  },

  mounted() {
    this.$axios
      .$get(`/BlogPosts?userId=${this.loggedInUser.id}`)
      .then((res) => {
        this.blogPost = res
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$swal({
          title: 'Error',
          icon: 'error',
          type: 'error',
          html: `Failed to fetch Posts.<br/>Please try again later.`,
        })
      })
  },
}
</script>

<style></style>
