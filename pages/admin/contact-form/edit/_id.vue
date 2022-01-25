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
                    <label class="col-form-label">Full Name</label>
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
                    <label class="col-form-label">Email</label>
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
                    <label class="col-form-label">Message</label>
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
    })
  },

  methods: {
    async updateContactForm() {
      const formData = {
        id: this.$route.params.id,
        fullName: this.contactFormFullName,
        email: this.contactFormEmail,
        message: this.contactFormMessage,
      }

      let res = await this.$axios.$put(`/ContactForms/${formData.id}`, formData)

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
      } else {
        this.$swal({
          title: 'Error!',
          text: res.message,
          type: 'error',
          icon: 'error',
          showConfirmButton: true,
        })
      }
    },
  },
}
</script>

<style scoped></style>
