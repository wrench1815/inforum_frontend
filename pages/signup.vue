<template>
  <section class="py-7 bg-gradient-dark position-relative overflow-hidden">
    <img
      class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-img"
      src="../assets/curved-images/curved5.jpg"
      alt="curves"
    />
    <div
      class="position-absolute start-0 top-0 h-100 z-index-1 opacity-6 w-100 bg-gradient-dark"
    ></div>
    <div class="container position-relative z-index-1">
      <div class="row">
        <div
          class="col-lg-6 col-md-12 d-flex justify-content-center flex-column"
        >
          <section class="">
            <h2 class="text-white">Not Signed Up yet?</h2>
            <h2 class="text-white">
              What are you waiting for,<span class="ms-2 text-primary"
                >Join Now!</span
              >
            </h2>
            <p class="pe-5 text-white opacity-8 z-index-1 text-lg">
              Signup today to get access to a lot of great features.
            </p>
            <ul class="pe-5 text-white opacity-8 z-index-1 text-lg">
              <li>Create Forum Posts</li>
              <li>Leave Comments</li>
              <li>Upvote your favourite Answer and much more...</li>
            </ul>

            <div class="text-white text-2xl">
              Changed Mood? No worry, get back to
              <router-link
                class="text-primary bg-white p-1 rounded-3 text-bolder"
                to="/"
                >Home</router-link
              >
            </div>
            <div class="text-white text-2xl mt-2">
              Already have an Account? Great,
              <router-link
                class="text-primary bg-white p-1 rounded-3 text-bolder"
                to="/login"
                >Login!</router-link
              >
            </div>
          </section>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-12 col-md-10 col-12 mx-auto mt-6">
              <div class="card z-index-0 fadeIn3 fadeInBottom">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
                  >
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'auth',
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

<style scoped>
.bg-img {
  object-fit: fill !important;
  object-position: center !important;
  -o-object-fit: fill !important;
  -o-object-position: center !important;
}
</style>

// Regex for password validation. must have 1 capital, 1 small, 1 number and 1
special character password length 6-50
/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,50}$/gm
