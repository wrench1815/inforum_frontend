<template>
  <div class="p-2 mt-3 bg-gray-200 rounded-3 shadow">
    <!-- Start:SubComment -->
    <p>
      <div href="#" class="link-primary font-weight-bold me-2">John Doe:</div> Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Enim ipsa non
      praesentium nobis cum? Earum quae eveniet est adipisci aliquam? Velit
    </p>
    <!-- End:SubComment -->

    <!-- Start:SubComment Date -->
    <div class="d-flex justify-content-between align-items-center">
      <span class="text-sm">4d ago</span>
    </div>
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

<style scoped></style>
