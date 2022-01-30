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
            <p class="mx-4" id="postContent" v-html="blogPost.description"></p>
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
