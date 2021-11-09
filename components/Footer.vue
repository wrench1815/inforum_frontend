<template>
  <!-- Footer -->
  <div>
    <footer class="footer pt-9 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 mb-5 mb-lg-0">
            <h6 class="text-uppercase mb-2 fs-5">Inforum</h6>
          </div>
        </div>
        <div class="d-flex justify-content-lg-center">
          <hr class="horizontal dark border border-dark col-6" />
        </div>
        <div class="row">
          <div class="col-8 mx-lg-auto text-lg-center">
            <p class="text-md text-secondary">Copyright {{ year }}</p>
          </div>
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
      year,
    }
  },
}
let currentTime = new Date()
let year = currentTime.getFullYear()
</script>

<style scoped></style>
