<template>
  <div class="mb-4">
    <section class="container-fluid">
      <div class="row">
        <div
          class="col-12 mb-6 card card-body text-center border-radius-top-end-0 border-radius-top-start-0"
        >
          <nav>
            <NuxtLink class="navbar-brand link-dark fs-4" to="/">
              <img
                src="@/assets/icon.jpg"
                width="25rem"
                alt="logo"
                class="mb-1"
              />
              <span>Inforum</span>
            </NuxtLink>
          </nav>
          <h1 class="text-center">First Run</h1>
          <h4 class="text-center">
            This page Will Guide on how to Setup the Site for First Time.
          </h4>
          <div class="text-center">
            <div class="text-lg border border-danger p-2 d-inline-block">
              <span class="text-danger"
                ><i class="fas fa-exclamation-triangle"></i
              ></span>
              <span class="text-danger"
                >Do note that once done, it is not Possible to Access this Route
                Again so be Carefull with the Information Entered.</span
              >
            </div>
          </div>
          <div class="text-center p mt-2">
            The Process is quite Simple. Just enter the Valid Information for
            Admin Account and press Register. This Information will be used to
            Create an Admin Account for the Site along with a Default User, a
            base Category and seed some Important Database Information.
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="row">
        <div class="col-lg-7 col-md-7 col-12 mx-auto">
          <div class="card z-index-0">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Admin Account
                </h4>
                <p class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Enter Valid Information Below for Admin
                </p>
              </div>
            </div>
            <div class="card-body">
              <!-- Start:Sign Up Form -->
              <form role="form" class="text-start" @submit="register">
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
                    Register
                  </button>
                </div>
                <!-- End:Action Button -->
              </form>
              <!-- End:Sign Up Form -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'firstRun',

  layout: 'firstRun',

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',

      // for Validation
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

  methods: {
    async register(e) {
      e.preventDefault()
      if (this.password == this.confirmPassword) {
        this.adminRegister()
      }
    },
    async adminRegister() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profileImage:
          'https://res.cloudinary.com/inforum/image/upload/v1645625776/Defaults/profile_image_dummy_oawg87.png',
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
        this.$swal({
          title: 'Are you sure?',
          text: 'You will be Register as Admin with the Provided Information.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, register!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$swal({
              title: 'Processing',
              icon: 'info',
              text: 'Please wait while we process your request.',

              didOpen: () => {
                this.$swal.showLoading()

                this.$axios
                  .$post('FirstRun', data)
                  .then((response) => {
                    this.$swal.hideLoading()
                    this.$swal.close()

                    this.$swal({
                      title: 'Success',
                      html: `Admin registered successfully.<br/>Database Seeding Finished.`,
                      icon: 'success',
                      timer: 2000,
                      showConfirmButton: false,
                    }).then(() => {
                      this.$router.push('/login')
                    })
                  })
                  .catch((error) => {
                    this.$swal.hideLoading()
                    this.$swal.close()

                    this.$swal({
                      title: 'Error',
                      text: 'Something went wrong',
                      icon: 'error',
                      timer: 2000,
                      showConfirmButton: false,
                    })
                  })
              },
            })
          }
        })
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

<style scoped></style>
