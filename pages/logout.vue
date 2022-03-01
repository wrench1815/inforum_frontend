<template>
  <div class="mt-7">
    <header>
      <div class="page-header min-vh-100">
        <div
          class="header-bg-image w-lg- w-md- w-sm- w-100 position-absolute fixed-top me-auto h-100 z-index-0"
          lazy-background="~/assets/svg/quit-animated.svg"
        ></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-7 ms-auto mt-5">
              <div class="card card-body blur shadow-lg p-5 my-5">
                <h1>
                  Logging Out in
                  <span class="text-primary"> {{ timeLeft }}</span>
                </h1>
                <p class="lead text-bold">
                  You'll be redirected to Home on Successfull Logout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: ['auth'],

  data() {
    return {
      timeLeft: 5,
    }
  },

  mounted() {
    const timer = setInterval(() => {
      this.timeLeft -= 1
      if (this.timeLeft === 0) {
        clearInterval(timer)
        this.$auth.logout().then(() => {
          this.$router.push('/')
        })
      }
    }, 1000)
  },
}
</script>

<style scoped>
.header-bg-image {
  background-repeat: no-repeat;
  background-position: top left;
  background-size: fit;
}
</style>
