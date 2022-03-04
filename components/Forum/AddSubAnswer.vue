<template>
  <div class="py-3">
    <form v-on:submit.prevent="addSubAnswer">
      <!-- Start:Sub Answer Area -->
      <div class="input-group input-group-outline">
        <textarea
          class="form-control border p-2 mb-2 textarea-focus"
          rows="4"
          placeholder="Leave your Reply here"
          v-model="subAnswer"
        ></textarea>
      </div>
      <!-- End:Sub Answer Area -->

      <div class="d-flex justify-content-end align-items-center">
        <!-- Start:Submit Button -->
        <button class="btn btn-primary btn-sm rounded-pill m-0" type="submit">
          Send
        </button>
        <!-- End:Submit Button -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddSubAnswer',

  props: {
    answerId: Number,
  },

  data() {
    return {
      subAnswer: '',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    addSubAnswer() {
      let subAnswerLength = this.subAnswer.length

      if (this.isAuthenticated) {
        if (subAnswerLength >= 10) {
          const subAnswerData = {
            answer: this.subAnswer,
            userId: this.loggedInUser.id,
            queryAnswerId: this.answerId,
          }

          this.$axios
            .$post(`/ForumSubAnswers`, subAnswerData)
            .then((res) => {
              if (res.status == 201) {
                this.$emit('sub-answer-added')

                let timerInterval

                this.$swal({
                  title: 'Success!',
                  html: 'Thank you for leaving a Reply.',
                  type: 'success',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  didOpen: () => {
                    this.$swal.showLoading()
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  },
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  html: 'Something went wrong!<br>Please try again.',
                  type: 'error',
                  icon: 'error',
                  showConfirmButton: true,
                })
              }
            })
            .catch((err) => {
              this.$swal({
                title: 'Error!',
                html: 'Something went wrong!<br>Please try again.',
                type: 'error',
                icon: 'error',
                showConfirmButton: true,
              })
            })
        } else {
          this.$swal({
            title: 'Too Short!',
            html: 'Reply must be at least 10 characters long!',
            type: 'info',
            icon: 'info',
            showConfirmButton: true,
          })
        }
      } else {
        this.$swal({
          title: 'You need to be logged in to Reply',
          text: 'Please login or Signup to Reply',
          type: 'warning',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login',
          cancelButtonText: 'Signup',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/login')
          } else if (result.isDismissed && result.dismiss === 'cancel') {
            this.$router.push('/signup')
          }
        })
      }
    },
  },
}
</script>

<style scoped>
.textarea-focus {
  border-width: 2px !important;
}

.textarea-focus:focus {
  border: 2px solid #e91e63 !important;
}
</style>
