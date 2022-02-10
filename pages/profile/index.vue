<template>
  <div>
    <div class="container pt-7" v-if="loading">
      <div class="text-center">
        <h2>Loading....</h2>
      </div>
    </div>
    <div class="container pt-7" v-if="!loading">
      <div class="my-2 py-2">
        <div class="row mb-5">
          <div class="col-lg-3">
            <!-- Start:Profile Nav -->
            <div class="card position-sticky profile-top">
              <ul class="nav flex-column bg-white border-radius-lg p-3">
                <li class="nav-item">
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#profile"
                  >
                    <i class="fas fa-user-circle text-lg me-2"></i>
                    <span class="text-sm">Profile</span>
                  </a>
                </li>
                <li class="nav-item pt-2">
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#basic-info"
                    style=""
                  >
                    <i class="fas fa-receipt text-lg me-2"></i>
                    <span class="text-sm">Basic Info</span>
                  </a>
                </li>
                <li class="nav-item pt-2">
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#password"
                    style=""
                  >
                    <i class="fas fa-lock text-lg me-2"></i>
                    <span class="text-sm">Change Password</span>
                  </a>
                </li>

                <li class="nav-item pt-2">
                  <button
                    class="btn btn-danger btn-sm ms-2 text-capitalize"
                    @click="logout"
                  >
                    <i class="fas fa-sign-out-alt text-sm me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
            <!-- Start:Profile Nav -->
          </div>
          <div class="col-lg-9 mt-lg-0 mt-4">
            <!-- Start:Profile Card -->
            <div class="card card-body" id="profile">
              <div class="row justify-content-center align-items-center">
                <!-- Start:Profile Image -->
                <div class="col-sm-auto col-4">
                  <div class="avatar-xl position-relative">
                    <img
                      :src="loggedInUser.profileImage"
                      alt="img"
                      class="w-100 rounded-circle shadow-sm avatar-xl avatar-fit"
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
                      <label class="text-primary">First Name</label>
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
                      <label class="text-primary">Last Name</label>
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
                      <label class="text-primary">I'm</label>
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
                      <label class="text-primary">Email</label>
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
                    <button class="btn btn-success">Update</button>
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
                  <label class="text-primary">Current password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                  />
                </div>
                <!-- End:Current Password -->

                <!-- Start:New Password -->
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">New password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.newPassword"
                  />
                </div>
                <!-- End:New Password -->

                <!-- Start:Confirm Password -->
                <div class="input-group input-group-static">
                  <label class="text-primary">Confirm New password</label>
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
                <button class="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">
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

export default {
  middleware: 'auth',

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
        address: '',
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

    async resetInfo() {
      this.user.firstName = await this.loggedInUser.firstName
      this.user.lastName = await this.loggedInUser.lastName
      this.user.gender = await this.loggedInUser.gender
      this.user.dob = await this.loggedInUser.dob
      this.user.email = await this.loggedInUser.email
      this.user.confirmEmail = await ''
      this.user.address = await this.loggedInUser.address
      this.user.password = await ''
      this.user.newPassword = await ''
      this.user.confirmPassword = await ''
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
