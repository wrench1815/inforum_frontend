<template>
  <div class="container my-5 my-md-7 my-lg-8">
    <section>
      <div class="d-flex justify-content-center">
        <img
          class="img-fluid w-80 w-md-60 w-lg-50 w-xl-40 w-xxl-30"
          :src="require(`~/assets/svg/access-denied.svg`)"
          alt=""
        />
      </div>
      <div>
        <div class="my-5 my-sm-5">
          <h1 class="text-center text-capitalize">No authorization found</h1>
        </div>
        <div class="d-flex justify-content-center">
          <NuxtLink class="btn btn-lg btn-primary rounded-pill" to="/login"
            >Login</NuxtLink
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
