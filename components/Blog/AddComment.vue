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
export default {
  name: 'AddComment',

  data() {
    return {
      commentInput: '',
    }
  },
  methods: {
    addComment() {
      console.log(this.comment)

      // TODO: comment post logic
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
