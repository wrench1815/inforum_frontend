<template>
  <div class="p-2 mt-3 bg-gray-20 rounded-3 shadow border">
    <div v-if="loading">
      <h4>Loading....</h4>
    </div>
    <div v-if="!loading">
      <!-- Start:SubComment -->
      <div>
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
        <div class="p p-2">
          {{ subComment.description }}
        </div>
      </div>
      <!-- End:SubComment -->

      <!-- Start:SubComment Date -->
      <span class="text-sm text-dark">{{
        formattedDate(subComment.datePosted)
      }}</span>
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

  methods: {
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
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
