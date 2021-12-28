<template>
  <div class="container my-9">
    <div class="row">
      <div class="col-lg-5 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
            >
              <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                Sign Up
              </h4>
            </div>
          </div>
          <div class="card-body">
            <!-- Start:Form -->
            <form role="form" class="text-start">
              <!-- Start:First Name -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="John"
                  v-model="firstName"
                />
              </div>
              <!-- End:First Name -->

              <!-- Start:Last Name -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Doe"
                  v-model="lastName"
                />
              </div>
              <!-- End:Last Name -->

              <!-- Start:Email -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="johndoe@mail.com"
                  v-model="email"
                />
                <div class="text-muted text-sm mt-2">
                  {{ FormHelpTexts.emailText }}
                </div>
              </div>
              <!-- End:Email -->

              <!-- Start:Gender -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">Gender</label>
                <select
                  class="form-select form-control w-100 ps-3 mt-3"
                  v-model="gender"
                >
                  <option disabled value="">Select Your Gender</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Unspecified</option>
                </select>
              </div>
              <!-- End:Gender -->

              <!-- Start:Password -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
                <div class="text-muted text-sm mt-2">
                  {{ FormHelpTexts.passwordText }}
                </div>
              </div>
              <!-- End:Password -->

              <!-- Start:COnfirm Password -->
              <div class="input-group input-group-static my-4">
                <label class="text-primary">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="confirmPassword"
                />
                <div class="text-muted text-sm mt-2">
                  {{ FormHelpTexts.confirmPasswordText }}
                </div>
              </div>
              <!-- End:Confirm Password -->

              <div class="text-center">
                <!-- Start:Action Button -->
                <button
                  type="button"
                  class="btn bg-gradient-primary w-100 my-4 mb-2"
                  @click="signup"
                >
                  Sign up
                </button>
                <!-- End:Action Button -->
              </div>

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
            <!-- End:Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Auth',
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
        emailText: 'must be a valid Email Address',
        genderText: '',
        passwordText:
          'must be 6 characters long, containing atleast 1 of Capital, Small, Numeric and Special Character',
        confirmPasswordText: 'must be same as password',
      },
    }
  },

  methods: {
    async signup() {
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
      try {
        var result = await this.$axios.$post('/user/register', data)

        this.$router.push(`/`)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>

// Regex for password validation. must have 1 capital, 1 small, 1 number and 1
special character password length 6-50
/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,50}$/gm
