<template>
  <div class="container my-6">
    <section>
      <div class="d-flex justify-content-center">
        <img
          class="img-fluid w-sm-90 w-md-80 w-lg-70 w-xl-60 w-xxl-50"
          :src="require(`~/assets/svg/error.svg`)"
          alt=""
        />
      </div>
      <div>
        <div class="my-4 my-sm-5">
          <h1 class="text-center">Page Not Found</h1>
        </div>
        <div class="d-flex justify-content-center">
          <NuxtLink class="btn btn-lg btn-primary rounded-pill" to="/"
            >Go To Home</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'auth',
}
</script>

<style></style>
