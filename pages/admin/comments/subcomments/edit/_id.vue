<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Edit Sub Comment</h2>
            <div class="border-bottom"></div>
          </div>

          <!-- Start:Contact Form Add Form -->
          <div class="col-12">
            <div class="card-body position-relative">
              <form v-on:submit.prevent="updateSubComment">
                <!-- Start:Full Name -->
                <div class="row mb-4">
                  <div class="col-12">
                    <div class="input-group input-group-static mt-4">
                      <label class="text-primary">Sub Comment</label>
                      <textarea
                        name="exerpt"
                        class="form-control"
                        rows="4"
                        v-model="subComment"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <!-- End:Full Name -->

                <!-- Start:Submit Button -->
                <div class="text-end mt-4">
                  <button type="submit" class="btn bg-gradient-primary mb-0">
                    Update Sub Comment
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
      subComment: '',
      oldSubComment: {},

      // for error handling
      FormHelpTexts: {
        subCommentHelpText: '',
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'loggedInUserRole']),
  },
  created() {
    const subComment = this.$axios.$get(`/SubComments/${this.$route.params.id}`)
    subComment
      .then((res) => {
        this.oldSubComment = res
        this.subComment = res.description
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch data',
        })
      })
  },
  methods: {
    validateSubComment() {
      if (this.subComment.length < 10) {
        this.FormHelpTexts.subCommentHelpText =
          '<strong>Sub Comment</strong> must be at least 10 Characters long.<br/>'
      } else {
        this.FormHelpTexts.subCommentHelpText = ''
      }
    },

    async updateSubComment() {
      this.validateSubComment()

      if (this.FormHelpTexts.subCommentHelpText == '') {
        this.addForm()
      } else {
        this.$swal({
          title: 'Validation Errors!',
          icon: 'error',
          type: 'error',
          html: `${this.FormHelpTexts.subCommentHelpText}`,
          confirmButtonText: 'Fix',
        })
      }
    },

    // Send data to Backend
    async addForm() {
      if (this.loggedInUserRole == 'Admin') {
        const data = {
          id: this.oldSubComment.id,
          description: this.subComment,
          userId: this.oldSubComment.userId,
          datePosted: this.oldSubComment.datePosted,
          commentId: this.oldSubComment.commentId,
        }

        await this.$axios
          .$put(`/SubComments/${this.$route.params.id}`, data)
          .then((res) => {
            if (res.status == 200) {
              let timerInterval

              this.$swal({
                title: 'Success!',
                html: 'Sub Comment updated successfully. <br /> Redirecting in <b></b> Seconds.',
                type: 'success',
                icon: 'success',
                timer: 1000,
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
                  `/admin/comments/subcomments/preview/${this.$route.params.id}`
                )
              })
            }
          })
          .catch((err) => {
            let msg

            try {
              msg = res.message
            } catch (error) {
              msg = 'Unable to update comment.<br/>Please Try Again Later.'
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
