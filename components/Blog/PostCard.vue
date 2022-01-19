<template>
  <div class="card border-radius-2xl">
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="card-image border-radius-top-start-2xl border-radius-top-end-2xl cursor-pointer img-hover-zoom"
    >
      <img class="img-fluid" src="@/assets/images/img-1.jpg" alt="" />
    </NuxtLink>
    <div class="card-body">
      <NuxtLink class="card-title h3" :to="`/blog/${post.slug}`">{{
        post.title
      }}</NuxtLink>
      <p class="custom-paragraph">
        {{ post.excerpt }}
      </p>
      <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary"
        >Read More</NuxtLink
      >
      <div class="border-top border-primary mb-1"></div>
      <p class="card-text d-flex justify-content-between">
        <small class="text-info">March 02, 2021</small>
        <small class="text-info">John Doe</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
