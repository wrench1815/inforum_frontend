<template>
  <section class="py-7 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div class="row mt-6">
        <div class="col-lg-12 mx-auto">
          <div class="card">
            <div class="row">
              <div class="col-lg-4 d-flex">
                <div
                  class="
                    bg-gradient-secondary
                    mt-n5
                    mb-3
                    ms-lg-3
                    border-radius-md
                  "
                >
                  <div class="card-body p-5 position-relative">
                    <h2 class="text-white">Contact Information</h2>
                    <p class="text-white opacity-8 mb-4">
                      Fill up the form and our Team will get back to you within
                      24 hours.
                    </p>
                    <div class="d-flex p-2 text-white">
                      <i class="fas fa-phone-alt text-sm"></i>
                      <span class="text-sm opacity-8 ps-3">+91 1234567890</span>
                    </div>
                    <div class="d-flex p-2 text-white">
                      <i class="fas fa-envelope text-sm"></i>
                      <span class="text-sm opacity-8 ps-3"
                        >contact@inforum.com</span
                      >
                    </div>
                    <div class="d-flex p-2 text-white">
                      <i class="fas fa-map-marker-alt text-sm"></i>
                      <span class="text-sm opacity-8 ps-3"
                        >123 Void City <br />
                        Void, Blackhole</span
                      >
                    </div>
                    <div class="mt-4">
                      <a
                        class="
                          btn btn-icon-only btn-link
                          text-white
                          btn-lg
                          mb-0
                        "
                      >
                        <i class="fab fa-facebook"></i>
                      </a>
                      <a
                        class="
                          btn btn-icon-only btn-link
                          text-white
                          btn-lg
                          mb-0
                        "
                      >
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a
                        class="
                          btn btn-icon-only btn-link
                          text-white
                          btn-lg
                          mb-0
                        "
                      >
                        <i class="fab fa-dribbble"></i>
                      </a>
                      <a
                        class="
                          btn btn-icon-only btn-link
                          text-white
                          btn-lg
                          mb-0
                        "
                      >
                        <i class="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <form id="contact-form" method="post" autocomplete="off">
                  <div class="card-body position-relative">
                    <div class="row mt-4">
                      <div class="col-md-6">
                        <div class="input-group input-group-static my-4">
                          <label>Full Name</label>
                          <input
                            class="form-control"
                            aria-label="Full Name..."
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="col-md-6 ps-2">
                        <div class="input-group input-group-static my-4">
                          <label>Email</label>
                          <input
                            type="email"
                            class="form-control"
                            aria-label="Email..."
                          />
                        </div>
                      </div>
                    </div>

                    <div class="input-group input-group-static mt-4">
                      <label>Your message</label>
                      <textarea
                        name="message"
                        class="form-control"
                        id="message"
                        rows="6"
                      ></textarea>
                    </div>
                    <div class="text-end mt-4">
                      <button
                        type="button"
                        class="btn bg-gradient-secondary mb-0"
                      >
                        Send message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.blur-bg {
  backdrop-filter: blur(8px);
}
</style>
