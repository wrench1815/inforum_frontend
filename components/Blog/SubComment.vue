<template>
  <div class="p-2 mt-3 bg-gray-20 rounded-3 shadow border">
    <!-- Start:SubComment -->
    <div class="p">
      <div
        class="text-primary font-weight-bold fs-5 me-2 d-flex gap-2 align-items-end"
      >
        <span class="avatar avatar-sm shadow">
          <img
            src="@/assets/images/img-1.jpg"
            alt="logo"
            class="avatar avatar-sm img-fit"
          />
        </span>

        <!-- Start:Full Name -->
        <span class="text-bold text-lg text-warning"> John Doe </span>
        <!-- End:Full Name -->
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsa non
      praesentium nobis cum? Earum quae eveniet est adipisci aliquam? Velit
    </div>
    <!-- End:SubComment -->

    <!-- Start:SubComment Date -->
    <span class="text-sm text-dark border border-warning px-2 py-1 rounded-pill"
      >01/02/2020</span
    >
    <!-- End:SubComment Date -->
  </div>
</template>

<script>
export default {
  name: 'SubComment',

  data() {
    return {
      isSubCommentBoxVisible: false,
    }
  },

  methods: {
    toggleSubCommentBox() {
      this.isSubCommentBoxVisible = !this.isSubCommentBoxVisible
    },
  },
}
</script>

<style scoped>
.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
