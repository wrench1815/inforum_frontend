<template>
  <div>
    <div
      class="container bg-gradient-faded-light pt-3 border-radius-2xl"
      v-if="!loading"
    >
      <div class="row align-items-center">
        <div class="col-md-5 ms-lg-auto">
          <NuxtLink :to="`/blog/${post.slug}`">
            <div class="p-3">
              <div
                class="cursor-pointer img-hover-zoom border-radius-2xl shadow-blur"
              >
                <img
                  class="w-100 border-radius-xl max-height-500 img-cover aspect-9-16"
                  :src="post.featureImage"
                  alt="Popular Post Feature Image"
                  loading="lazy"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="col-md-7 me-lg-auto position-relative">
          <h6
            class="opacity-7 text-uppercase font-weight-bolder text-sm border border-warning bg-warning text-light d-inline-block rounded-3 px-2 py-1"
          >
            {{ post.category.name }}
          </h6>
          <h1
            class="text-dark display-5 font-weight-bolder fadeIn2 fadeInBottom"
          >
            <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
          </h1>
          <p class="my-4 lead text-dark d-none d-lg-block">
            {{ post.excerpt }}
          </p>
          <div
            class="my-4 text-dark d-flex justify-content-start align-items-center gap-2 flex-wrap"
          >
            <!-- Start:Profile image -->
            <span class="avatar avatar-lg rounded-circle shadow-lg">
              <img
                class="avatar avatar-lg rounded-circle img-fit"
                :src="user.profileImage"
                alt="avatar"
              />
            </span>
            <span class="d-flex flex-column">
              <!-- End:Profile image -->
              <span class="text-bold text-danger">
                {{ user.firstName + ' ' + user.lastName }}
              </span>
              <span class="text-info">
                {{ dateFormatted(post.datePosted) }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import Loading from '../Admin/Utils/Loading.vue'

export default {
  name: 'PCard',

  components: { Loading },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      user: {},
      loading: true,
    }
  },

  methods: {
    dateFormatted(dat) {
      const myDate = new Date(dat)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    this.$axios
      .$get(`User/single/${this.post.authorId}`)
      .then((ud) => {
        this.user = ud.user
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$nuxt.error(err)
      })
  },
}
</script>

<style scoped>
.img-cover {
  object-fit: cover;
  object-position: center;
}

.aspect-9-16 {
  aspect-ratio: 9/16;
}

.img-hover-zoom {
  overflow: hidden;
}

.img-hover-zoom img {
  transition: transform 0.8s ease;
}

.img-hover-zoom:hover img {
  transform: scale(1.2);
}
</style>
