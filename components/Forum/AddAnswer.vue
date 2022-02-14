<template>
  <div class="p-3 border-top">
    <form v-on:submit.prevent="addAnswer">
      <!--Start:Answer Area -->
      <div class="input-group input-group-outline">
        <textarea
          class="form-control p-2 mb-2 textarea-focus"
          rows="5"
          placeholder="Leave your Answer here"
          v-model="answer"
        ></textarea>
      </div>
      <!--End:Answer Area -->

      <div class="d-flex justify-content-end align-items-center">
        <!-- Start:Submit -->
        <button class="btn btn-primary btn-sm rounded-pill m-0" type="submit">
          Send
        </button>
        <!-- End:Submit -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddAnswer',

  props: {
    queryId: Number,
  },

  data() {
    return {
      answer: '',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    addAnswer() {
      let answerLength = this.answer.length

      if (this.isAuthenticated) {
        if (answerLength >= 10) {
          const answerData = {
            answer: this.answer,
            userId: this.loggedInUser.id,
            queryId: this.queryId,
          }

          this.$axios
            .$post(`/ForumAnswer`, answerData)
            .then((res) => {
              if (res.status == 201) {
                // emit event to parent component on success
                this.$emit('answer-added')

                let timerInterval

                this.$swal({
                  title: 'Success!',
                  html: 'Thank you for leaving an Answer.',
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
            html: 'Answer must be at least 10 characters long!',
            type: 'info',
            icon: 'info',
            showConfirmButton: true,
          })
        }
      } else {
        this.$swal({
          title: 'You need to be logged in to answer',
          text: 'Please login or Signup to answer',
          type: 'warning',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login',
          cancelButtonText: 'Signup',
        }).then((result) => {
          console.log(result)
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
