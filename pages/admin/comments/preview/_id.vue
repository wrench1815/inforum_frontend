<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-2 py-sm-4">
        <div class="row">
          <div class="col-12 mx-4" v-if="loading">
            <h3>Loading...</h3>
          </div>
          <div class="col-12" v-if="!loading">
            <div class="container py-1">
              <div class="px-auto">
                <div class="d-flex flex-column align-items-center gap-2">
                  <h3 class="m-0 p-0">Posted By</h3>
                  <NuxtLink :to="`/admin/users/preview/${comment.userId}`">
                    <ProfileImage
                      :userId="comment.userId"
                      :classNames="'avatar avatar-xxl p-0 m-0 img-fit shadow'"
                    />
                  </NuxtLink>
                  <div class="d-flex gap-2 mt-2">
                    <h6>Date</h6>
                    <span class="mb-2 badge rounded-pill bg-primary">
                      {{ getDatePosted(comment.datePosted) }}
                    </span>
                  </div>
                </div>
                <div class="text-center my-3">
                  <p>{{ comment.description }}</p>
                </div>
                <div class="d-flex justify-content-end gap-3">
                  <NuxtLink
                    :to="`/admin/blogpost/preview/${comment.postId}`"
                    class="btn btn-success btn-sm"
                    >Original BlogPost</NuxtLink
                  >
                  <NuxtLink
                    :to="`/admin/comments/subcomments/${comment.id}`"
                    class="btn btn-warning btn-sm"
                    >Sub Comments</NuxtLink
                  >
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
import ProfileImage from '~/components/Admin/ProfileImage.vue'

export default {
  layout: 'admin',

  components: {
    ProfileImage,
  },

  data() {
    return {
      comment: {},
      loading: true,
    }
  },

  methods: {
    getDatePosted(date) {
      const myDate = new Date(date)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    const comment = this.$axios.$get(`/Comments/${this.$route.params.id}`)

    comment
      .then((res) => {
        this.comment = res
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch data',
        })
      })
  },
}
</script>

<style scoped>
.img-fit {
  object-position: center;
  object-fit: cover;
}
</style>
