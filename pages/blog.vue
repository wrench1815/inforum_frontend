<template>
  <div class="container-fluid mt-7">
    <!-- Start:Heading -->
    <h1>The Blog</h1>
    <!-- End:Heading -->

    <!-- Start:Latest Posts -->
    <div class="row g-4 mt-4">
      <!-- Start:Full size post -->
      <div class="col-12 mb-0 mb-sm-3">
        <div class="row g-0">
          <div class="col-sm-6 ps-sm-0 d-flex align-items-center">
            <div
              class="card-image cursor-pointer h-100 w-100 ratio ratio-16x9 img-hover-zoom"
            >
              <img
                class="shadow-lg border-radius-top-end-2xl border-radius-top-end-md-0 border-radius-top-start-2xl border-radius-bottom-start-md-2xl img-fluid cover-img"
                src="@/assets/images/img-1.jpg"
              />
            </div>
          </div>
          <div
            class="shadow-lg border-radius-bottom-start-2xl border-radius-bottom-start-md-0 border-radius-bottom-end-2xl border-radius-top-end-md-2xl border-radius-top-end-0 border-radius-top-start-0 border-radius-bottom-start-0 col-sm-6 ps-sm-0 card"
          >
            <div class="card-body">
              <p class="card-text">
                <small class="text-info">March 02, 2021</small>
                <span class="text-primary">|</span>
                <span class="text-info"> John Doe</span>
              </p>
              <NuxtLink class="card-title h3 pb-3" to="/"
                >Learn Python In 30 Minutes - In Depth Guide</NuxtLink
              >
              <p class="card-text custom-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae iste ex adipisci cumque architecto explicabo quas,
                dolores quibusdam sapiente fugit repellat expedita sint, maiores
                assumenda.iAnmi eos voluptatibus placeat nisi. This is a wider
                card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer. This is
                a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
                ex animi earum ipsum quos esse, doloremque asperiores quasi
                tenetur praesentium temporibus, veniam dignissimos error quo
                autem libero officiis, beatae architecto.
              </p>
              <a href="#" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <!-- End:Full size post -->

      <div
        class="col-lg-4 col-md-6"
        v-for="post in blogPosts.posts"
        :key="post.id"
      >
        <LazyBlogPostCard :post="post" />
      </div>
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
  // Fetch Blog Posts
  async asyncData({ $axios, $config }) {
    const blogPosts = await $axios.$get('/BlogPosts', $config)
    return { blogPosts }
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
