<template>
  <div class="py-3">
    <form v-on:submit.prevent="addSubAnswer">
      <!-- Start:Sub Answer Area -->
      <div class="input-group input-group-outline">
        <textarea
          class="form-control border p-2 mb-2 textarea-focus"
          rows="4"
          placeholder="Leave your Answer here"
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
      console.log(this.subAnswer)

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
