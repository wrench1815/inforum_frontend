<template>
  <div>
    <AdminNavBar />

    <div class="container-fluid py-4">
      <!-- profile navigation-->
      <div class="card card-body">
        <div class="row justify-content-start align-items-center">
          <!-- Start:Profile Image -->
          <div class="col-auto">
            <div class="avatar-xl position-relative">
              <img
                :src="profileImage"
                alt="img"
                class="w-100 rounded-circle shadow-sm avatar-xl avatar-fit"
              />
            </div>
          </div>
          <!-- End:Profile Image -->

          <div class="col-auto my-auto">
            <div class="h-100">
              <!-- Start:User Name -->
              <h5 class="mb-1 font-weight-bolder">
                {{ firstName + ' ' + lastName }}
              </h5>
              <!-- End:User Name -->

              <!-- Start:User Role -->
              <p class="mb-0 font-weight-normal text-sm">
                {{ role }}
              </p>
              <!-- End:User Role -->
            </div>
          </div>
        </div>
      </div>

      <!-- change profile image -->
      <div class="card mt-4">
        <div class="card-header">
          <h3>Profile Image</h3>
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

          <!-- <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end gap-2">
              <button class="btn btn-info">Reset</button>
              <button class="btn btn-success">Update</button>
            </div>
          </div> -->
        </div>
      </div>

      <!-- change basic info -->
      <div class="card mt-4">
        <div class="card-header">
          <h3>Basic Info</h3>
        </div>
        <div class="card-body pt-0">
          <div class="row">
            <!-- Start:First Name -->
            <div class="col-6">
              <div class="input-group input-group-static">
                <label class="text-primary">First Name <span>*</span></label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Alec"
                  v-model="firstName"
                />
              </div>
              <!-- Start:First Name Validation -->
              <div
                class="text-sm mt-2 text-danger text-bold"
                v-if="FormHelpTexts.firstNameText"
              >
                {{ FormHelpTexts.firstNameText }}
              </div>
              <!-- End:First Name Validation -->
            </div>
            <!-- End:First Name -->

            <!-- Start:Last Name -->
            <div class="col-6">
              <div class="input-group input-group-static">
                <label class="text-primary">Last Name <span>*</span></label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Thompson"
                  v-model="lastName"
                />
              </div>
              <!-- Start:Last Name Validation -->
              <div
                class="text-sm mt-2 text-danger text-bold"
                v-if="FormHelpTexts.lastNameText"
              >
                {{ FormHelpTexts.lastNameText }}
              </div>
              <!-- End:Last Name Validation -->
            </div>
            <!-- End:Last Name -->
          </div>

          <div class="row">
            <!-- Start:Gender -->
            <div class="col-sm-6 col-12">
              <div class="input-group input-group-static mt-4 ms-0">
                <label class="text-primary">Gender <span>*</span></label>
                <select class="form-control form-select" v-model="gender">
                  <option disabled value="">Select your Gender</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Unspecified</option>
                </select>
              </div>
              <!-- Start:Gender Validation -->
              <div
                class="text-sm mt-2 text-danger text-bold"
                v-if="FormHelpTexts.genderText"
              >
                {{ FormHelpTexts.genderText }}
              </div>
              <!-- End:Gender Validation-->
            </div>
            <!-- End:Gender -->

            <!-- Start:DOB -->
            <div class="col-sm-6 col-12">
              <div class="input-group input-group-static mt-4 ms-0">
                <label class="text-primary">Birth Date </label>
                <input type="date" class="form-control" v-model="dob" />
              </div>
            </div>
            <!-- End:DOB -->
          </div>

          <div class="row mt-4">
            <!-- Start:Email -->
            <div class="col-sm-6 col-12">
              <div class="input-group input-group-static">
                <label class="text-primary">Email <span>*</span></label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="example@email.com"
                  v-model="email"
                />
              </div>
              <!-- Start:Email Validation -->
              <div
                class="text-danger text-sm mt-2 text-bold"
                v-if="FormHelpTexts.emailText"
              >
                {{ FormHelpTexts.emailText }}
              </div>
              <!-- End:Email Validation -->
            </div>
            <!-- End:Email -->

            <div class="col-sm-6 col-12 mt-sm-0 mt-4">
              <!-- Start:Address -->
              <div class="col-12">
                <div class="input-group input-group-static">
                  <label class="text-primary">Your Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Void City, Near Ring, BlackHole"
                    v-model="address"
                  />
                </div>
                <!-- End:Address -->
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end gap-2">
              <button class="btn btn-info" @click="resetBasicData">
                Reset
              </button>
              <button class="btn btn-success" @click="update">Update</button>
            </div>
          </div>
        </div>
      </div>

      <!-- change role -->
      <div class="card mt-4">
        <div class="card-header">
          <h3>Change Role</h3>
        </div>
        <div class="card-body pt-0">
          <div class="row">
            <!-- Start:Gender -->
            <div class="col">
              <div class="input-group input-group-static mt-4 ms-0">
                <label class="text-primary">Role</label>
                <p
                  class="form-control text-bold text-danger"
                  v-if="loggedInUser.id == originalUser.id"
                >
                  Cannot change your own role
                </p>
                <select class="form-control form-select" v-model="role" v-else>
                  <option disabled value="">Change Role</option>
                  <template v-for="role in roles">
                    <option :value="role.name" :key="role.id">
                      {{ role.name }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <!-- End:Gender -->
          </div>

          <div class="row mt-4">
            <div
              class="col-12 d-flex justify-content-end gap-2"
              v-if="loggedInUser.id != originalUser.id"
            >
              <button class="btn btn-info" @click="resetRole">Reset</button>
              <button class="btn btn-success" @click="changeRole">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- change Password Card -->
      <div class="card mt-4">
        <div class="card-header">
          <h3>Change Password</h3>
        </div>
        <div class="card-body pt-0">
          <!-- Start:New Password -->
          <div class="input-group input-group-static my-4">
            <label class="text-primary">New password</label>
            <input type="password" class="form-control" v-model="newPassword" />
          </div>
          <!-- End:New Password -->

          <!-- Start:Password Validation -->
          <div
            class="text-danger text-sm mt-2 text-bold"
            v-if="FormHelpTexts.newPasswordText"
          >
            {{ FormHelpTexts.newPasswordText }}
          </div>
          <!-- End:Password Validation -->
          <br />

          <!-- Start:Confirm Password -->
          <div class="input-group input-group-static">
            <label class="text-primary">Confirm New password</label>
            <input
              type="password"
              class="form-control"
              v-model="confirmNewPassword"
            />
          </div>
          <!-- End:Confirm Password -->

          <!-- Start:Confirm Validation -->
          <div
            class="text-danger text-sm mt-2 text-bold"
            v-if="FormHelpTexts.newConfirmPasswordText"
          >
            {{ FormHelpTexts.newConfirmPasswordText }}
          </div>
          <!-- End:Confirm Password Validation -->

          <!-- Start:Password Requirements -->
          <h5 class="mt-5">Password requirements</h5>
          <p class="text-muted mb-2">
            Please follow this guide for a strong password:
          </p>
          <ul class="text-muted ps-4 mb-0 float-start">
            <li>
              <span class="text-sm">One special character</span>
            </li>
            <li>
              <span class="text-sm">One Uppercase character</span>
            </li>
            <li>
              <span class="text-sm">One Lowercase character</span>
            </li>
            <li>
              <span class="text-sm">One number</span>
            </li>
            <li>
              <span class="text-sm">Min 6 characters</span>
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
      <!-- change Password Card -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageUpload from '~/components/Admin/Utils/ImageUpload.vue'

export default {
  layout: 'admin',

  components: {
    ImageUpload,
  },

  data() {
    return {
      originalUser: {},
      originalRole: '',
      profileImage: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      dob: '',
      address: '',
      role: '',
      roles: [],
      FormHelpTexts: {
        firstNameText: '',
        lastNameText: '',
        emailText: '',
        genderText: '',
        passwordText: '',
        confirmPasswordText: '',
        newPasswordText: '',
        newConfirmPasswordText: '',
      },
    }
  },

  computed: {
    ...mapGetters(['loggedInUser']),
  },

  created() {
    const user = this.$axios.$get(`/User/single/${this.$route.params.id}`)
    user
      .then((res) => {
        this.originalUser = res.user
        this.firstName = res.user.firstName
        this.lastName = res.user.lastName
        this.email = res.user.email
        this.profileImage = res.user.profileImage
        this.gender = res.user.gender
        this.profileImage = res.user.profileImage
        this.role = res.userRole[0]
        this.originalRole = res.userRole[0]
        this.dob = this.stringToCalenderDate(res.user.dob)
        this.address = res.user.address ? res.user.address : ''
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch data',
        })
      })

    const roles = this.$axios.$get('/User/roles/list')
    roles
      .then((res) => {
        this.roles = res.roles
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch data',
        })
      })
  },

  methods: {
    getUpdatedData() {
      const user = this.$axios.$get(`/User/single/${this.$route.params.id}`)
      user
        .then((res) => {
          this.originalUser = res.user
          this.firstName = res.user.firstName
          this.lastName = res.user.lastName
          this.email = res.user.email
          this.profileImage = res.user.profileImage
          this.gender = res.user.gender
          this.profileImage = res.user.profileImage
          this.role = res.userRole[0]
          this.originalRole = res.userRole[0]
          this.dob = this.stringToCalenderDate(res.user.dob)
          this.address = res.user.address ? res.user.address : ''
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Unable to fetch data',
          })
        })
    },
    resetRole() {
      this.$swal({
        title: 'Success',
        text: 'Role has been Successfully Reset',
        icon: 'success',
        button: 'OK',
      })

      this.role = this.originalRole
    },
    changeRole() {
      const data = {
        roleId: this.roles.filter((role) => role.name == this.role)[0].id,
        userId: this.$route.params.id,
      }
      const result = this.$axios.$patch('User/role/update', data)

      result
        .then((res) => {
          this.$swal({
            title: 'Success',
            text: "User's Role Updated Successfully",
            icon: 'success',
            button: 'OK',
          })
          this.getUpdatedData()
        })
        .catch((err) => {
          this.$swal({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        })
    },
    // input date to Iso Date
    calenderDateToString(d) {
      return d ? new Date(d).toISOString() : null
    },

    // string to calender
    stringToCalenderDate(d) {
      if (d) {
        const date = new Date(d)
        const year = String(date.getFullYear())
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }
      return null
    },
    resetBasicData() {
      this.$swal({
        title: 'Success',
        text: 'Data has been Successfully Reset',
        icon: 'success',
        button: 'OK',
      })
      this.firstName = this.originalUser.firstName
      this.lastName = this.originalUser.lastName
      this.email = this.originalUser.email
      this.profileImage = this.originalUser.profileImage
      this.gender = this.originalUser.gender
      this.profileImage = this.originalUser.profileImage
      this.role = this.originalRole
      this.dob = this.stringToCalenderDate(this.originalUser.dob)
      this.address = this.originalUser.address ? this.originalUser.address : ''

      // validations reset
      this.FormHelpTexts.firstNameText = ''
      this.FormHelpTexts.lastNameText = ''
      this.FormHelpTexts.emailText = ''
      this.FormHelpTexts.genderText = ''
    },

    async selectedProfile(url) {
      const data = {
        firstName: this.originalUser.firstName,
        lastName: this.originalUser.lastName,
        email: this.originalUser.email,
        gender: Number(this.originalUser.gender),
        profileImage: url,
        dob: this.originalUser.dob,
        address: this.originalUser.address,
      }

      const result = this.$axios.$patch(
        `/User/update/${this.$route.params.id}`,
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
          this.profileImage = url
          this.getUpdatedData()
        })
        .catch((err) => {
          this.$swal({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        })
    },
    editProfilePicture() {
      this.editProfile = true
    },
    updatePassword() {
      const data = {
        password: this.newPassword,
      }

      this.validateNewPassword()
      this.validateNewConfirmPassword()

      if (
        this.FormHelpTexts.newPasswordText == '' &&
        this.FormHelpTexts.newConfirmPasswordText == ''
      ) {
        const result = this.$axios.$post(
          `/User/change-password/${this.$route.params.id}`,
          data
        )

        result
          .then(() => {
            this.$swal({
              title: 'Success',
              text: "User's Password Updated Successfully",
              icon: 'success',
              button: 'OK',
            })
            // resets
            this.newPassword = ''
            this.confirmNewPassword = ''
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
          text: 'Validation Error',
          icon: 'error',
        })
        return
      }
    },
    async update(e) {
      e.preventDefault()
      // if (this.password == this.confirmPassword) {
      this.userUpdate()
      // }
    },
    async userUpdate() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        gender: Number(this.gender),
        profileImage: this.profileImage,
        address: this.address ? this.address : null,
        dob: this.calenderDateToString(this.dob),
      }

      this.validateFirstName()
      this.validateLastName()
      this.validateEmail()
      this.validateGender()
      // this.validatePassword()
      // this.validateConfirmPassword()

      if (
        this.FormHelpTexts.firstNameText == '' &&
        this.FormHelpTexts.lastNameText == '' &&
        this.FormHelpTexts.emailText == '' &&
        this.FormHelpTexts.genderText == ''
      ) {
        const result = this.$axios.$patch(
          `/User/update/${this.$route.params.id}`,
          data
        )

        result
          .then(() => {
            this.$swal({
              title: 'Success',
              text: 'User updated successfully',
              icon: 'success',
              button: 'OK',
            })
            this.getUpdatedData()
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

    // for password validation
    validateNewPassword() {
      var re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      if (!re.test(this.newPassword)) {
        this.FormHelpTexts.newPasswordText =
          'Must be 6 characters long, containing atleast 1 of Capital, Small, Numeric and Special Character'
      } else {
        this.FormHelpTexts.newPasswordText = ''
      }
    },

    // for confirm password validation
    validateNewConfirmPassword() {
      if (this.newPassword != this.confirmNewPassword) {
        this.FormHelpTexts.newConfirmPasswordText = 'Password does not match'
      } else {
        this.FormHelpTexts.newConfirmPasswordText = ''
      }
    },
    // for gender selector validation
    validateGender() {
      if (this.gender === '') {
        this.FormHelpTexts.genderText = 'Select one from the list'
      } else {
        this.FormHelpTexts.genderText = ''
      }
    },
  },
}
</script>

<style scoped>
.avatar-fit {
  object-fit: cover;
  object-position: center;
}
</style>
