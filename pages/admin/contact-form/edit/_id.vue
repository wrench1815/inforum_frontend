<template>
  <div>
    <AdminNavBar />

    <!-- Start:content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Update Contact Form</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start:Contact Form Update Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updateContactForm">
                <!-- Start:Full Name -->
                <div class="row mb-4">
                  <div class="col-lg-3">
                    <label class="col-form-label"
                      >Full Name<span class="text-danger ms-1">*</span></label
                    >
                  </div>

                  <div class="col-lg-9">
                    <div class="input-group input-group-static">
                      <input
                        class="form-control"
                        type="text"
                        v-model="contactFormFullName"
                      />
                    </div>
                  </div>
                </div>
                <!-- End:Full Name -->

                <!-- Start:Email -->
                <div class="row mb-4">
                  <div class="col-lg-3">
                    <label class="col-form-label"
                      >Email<span class="text-danger ms-1">*</span></label
                    >
                  </div>

                  <div class="col-lg-9">
                    <div class="input-group input-group-static">
                      <input
                        class="form-control"
                        type="text"
                        v-model="contactFormEmail"
                      />
                    </div>
                  </div>
                </div>
                <!-- End:Email -->

                <!-- Start:Message -->
                <div class="row mb-4">
                  <div class="col-lg-3">
                    <label class="col-form-label"
                      >Message<span class="text-danger ms-1">*</span></label
                    >
                  </div>

                  <div class="col-lg-9">
                    <div class="input-group input-group-static">
                      <textarea
                        name="contactFormMessage"
                        class="form-control"
                        rows="4"
                        v-model="contactFormMessage"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <!-- End:Message -->

                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Update Contact Form
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </form>
            </div>
          </div>
          <!-- End:Contact Form Update Form -->
        </div>
      </div>
    </div>
    <!-- End:content -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      contactFormFullName: '',
      contactFormEmail: '',
      contactFormMessage: '',
      contactFormCreatedOn: '',

      // for error handling
      FormHelpTexts: {
        fullNameText: '',
        emailText: '',
        messageText: '',
      },
    }
  },

  created() {
    const contactForm = this.$axios.$get(
      `/ContactForms/${this.$route.params.id}`
    )
    contactForm.then((res) => {
      this.contactFormFullName = res.fullName
      this.contactFormEmail = res.email
      this.contactFormMessage = res.message
      this.contactFormCreatedOn = res.createdOn
    })
  },

  methods: {
    // for email validation
    validateEmail() {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(this.contactFormEmail)) {
        this.FormHelpTexts.emailText =
          '<strong>Email</strong> must be a valid Email Address.<br/>'
      } else {
        this.FormHelpTexts.emailText = ''
      }
    },

    // for Full Name validation
    validateFullName() {
      if (this.contactFormFullName.length < 3) {
        this.FormHelpTexts.fullNameText =
          '<strong>Full Name</strong> must be atleast 3 Characters long.<br/>'
      } else {
        this.FormHelpTexts.fullNameText = ''
      }
    },

    // for Message validation
    validateMessage() {
      if (this.contactFormMessage.length < 20) {
        this.FormHelpTexts.messageText =
          '<strong>Message</strong> must be atleast 20 Characters long'
      } else {
        this.FormHelpTexts.messageText = ''
      }
    },

    // Validate data
    async updateContactForm() {
      this.validateFullName()
      this.validateEmail()
      this.validateMessage()

      if (
        this.FormHelpTexts.fullNameText == '' &&
        this.FormHelpTexts.emailText == '' &&
        this.FormHelpTexts.messageText == ''
      ) {
        this.updateForm()
      } else {
        this.$swal({
          title: 'Validation Errors!',
          icon: 'error',
          type: 'error',
          html: `${this.FormHelpTexts.fullNameText}${this.FormHelpTexts.emailText}${this.FormHelpTexts.messageText}`,
          confirmButtonText: 'Fix',
        })
      }
    },

    async updateForm() {
      const formData = {
        id: this.$route.params.id,
        fullName: this.contactFormFullName,
        email: this.contactFormEmail,
        message: this.contactFormMessage,
        createdOn: this.contactFormCreatedOn,
      }

      await this.$axios
        .$put(`/ContactForms/${formData.id}`, formData)
        .then((res) => {
          if (res.status == 200) {
            let timerInterval

            this.$swal({
              title: 'Success!',
              html: 'Contact Form updated Successfully. <br /> Redirecting in <b></b> Seconds.',
              type: 'success',
              icon: 'success',
              timer: 5000,
              showConfirmButton: false,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.showLoading()
                const b = this.$swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Math.ceil(this.$swal.getTimerLeft() / 1000)
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              },
            }).then(() => {
              this.$router.push(`/admin/contact-form`)
            })
          }
        })
        .catch((err) => {
          let msg

          try {
            msg = res.message
          } catch (error) {
            msg = 'Unable to Update Contact Form.<br/>Please Try Again Later.'
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
