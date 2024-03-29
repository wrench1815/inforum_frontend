<template>
  <div>
    <div v-if="loading" class="container mt-7">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div v-if="!loading">
      <!-- Start:Header -->
      <header>
        <div
          class="page-header min-vh-95 header-image"
          :lazy-background="post.featureImage"
        >
          <span class="mask bg-gradient-dark opacity-6"></span>
          <div class="container">
            <div class="row">
              <div class="col-lg-10 d-flex justify-content-center flex-column">
                <h1 class="text-white mb-0">{{ post.title }}</h1>
                <p class="lead pe-sm-5 me-sm-5 text-white opacity-8">
                  {{ post.shortDescription }}
                </p>

                <!-- Start:Author -->
                <div class="mt-3 text-white">
                  <img
                    :data-src="author.user.profileImage"
                    width="25rem"
                    :alt="`${author.user.firstName} ${author.user.lastName}`"
                    class="mb-1 avatar img-fit"
                    v-lazy-load
                  />
                  <span class=""
                    >{{ author.user.firstName }}
                    {{ author.user.lastName }}</span
                  >
                </div>
                <!-- End:Author -->

                <!-- Start:Date -->
                <div class="text-white">
                  {{ formattedDate(post.datePosted) }}
                </div>
                <!-- End:Date -->
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- End:Header -->

      <!-- Start:Main Section -->
      <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <section class="py-5 mt-5">
          <div class="container">
            <div class="row">
              <div
                v-lazy-load="post.description"
                class="col-lg-9 ms-auto me-auto"
                id="postContent"
              ></div>
            </div>
          </div>
        </section>

        <hr />

        <!-- Start:Star -->
        <div class="container">
          <div class="row">
            <div class="col-lg-9 ms-auto me-auto d-flex justify-content-center">
              <h5 class="text-center">Liked the Post? Leave a Star.</h5>
            </div>

            <div class="col-lg-9 ms-auto me-auto d-flex justify-content-center">
              <i v-if="!isAuthenticated" class="fas fa-star fa-2x"></i>
              <i
                v-if="isAuthenticated"
                class="fas fa-star fa-2x cursor-pointer"
                :class="{ 'text-warning': stared }"
                @click="star"
              ></i>
            </div>

            <div
              class="col-lg-9 ms-auto me-auto d-flex justify-content-center mt-2 text-"
            >
              <p class="text-dark text-lg">
                Total Stars:<span class="ms-1 text-warning">{{
                  post.star
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- End:Star -->

        <!-- Start:Comments -->
        <section class="py-7">
          <div class="container">
            <div class="row">
              <div class="col-lg-9 ms-auto me-auto">
                <BlogFullComment :postId="post.id" />
              </div>
            </div>
          </div>
        </section>
        <!-- End:Comments -->
      </div>
      <!-- End:Main Section -->
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
import { mapGetters } from 'vuex'
import Prism from '~/plugins/prism'

export default {
  components: {
    Loading,
  },

  data() {
    return {
      post: '',
      author: '',
      loading: true,
      img: '',
      stared: false,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },

  methods: {
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    star() {
      if (this.isAuthenticated) {
        document
          .getElementsByClassName('fas fa-star')[0]
          .classList.toggle('jello-horizontal')

        setTimeout(() => {
          const starContent = {
            blogPostId: this.post.id,
            userId: this.loggedInUser.id,
          }

          this.$axios.$post(`BlogPosts/star`, starContent).then((sr) => {
            if (sr.status == 200) {
              this.$axios
                .$get(`/BlogPosts/slug/${this.$route.params.slug}`)
                .then((rep) => {
                  this.post.star = rep.star
                })
                .then(() => {
                  this.$axios
                    .$post(`BlogPosts/star/status`, starContent)
                    .then((stat) => {
                      this.stared = stat.starExist
                    })
                })
            }
          })
        }, 1000)
      }
    },
  },

  mounted() {
    // get post data from api
    this.$axios
      .$get(`/BlogPosts/slug/${this.$route.params.slug}`)
      .then((res) => {
        this.post = res
      })
      .then(() => {
        this.$axios
          .$get(`User/single/${this.post.authorId}`)
          .then((u) => {
            this.author = u
          })
          .then(() => {
            var postFeaturedImage = this.post.featuredImage
            if (postFeaturedImage != null) {
              this.img = postFeaturedImage.url
            } else {
              this.img =
                'https://res.cloudinary.com/inforum/image/upload/v1645626004/Defaults/open-book_xtbv4v.jpg'
            }

            this.loading = false
          })
          .then(() => {
            const postContent = document.getElementById('postContent')

            // adds classes to images to make them responsive
            const images = postContent.getElementsByTagName('img')
            if (images.length > 0) {
              for (let i = 0; i < images.length; i++) {
                images[i].classList.add('img-fluid', 'shadow-lg')
              }
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
          })
          .then(() => {
            Prism.highlightAll()

            if (this.isAuthenticated) {
              const starContent = {
                blogPostId: this.post.id,
                userId: this.loggedInUser.id,
              }
              this.$axios
                .$post(`BlogPosts/star/status`, starContent)
                .then((stat) => {
                  this.stared = stat.starExist
                })
            }
          })
      })
      .catch((erre) => {
        this.$swal({
          title: 'Error',
          type: 'error',
          icon: 'error',
          html: `Failed to load post.<br/>Try again later.`,
        })
      })
  },
}
</script>

<style scoped>
.header-image {
  background-size: cover;
  transform: translate3d(0px, 0px, 0px);
}

.img-fit {
  object-fit: cover;
  object-position: center;
}

>>> .aspect-ratio-16-9 {
  aspect-ratio: 16/9;
}

/* Jello Animation */
.jello-horizontal {
  animation: jello-horizontal 0.9s both;
}

/**
 * ----------------------------------------
 * animation jello-horizontal
 * ----------------------------------------
 */
@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
