<template>
  <div
    class="card card-body d-flex flex-row flex-md-column align-items-center justify-content-between gap-md-2 text-size"
  >
    <NuxtLink class="text-dark" to="/dash">
      <i class="fas fa-tachometer-alt"></i>
    </NuxtLink>
    <NuxtLink class="text-dark" to="/dash">
      <i class="fas fa-plus"></i>
    </NuxtLink>
    <NuxtLink class="text-dark" to="/dash/post/list">
      <i class="fas fa-list-ul"></i>
    </NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.text-size {
  font-size: 1.3rem !important;
}
</style>
