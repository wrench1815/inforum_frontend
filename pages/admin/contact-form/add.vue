<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Contact Form</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start:Contact Form Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="addContactForm">
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
                    Add Contact Form
                  </button>
                </div>
                <!-- Start:Submit Button -->
              </form>
            </div>
          </div>
          <!-- End:Contact Form Add Form -->
        </div>
      </div>
    </div>
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

  methods: {
    async addContactForm() {
      const data = {
        fullName: this.contactFormFullName,
        email: this.contactFormEmail,
        message: this.contactFormMessage,
      }

      let res = await this.$axios.$post('/ContactForms', data)

      if (res.status == 201) {
        let timerInterval

        this.$swal({
          title: 'Success!',
          html: 'Contact Form added successfully. <br /> Redirecting in <b></b> Seconds.',
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
