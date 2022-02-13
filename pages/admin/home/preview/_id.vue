<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h1 class="mx-4 mb-3">Preview Home</h1>
          </div>
          <div class="col-12">
            <div class="mx-4 mb-5">
              <span class="mb-2 badge rounded-pill bg-primary">Heading</span>
              <h5 class="text-capitalize">{{ homeData.heading }}</h5>
            </div>
            <div class="mx-4 mb-5">
              <span class="mb-2 badge rounded-pill bg-primary"
                >Sub Heading</span
              >
              <h5 class="text-capitalize">{{ homeData.subHeading }}</h5>
            </div>
            <div class="mx-4">
              <span class="mb-3 badge rounded-pill bg-primary"
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
          </div>
        </div>
      </div>
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ $axios, $config, params }) {
    const homeData = await $axios.$get(`/Home/${params.id}`)
    return { homeData }
  },
}
</script>

<style></style>
