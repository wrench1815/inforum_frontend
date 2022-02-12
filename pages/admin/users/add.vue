<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add User</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start:Contact Form Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
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
                <div class="text-center d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn bg-gradient-primary my-4 mb-2"
                  >
                    Create
                  </button>
                </div>
                <!-- End:Action Button -->
              </form>
            </div>
          </div>
          <!-- End:Contact Form Add Form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
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
        profileImage:
          'https://res.cloudinary.com/inforum/image/upload/v1644480589/Defaults/c1cnefxvbi5qlmj85mmn.png',
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
        const result = this.$axios.$post('/user/register', data)

        result
          .then(() => {
            this.$swal({
              title: 'Success',
              text: 'New User created successfully',
              icon: 'success',
              button: 'OK',
            })
            this.$router.push('/admin/users')
          })
          .catch((err) => {
            this.$swal({
              title: 'Error',
              text: err.response.data.message,
              icon: 'error',
              confirmButtonText: 'Try Again',
            })
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
