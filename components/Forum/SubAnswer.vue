<template>
  <div class="p-2 mt-3 bg-gray-200 rounded-3 shadow">
    <div v-if="loading">
      <h4>Loading....</h4>
    </div>
    <div v-if="!loading">
      <!-- Start:Sub Answer -->
      <div>
        <div
          class="text-primary font-weight-bold fs-5 me-2 d-flex gap-2 align-items-end"
        >
          <span class="avatar avatar-sm shadow">
            <img
              :src="user.user.profileImage"
              alt="logo"
              class="avatar avatar-sm img-fit-cover"
            />
          </span>

          <!-- Start:Full Name -->
          <span class="text-bold text-lg text-warning">{{
            user.user.firstName + ' ' + user.user.lastName
          }}</span>
          <!-- End:Full Name -->
        </div>
        <div class="p p-2">
          {{ subAnswer.answer }}
        </div>
      </div>
      <!-- Start:Sub Answer -->

      <div class="d-flex justify-content-start">
        <div class="text-sm text-dark">
          {{ formattedDate(subAnswer.datePosted) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubAnswer',

  props: {
    subAnswer: Object,
  },

  data() {
    return {
      user: Object,
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
      .$get(`/User/single/${this.subAnswer.userId}`)
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
.img-fit-cover {
  object-fit: cover;
  object-position: center;
}
</style>
