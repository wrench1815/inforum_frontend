<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start: Loading-->
      <Loading v-if="loading" />
      <!-- End: Loading-->

      <div class="card py-2 py-sm-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <!-- Post -->
            <div class="container py-1">
              <div class="px-auto">
                <!-- post Featured image  -->
                <div class="h-100 w-100 ratio ratio-16x9 my-3 my-lg-4">
                  <img
                    class="cover-img border-radius-2xl shadow-lg"
                    :src="
                      post.featureImage
                        ? post.featureImage
                        : 'https://res.cloudinary.com/inforum/image/upload/v1644820069/Defaults/img-1_nvdef7.jpg'
                    "
                  />
                </div>

                <!-- title -->
                <h1 class="text-center my-3 text-capitalize">
                  {{ post.title }}
                </h1>

                <p class="text-center">
                  By<span class="mx-2 text-bold text-primary text-capitalize"
                    >{{
                      joinName(author.user.firstName, author.user.lastName)
                    }} </span
                  >on<span class="mx-2 text-bold text-info">{{
                    getDatePosted()
                  }}</span>
                </p>

                <!-- category -->
                <div class="d-flex justify-content-center">
                  <span
                    class="badge rounded-pill bg-gradient-primary text-md"
                    >{{ post.category.name }}</span
                  >
                </div>

                <!-- short description -->
                <div class="text-center my-4">
                  <div class="d-flex justify-content-center">
                    <span
                      class="badge rounded-pill bg-gradient-success text-md mb-3"
                      >Short Description</span
                    >
                  </div>
                  <div>
                    <p>
                      {{ post.shortDescription }}
                    </p>
                  </div>
                </div>
                <!-- excerpt -->
                <div class="text-center my-4">
                  <div class="d-flex justify-content-center">
                    <span
                      class="badge rounded-pill bg-gradient-warning text-md mb-3"
                      >Excerpt</span
                    >
                  </div>
                  <div>
                    <p>
                      {{ post.excerpt }}
                    </p>
                  </div>
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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'admin',

  components: {
    Loading,
  },

  data() {
    return {
      post: {},
      author: {},
      loading: true,
    }
  },

  methods: {
    postStyles() {
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
    joinName(first, last) {
      return `${first} ${last}`
    },
    getDatePosted() {
      const myDate = new Date(this.post.datePosted)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    const post = this.$axios.$get(`/BlogPosts/${this.$route.params.id}`)
    post
      .then((res) => {
        const _post = res
        const author = this.$axios.$get(`/User/single/${_post.authorId}`)
        author
          .then((res) => {
            this.post = _post
            this.author = res
            this.loading = false
          })
          .then(() => {
            this.postStyles()
          })
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Cannot fetch post data',
          text: 'Unable to fetch post data, try refreshing the page',
        })
      })
  },
}
</script>

<style></style>
