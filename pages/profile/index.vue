<template>
  <div>
    <div class="container pt-7" v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div class="container pt-7" v-if="!loading">
      <div class="my-2">
        <div class="row mb-5">
          <div class="col-12">
            <!-- Start:Profile Card -->
            <div class="card card-body" id="profile">
              <div class="row justify-content-center align-items-center">
                <!-- Start:Profile Image -->
                <div class="col-sm-auto col-4">
                  <div class="avatar-xl position-relative">
                    <img
                      :data-src="loggedInUser.profileImage"
                      alt="img"
                      class="w-100 rounded-circle shadow-sm avatar-xl avatar-fit"
                      v-lazy-load
                    />
                  </div>
                </div>
                <!-- End:Profile Image -->

                <div class="col-sm-auto col-8 my-auto">
                  <div class="h-100">
                    <!-- Start:User Name -->
                    <h5 class="mb-1 font-weight-bolder">
                      {{ loggedInUser.firstName + ' ' + loggedInUser.lastName }}
                    </h5>
                    <!-- End:User Name -->

                    <!-- Start:User Role -->
                    <p class="mb-0 font-weight-normal text-sm">
                      {{ loggedInUserRole }}
                    </p>
                    <!-- End:User Role -->
                  </div>
                </div>
                <div class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                  <!-- <label class="form-check-label mb-0">
                    <small id="profileVisibility">Switch to invisible</small>
                  </label>
                  <div class="form-check form-switch ms-2 my-auto is-filled">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault23"
                      checked=""
                      onchange="visible()"
                    />
                  </div> -->
                </div>
              </div>
            </div>
            <!-- End:Profile Card -->

            <!-- change profile image -->
            <div class="card mt-4">
              <div class="card-header">
                <h4>Change Profile Image</h4>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col">
                    <!-- Image upload component -->
                    <ImageUpload
                      :uploadFolder="'profiles'"
                      @uploadImageUrl="selectedProfile($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Start:Basic Info Card -->
            <div class="card mt-4" id="basic-info">
              <div class="card-header">
                <h5>Basic Info</h5>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <!-- Start:First Name -->
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label class="text-primary"
                        >First Name<span class="ms-1 text-danger"
                          >*</span
                        ></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Alec"
                        v-model="user.firstName"
                      />
                    </div>
                  </div>
                  <!-- End:First Name -->

                  <!-- Start:Last Name -->
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label class="text-primary"
                        >Last Name<span class="ms-1 text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Thompson"
                        v-model="user.lastName"
                      />
                    </div>
                  </div>
                  <!-- End:Last Name -->
                </div>

                <div class="row">
                  <!-- Start:Gender -->
                  <div class="col-sm-6 col-12">
                    <div class="input-group input-group-static mt-4 ms-0">
                      <label class="text-primary"
                        >I'm<span class="ms-1 text-danger">*</span></label
                      >
                      <select
                        class="form-control form-select"
                        v-model="user.gender"
                      >
                        <option disabled value="">Select your Gender</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Unspecified</option>
                      </select>
                    </div>
                  </div>
                  <!-- End:Gender -->

                  <!-- Start:DOB -->
                  <div class="col-sm-6 col-12">
                    <div class="input-group input-group-static mt-4 ms-0">
                      <label class="text-primary">Birth Date</label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="user.dob"
                      />
                    </div>
                  </div>
                  <!-- End:DOB -->
                </div>

                <div class="row mt-4">
                  <!-- Start:Email -->
                  <div class="col-sm-6 col-12">
                    <div class="input-group input-group-static">
                      <label class="text-primary"
                        >Email<span class="ms-1 text-danger">*</span></label
                      >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@email.com"
                        v-model="user.email"
                      />
                    </div>
                  </div>
                  <!-- End:Email -->

                  <!-- Start:Confirm Email -->
                  <div class="col-sm-6 col-12 mt-sm-0 mt-4">
                    <div class="input-group input-group-static">
                      <label class="text-primary">Confirm Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@email.com"
                        v-model="user.confirmEmail"
                      />
                    </div>
                  </div>
                  <!-- End:Confirm Email -->
                </div>

                <div class="row mt-4">
                  <!-- Start:Address -->
                  <div class="col-12">
                    <div class="input-group input-group-static">
                      <label class="text-primary">Your location</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Void City, Near Ring, BlackHole"
                        v-model="user.address"
                      />
                    </div>
                    <!-- End:Address -->
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-12 d-flex justify-content-end gap-2">
                    <button class="btn btn-info" @click="resetInfo">
                      Reset
                    </button>
                    <button class="btn btn-success" @click="updateInfo">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End:Basic Info Card -->

            <!-- Start:Change Password Card -->
            <div class="card mt-4" id="password">
              <div class="card-header">
                <h5>Change Password</h5>
              </div>
              <div class="card-body pt-0">
                <!-- Start:Current Password -->
                <div class="input-group input-group-static">
                  <label class="text-primary"
                    >Current password<span class="ms-1 text-danger"
                      >*</span
                    ></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                  />
                </div>
                <!-- End:Current Password -->

                <!-- Start:New Password -->
                <div class="input-group input-group-static my-4">
                  <label class="text-primary"
                    >New password<span class="ms-1 text-danger">*</span></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.newPassword"
                  />
                </div>
                <!-- End:New Password -->

                <!-- Start:Confirm Password -->
                <div class="input-group input-group-static">
                  <label class="text-primary"
                    >Confirm New password<span class="ms-1 text-danger"
                      >*</span
                    ></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.confirmPassword"
                  />
                </div>
                <!-- End:Confirm Password -->

                <!-- Start:Password Requirements -->
                <h5 class="mt-5">Password requirements</h5>
                <p class="text-muted mb-2">
                  Please follow this guide for a strong password:
                </p>
                <ul class="text-muted ps-4 mb-0 float-start">
                  <li>
                    <span class="text-sm">One special characters</span>
                  </li>
                  <li>
                    <span class="text-sm">Min 6 characters</span>
                  </li>
                  <li>
                    <span class="text-sm">One number (2 are recommended)</span>
                  </li>
                  <li>
                    <span class="text-sm">Change it often</span>
                  </li>
                </ul>
                <!-- End:Password Requirements -->
                <button
                  class="btn bg-gradient-dark btn-sm float-end mt-6 mb-0"
                  @click="updatePassword"
                >
                  Update password
                </button>
              </div>
            </div>
            <!-- End:Change Password Card -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ImageUpload from '~/components/Admin/Utils/ImageUpload.vue'
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  middleware: 'auth',

  components: {
    ImageUpload,
    Loading,
  },

  data() {
    return {
      loading: true,

      user: {
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        email: '',
        confirmEmail: '',
        profileImage: '',
        address: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      },

      helpTexts: {
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        gender: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/')

      this.$swal({
        title: 'Logged out',
        text: 'You have been logged out',
        type: 'success',
        timer: 2000,
      })
    },

    // Reset all the fields
    async resetInfo() {
      this.user.firstName = await this.loggedInUser.firstName
      this.user.lastName = await this.loggedInUser.lastName
      this.user.gender = await this.loggedInUser.gender
      this.user.dob = await this.loggedInUser.dob
      this.user.email = await this.loggedInUser.email
      this.user.confirmEmail = await ''
      this.user.address = await this.loggedInUser.address
      this.user.profileImage = await this.loggedInUser.profileImage
      this.user.password = await ''
      this.user.newPassword = await ''
      this.user.confirmPassword = await ''
    },

    // Update the user info
    async updateInfo() {
      const userData = {
        id: this.loggedInUser.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: Number(this.user.gender),
        dob: this.user.dob,
        email: this.user.email,
        address: this.user.address,
        profileImage: this.user.profileImage,
      }

      this.validateFirstName()
      this.validateLastName()
      this.validateEmail()
      this.validateConfirmEmail()
      this.validateGender()

      if (
        this.helpTexts.firstName === '' &&
        this.helpTexts.lastName === '' &&
        this.helpTexts.email === '' &&
        this.helpTexts.confirmEmail === '' &&
        this.helpTexts.gender === ''
      ) {
        await this.$axios
          .$patch(`User/update/${this.loggedInUser.id}`, userData)
          .then((res) => {
            if (res.status == 200) {
              this.$auth.fetchUser().then(() => {
                this.$swal({
                  title: 'Success',
                  icon: 'success',
                  html: 'Your profile has been updated.',
                  button: 'OK',
                }).then(() => {
                  this.resetInfo()
                })
              })
            } else {
              this.$swal({
                title: 'Error',
                icon: 'error',
                html: 'Something went wrong.</br>Please try again.',
                button: 'OK',
              })
            }
          })
          .catch((err) => {
            this.$swal({
              title: 'Error',
              icon: 'error',
              html: 'Something went wrong.</br>Please try again.',
              button: 'OK',
            })
          })
      } else {
        this.$swal({
          title: 'Validation Error',
          icon: 'info',
          html: `Please fix the errors below.</br>${this.helpTexts.firstName}${this.helpTexts.lastName}${this.helpTexts.gender}${this.helpTexts.email}${this.helpTexts.confirmEmail}`,
          button: 'OK',
        })
      }
    },

    async selectedProfile(url) {
      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        gender: Number(this.user.gender),
        profileImage: url,
        dob: this.user.dob,
        address: this.user.address,
      }

      const result = this.$axios.$patch(
        `/User/update/${this.loggedInUser.id}`,
        data
      )

      result
        .then(() => {
          this.$swal({
            title: 'Success',
            text: 'User Image Updated Successfully',
            icon: 'success',
            button: 'OK',
          })
          this.user.profileImage = url
          this.$auth
            .fetchUser()
            .then(() => {
              this.resetInfo()
            })
            .catch((err) => {
              this.$swal({
                title: 'Error',
                text: 'Failed to Fetch User Info',
                icon: 'error',
                confirmButtonText: 'Try Again',
              })
            })
        })
        .catch((err) => {
          this.$swal({
            title: 'Error',
            text: 'Failed to Update User Image',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        })
    },

    editProfilePicture() {
      this.editProfile = true
    },
    // update password
    async updatePassword() {
      const userData = {
        password: this.user.newPassword,
      }

      this.validatePassword()
      this.validateNewPassword()
      this.validateConfirmPassword()

      if (
        this.helpTexts.password === '' &&
        this.helpTexts.newPassword === '' &&
        this.helpTexts.confirmPassword === ''
      ) {
        const logInData = {
          email: this.loggedInUser.email,
          password: this.user.password,
        }

        this.$axios
          .$post('User/login', logInData)
          .then((res) => {
            if (this.user.password != this.user.newPassword) {
              this.$axios
                .$post(`User/change-password/${this.loggedInUser.id}`, userData)
                .then((r) => {
                  if (r.status == 200) {
                    this.loading = true
                    this.$auth.logout()

                    this.$swal({
                      title: 'Success',
                      icon: 'success',
                      html: 'Your Password has been updated.<br/>Please login again.',
                    }).then(() => {
                      this.$router.push('/login')
                    })
                  }
                })
            } else {
              this.$swal({
                title: 'Error',
                icon: 'error',
                html: 'New password cannot be the same as old password.',
                button: 'OK',
              })
            }
          })
          .catch((err) => {
            if (err.response.status == 404) {
              this.$swal({
                title: 'Error',
                icon: 'error',
                html: `Incorrect Password<br/>Please try again.`,
                button: 'OK',
              })

              return false
            } else {
              this.$swal({
                title: 'Error',
                icon: 'error',
                html: `Something went wrong.</br>Please try again.`,
                button: 'OK',
              })

              return false
            }
          })
      } else {
        this.$swal({
          title: 'Validation Error',
          icon: 'info',
          html: `Please fix the errors below.</br>${this.helpTexts.password}${this.helpTexts.newPassword}${this.helpTexts.confirmPassword}`,
          button: 'OK',
        })
      }
    },

    // for firstname validation
    validateFirstName() {
      if (this.user.firstName.length < 3) {
        this.helpTexts.firstName =
          '<b>First Name</b>: Must be atleast 3 Characters long<br/>'
      } else {
        this.helpTexts.firstName = ''
      }
    },

    // for lastname validation
    validateLastName() {
      if (this.user.lastName.length < 3) {
        this.helpTexts.lastName =
          '<b>Last Name</b>: Must be atleast 3 Characters long<br/>'
      } else {
        this.helpTexts.lastName = ''
      }
    },

    // for email validation
    validateEmail() {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(this.user.email)) {
        this.helpTexts.email =
          '<b>Email</b>: Must be a valid Email Address<br/>'
      } else {
        this.helpTexts.email = ''
      }
    },

    // for confirm email validation
    validateConfirmEmail() {
      if (this.user.confirmEmail != '') {
        if (this.user.email != this.user.confirmEmail) {
          this.helpTexts.confirmEmail =
            '<b>Confirm Email</b>: Email does not match<br/>'
        } else {
          this.helpTexts.confirmEmail = ''
        }
      } else {
        this.helpTexts.confirmEmail = ''
      }
    },

    // for password validation
    validatePassword() {
      var re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      if (!re.test(this.user.password)) {
        this.helpTexts.password =
          '<b>Password</b>: Must be 6 characters long, containing atleast 1 of Capital, Small, Numeric and Special Character<br/>'
      } else {
        this.helpTexts.password = ''
      }
    },

    // for New password validation
    validateNewPassword() {
      var re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      if (!re.test(this.user.newPassword)) {
        this.helpTexts.newPassword =
          '<b>New Password</b>: Must be 6 characters long, containing atleast 1 of Capital, Small, Numeric and Special Character<br/>'
      } else {
        this.helpTexts.newPassword = ''
      }
    },

    // for confirm password validation
    validateConfirmPassword() {
      if (this.user.newPassword != this.user.confirmPassword) {
        this.helpTexts.confirmPassword =
          '<b>Confirm Password</b>: Password does not match<br/>'
      } else {
        this.helpTexts.confirmPassword = ''
      }
    },

    // for gender selector validation
    validateGender() {
      if (this.user.gender === '') {
        this.helpTexts.gender = '<b>Gender</b>: Select one from the list<br/>'
      } else {
        this.helpTexts.gender = ''
      }
    },
  },

  mounted() {
    this.resetInfo().then(() => {
      this.loading = false
    })
  },
}
</script>

<style scoped>
.profile-top {
  top: 17% !important;
}

.avatar-fit {
  object-fit: cover;
  object-position: center;
}
</style>
