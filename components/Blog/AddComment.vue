<template>
  <div class="p-3">
    <form v-on:submit.prevent="addComment">
      <!-- Start:Comment Input -->
      <div class="input-group input-group-outline">
        <textarea
          class="form-control p-2 mb-2 textarea-focus"
          rows="4"
          placeholder="Leave your comment here"
          v-model="commentInput"
        ></textarea>
      </div>
      <!-- End:Comment Area -->
      <div class="d-flex justify-content-end align-items-center">
        <!-- Start:Submit -->
        <button class="btn btn-primary btn-sm rounded-pill m-0" type="submit">
          Leave a Comment
        </button>
        <!-- End:Submit -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddComment',

  props: {
    postId: Number,
  },

  data() {
    return {
      commentInput: '',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    addComment() {
      console.log(this.commentInput)

      const commentData = {
        description: this.commentInput,
        postId: this.postId,
        userId: this.loggedInUser.id,
      }
      console.log(commentData)

      this.$axios.$post(`/Comments`, commentData).then((res) => {
        console.log(res)
        this.$emit('comment-added')
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
