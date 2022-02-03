<template>
  <section class="py-7 position-relative">
    <div class="container">
      <div class="row mt-6">
        <div class="col-lg-12 mx-auto">
          <div class="card">
            <div class="row">
              <div class="col-lg-4 d-flex">
                <div
                  class="bg-gradient-secondary mt-n5 mb-3 ms-lg-3 border-radius-md"
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
                        class="btn btn-icon-only btn-link text-white btn-lg mb-0"
                      >
                        <i class="fab fa-facebook"></i>
                      </a>
                      <a
                        class="btn btn-icon-only btn-link text-white btn-lg mb-0"
                      >
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a
                        class="btn btn-icon-only btn-link text-white btn-lg mb-0"
                      >
                        <i class="fab fa-dribbble"></i>
                      </a>
                      <a
                        class="btn btn-icon-only btn-link text-white btn-lg mb-0"
                      >
                        <i class="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <form
                  id="contact-form"
                  autocomplete="off"
                  v-on:submit.prevent="addContactForm"
                >
                  <div class="card-body position-relative">
                    <div class="row mt-4">
                      <div class="col-md-6">
                        <div class="input-group input-group-static my-4">
                          <label class="text-primary">Full Name</label>
                          <input
                            class="form-control"
                            aria-label="Full Name..."
                            type="text"
                            placeholder="John Doe"
                            v-model="fullName"
                          />
                        </div>
                      </div>
                      <div class="col-md-6 ps-2">
                        <div class="input-group input-group-static my-4">
                          <label class="text-primary">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            aria-label="Email..."
                            placeholder="johndoe@mail.com"
                            v-model="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Your message</label>
                      <textarea
                        name="message"
                        class="form-control"
                        id="message"
                        rows="6"
                        placeholder="I am interested in..."
                        v-model="message"
                      ></textarea>
                    </div>
                    <div class="text-end mt-4">
                      <button
                        type="submit"
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
export default {
  data() {
    return {
      fullName: '',
      email: '',
      message: '',

      // for errot handling
      FormHelpTexts: {
        fullName: '',
        email: '',
        message: '',
      },
    }
  },

  methods: {
    // for email validation
    validateEmail() {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(this.email)) {
        this.FormHelpTexts.email =
          '<strong>Email</strong> must be a valid Email Address.<br/>'
      } else {
        this.FormHelpTexts.email = ''
      }
    },

    // for Full Name validation
    validateFullName() {
      if (this.fullName.length < 3) {
        this.FormHelpTexts.fullName =
          '<strong>Full Name</strong> must be atleast 3 Characters long.<br/>'
      } else {
        this.FormHelpTexts.fullName = ''
      }
    },

    // for Message validation
    validateMessage() {
      if (this.message.length < 20) {
        this.FormHelpTexts.message =
          '<strong>Message</strong> must be atleast 20 Characters long'
      } else {
        this.FormHelpTexts.message = ''
      }
    },

    // Validate data
    async addContactForm() {
      this.validateFullName()
      this.validateEmail()
      this.validateMessage()

      if (
        this.FormHelpTexts.fullName == '' &&
        this.FormHelpTexts.email == '' &&
        this.FormHelpTexts.message == ''
      ) {
        this.addForm()
      } else {
        this.$swal({
          title: 'Validation Errors!',
          icon: 'error',
          type: 'error',
          html: `${this.FormHelpTexts.fullName}${this.FormHelpTexts.email}${this.FormHelpTexts.message}`,
          confirmButtonText: 'Fix',
        })
      }
    },

    // Send data to Backend
    async addForm() {
      const data = {
        fullName: this.fullName,
        email: this.email,
        message: this.message,
      }

      await this.$axios
        .$post('/ContactForms', data)
        .then((res) => {
          if (res.status == 201) {
            this.$swal({
              title: 'Success!',
              icon: 'success',
              type: 'success',
              html: `Message sent Successfully!<br/>We'll get back to you soon.`,
              confirmButtonText: 'OK',
            })
            this.fullName = ''
            this.email = ''
            this.message = ''
          }
        })
        .catch((err) => {
          let msg

          try {
            msg = res.message
          } catch (error) {
            msg = 'Unable to Send Message.<br/>Please Try Again Later.'
          }

          this.$swal({
            title: 'Error!',
            html: `${msg}`,
            type: 'error',
            icon: 'error',
            showConfirmButton: true,
          })
        })
    },
  },
}
</script>

<style scoped></style>
