<template>
  <div class="p-2 mt-3 bg-gray-20 rounded-3 shadow border">
    <div v-if="loading">
      <h3 class="text-center">Loading....</h3>
    </div>
    <div v-if="!loading">
      <!-- Start:SubComment -->
      <div class="p">
        <div
          class="text-primary font-weight-bold fs-5 me-2 d-flex gap-2 align-items-end"
        >
          <span class="avatar avatar-sm shadow">
            <img
              :src="user.user.profileImage"
              alt="logo"
              class="avatar avatar-sm img-fit"
            />
          </span>

          <!-- Start:Full Name -->
          <span class="text-bold text-lg text-warning">{{
            user.user.firstName + ' ' + user.user.lastName
          }}</span>
          <!-- End:Full Name -->
        </div>
        {{ subComment.description }}
      </div>
      <!-- End:SubComment -->

      <!-- Start:SubComment Date -->
      <span
        class="text-sm text-dark border border-warning px-2 py-1 rounded-pill"
        >{{ subComment.datePosted }}</span
      >
      <!-- End:SubComment Date -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubComment',

  props: {
    subComment: Object,
  },

  data() {
    return {
      user: Object,
      // loading handler
      loading: true,
    }
  },

  mounted() {
    this.$axios
      .$get(`/User/single/${this.subComment.userId}`)
      .then((res) => {
        this.user = res
      })
      .then(() => {
        this.loading = false
      })
  },
}
</script>

<style scoped>
.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
