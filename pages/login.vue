<template>
  <div class="page-header">
    <div class="position-fixed fixed-top w-100 h-100 z-index-0 header-img">
      <!-- Start:BG Overlay Mask -->
      <div
        class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-gradient-dark"
      >
        <LazyParticles
          v-if="loadParticles"
          class="w-100 h-100 opacity-100"
          :lineLinked="false"
          :particleOpacity="0.5"
          movementDirection="none"
          out_mode="bounce"
        ></LazyParticles>
      </div>
      <!-- End:BG Overlay Mask -->
    </div>
    <div class="container py-9">
      <div class="row">
        <div
          class="col-lg-6 col-md-10 mx-auto d-flex justify-content-center align-items-center flex-column"
        >
          <div
            class="card card-body d-flex justify-content-center shadow-xl pt-1 blur align-items-center"
          >
            <div
              class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 w-100 mb-3"
            >
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h3 class="text-white text-center mt-2 mb-0">Log In</h3>
              </div>
            </div>

            <!-- Start:Login Form -->
            <form
              role="form"
              class="px-auto"
              @submit="login"
              autocomplete="off"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
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
                  </div>
                  <div class="col-12">
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
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <!-- Start:Action Button -->
                    <button
                      type="submit"
                      class="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Login
                    </button>
                    <!-- End:Action Button -->
                  </div>

                  <div class="col-12">
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
                  </div>
                </div>
              </div>
            </form>
            <!-- End:Login Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
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
    async login(e) {
      e.preventDefault()

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
.header-img {
  background-image: url('~/assets/curved-images/curved5.jpg');
  background-size: cover;
}
</style>
