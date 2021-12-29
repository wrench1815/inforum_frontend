<template>
  <!-- Footer -->
  <div>
    <footer>
      <div class="container">
        <!-- upper -->
        <div class="row pt-4 pt-lg-5 my-5 border-top">
          <div
            class="col-lg d-flex flex-column align-items-lg-start align-items-center"
          >
            <NuxtLink to="/" class="d-flex align-items-center">
              <p class="text-muted d-block text-2xl text-center text-lg-start">
                <img src="@/assets/icon.jpg" alt="logo" class="w-15 w-lg-25" />
                Inforum
              </p>
            </NuxtLink>
            <a href="mailto:contact@inforum.com" class="link-dark"
              ><span class="badge bg-secondary mb-2">Email</span>
              contact@inforum.com</a
            >
          </div>

          <div class="col-lg"></div>
        </div>

        <!-- lower -->
        <div class="row border-top">
          <p class="text-center text-muted pt-3">© Inforum {{ year }}</p>
        </div>
      </div>
    </footer>
  </div>
  <!-- Footer -->
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
