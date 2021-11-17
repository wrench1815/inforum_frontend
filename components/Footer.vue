<template>
  <!-- Footer -->
  <div>
    <footer class="">
      <div class="container">
        <!-- upper -->
        <div class="row row-cols-lg-5 pt-4 pt-lg-5 my-5 border-top">
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

          <div class="col-lg" :class="linksClasses">
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <NuxtLink to="/" class="nav-link p-0 text-muted">Home</NuxtLink>
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/about" class="nav-link p-0 text-muted"
                  >About</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/blog" class="nav-link p-0 text-muted"
                  >Blog</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/contact" class="nav-link p-0 text-muted"
                  >Contact</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div class="col-lg" :class="linksClasses">
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <NuxtLink to="/" class="nav-link p-0 text-muted">Home</NuxtLink>
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/about" class="nav-link p-0 text-muted"
                  >About</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/blog" class="nav-link p-0 text-muted"
                  >Blog</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/contact" class="nav-link p-0 text-muted"
                  >Contact</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div class="col-lg" :class="linksClasses">
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <NuxtLink to="/" class="nav-link p-0 text-muted">Home</NuxtLink>
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/about" class="nav-link p-0 text-muted"
                  >About</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/blog" class="nav-link p-0 text-muted"
                  >Blog</NuxtLink
                >
              </li>
              <li class="nav-item mb-2">
                <NuxtLink to="/contact" class="nav-link p-0 text-muted"
                  >Contact</NuxtLink
                >
              </li>
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
