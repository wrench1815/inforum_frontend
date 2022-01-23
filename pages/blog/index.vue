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
      <div class="col-lg-4 col-md-6" v-for="post in cardPosts">
        <LazyBlogPostCard :post="post" />
      </div>
      <!-- End:Card size post -->
    </div>
    <!-- End:Latest Posts -->

    <!-- Start:Pagination -->
    <section>
      <div class="container">
        <div class="row justify-space-between py-2">
          <div class="col-lg-4 mx-auto">
            <ul class="pagination pagination-primary m-4">
              <li class="page-item">
                <a class="page-link" href="javascript:;" aria-label="Previous">
                  <span aria-hidden="true"
                    ><i class="fas fa-chevron-left" aria-hidden="true"></i
                  ></span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="javascript:;">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:;">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:;">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:;">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:;">5</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:;" aria-label="Next">
                  <span aria-hidden="true"
                    ><i class="fas fa-chevron-right" aria-hidden="true"></i
                  ></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- End:Pagination -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullPost: '',
      cardPosts: [],
    }
  },

  mounted() {
    const blogPosts = this.$axios.$get('/BlogPosts')

    blogPosts.then((res) => {
      this.fullPost = res.posts.slice(0, 1)[0]
      this.cardPosts = res.posts.slice(1)
    })
  },
}
</script>

<style>
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
