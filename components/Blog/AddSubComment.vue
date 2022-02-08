<template>
  <div class="py-3">
    <form v-on:submit.prevent="addSubComment">
      <!-- Start:SubComment Input -->
      <div class="input-group input-group-outline">
        <textarea
          class="form-control border p-2 mb-2 textarea-focus"
          rows="4"
          placeholder="Leave your comment here"
          v-model="subCommentInput"
        ></textarea>
      </div>
      <!-- End:SubComment Input -->

      <div class="d-flex justify-content-end align-items-center">
        <!-- Start:Submit Button -->
        <button class="btn btn-primary btn-sm rounded-pill m-0" type="submit">
          Leave a Comment
        </button>
        <!-- End:Submit Button -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddSubComment',

  props: {
    commentId: Number,
  },

  data() {
    return {
      subCommentInput: '',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    addSubComment() {
      console.log(this.subCommentInput)

      let subCommentLength = this.subCommentInput.length

      if (subCommentLength >= 3) {
        const subCommentData = {
          description: this.subCommentInput,
          commentId: this.commentId,
          userId: this.loggedInUser.id,
        }
        console.log(subCommentData)

        this.$axios
          .$post(`/SubComments`, subCommentData)
          .then((res) => {
            console.log(res)
            if (res.status == 201) {
              // wmit event to parent component on success
              this.$emit('sub-comment-added')

              let timerInterval

              this.$swal({
                title: 'Success!',
                html: 'Thank you for leaving a comment!',
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
            console.log(err)
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
          html: 'Comment must be at least 3 characters long!',
          type: 'info',
          icon: 'info',
          showConfirmButton: true,
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
