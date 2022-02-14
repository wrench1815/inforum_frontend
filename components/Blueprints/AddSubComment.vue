<template>
  <div class="py-3">
    <form @submit="addComment">
      <!-- comment area -->
      <textarea
        class="form-control border p-2 mb-2"
        rows="4"
        placeholder="Leave your comment here"
        v-model="comment"
      ></textarea>
      <div class="d-flex justify-content-end align-items-center">
        <!-- submit button -->
        <button class="btn btn-primary btn-sm rounded-pill m-0" type="submit">
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddSubComment',
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    addComment(e) {
      e.preventDefault()
      console.log(this.comment)

      // TODO: comment post logic
    },
  },
}
</script>

<style scoped></style>
