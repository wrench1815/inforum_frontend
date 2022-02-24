<template>
  <div
    class="page-header align-items-start min-vh-100 header-img"
    loading="lazy"
  >
    <span class="mask bg-gradient-dark opacity-6">
      <LazyParticles
        v-if="loadParticles"
        class="w-100 h-100 opacity-100"
        :lineLinked="false"
        :particleOpacity="0.5"
        movementDirection="none"
        out_mode="bounce"
      ></LazyParticles>
    </span>
    <div class="container mt-9 mb-4">
      <div class="row">
        <div class="col-lg-5 col-md-7 col-12 mx-auto">
          <div class="card z-index-0">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Login
                </h4>
                <p class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Enter your Email and Password to Login
                </p>
              </div>
            </div>
            <div class="card-body">
              <!-- Start:Login Form -->
              <form role="form" class="text-start" @submit="login">
                <!-- Start:Email -->
                <div class="input-group input-group-static mt-3">
                  <label class="text-primary">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="person@mail.com"
                    v-model="email"
                    @keyup="validateEmail"
                  />
                </div>
                <!-- End:Email -->

                <!-- Start:Email Validation -->
                <div
                  class="text-danger text-sm mt-2 text-bold"
                  v-if="FormHelpTexts.emailText"
                >
                  {{ FormHelpTexts.emailText }}
                </div>
                <!-- End:Email Validation -->

                <!-- Start:Password -->
                <div class="input-group input-group-static mt-3">
                  <label class="text-primary">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    placeholder="********"
                    @keyup="validatePassword"
                  />
                </div>
                <!-- End:Password-->

                <!-- Start:Password Validation -->
                <div
                  class="text-danger text-sm mt-2 text-bold"
                  v-if="FormHelpTexts.passwordText"
                >
                  {{ FormHelpTexts.passwordText }}
                </div>
                <!-- End:Password Validation -->

                <!-- Start:Action Button -->
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn bg-gradient-primary w-100 my-4 mb-2"
                  >
                    Login
                  </button>
                </div>
                <!-- End:Action Button -->

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
              <!-- End:Login Form -->
            </div>
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
        } catch (err) {
          this.$swal({
            title: 'Error',
            icon: 'error',
            type: 'error',
            html: `Unable to login.<br/>Try Again.`,
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
