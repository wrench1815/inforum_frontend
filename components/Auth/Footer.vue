<template>
  <!-- Start:Footer -->
  <div>
    <footer class="">
      <div class="container">
        <!-- upper -->
        <div class="row pt-4 pt-lg-5 my-5 border-top">
          <div class="col-lg d-flex flex-column align-items-center">
            <NuxtLink to="/" class="d-flex align-items-center">
              <p class="text-muted d-block text-2xl text-center text-lg-start">
                <img
                  data-src="@/assets/icon.jpg"
                  alt="logo"
                  class="w-15 w-lg-25"
                  v-lazy-load
                />
                Inforum
              </p>
            </NuxtLink>
            <a href="mailto:inforum1815@gmail.com" class="link-dark"
              ><span class="badge bg-secondary mb-2">Email</span>
              inforum1815@gmail.com</a
            >
          </div>

          <div class="col-lg"></div>

          <div class="col-lg col-md-4" :class="linksClasses"></div>
          <div class="col-lg col-md-4" :class="linksClasses"></div>
          <div class="col-lg col-md-4" :class="linksClasses"></div>
        </div>

        <!-- lower -->
        <div class="row border-top">
          <p class="text-center text-muted pt-3">© Inforum {{ year }}</p>
        </div>
      </div>
    </footer>
  </div>
  <!-- End:Footer -->
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      linksClasses: `mt-3 mt-lg-0 d-flex flex-column align-items-center text-center text-lg-start`,
    }
  },
}
</script>

<style scoped></style>
