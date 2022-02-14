<template>
  <div>
    <div v-if="loading">
      <h4>Loading....</h4>
    </div>
    <div v-if="!loading">
      <!-- Start:Answer User -->
      <div class="border-top p-3">
        <div class="d-flex justify-content-start gap-3">
          <!-- Start:Profile Image -->
          <span class="avatar avatar-md rounded-circle shadow-card">
            <img
              class="avatar avatar-md rounded-circle img-fit"
              :src="answerUser.profileImage"
              alt="avatar"
            />
          </span>
          <!-- End:Profile Image -->

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
      <!-- End:Answer User -->

      <!-- Start:Answer Data -->
      <div class="p-3 border-top container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- Start:Answer Content -->
            <p>
              {{ answer.answer }}
            </p>
            <!-- End:Answer Content -->

            <div class="p-3 border-top container-fluid">
              <div class="row">
                <span class="col-2"></span>
                <div class="col-10">
                  <!-- Start:Answer Meta -->
                  <div class="d-flex justify-content-end align-items-center">
                    <!-- Start:Answer List Toggle -->
                    <div class="d-flex align-items-center gap-4">
                      <button
                        type="button"
                        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                        @click="toggleSubAnswers"
                      >
                        <i class="fa fa-reply" />
                        5 Replies
                      </button>
                    </div>
                    <!-- Start:Answer List Toggle -->
                  </div>
                  <!-- End:Answer Meta -->

                  <div v-show="isSubAnswersVisible">
                    <!-- SubComments -->
                    <ForumSubAnswer
                      v-for="subAnswer in subAnswers.subAnswers"
                      :key="subAnswer.id"
                      :subAnswer="subAnswer"
                    />

                    <div
                      class="text-center mt-2"
                      v-if="subAnswers.pagination.hasNext"
                    >
                      <span
                        class="link-primary cursor-pointer d-inline"
                        @click="loadMoreSubAnswers()"
                      >
                        Load more....
                      </span>
                    </div>
                    <div class="d-flex justify-content-end mt-3 mx-2">
                      <button
                        type="button"
                        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
                        @click="toggleSubAddAnswer"
                      >
                        <i class="fa fa-comment" />
                        Answer
                      </button>
                    </div>
                    <div v-show="isSubAddAnswerVisible">
                      <ForumAddSubAnswer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End:Comment Data -->
    </div>
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
      isSubAnswersVisible: false,
      isSubAddAnswerVisible: false,
      answerUser: {},
      subAnswers: {},
      pageNumber: 1,
    }
  },

  methods: {
    toggleSubAnswers() {
      this.isSubAnswersVisible = !this.isSubAnswersVisible
    },
    toggleSubAddAnswer() {
      this.isSubAddAnswerVisible = !this.isSubAddAnswerVisible
    },

    dateFormatted(dat) {
      const myDate = new Date(dat)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    refreshSubAnswers() {
      if (!this.loading) {
        this.loading = true
      }
      this.$axios
        .$get(`/ForumSubAnswers?queryAnswerId=${this.answer.id}`)
        .then((res) => {
          this.subAnswers = res
        })
        .then(() => {
          this.loading = false
        })
    },

    loadMoreSubAnswers() {
      this.pageNumber = this.pageNumber + 1
      this.$axios
        .$get(
          `/ForumSubAnswers?queryAnswerId=${this.answer.id}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          this.subAnswers.subAnswers = this.subAnswers.subAnswers.concat(
            res.subAnswers
          )
          this.subAnswers.pagination = res.pagination
        })
    },
  },

  mounted() {
    this.$axios
      .$get(`User/single/${this.answer.userId}`)
      .then((res) => {
        this.answerUser = res.user
      })
      .then(() => {
        this.$axios
          .$get(`/ForumSubAnswers?queryAnswerId=${this.answer.id}`)
          .then((subAns) => {
            this.subAnswers = subAns
          })
          .then(() => {
            this.loading = false
            if (this.subAnswers.pagination.totalCount == 0) {
              this.isSubAddAnswerVisible = true
            }
          })
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
