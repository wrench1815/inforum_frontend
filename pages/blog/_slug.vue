<template>
  <div class="container mt-7">
    <div class="px-lg-6 px-xl-7 px-xxl-8">
      <!-- Date -->
      <p class="text-center pt-4">
        <span class="badge bg-gradient-success rounded-pill">Published</span>
        &nbsp; {{ getDatePosted() }}
      </p>

      <!-- title -->
      <h1 class="text-center my-3">{{ post.title }}</h1>

      <!-- category -->
      <div class="d-flex justify-content-center">
        <span class="badge rounded-pill bg-gradient-primary text-lg">{{
          category
        }}</span>
      </div>

      <!-- Todo: Author -->

      <!-- post cover image  -->
      <div class="h-100 w-100 ratio ratio-16x9 my-3 my-lg-4">
        <img
          class="cover-img border-radius-2xl shadow-lg"
          src="@/assets/images/img-1.jpg"
        />
      </div>

      <!-- content -->
      <div v-html="post.description" class="py-3 px-lg-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: '',
      category: '',
    }
  },
  mounted() {
    const post = this.$axios.$get(`/BlogPosts/slug/${this.$route.params.slug}`)
    post.then((res) => {
      this.post = res
      this.category = this.post.category.name
    })
  },
  methods: {
    getDatePosted() {
      const myDate = new Date(this.post.datePosted)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },
}
</script>

<style scoped></style>
