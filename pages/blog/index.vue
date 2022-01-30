<template>
  <div class="container mt-7">
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
      <div class="col-lg-4 col-md-6" v-for="(post, i) in cardPosts" :key="i">
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
  </div>
</template>

<script>
import Pagination from '~/components/Pagination.vue'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      fullPost: '',
      cardPosts: [],
      pageSize: 10,
      pagination: {},
      pages: [],
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
    const blogPosts = this.$axios.$get(`/BlogPosts?PageSize=${this.pageSize}`)

    blogPosts.then((res) => {
      this.fullPost = res.posts.slice(0, 1)[0]
      this.cardPosts = res.posts.slice(1)
      this.pagination = res.pagination
      this.pages = [...Array(this.pagination.totalPages).keys()].map(
        (page) => page + 1
      )
    })
  },
}
</script>

<style scoped>
.cover-img {
  object-fit: cover;
}

.custom-paragraph {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.img-hover-zoom {
  overflow: hidden;
}

.img-hover-zoom img {
  transition: transform 0.8s ease;
}

.img-hover-zoom:hover img {
  transform: scale(1.2);
}
</style>
