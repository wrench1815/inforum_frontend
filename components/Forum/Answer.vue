<template>
  <div>
    <!-- Start:Comment User -->
    <div class="border-top p-3">
      <div class="d-flex justify-content-start gap-3">
        <!-- Start:profile image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img
            class="avatar avatar-md rounded-circle img-fit"
            :src="answerUser.profileImage"
            alt="avatar"
          />
        </span>
        <!-- End:Profile image -->

        <!-- Start:User Info -->
        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- Start:Name -->
          <span class="text-bold text-md text-dark">{{
            answerUser.firstName + ' ' + answerUser.lastName
          }}</span>
          <!-- End:Name -->

          <!-- Start:Date Posted -->
          <span class="text-xs link-dark">{{
            dateFormatted(answer.datePosted)
          }}</span>
          <!-- End:Date Posted -->
        </span>
        <!-- End:User Info -->
      </div>
    </div>
    <!-- End:Comment User -->

    <!-- Start:Comment Data -->
    <div class="p-3 border-top container-fluid">
      <div class="row">
        <div class="col-12">
          <!-- Comment -->
          <p>
            {{ answer }}
          </p>

          <!-- comment meta data -->
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
            <AddSubComment />
          </div>

          <div v-show="isSubCommentsVisible">
            <!-- SubComments -->
            <SubComment v-for="subComment in subComments" :key="subComment" />
          </div>
        </div>
      </div>
    </div>
    <!-- End:Comment Data -->
  </div>
</template>

<script>
import SubComment from '~/components/Forum/SubComment.vue'
import AddSubComment from '~/components/Forum/AddSubComment.vue'

export default {
  name: 'Answer',

  props: {
    answer: {
      type: Object,
      required: true,
    },
  },

  components: {
    SubComment,
    AddSubComment,
  },

  data() {
    return {
      loading: true,
      subComments: [...Array(5).keys()],
      isSubCommentsVisible: false,
      isSubCommentBoxVisible: false,
      answerUser: {},
    }
  },

  methods: {
    toggleSubComments() {
      this.isSubCommentsVisible = !this.isSubCommentsVisible
    },
    toggleSubCommentBox() {
      this.isSubCommentBoxVisible = !this.isSubCommentBoxVisible
    },

    dateFormatted(dat) {
      const myDate = new Date(dat)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    this.$axios
      .$get(`User/single/${this.answer.userId}`)
      .then((res) => {
        this.answerUser = res.user
      })
      .then(() => {
        this.loading = true
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
