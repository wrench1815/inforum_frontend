<template>
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div v-if="!loading">
      <!-- Start:Commenter -->
      <div class="border-top p-3">
        <div class="d-flex justify-content-start align-items-center gap-3">
          <!-- Start:Profile Image -->
          <span class="avatar avatar-md shadow-card">
            <img
              class="avatar avatar-md img-fit-cover"
              :src="user.user.profileImage"
              alt="avatar"
              v-lazy-load
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
            <span class="text-xs text-dark">{{
              formattedDate(comment.datePosted)
            }}</span>
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
              <div class="text-center" v-if="subComments.pagination.hasNext">
                <span
                  class="link-primary cursor-pointer d-inline"
                  @click="loadMoreSubComments()"
                >
                  Load more....
                </span>
              </div>

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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  name: 'Comment',

  props: {
    comment: Object,
  },

  components: {
    SubComment,
    AddSubComment,
    Loading,
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
      pageNumber: 1,
    }
  },

  methods: {
    toggleSubComments() {
      this.isSubCommentsVisible = !this.isSubCommentsVisible
    },

    toggleSubCommentBox() {
      this.isSubCommentBoxVisible = !this.isSubCommentBoxVisible
    },

    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    loadMoreSubComments() {
      this.pageNumber = this.pageNumber + 1
      this.$axios
        .$get(
          `SubComments?commentId=${this.comment.id}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          this.subComments.subComments = this.subComments.subComments.concat(
            res.subComments
          )
          this.subComments.pagination = res.pagination
        })
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
            this.replies = this.subComments.pagination.totalCount
            this.loading = false
            if (this.subComments.subComments.length == 0) {
              this.isSubCommentBoxVisible = true
            }
          })
      })
  },
}
</script>

<style scoped>
.img-fit-cover {
  object-fit: cover !important;
  object-position: center !important;
}
</style>
