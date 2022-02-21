<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Add Answer</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start: Query Add -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="addAnswer">
                <div class="row mb-4">
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Answer <span class="text-danger">*</span></label
                      >
                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="answer"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Add Answer
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
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',

  data() {
    return {
      answer: '',

      // for error handling
      FormHelpTexts: {
        answer: '',
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    validateAnswer() {
      if (this.answer.length < 10) {
        this.FormHelpTexts.answer =
          '<strong>Answer</strong> must be at least 10 Characters long.<br/>'
      } else {
        this.FormHelpTexts.answer = ''
      }
    },
    async addAnswer() {
      this.validateAnswer()
      const { answer } = this.FormHelpTexts

      if (answer == '') {
        this.addForm()
      } else {
        let errors = [answer]

        errors = errors.filter((item) => item != '')

        const errorsList = errors.map((item) => `<li>${item}</li>`)

        this.$swal({
          title: 'Validation Errors!',
          icon: 'error',
          type: 'error',
          html: `<ul>${errorsList.join(' ')}</ul>`,
          confirmButtonText: 'Fix Now',
        })
      }
    },

    // Send data to Backend
    async addForm() {
      if (this.loggedInUserRole == 'Admin') {
        const data = {
          answer: this.answer,
          queryId: this.$route.params.id,
          userId: this.loggedInUser.id,
        }

        await this.$axios
          .$post('/ForumAnswer', data)
          .then((res) => {
            if (res.status == 201) {
              let timerInterval

              this.$swal({
                title: 'Success!',
                html: 'Answer added successfully. <br /> Redirecting in <b></b> Seconds.',
                type: 'success',
                icon: 'success',
                timer: 2000,
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
                this.$router.push(
                  `/admin/forum/answers/${this.$route.params.id}`
                )
              })
            }
          })
          .catch((err) => {
            let msg

            try {
              msg = res.message
            } catch (error) {
              msg = 'Unable to create answer.<br/>Please Try Again Later.'
            }

            this.$swal({
              title: 'Error!',
              html: `${msg}`,
              type: 'error',
              icon: 'error',
              showConfirmButton: true,
            })
          })
      }
    },
  },
}
</script>

<style scoped></style>
