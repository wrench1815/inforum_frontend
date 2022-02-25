<template>
  <div>
    <loading v-if="loading" />

    <div class="card-body pt-0" v-if="!loading">
      <div
        class="card card-body gap-3 d-flex flex-column flex-md-row justify-content-start align-items-center"
      >
        <div>
          <img
            class="img-fit img-fluid avatar-custom shadow-card"
            :src="loggedInUser.profileImage"
            alt="Avatar"
          />
        </div>

        <div>
          <h3>
            {{ loggedInUser.firstName + ' ' + loggedInUser.lastName }}
          </h3>
          <p class="text-primary">{{ loggedInUser.email }}</p>
          <p class="text-info">{{ loggedInUserRole }}</p>
          <p class="">
            {{ popularPosts.pagination.totalCount }} Posts written so far
          </p>
        </div>
      </div>

      <div class="mt-3">
        <h3 class="card card-body mb-3">Popular Posts</h3>
        <div class="row g-4">
          <div v-if="loading" class="col-lg-4 col-md-6">
            <h5>Loading....</h5>
          </div>
          <div
            v-if="!loading"
            class="col-lg-4 col-md-6"
            v-for="post in popularPosts.posts"
            :key="post.id"
          >
            <LazyBlogPostCard :dashCard="true" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  components: { Loading },
  middleware: ['auth', 'isEditor'],

  layout: 'dash',

  data() {
    return {
      popularPosts: '',
      loading: true,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  mounted() {
    this.$axios
      .$get(
        `/BlogPosts?pageSize=5&starSort=true&userId=${this.loggedInUser.id}`
      )
      .then((res) => {
        this.popularPosts = res
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$swal({
          title: 'Error',
          icon: 'error',
          type: 'error',
          html: `Failed to fetch Posts.<br/>Please try again later.`,
        })
      })
  },
}
</script>

<style scoped>
.img-fit {
  object-fit: cover;
  object-position: center;
}
.avatar-custom {
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 0.6rem;
  height: 13rem;
  width: 13rem;
  transition: all 0.2s ease-in-out;
}
</style>
