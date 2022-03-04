<template>
  <div>
    <!-- Comment creator -->
    <div class="border-top p-3">
      <NuxtLink class="d-flex justify-content-start gap-3" to="/">
        <!-- profile image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img src="https://i.pravatar.cc/100" alt="avatar" />
        </span>

        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- name -->
          <span class="text-bold text-md text-dark"> John Doe </span>

          <!-- date-uploaded -->
          <span class="text-xs link-dark">01/02/2020</span>
        </span>
      </NuxtLink>
    </div>

    <!-- Comment Data-->
    <div class="p-3 border-top container-fluid">
      <div class="row">
        <span class="col-2"></span>
        <div class="col-10">
          <!-- Comment -->
          <p>
            {{ content }}
          </p>

          <!-- comment meta data -->
          <div class="d-flex justify-content-between align-items-center">
            <!-- duration -->
            <span class="badge bg-gradient-light text-dark text-xs rounded-pill"
              >10m ago</span
            >
            <div class="d-flex align-items-center gap-4">
              <button
                type="button"
                class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                @click="toggleSubComments"
              >
                <i class="fa fa-reply" />
                5 Replies
              </button>
              <button
                type="button"
                class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                @click="toggleSubCommentBox"
              >
                <i class="fa fa-comment" />
                Comment
              </button>
            </div>
          </div>

          <div v-show="isSubCommentBoxVisible">
            <BlueprintsAddSubComment />
          </div>

          <div v-show="isSubCommentsVisible">
            <!-- SubComments -->
            <BlueprintsSubComment
              v-for="subComment in subComments"
              :key="subComment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    content: String,
  },
  data() {
    return {
      subComments: [...Array(5).keys()],
      isSubCommentsVisible: false,
      isSubCommentBoxVisible: false,
    }
  },
  methods: {
    toggleSubComments() {
      this.isSubCommentsVisible = !this.isSubCommentsVisible
    },
    toggleSubCommentBox() {
      this.isSubCommentBoxVisible = !this.isSubCommentBoxVisible
    },
  },
}
</script>

<style scoped></style>
