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
                    :data-src="
                      post.featureImage
                        ? post.featureImage
                        : 'https://res.cloudinary.com/inforum/image/upload/v1645626004/Defaults/open-book_xtbv4v.jpg'
                    "
                    v-lazy-load
                  />
                </div>

                <!-- title -->
                <h1 class="text-center my-3">
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

                <div
                  class="d-flex justify-content-center my-2 align-items-center text-lg text-warning"
                >
                  <span>{{ post.star }}<i class="ms-1 fas fa-star"></i></span>
                </div>

                <!-- category -->
                <div class="d-flex justify-content-center">
                  <span
                    class="badge rounded-pill bg-gradient-primary text-md"
                    >{{ post.category.name }}</span
                  >
                </div>

                <div class="row mt-4">
                  <!-- Start:Short Description -->
                  <div class="col-12 col-md-4 text-success h5">
                    Short Description
                  </div>
                  <div class="col-12 col-md-8 text-dark">
                    <p>
                      {{ post.shortDescription }}
                    </p>
                  </div>
                  <!-- End:Short Description -->

                  <!-- Start:Excerpt -->
                  <div class="col-12 col-md-4 text-warning text-gradient h5">
                    Excerpt
                  </div>
                  <div class="col-12 col-md-8 text-dark">
                    <p>
                      {{ post.excerpt }}
                    </p>
                  </div>
                  <!-- End:Excerpt -->
                </div>

                <div class="border-top mt-4"></div>
                <!-- content -->
                <div
                  v-lazy-load="post.description"
                  id="postContent"
                  class="py-3 px-lg-3"
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
import Prism from '~/plugins/prism'

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

      // find all iframes
      const iFrames = postContent.getElementsByTagName('iframe')
      for (let i = 0; i < iFrames.length; i++) {
        iFrames[i].classList.add(
          'd-block',
          'mx-auto',
          'img-fluid',
          'aspect-ratio-16-9'
        )
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
          })
          .then(() => {
            this.loading = false
          })
          .then(() => {
            this.postStyles()
            Prism.highlightAll()
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

<style scoped>
.cover-img {
  object-fit: cover;
}

>>> .aspect-ratio-16-9 {
  aspect-ratio: 16/9;
}
</style>
