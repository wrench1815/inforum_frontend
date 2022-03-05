<template>
  <div class="card py-4">
    <div class="card-body text-center">
      <img
        class="img-fluid"
        data-src="~/assets/svg/ball-triangle.svg"
        width="90px"
        alt="Loader"
        v-lazy-load
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style></style>
