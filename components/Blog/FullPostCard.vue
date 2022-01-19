<template>
  <div class="row g-0">
    <div class="col-sm-6 ps-sm-0 d-flex align-items-center">
      <NuxtLink
        :to="`/blog/${post.slug}`"
        class="card-image cursor-pointer h-100 w-100 ratio ratio-16x9 border-radius-top-end-2xl border-radius-top-end-md-0 border-radius-top-start-2xl border-radius-bottom-start-md-2xl img-hover-zoom"
      >
        <img class="cover-img" src="@/assets/images/img-1.jpg" />
      </NuxtLink>
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
        <NuxtLink class="card-title h3 pb-3" :to="`/blog/${post.slug}`">{{
          post.title
        }}</NuxtLink>
        <p class="card-text custom-paragraph" v-html="post.description"></p>
        <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary"
          >Read More</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullPostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
