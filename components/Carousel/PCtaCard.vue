<template>
  <div>
    <div class="container bg-gradient-faded-light pt-3 border-radius-2xl">
      <div class="row align-items-center">
        <div class="col-md-5 ms-lg-auto">
          <NuxtLink :to="`/`">
            <div class="p-3">
              <div
                class="cursor-pointer img-hover-zoom border-radius-2xl shadow-blur"
              >
                <img
                  class="w-100 border-radius-xl max-height-500 img-cover aspect-9-16"
                  data-src="https://res.cloudinary.com/inforum/image/upload/v1645626004/Defaults/open-book_xtbv4v.jpg"
                  alt="Popular Post Feature Image"
                  v-lazy-load
                />
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="col-md-6 me-lg-auto position-relative">
          <h1
            class="text-dark display-5 font-weight-bolder fadeIn2 fadeInBottom"
          >
            Browse through all the Blog Posts
          </h1>
          <NuxtLink :to="`/blog`" class="btn btn-primary">Browse more</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCtaCard',
}
</script>

<style scoped>
.img-cover {
  object-fit: cover;
  object-position: center;
}

.aspect-9-16 {
  aspect-ratio: 9/16;
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
