<template>
  <div>
    <!-- Start:Commenter -->
    <div class="border-top p-3">
      <div class="d-flex justify-content-start gap-3">
        <!-- Start:Profile Image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img src="https://i.pravatar.cc/100" alt="avatar" />
        </span>
        <!-- End:Profile Image -->

        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- Start:Full Name -->
          <span class="text-bold text-md text-danger"> John Doe </span>
          <!-- End:Full Name -->

          <!-- Start:Date Posted -->
          <span class="text-xs text-dark">01/02/2020</span>
          <!-- End:Date Posted -->
        </span>
      </div>
    </div>
    <!-- End:Commenter -->

    <div class="container">
      <!-- Start:Comment Content -->
      <p>
        {{ content }}
      </p>
      <!-- End:Comment Content -->
    </div>

    <div class="p-3 border-top container-fluid">
      <div class="row">
        <span class="col-2"></span>
        <div class="col-10">
          <!-- Start:SubComment Visibility Toggle -->
          <div class="d-flex justify-content-end align-items-center">
            <div class="d-flex align-items-center gap-4">
              <button
                type="button"
                class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                @click="toggleSubComments"
              >
                <i class="fa fa-reply" />
                5 Replies
              </button>
            </div>
          </div>
          <!-- End:SubComment Visibility Toggle -->

          <!-- Start:SubComments List -->
          <div v-show="isSubCommentsVisible">
            <SubComment v-for="subComment in subComments" :key="subComment" />

            <!-- Start:Add SubComment -->
            <div class="d-flex justify-content-end mt-3">
              <button
                type="button"
                class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                @click="toggleSubCommentBox"
              >
                <i class="fa fa-comment" />
                Comment
              </button>
            </div>
            <!-- End:Add SubComment -->

            <!-- Start:Add SubComment -->
            <div v-show="isSubCommentBoxVisible">
              <AddSubComment />
            </div>
            <!-- End:Add SubComment -->
          </div>
          <!-- End:SubComments List -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubComment from '~/components/Blog/SubComment.vue'
import AddSubComment from '~/components/Blog/AddSubComment.vue'

export default {
  name: 'Comment',
  props: {
    content: String,
  },
  components: {
    SubComment,
    AddSubComment,
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
