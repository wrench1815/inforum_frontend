<template>
  <!-- Footer -->
  <div>
    <footer class="">
      <div class="container">
        <!-- upper -->
        <div class="row pt-4 pt-lg-5 my-5 border-top">
          <div class="col-lg d-flex flex-column align-items-center">
            <NuxtLink to="/" class="d-flex align-items-center">
              <p class="text-muted d-block text-2xl text-center text-lg-start">
                <img src="../assets/icon.jpg" alt="logo" class="w-15 w-lg-25" />
                Inforum
              </p>
            </NuxtLink>
            <a href="mailto:contact@inforum.com" class="link-dark"
              ><span class="badge bg-secondary mb-2">Email</span>
              contact@inforum.com</a
            >
          </div>

          <div class="col-lg"></div>

          <div class="col-lg col-md-4" :class="linksClasses">
            <ul class="nav flex-column">
              <!-- Start:Home Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/" class="nav-link p-0 text-muted">Home</NuxtLink>
              </li>
              <!-- End:Home Link -->

              <!-- Start:Contact Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/contact" class="nav-link p-0 text-muted"
                  >Contact</NuxtLink
                >
              </li>
              <!-- End:Contact Link -->

              <!-- Start:About Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/about" class="nav-link p-0 text-muted"
                  >About</NuxtLink
                >
              </li>
              <!-- End:About Link -->

              <!-- Start:Privacy Policy Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/privacy-policy" class="nav-link p-0 text-muted"
                  >Privacy Policy</NuxtLink
                >
              </li>
              <!-- End:Privacy Policy Link -->
            </ul>
          </div>

          <div class="col-lg col-md-4" :class="linksClasses">
            <ul class="nav flex-column">
              <!-- Start:Forum Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/forum" class="nav-link p-0 text-muted"
                  >Forum</NuxtLink
                >
              </li>
              <!-- End:Forum Link -->

              <!-- Start:Forum Categories Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/forum/category" class="nav-link p-0 text-muted"
                  >Forum Categories</NuxtLink
                >
              </li>
              <!-- End:Forum Categories Link -->

              <!-- Start:Forum Search Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/forum/search" class="nav-link p-0 text-muted"
                  >Forum Search</NuxtLink
                >
              </li>
              <!-- End:Forum Search Link -->

              <!-- Start:Admin Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/admin" class="nav-link p-0 text-muted"
                  >Admin</NuxtLink
                >
              </li>
              <!-- End:Admin Link -->
            </ul>
          </div>
          <div class="col-lg col-md-4" :class="linksClasses">
            <ul class="nav flex-column">
              <!-- Start:Dash Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/dash" class="nav-link p-0 text-muted"
                  >Dash</NuxtLink
                >
              </li>
              <!-- End:Dash Link -->

              <!-- Start:Profile Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/profile" class="nav-link p-0 text-muted"
                  >Profile</NuxtLink
                >
              </li>
              <!-- End:Profile Link -->

              <!-- Start:Login Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/login" class="nav-link p-0 text-muted"
                  >Login</NuxtLink
                >
              </li>
              <!-- End:Login Link -->

              <!-- Start:Sign Up Link -->
              <li class="nav-item mb-2">
                <NuxtLink to="/signup" class="nav-link p-0 text-muted"
                  >Sign Up</NuxtLink
                >
              </li>
              <!-- End:Sign Up Link -->
            </ul>
          </div>
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
