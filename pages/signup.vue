<template>
  <div class="container">
    <div class="container my-9">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
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
              <form role="form" class="text-start">
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">First Name</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">Last Name</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">Gender</label>
                  <select class="form-select form-control w-100 ps-3 mt-3">
                    <option disabled="disabled">Select Your Gender</option>
                    <option value="1" selected="selected">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Transgender</option>
                  </select>
                </div>
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">Email</label>
                  <input type="email" class="form-control" />
                </div>

                <div class="input-group input-group-static my-4">
                  <label class="text-primary">Password</label>
                  <input type="password" class="form-control" />
                </div>
                <div class="input-group input-group-static my-4">
                  <label class="text-primary">Confirm Password</label>
                  <input type="password" class="form-control" />
                </div>

                <div class="text-center">
                  <button
                    type="button"
                    class="btn bg-gradient-primary w-100 my-4 mb-2"
                  >
                    Sign up
                  </button>
                </div>
                <p class="mt-4 text-sm text-center">
                  Already have an account?
                  <NuxtLink
                    class="text-primary text-gradient font-weight-bold"
                    to="/login"
                    >Login</NuxtLink
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
