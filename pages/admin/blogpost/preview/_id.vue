<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-2 py-sm-4">
        <div class="row">
          <div class="col-12">
            <!-- Post -->
            <div class="container py-1">
              <div class="px-lg-6 px-xl-7 px-xxl-8">
                <!-- post cover image  -->
                <div class="h-100 w-100 ratio ratio-16x9 my-3 my-lg-4">
                  <img
                    class="cover-img border-radius-2xl shadow-lg"
                    src="@/assets/images/img-1.jpg"
                  />
                </div>

                <!-- Date -->
                <p class="text-center pt-4">
                  <span class="badge bg-gradient-success rounded-pill"
                    >Published</span
                  >
                  &nbsp; {{ getDatePosted() }}
                </p>

                <!-- title -->
                <h1 class="text-center my-3">{{ post.title }}</h1>

                <!-- category -->
                <div class="d-flex justify-content-center">
                  <span
                    class="badge rounded-pill bg-gradient-primary text-lg"
                    >{{ post.category.name }}</span
                  >
                </div>

                <!-- Todo: Author -->

                <!-- content -->
                <div v-html="post.description" class="py-3 px-lg-5"></div>

                <!-- Quick Action -->
                <div class="d-flex justify-content-center">
                  <NuxtLink
                    class="btn btn-lg btn-success rounded-pill"
                    :to="`/admin/blogpost/edit/${post.id}`"
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </NuxtLink>
                </div>
              </div>
            </div>
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
    const post = await $axios.$get(`/BlogPosts/${params.id}`)
    return { post }
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

<style></style>
