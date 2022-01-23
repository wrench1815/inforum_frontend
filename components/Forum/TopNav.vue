<template>
  <div>
    <nav class="bg-white bg-white z-index-3 border-radius-xl shadow-card">
      <div
        class="d-flex align-items-center justify-content-between align-content-center px-3"
      >
        <NuxtLink class="navbar-brand fs-4" to="/">
          <img src="@/assets/icon.jpg" width="25rem" alt="logo" class="mb-1" />
          <span>Inforum</span>
        </NuxtLink>
        <div><i class="fas fa-search fs-5"></i></div>
        <div><i class="fas fa-user-astronaut fs-5"></i></div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
}
</script>

<style scoped></style>
