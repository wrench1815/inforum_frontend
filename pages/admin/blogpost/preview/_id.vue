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
                <!-- post Featured image  -->
                <div class="h-100 w-100 ratio ratio-16x9 my-3 my-lg-4">
                  <img
                    class="cover-img border-radius-2xl shadow-lg"
                    src="@/assets/images/img-1.jpg"
                  />
                </div>

                <!-- title -->
                <h1 class="text-center my-3">{{ post.title }}</h1>

                <div>
                  <p class="text-center">
                    By<span class="mx-2 text-bold text-primary"
                      >{{ author.user.firstName }}
                      {{ author.user.lastName }} </span
                    >on<span class="mx-2 text-bold text-info">{{
                      getDatePosted()
                    }}</span>
                  </p>
                </div>

                <!-- category -->
                <div class="d-flex justify-content-center">
                  <span
                    class="badge rounded-pill bg-gradient-primary text-md"
                    >{{ post.category.name }}</span
                  >
                </div>

                <div class="border-top mt-4"></div>
                <!-- content -->
                <div
                  v-html="post.description"
                  id="postContent"
                  class="py-3 px-lg-5"
                ></div>

                <div class="border-top mb-4"></div>

                <!-- Quick Action -->
                <div class="d-flex justify-content-end">
                  <NuxtLink
                    class="btn btn-lg bg-gradient-success"
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
    const author = await $axios.$get(`/User/single/${post.authorId}`)
    return { post, author }
  },

  methods: {
    getDatePosted() {
      const myDate = new Date(this.post.datePosted)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    const postContent = document.getElementById('postContent')

    // adds classes to images to make them responsive
    const images = postContent.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
      images[i].classList.add('img-fluid', 'shadow-lg')
    }

    // adds classes to figures and its sub-elements to make them responsive
    const figures = postContent.getElementsByTagName('figure')
    for (let i = 0; i < figures.length; i++) {
      figures[i].classList.add('mx-auto')
      figures[i]
        .getElementsByTagName('img')[0]
        .classList.add('figure-img', 'img-fluid', 'shadow-lg')
      figures[i]
        .getElementsByTagName('figcaption')[0]
        .classList.add('figure-caption', 'text-center', 'text-bold')
    }
  },
}
</script>

<style></style>
