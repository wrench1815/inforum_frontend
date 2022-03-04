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
                  <h3 class="m-0 p-0">Created By</h3>
                  <NuxtLink :to="`/admin/users/preview/${query.authorId}`">
                    <ProfileImage
                      :userId="query.authorId"
                      :classNames="'avatar avatar-xxl p-0 m-0 img-fit shadow'"
                    />
                  </NuxtLink>
                  <div
                    class="d-flex gap-2 mt-2 flex-wrap justify-content-center"
                  >
                    <span class="mb-2 badge rounded-pill bg-success">
                      {{ query.category.name }}
                    </span>

                    <span class="mb-2 badge rounded-pill bg-gradient-primary">
                      {{ getDatePosted(query.datePosted) }}
                    </span>

                    <span class="mb-2 badge rounded-pill bg-success">
                      <i class="fas fa-thumbs-up"></i>
                      {{ query.vote }}
                    </span>
                  </div>
                </div>
                <div class="text-center mb-3 mt-5">
                  <span
                    class="mb-2 badge text-lg rounded-pill bg-gradient-faded-info"
                  >
                    Title
                  </span>
                  <p class="h3">
                    {{ query.title }}
                  </p>
                </div>
                <div class="row">
                  <div class="col"></div>
                  <div class="col-12">
                    <div class="text-center mb-3 mt-4">
                      <span
                        class="mb-2 badge text-lg rounded-pill bg-gradient-primary"
                      >
                        Description
                      </span>
                    </div>
                    <div v-html="query.description"></div>
                  </div>
                  <div class="col"></div>
                </div>
                <div class="d-flex justify-content-end gap-3 pt-4">
                  <NuxtLink
                    class="btn bg-gradient-success"
                    :to="`/admin/forum/edit/${query.id}`"
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </NuxtLink>
                  <NuxtLink
                    :to="`/admin/forum/answers/${query.id}`"
                    class="btn btn-warning"
                    >Answers</NuxtLink
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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'admin',

  data() {
    return {
      loading: true,
      query: {},
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
    const query = this.$axios.$get(`/ForumQuery/${this.$route.params.id}`)
    query
      .then((res) => {
        this.query = res
        this.loading = false
      })
      .catch((error) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to load Forum Query <br/>Refresh Page to try Again.'
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
