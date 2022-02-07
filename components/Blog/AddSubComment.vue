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

      const subCommentData = {
        description: this.subCommentInput,
        commentId: this.commentId,
        userId: this.loggedInUser.id,
      }
      console.log(subCommentData)

      this.$axios.$post(`/SubComments`, subCommentData).then((res) => {
        console.log(res)
        this.$emit('sub-comment-added')
      })
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
