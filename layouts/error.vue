<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 card card-body text-center border-radius-top-end-0 border-radius-top-start-0 position-sticky top-0 z-index-sticky"
      >
        <nav>
          <NuxtLink class="navbar-brand link-dark fs-4" to="/">
            <img
              data-src="@/assets/icon.jpg"
              width="25rem"
              alt="logo"
              class="mb-1"
              v-lazy-load
            />
            <span>Inforum</span>
          </NuxtLink>
        </nav>
      </div>
      <div class="col-12 my-3 card card-body">
        <section v-if="error.statusCode === 404">
          <div class="d-flex justify-content-center">
            <img
              class="img-fluid w-sm-90 w-md-80 w-lg-70 w-xl-60 w-xxl-50"
              :data-src="require(`~/assets/svg/error.svg`)"
              alt="Error"
              v-lazy-load
            />
          </div>
          <div>
            <div class="my-4 my-sm-5">
              <h1 class="text-center">Resource Not Found</h1>
            </div>
            <div class="d-flex justify-content-center">
              <NuxtLink class="btn btn-lg btn-primary rounded-pill" to="/"
                >Go To Home</NuxtLink
              >
            </div>
          </div>
        </section>

        <section v-else-if="error.statusCode === 400">
          <div class="d-flex justify-content-center">
            <img
              class="img-fluid w-sm-90 w-md-80 w-lg-70 w-xl-60 w-xxl-50"
              :data-src="require(`~/assets/svg/fetch-failed.svg`)"
              alt="Error"
              v-lazy-load
            />
          </div>
          <div>
            <div class="my-4 my-sm-5">
              <h1 class="text-center">Failed to Fetch Data from Server</h1>
            </div>
            <div class="d-flex justify-content-center">
              <NuxtLink class="btn btn-lg btn-primary rounded-pill" to="/"
                >Go To Home</NuxtLink
              >
            </div>
          </div>
        </section>

        <section v-else>
          <div class="d-flex justify-content-center">
            <img
              class="img-fluid w-80 w-md-60 w-lg-50 w-xl-40 w-xxl-30"
              :data-src="require(`~/assets/svg/access-denied.svg`)"
              alt="Error"
              v-lazy-load
            />
          </div>
          <div>
            <div class="my-5 my-sm-5">
              <h1 class="text-center text-capitalize">Something Went Wrong</h1>
              <h5 class="text-center">Please try Again Later</h5>
            </div>
            <div class="d-flex justify-content-center">
              <NuxtLink class="btn btn-lg btn-primary rounded-pill" to="/"
                >Go to Home</NuxtLink
              >
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],

  layout: 'errorlayout',
}
</script>
