<template>
  <div class="py-3">
    <form v-on:submit.prevent="addComment">
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
export default {
  name: 'AddSubComment',

  data() {
    return {
      subCommentInput: '',
    }
  },
  methods: {
    addComment() {
      console.log(this.subCommentInput)

      // TODO: SubComment Logic
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
