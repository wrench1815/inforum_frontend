<template>
  <div
    class="card card-body d-flex flex-row flex-md-column align-items-center justify-content-between gap-md-2 text-size"
    id="SideNav"
  >
    <div>
      <NuxtLink class="" to="/dash" :active-class="'fix-active-link-bug'">
        <i class="fas fa-tachometer-alt"></i>
      </NuxtLink>
    </div>

    <div>
      <NuxtLink class="" to="/dash/post/add">
        <i class="fas fa-plus"></i>
      </NuxtLink>
    </div>

    <div>
      <NuxtLink class="" to="/dash/post/list">
        <i class="fas fa-list-ul"></i>
      </NuxtLink>
    </div>

    <div>
      <NuxtLink to="/logout" class="text-danger">
        <i class="fas fa-sign-out-alt"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.text-size {
  font-size: 1.3rem !important;
}

a {
  color: #344767;
}

a:hover {
  color: #344767;
}

#SideNav div .nuxt-link-exact-active {
  color: #e91e63;
}

#SideNav div .nuxt-link-active {
  color: #e91e63;
}
</style>
