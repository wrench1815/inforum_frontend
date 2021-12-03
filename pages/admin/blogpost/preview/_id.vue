<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4 text-capitalize">{{ blogPost.title }}</h2>
            <div>
              <span
                class="badge rounded-pill mx-4 my-2 bg-primary text-capitalize"
                >{{ blogPost.category.name }}</span
              >
            </div>
            <p class="mx-4 text-capitalize">{{ blogPost.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ $axios, $config, params }) {
    const blogPost = await $axios.$get(`/BlogPosts/${params.id}`)
    return { blogPost }
  },
}
</script>

<style></style>
