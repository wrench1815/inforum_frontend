<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <Loading v-if="loading" />
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Edit Sub Answer</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start: Query Add -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="editAnswer">
                <div class="row mb-4">
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary"
                        >Sub Answer <span class="text-danger">*</span></label
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
                    Edit Sub Answer
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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'admin',

  components: {
    Loading,
  },

  data() {
    return {
      answer: '',
      loading: true,
      oldAnswer: {},

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
    async editAnswer() {
      this.validateAnswer()
      const { answer } = this.FormHelpTexts

      if (answer == '') {
        this.editForm()
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
    async editForm() {
      if (this.loggedInUserRole == 'Admin') {
        const data = {
          id: this.oldAnswer.id,
          answer: this.answer,
          datePosted: this.oldAnswer.datePosted,
          queryAnswerId: this.oldAnswer.queryAnswerId,
          userId: this.oldAnswer.userId,
        }

        await this.$axios
          .$put(`/ForumSubAnswers/${this.oldAnswer.id}`, data)
          .then((res) => {
            let timerInterval

            this.$swal({
              title: 'Success!',
              html: 'Sub Answer updated successfully. <br /> Redirecting in <b></b> Seconds.',
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
                `/admin/forum/answers/subanswers/preview/${this.oldAnswer.id}`
              )
            })
          })
          .catch((err) => {
            let msg

            try {
              msg = res.message
            } catch (error) {
              msg = 'Unable to update sub answer.<br/>Please Try Again Later.'
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

  mounted() {
    const answer = this.$axios.$get(`/ForumSubAnswers/${this.$route.params.id}`)
    answer
      .then((res) => {
        this.oldAnswer = res
      })
      .then(() => {
        this.answer = this.oldAnswer.answer
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Cannot fetch data',
          text: 'Unable to fetch query, try refreshing the page',
        })
        this.$router.push(
          `/admin/forum/answers/subanswers/${this.oldAnswer.queryAnswerId}`
        )
      })
  },
}
</script>

<style scoped></style>
