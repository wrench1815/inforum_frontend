<template>
  <div>
    <div
      class="container bg-gradient-faded-light pt-3 border-radius-2xl"
      v-if="!loading"
    >
      <div class="row align-items-center">
        <div class="col-12 me-lg-auto position-relative">
          <h6
            class="opacity-7 text-uppercase font-weight-bolder text-sm border border-warning bg-warning text-light d-inline-block rounded-3 px-2 py-1"
          >
            {{ query.category.name }}
          </h6>
          <h1 class="text-dark display-5 font-weight-bolder">
            <NuxtLink :to="`/forum/query/${query.slug}`">
              {{ query.title }}
            </NuxtLink>
          </h1>
          <div
            class="my-4 text-dark d-flex justify-content-start align-items-center gap-2 flex-wrap"
          >
            <!-- Start:Profile image -->
            <span class="avatar avatar-lg rounded-circle shadow-lg">
              <img
                class="avatar avatar-lg rounded-circle img-fit"
                :src="user.profileImage"
                alt="avatar"
                v-lazy-load
              />
            </span>
            <span class="d-flex flex-column">
              <!-- End:Profile image -->
              <span class="text-bold text-danger">
                {{ user.firstName + ' ' + user.lastName }}
              </span>
              <span class="text-info">
                {{ dateFormatted(query.datePosted) }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Loading class="bg-transparent shadow-none" v-if="loading" />
  </div>
</template>

<script>
import Loading from '../Admin/Utils/Loading.vue'

export default {
  name: 'QCard',

  components: { Loading },

  props: {
    query: {
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
      .$get(`User/single/${this.query.authorId}`)
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

<style></style>
