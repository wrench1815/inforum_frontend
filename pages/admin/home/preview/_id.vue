<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <!-- Start: Loading-->
      <Loading v-if="loading" />
      <!-- End: Loading-->

      <div class="card card-body" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mb-5">Home Preview</h2>
          </div>

          <div class="col-12 col-md-4 text-primary h5">Sub Heading</div>
          <div class="col-12 col-md-8 text-dark h5">
            {{ homeData.subHeading }}
          </div>
          <div class="my-2 col-12"></div>
          <div class="col-12 col-md-4 text-primary h5">Header Image</div>
          <div class="col-12 col-md-8">
            <div class="d-flex justify-content-center py-3">
              <img
                class="img-fluid shadow-blur rounded-3"
                :data-src="homeData.headerImage"
                alt="header image"
                v-lazy-load
              />
            </div>
          </div>

          <div class="col-12 d-flex flex-column align-items-center">
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
        this.$swal.fire({
          icon: 'error',
          title: 'Cannot fetch data',
          text: 'Unable to fetch home data, try refreshing the page',
        })
      })
  },
}
</script>

<style></style>
