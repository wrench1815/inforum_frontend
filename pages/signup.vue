<template>
  <div class="page-header">
    <div
      class="position-absolute fixed-top ms-auto w-lg-55 w-md-100 w-100 h-100 rounded-3 z-index-0 me-lg-n4 header-img"
    >
      <!-- Start:BG Overlay Mask -->
      <div
        class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-gradient-dark rounded-3"
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
        <div class="col-lg-7 d-flex justify-content-center flex-column">
          <div
            class="card card-body d-flex justify-content-center shadow-lg pt-1 blur align-items-center"
          >
            <div
              class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 w-100 mb-3"
            >
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h3 class="text-white text-center mt-2 mb-0">Sign Up</h3>
              </div>
            </div>

            <!-- Start:Signup Form -->
            <form
              role="form"
              class="px-md-5"
              @submit="signup"
              autocomplete="off"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <!-- Start:First Name -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="John"
                        v-model="firstName"
                        @keyup="validateFirstName"
                      />
                      <!-- Validation -->
                      <div
                        class="text-sm mt-2 text-danger text-bold"
                        v-if="FormHelpTexts.firstNameText"
                      >
                        {{ FormHelpTexts.firstNameText }}
                      </div>
                    </div>
                    <!-- End:First Name -->
                  </div>

                  <div class="col-md-6">
                    <!-- Start:Last Name -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Doe"
                        v-model="lastName"
                        @keyup="validateLastName"
                      />
                      <!-- Validation -->
                      <div
                        class="text-sm mt-2 text-danger text-bold"
                        v-if="FormHelpTexts.lastNameText"
                      >
                        {{ FormHelpTexts.lastNameText }}
                      </div>
                    </div>
                    <!-- End:Last Name -->
                  </div>

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
                    <!-- Start:Gender -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Gender</label>
                      <select
                        class="form-select form-control w-100 ps-3 mt-3"
                        v-model="gender"
                        @change="validateGender"
                      >
                        <option disabled value="">Select Your Gender</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Unspecified</option>
                      </select>
                      <!-- Validation -->
                      <div
                        class="text-sm mt-2 text-danger text-bold"
                        v-if="FormHelpTexts.genderText"
                      >
                        {{ FormHelpTexts.genderText }}
                      </div>
                    </div>
                    <!-- End:Gender -->
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

                  <div class="col-12">
                    <!-- Start:Confirm Password -->
                    <div class="input-group input-group-static my-4">
                      <label class="text-primary">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="confirmPassword"
                        placeholder="********"
                        @keyup="validateConfirmPassword"
                      />
                      <!-- Validation -->
                      <div
                        class="text-danger text-sm mt-2 text-bold"
                        v-if="FormHelpTexts.confirmPasswordText"
                      >
                        {{ FormHelpTexts.confirmPasswordText }}
                      </div>
                    </div>
                    <!-- End:Confirm Password -->
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <!-- Start:Action Button -->
                    <button
                      type="submit"
                      class="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Sign up
                    </button>
                    <!-- End:Action Button -->
                  </div>

                  <div class="col-12">
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
                  </div>
                </div>
              </div>
            </form>
            <!-- End:Signup Form -->
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
