<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start:loading -->
      <Loading v-if="loading" />
      <!-- End:loading -->

      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <div class="container py-1">
              <div class="px-auto">
                <div class="d-flex flex-column align-items-center gap-2">
                  <h3 class="m-0 p-0">Posted By</h3>
                  <NuxtLink :to="`/admin/users/preview/${answer.userId}`">
                    <ProfileImage
                      :userId="answer.userId"
                      :classNames="'avatar avatar-xxl p-0 m-0 img-fit shadow'"
                    />
                  </NuxtLink>
                  <div class="d-flex gap-2 mt-2">
                    <span class="mb-2 badge rounded-pill bg-gradient-primary">
                      {{ getDatePosted(answer.datePosted) }}
                    </span>
                  </div>
                </div>
                <div class="text-center mb-3 mt-4">
                  <span class="mb-2 badge rounded-pill bg-gradient-faded-info">
                    Answer
                  </span>
                  <p>
                    {{ answer.answer }}
                  </p>
                </div>
                <div class="d-flex justify-content-end gap-3 pt-4">
                  <NuxtLink
                    class="btn bg-gradient-success"
                    :to="`/admin/forum/answers/subanswers/edit/${answer.id}`"
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
import ProfileImage from '~/components/Admin/ProfileImage.vue'
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'admin',

  data() {
    return {
      loading: true,
      answer: {},
    }
  },

  components: {
    ProfileImage,
    Loading,
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
    const answer = this.$axios.$get(`/ForumSubAnswers/${this.$route.params.id}`)
    answer
      .then((res) => {
        this.answer = res
        this.loading = false
      })
      .catch((error) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to load Sub Answer <br/>Refresh Page to try Again.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          html: `${msg}`,
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
