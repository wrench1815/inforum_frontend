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
        <div class="col-lg-7 col-md-7 col-12 mx-auto">
          <div class="card z-index-0">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Sign Up
                </h4>
                <p class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Enter Valid Information Below to Sign Up
                </p>
              </div>
            </div>
            <div class="card-body">
              <!-- Start:Sign Up Form -->
              <form role="form" class="text-start" @submit="signup">
                <div class="row">
                  <div class="col-md-6">
                    <!-- Start:First Name -->
                    <div class="input-group input-group-static mt-3">
                      <label class="text-primary">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="John"
                        v-model="firstName"
                        @keyup="validateFirstName"
                      />
                    </div>
                    <!-- End:First Name -->

                    <!-- Start:First Name Validation -->
                    <div
                      class="text-sm mt-2 text-danger text-bold"
                      v-if="FormHelpTexts.firstNameText"
                    >
                      {{ FormHelpTexts.firstNameText }}
                    </div>
                    <!-- End:First Name Validation -->
                  </div>

                  <div class="col-md-6">
                    <!-- Start:Last Name -->
                    <div class="input-group input-group-static mt-3">
                      <label class="text-primary">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Doe"
                        v-model="lastName"
                        @keyup="validateLastName"
                      />
                    </div>
                    <!-- End:Last Name -->

                    <!-- Start:Last Name Validation -->
                    <div
                      class="text-sm mt-2 text-danger text-bold"
                      v-if="FormHelpTexts.lastNameText"
                    >
                      {{ FormHelpTexts.lastNameText }}
                    </div>
                    <!-- End:Last Name Validation -->
                  </div>
                </div>

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

                <!-- Start:Gender -->
                <div class="input-group input-group-static mt-3">
                  <label class="text-primary">Gender</label>
                  <select
                    class="form-select form-control"
                    v-model="gender"
                    @change="validateGender"
                  >
                    <option disabled value="">Select your Gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Unspecified</option>
                  </select>
                </div>
                <!-- End:Gender -->

                <!-- Start:Gender Validation -->
                <div
                  class="text-sm mt-2 text-danger text-bold"
                  v-if="FormHelpTexts.genderText"
                >
                  {{ FormHelpTexts.genderText }}
                </div>
                <!-- End:Gender Validation-->

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

                <!-- Start:Confirm Password -->
                <div class="input-group input-group-static mt-3">
                  <label class="text-primary">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirmPassword"
                    placeholder="********"
                    @keyup="validateConfirmPassword"
                  />
                </div>
                <!-- End:Confirm Password -->

                <!-- Start:Confirm Validation -->
                <div
                  class="text-danger text-sm mt-2 text-bold"
                  v-if="FormHelpTexts.confirmPasswordText"
                >
                  {{ FormHelpTexts.confirmPasswordText }}
                </div>
                <!-- End:Confirm Password Validation -->

                <!-- Start:Action Button -->
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn bg-gradient-primary w-100 my-4 mb-2"
                  >
                    Sign Up
                  </button>
                </div>
                <!-- End:Action Button -->

                <!-- Start:Login Link -->
                <p class="mt-4 text-sm text-center">
                  Already have an account?
                  <NuxtLink
                    class="text-primary text-gradient font-weight-bold"
                    to="/login"
                    >Login</NuxtLink
                  >
                </p>
                <!-- End:Login Link -->
              </form>
              <!-- End:Sign Up Form -->
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
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',

      // fix to particle shape stretch
      loadParticles: false,

      FormHelpTexts: {
        firstNameText: '',
        lastNameText: '',
        emailText: '',
        genderText: '',
        passwordText: '',
        confirmPasswordText: '',
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadParticles = true
    }, 1000)
  },
  methods: {
    async signup(e) {
      e.preventDefault()
      if (this.password == this.confirmPassword) {
        this.userSignup()
      }
    },
    async userSignup() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        gender: Number(this.gender),
        password: this.password,
      }
      this.validateFirstName()
      this.validateLastName()
      this.validateEmail()
      this.validateGender()
      this.validatePassword()
      this.validateConfirmPassword()

      if (
        this.FormHelpTexts.firstNameText == '' &&
        this.FormHelpTexts.lastNameText == '' &&
        this.FormHelpTexts.emailText == '' &&
        this.FormHelpTexts.genderText == '' &&
        this.FormHelpTexts.passwordText == '' &&
        this.FormHelpTexts.confirmPasswordText == ''
      ) {
        try {
          var result = await this.$axios.$post('/user/register', data)

          this.$swal({
            title: 'Success',
            text: 'You have successfully registered!',
            icon: 'success',
            button: 'OK',
          }).then(() => {
            this.$router.push('/login')
          })
        } catch (err) {
          this.$swal({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      } else {
        this.$swal({
          title: 'Error',
          text: 'Please fill all the fields!',
          icon: 'error',
        })
        return
      }
    },

    // for firstname validation
    validateFirstName() {
      if (this.firstName.length < 3) {
        this.FormHelpTexts.firstNameText = 'Must be atleast 3 Characters long'
      } else {
        this.FormHelpTexts.firstNameText = ''
      }
    },

    // for lastname validation
    validateLastName() {
      if (this.lastName.length < 3) {
        this.FormHelpTexts.lastNameText = 'Must be atleast 3 Characters long'
      } else {
        this.FormHelpTexts.lastNameText = ''
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

    // for confirm password validation
    validateConfirmPassword() {
      if (this.password != this.confirmPassword) {
        this.FormHelpTexts.confirmPasswordText = 'Password does not match'
      } else {
        this.FormHelpTexts.confirmPasswordText = ''
      }
    },

    // for gender selector validation
    validateGender() {
      if (this.gender == '') {
        this.FormHelpTexts.genderText = 'Select one from the list'
      } else {
        this.FormHelpTexts.genderText = ''
      }
    },
  },
}
</script>

<style scoped>
.header-img {
  background-image: url('~/assets/curved-images/curved13.jpg');
  background-size: cover;
}
</style>
