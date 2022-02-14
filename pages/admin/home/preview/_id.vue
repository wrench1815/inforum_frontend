<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start: Loading-->
      <Loading v-if="loading" />
      <!-- End: Loading-->

      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4 mb-5 text-center">Home Preview</h2>
          </div>
          <div class="col-12 d-flex flex-column align-items-center">
            <div class="mx-4 mb-5 text-center">
              <span class="mb-2 badge rounded-pill bg-primary text-md"
                >Heading</span
              >
              <h4 class="text-capitalize">{{ homeData.heading }}</h4>
            </div>
            <div class="mx-4 mb-5 text-center">
              <span class="mb-2 badge rounded-pill bg-primary text-md"
                >Sub Heading</span
              >
              <h5 class="text-capitalize">{{ homeData.subHeading }}</h5>
            </div>
            <div class="mx-4 text-center">
              <span class="mb-3 badge rounded-pill bg-primary text-md"
                >Header Image</span
              >
              <br />
              <div class="d-flex justify-content-center py-3">
                <img
                  class="img-fluid"
                  :src="homeData.headerImageLink"
                  alt="header image"
                />
              </div>
            </div>
            <!-- Quick Action -->
            <div class="d-flex justify-content-end align-self-end me-5 mt-5">
              <NuxtLink
                class="btn btn-lg bg-gradient-success"
                :to="`/admin/home/edit/${homeData.id}`"
              >
                <i class="fas fa-edit"></i>
                Edit
              </NuxtLink>
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
      homeData: {},
      loading: true,
    }
  },

  mounted() {
    const homeData = this.$axios.$get(`/Home/${this.$route.params.id}`)

    homeData
      .then((res) => {
        this.homeData = res
        // handle loading state
        if (this.loading) {
          this.loading = false
        }
      }) // Scroll to top on page change
      .then(() => {
        setTimeout(() => {
          window.scroll(0, 0)
        }, 0)
      })
      .catch((err) => {
        this.$swal
          .fire({
            icon: 'error',
            title: 'Cannot fetch data',
            text: 'Unable to fetch home data, try refreshing the page',
          })
          .then(() => {
            this.$router.go(-1)
          })
      })
  },
}
</script>

<style></style>
