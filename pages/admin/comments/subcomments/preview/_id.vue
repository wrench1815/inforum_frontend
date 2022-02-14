<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-2 py-sm-4">
        <div class="row">
          <div class="col-12">
            <div class="container py-1">
              <div class="px-auto">
                <div class="d-flex flex-column align-items-center gap-2">
                  <h3 class="m-0 p-0">Posted By</h3>
                  <NuxtLink :to="`/admin/users/preview/${subComment.userId}`">
                    <ProfileImage
                      :userId="subComment.userId"
                      :classNames="'avatar avatar-xxl p-0 m-0 img-fit shadow'"
                    />
                  </NuxtLink>
                  <div class="d-flex gap-2 mt-2">
                    <h6>Date</h6>
                    <span class="mb-2 badge rounded-pill bg-primary">
                      {{ getDatePosted(subComment.datePosted) }}
                    </span>
                  </div>
                </div>
                <div class="text-center my-3">
                  <p>{{ subComment.description }}</p>
                </div>
                <div class="d-flex justify-content-end">
                  <NuxtLink
                    :to="`/admin/comments/preview/${subComment.commentId}`"
                    class="btn btn-success btn-sm"
                    >Original Comment</NuxtLink
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
      subComment: {},
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

  created() {
    const subComment = this.$axios.$get(`/SubComments/${this.$route.params.id}`)
    subComment
      .then((res) => {
        this.subComment = res
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
