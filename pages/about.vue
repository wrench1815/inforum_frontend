<template>
  <div class="container mt-7">
    <h1>This is About Page</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
    }),
  },
}
</script>

<style></style>
