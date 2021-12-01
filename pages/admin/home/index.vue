<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <h1>Home</h1>

          <!-- Home Data -->
          <div class="card">
            <div class="card-body">
              <div v-for="data in homeData" :key="data.id">
                <div>
                  <span class="h4">Heading: </span>
                  <span class="ms-2 text-lg">{{ data.heading }}</span>
                </div>
                <div>
                  <span class="h4">Sub Heading: </span>
                  <span class="ms-2 text-lg">{{ data.subHeading }}</span>
                </div>
                <div>
                  <span class="h4">Header Image: </span>
                  <span class="ms-2 text-lg">{{ data.headerImageLink }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $config }) {
    const homeData = await $axios.$get('/home')
    return { homeData }
  },
}
</script>

<style></style>
