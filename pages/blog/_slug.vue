<template>
  <div class="container mt-7">
    {{ post }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: '',
    }
  },
  mounted() {
    const post = this.$axios.$get(`/BlogPosts/${this.$route.params.slug}`)
    post.then((res) => {
      this.post = res
    })
  },
}
</script>

<style scoped></style>
