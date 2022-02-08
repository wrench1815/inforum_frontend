<template>
  <div>
    <div v-if="loading">
      <h4 class="text-center">Loading...</h4>
    </div>
    <div v-if="!loading">
      <!-- Start:Commenter -->
      <div class="border-top p-3">
        <div class="d-flex justify-content-start gap-3">
          <!-- Start:Profile Image -->
          <span class="avatar avatar-md rounded-circle shadow-card">
            <img
              class="avatar avatar-md rounded-circle"
              :src="user.user.profileImage"
              alt="avatar"
            />
          </span>
          <!-- End:Profile Image -->

          <span class="d-flex flex-column justify-content-center custom-gap">
            <!-- Start:Full Name -->
            <span class="text-bold text-md text-danger">
              {{ user.user.firstName + ' ' + user.user.lastName }}
            </span>
            <!-- End:Full Name -->

            <!-- Start:Date Posted -->
            <span class="text-xs text-dark">{{ comment.datePosted }}</span>
            <!-- End:Date Posted -->
          </span>
        </div>
      </div>
      <!-- End:Commenter -->

      <div class="container">
        <!-- Start:Comment Content -->
        <p>
          {{ comment.description }}
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
                  <!-- Start:Reply Count -->
                  <i class="fa fa-reply" />
                  {{ replies }}
                  <template v-if="replies == 1">Reply</template>
                  <template v-else>Replies</template>
                  <!-- End:Reply Count -->
                </button>
              </div>
            </div>
            <!-- End:SubComment Visibility Toggle -->

            <!-- Start:SubComments List -->
            <div v-show="isSubCommentsVisible">
              <SubComment
                v-for="subComment in subComments.subComments"
                :key="subComment.id"
                :subComment="subComment"
              />

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
                <AddSubComment
                  :commentId="comment.id"
                  v-on:sub-comment-added="refreshSubComments()"
                />
              </div>
              <!-- End:Add SubComment -->
            </div>
            <!-- End:SubComments List -->
          </div>
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
    comment: Object,
  },

  components: {
    SubComment,
    AddSubComment,
  },

  data() {
    return {
      subComments: {},
      isSubCommentsVisible: false,
      isSubCommentBoxVisible: false,
      replies: 0,
      // user info
      user: {},
      // SubComments
      subComments: {},
      // Loading handler
      loading: true,
    }
  },

  methods: {
    toggleSubComments() {
      this.isSubCommentsVisible = !this.isSubCommentsVisible
    },

    toggleSubCommentBox() {
      this.isSubCommentBoxVisible = !this.isSubCommentBoxVisible
    },

    refreshSubComments() {
      if (!this.loading) {
        this.loading = true
      }

      this.$axios
        .$get(`/SubComments?commentId=${this.comment.id}`)
        .then((subcmt) => {
          this.subComments = subcmt
        })
        .then(() => {
          this.loading = false
        })
    },
  },

  mounted() {
    this.$axios
      .$get(`/User/single/${this.comment.userId}`)
      .then((res) => {
        this.user = res
      })
      .then(() => {
        this.$axios
          .$get(`/SubComments?commentId=${this.comment.id}`)
          .then((subcmt) => {
            this.subComments = subcmt
          })
          .then(() => {
            this.replies = this.subComments.subComments.length
            this.loading = false
            if (this.subComments.subComments.length == 0) {
              this.isSubCommentBoxVisible = true
            }
          })
      })
  },
}
</script>

<style scoped></style>
