<template>
  <div>
    <div class="container bg-gradient-faded-light pt-3 border-radius-2xl">
      <div class="row align-items-center">
        <div class="col-12 me-lg-auto position-relative">
          <h1 class="text-dark display-5 font-weight-bolder">
            Browse through all the Queries
          </h1>
          <div
            class="my-4 text-dark d-flex justify-content-start align-items-center gap-2 flex-wrap"
          >
            <!-- Start:Profile image -->
            <NuxtLink class="btn btn-primary" to="/forum">Browse more</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QCtaCard',
}
</script>

<style></style>
