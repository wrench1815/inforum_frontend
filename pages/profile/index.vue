<template>
  <div>
    <div class="container pt-7" v-if="loading">
      <div class="text-center">
        <h2>Loading....</h2>
      </div>
    </div>
    <div class="container pt-7" v-if="!loading">
      <h2 class="text-center">Profile Page</h2>

      <div class=" my-3 py-3">
        <div class="row mb-5">
          <div class="col-lg-3">
            <div class="card position-sticky top-10">
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
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#2fa"
                  >
                    <i class="fa fa-shield text-lg me-2"></i>
                    <span class="text-sm">2FA</span>
                  </a>
                </li>
                <li class="nav-item pt-2">
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#accounts"
                  >
                    <i class="fas fa-id-badge text-lg me-2"></i>
                    <span class="text-sm">Accounts</span>
                  </a>
                </li>
                <li class="nav-item pt-2">
                  <a
                    class="nav-link text-dark d-flex"
                    data-scroll=""
                    href="#delete"
                  >
                    <i class="fas fa-trash text-lg me-2"></i>
                    <span class="text-sm">Delete Account</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9 mt-lg-0 mt-4">
            <!-- Card Profile -->
            <div class="card card-body" id="profile">
              <div class="row justify-content-center align-items-center">
                <div class="col-sm-auto col-4">
                  <div class="avatar-xl position-relative">
                    <img
                      src="@/assets/images/img-1.jpg"
                      alt="img"
                      class="w-100 rounded-circle shadow-sm avatar-xl"
                    />
                  </div>
                </div>
                <div class="col-sm-auto col-8 my-auto">
                  <div class="h-100">
                    <h5 class="mb-1 font-weight-bolder">Richard Davis</h5>
                    <p class="mb-0 font-weight-normal text-sm">
                      CEO / Co-Founder
                    </p>
                  </div>
                </div>
                <div class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                  <label class="form-check-label mb-0">
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
                  </div>
                </div>
              </div>
            </div>
            <!-- Card Basic Info -->
            <div class="card mt-4" id="basic-info">
              <div class="card-header">
                <h5>Basic Info</h5>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Alec"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Thompson"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-6">
                    <label class="form-label mt-4 ms-0">I'm</label>
                    <div
                      class="choices"
                      data-type="select-one"
                      tabindex="0"
                      role="combobox"
                      aria-autocomplete="list"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div>
                        <select
                          class="form-control form-select"
                          name="choices-gender"
                        >
                          <option value="Male" selected>Male</option>
                          <option value="Female">Feale</option>
                          <option value="Unspecified">Unspecified</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-5 col-5">
                        <label class="form-label mt-4 ms-0">Birth Date</label>
                        <div>
                          <select class="form-control form-select">
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May" selected>May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-4 col-3">
                        <label class="form-label mt-4 ms-0">&nbsp;</label>

                        <div class="choices__inner">
                          <select class="form-control form-select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-3 col-4">
                        <label class="form-label mt-4">&nbsp;</label>

                        <div class="choices__inner">
                          <select class="form-control form-select">
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017" selected>2017</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@email.com"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>Confirm Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@email.com"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>Your location</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Sydney, A"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="input-group input-group-static">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="+40 735 631 620"
                        onfocus="focused(this)"
                        onfocusout="defocused(this)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 align-self-center">
                    <label class="form-label mt-4 ms-0">Language</label>

                    <div class="choices__inner">
                      <select class="form-control form-select">
                        <option value="English" selected>English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Card Change Password -->
            <div class="card mt-4" id="password">
              <div class="card-header">
                <h5>Change Password</h5>
              </div>
              <div class="card-body pt-0">
                <div class="input-group input-group-outline">
                  <label class="form-label">Current password</label>
                  <input
                    type="password"
                    class="form-control"
                    onfocus="focused(this)"
                    onfocusout="defocused(this)"
                  />
                </div>
                <div class="input-group input-group-outline my-4">
                  <label class="form-label">New password</label>
                  <input
                    type="password"
                    class="form-control"
                    onfocus="focused(this)"
                    onfocusout="defocused(this)"
                  />
                </div>
                <div class="input-group input-group-outline">
                  <label class="form-label">Confirm New password</label>
                  <input
                    type="password"
                    class="form-control"
                    onfocus="focused(this)"
                    onfocusout="defocused(this)"
                  />
                </div>
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
                <button class="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">
                  Update password
                </button>
              </div>
            </div>
            <!-- Card Change Password -->
            <div class="card mt-4" id="2fa">
              <div class="card-header d-flex">
                <h5 class="mb-0">Two-factor authentication</h5>
                <span class="badge badge-success ms-auto mb-auto">Enabled</span>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <p class="my-auto">Security keys</p>
                  <p class="text-secondary text-sm ms-auto my-auto me-3">
                    No Security Keys
                  </p>
                  <button
                    class="btn btn-sm btn-outline-dark mb-0"
                    type="button"
                  >
                    Add
                  </button>
                </div>
                <hr class="horizontal dark" />
                <div class="d-flex">
                  <p class="my-auto">SMS number</p>
                  <p class="text-secondary text-sm ms-auto my-auto me-3">
                    +4012374423
                  </p>
                  <button
                    class="btn btn-sm btn-outline-dark mb-0"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
                <hr class="horizontal dark" />
                <div class="d-flex">
                  <p class="my-auto">Authenticator app</p>
                  <p class="text-secondary text-sm ms-auto my-auto me-3">
                    Not Configured
                  </p>
                  <button
                    class="btn btn-sm btn-outline-dark mb-0"
                    type="button"
                  >
                    Set up
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Delete Account -->
            <div class="card mt-4" id="delete">
              <div class="card-body">
                <div class="d-flex align-items-center mb-sm-0 mb-4">
                  <div class="w-50">
                    <h5>Delete Account</h5>
                    <p class="text-sm mb-0">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                  <div class="w-50 text-end">
                    <button
                      class="btn btn-outline-secondary mb-3 mb-md-0 ms-auto"
                      type="button"
                      name="button"
                    >
                      Deactivate
                    </button>
                    <button
                      class="btn bg-gradient-danger mb-0 ms-2"
                      type="button"
                      name="button"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer py-4">
          <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div
                  class="copyright text-center text-sm text-muted text-lg-start"
                >
                  © 2022, made with
                  <i class="fa fa-heart" aria-hidden="true"></i> by
                  <a
                    href="https://www.creative-tim.com"
                    class="font-weight-bold"
                    target="_blank"
                    >Creative Tim</a
                  >
                  for a better web.
                </div>
              </div>
              <div class="col-lg-6">
                <ul
                  class="nav nav-footer justify-content-center justify-content-lg-end"
                >
                  <li class="nav-item">
                    <a
                      href="https://www.creative-tim.com"
                      class="nav-link text-muted"
                      target="_blank"
                      >Creative Tim</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      class="nav-link text-muted"
                      target="_blank"
                      >About Us</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      href="https://www.creative-tim.com/blog"
                      class="nav-link text-muted"
                      target="_blank"
                      >Blog</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      href="https://www.creative-tim.com/license"
                      class="nav-link pe-0 text-muted"
                      target="_blank"
                      >License</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    }
  },

  mounted() {
    this.loading = false
  },
}
</script>

<style scoped></style>
