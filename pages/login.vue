<template>
  <section
    class="bg-gradient-dark position-relative overflow-hidden pb-6 vh-100"
  >
    <!-- Start:BG Image -->
    <img
      class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-img"
      src="../assets/curved-images/curved5.jpg"
      alt="curves"
    />
    <!-- End:BG Image -->

    <!-- Start:BG Overlay Mask -->
    <div
      class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-gradient-dark"
    >
      <LazyParticles
        v-if="loadParticles"
        class="w-100 h-100 position-fixe"
        :lineLinked="false"
        :particleOpacity="0.5"
        movementDirection="none"
        out_mode="bounce"
      ></LazyParticles>
    </div>
    <!-- End:BG Overlay Mask -->

    <div class="container position-relative z-index-1">
      <div class="row">
        <div
          class="col-lg-6 col-md-12 d-flex justify-content-cente flex-column mt-6"
        >
          <section class="">
            <h2 class="text-white">Log In to your Account.</h2>

            <div class="text-white text-2xl">
              Don't have an Account? No worry, Create one
              <router-link
                class="text-primary bg-white p-1 rounded-3 text-bolder"
                to="/signup"
                >Now!</router-link
              >
            </div>
            <div class="text-white text-2xl mt-2">
              Change of Mind? Alright then, back to
              <router-link
                class="text-primary bg-white p-1 rounded-3 text-bolder"
                to="/"
                >Home</router-link
              >
            </div>
          </section>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-10 col-md-9 col-12 mx-auto mt-6">
              <div class="card z-index-0">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
                  >
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
                      Log In
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <!-- Start:Form -->
                  <form role="form" class="text-start">
                    <!-- Start:Email -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="johndoe@mail.com"
                        v-model="email"
                        @keyup="validateEmail"
                      />
                      <!-- Validation -->
                      <div
                        class="text-danger text-sm mt-2 text-bold"
                        v-if="FormHelpTexts.emailText"
                      >
                        {{ FormHelpTexts.emailText }}
                      </div>
                    </div>
                    <!-- End:Email -->

                    <!-- Start:Password -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        placeholder="********"
                        @keyup="validatePassword"
                      />
                      <!-- Validation -->
                      <div
                        class="text-danger text-sm mt-2 text-bold"
                        v-if="FormHelpTexts.passwordText"
                      >
                        {{ FormHelpTexts.passwordText }}
                      </div>
                    </div>
                    <!-- End:Password -->

                    <div class="text-center">
                      <!-- Start:Action Button -->
                      <button
                        type="button"
                        class="btn bg-gradient-primary w-100 my-4 mb-2"
                        @click="login"
                      >
                        Login
                      </button>
                      <!-- End:Action Button -->
                    </div>

                    <!-- Start:Signup Link -->
                    <p class="mt-4 text-sm text-center">
                      Don't have an account?
                      <NuxtLink
                        class="text-primary text-gradient font-weight-bold"
                        to="/signup"
                        >Sign up</NuxtLink
                      >
                    </p>
                    <!-- End:Signup Link -->
                  </form>
                  <!-- End:Form -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'auth',

  data() {
    return {
      email: '',
      password: '',

      // fix to particle shape stretch
      loadParticles: false,

      FormHelpTexts: {
        emailText: '',
        passwordText: '',
      },
    }
  },

  mounted() {
    setTimeout(() => {
      this.loadParticles = true
    }, 1000)
  },

  methods: {
    async login() {
      if (this.email != '' && this.password != '') {
        this.userLogin()
      } else {
        this.$swal({
          title: 'Error',
          icon: 'error',
          text: 'Please fill all fields',
          type: 'error',
        })
      }
    },
    async userLogin() {
      if (
        this.FormHelpTexts.emailText == '' &&
        this.FormHelpTexts.passwordText == ''
      ) {
        try {
          await this.$auth.login({
            data: {
              email: this.email,
              password: this.password,
            },
          })

          this.$swal({
            title: 'Logged in',
            icon: 'success',
            text: 'You have been logged in',
            type: 'success',
          })

          // this.$router.push('/')
        } catch (err) {
          this.$swal({
            title: 'Error',
            icon: 'error',
            text: err.response.data.message,
          })
        }
      } else {
        this.$swal({
          title: 'Error',
          icon: 'error',
          text: 'Please fill all the fields',
        })
      }
    },

    // for email validation
    validateEmail() {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(this.email)) {
        this.FormHelpTexts.emailText = 'Must be a valid Email Address'
      } else {
        this.FormHelpTexts.emailText = ''
      }
    },

    // for password validation
    validatePassword() {
      var re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      if (!re.test(this.password)) {
        this.FormHelpTexts.passwordText =
          'Must be 6 characters long, containing atleast 1 of Capital, Small, Numeric and Special Character'
      } else {
        this.FormHelpTexts.passwordText = ''
      }
    },
  },
}
</script>

<style scoped>
.bg-img {
  object-fit: fill !important;
  object-position: center !important;
  -o-object-fit: fill !important;
  -o-object-position: center !important;
}
</style>
