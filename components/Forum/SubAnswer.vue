<template>
  <div class="p-2 mt-3 bg-gray-200 rounded-3 shadow">
    <div v-if="loading">
      <h4>Loading....</h4>
    </div>
    <div v-if="!loading">
      <p>
        <a href="#" class="link-primary font-weight-bold">John Doe: </a> Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Enim ipsa non
        praesentium nobis cum? Earum quae eveniet est adipisci aliquam? Velit
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-sm">4d ago</span>
        <button
          type="button"
          class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
        >
          <i class="fa fa-thumbs-up" />
          5 Replies
        </button>
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

  mounted() {},
}
</script>

<style scoped></style>
