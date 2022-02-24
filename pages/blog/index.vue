<template>
  <div class="container mt-7">
    <loading class="bg-transparent shadow-none" v-if="loading" />
    <template v-if="!loading">
      <template v-if="blogPosts">
        <!-- Start:Heading -->
        <h1 class="text-center">The Blog</h1>
        <!-- End:Heading -->

        <!-- Start:Latest Posts -->
        <div class="row gx-4 gy-5">
          <!-- Start:Full size post -->
          <div class="col-12 mb-0 mb-sm-3" v-if="fullPost != ''">
            <BlogFullPostCard :post="fullPost" />
          </div>
          <!-- End:Full size post -->

          <!-- Start:Card size post -->
          <div
            class="col-lg-4 col-md-6"
            v-for="(post, i) in cardPosts"
            :key="i"
          >
            <LazyBlogPostCard :post="post" />
          </div>
          <!-- End:Card size post -->
        </div>
        <!-- End:Latest Posts -->

        <!-- Pagination Start-->
        <Pagination
          :pageSize="this.pageSize"
          :pagination="this.pagination"
          :pages="this.pages"
          @getSelectedPage="selectedPage($event)"
          @getNextPage="nextPage"
          @getPreviousPage="previousPage"
          @getFirstPage="firstPage"
          @getLastPage="lastPage"
        />
        <!-- Pagination End -->
      </template>

      <template v-else>
        <div class="text-center">
          <h1>No Blog Posts</h1>
        </div>
        <NotFound
          :message="'There are no blog posts to display. Please check back later.'"
        />
      </template>
    </template>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
import Pagination from '~/components/Pagination.vue'

export default {
  components: {
    Pagination,
    Loading,
  },

  data() {
    return {
      fullPost: '',
      cardPosts: [],
      pageSize: 10,
      pagination: {},
      pages: [],
      loading: true,
      blogPosts: {},
    }
  },

  methods: {
    getData(pageNumber) {
      const blogPosts = this.$axios.$get(
        `/BlogPosts?PageNumber=${pageNumber}&PageSize=${this.pageSize}`
      )

      blogPosts
        .then((res) => {
          this.fullPost = res.posts.slice(0, 1)[0]
          this.cardPosts = res.posts.slice(1)
          this.pagination = res.pagination
        })
        // Scroll to top on page change
        .then(() => {
          setTimeout(() => {
            window.scroll(0, 0)
          }, 0)
        })
    },
    firstPage() {
      this.getData(1)
    },
    lastPage() {
      this.getData(this.pagination.totalPages)
    },
    nextPage() {
      this.getData(this.pagination.currentPage + 1)
    },
    previousPage() {
      this.getData(this.pagination.currentPage - 1)
    },
    selectedPage(pageNumber) {
      this.getData(pageNumber)
    },
  },
  mounted() {
    const blogPosts = this.$axios
      .$get(`/BlogPosts?PageSize=${this.pageSize}`)
      .then((res) => {
        if (res.pagination.totalCount > 0) {
          this.blogPosts = res
          this.fullPost = res.posts.slice(0, 1)[0]
          this.cardPosts = res.posts.slice(1)
          this.pagination = res.pagination
          this.pages = [...Array(this.pagination.totalPages).keys()].map(
            (page) => page + 1
          )
        } else {
          this.blogPosts = null
        }
      })
      .then(() => {
        this.loading = false
      })
  },
}
</script>

<style scoped></style>
