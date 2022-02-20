<template>
  <div>
    <div v-if="loading">
      <h3 class="text-center">Loading.....</h3>
    </div>
    <!-- card -->
    <div
      class="border border-radius-2xl bg-white mb-3 shadow-lg"
      v-if="!loading"
    >
      <!-- card top -->
      <div class="p-3 border-bottom">
        <div class="d-flex justify-content-start gap-3">
          <!-- profile image -->
          <span class="avatar avatar-md rounded-circle shadow-card">
            <img
              class="avatar avatar-md rounded-circle img-fit"
              :src="queryAuthor.profileImage"
              alt="avatar"
            />
          </span>

          <span class="d-flex flex-column justify-content-center custom-gap">
            <!-- name -->
            <span class="text-bold text-md text-dark">{{
              queryAuthor.firstName + ' ' + queryAuthor.lastName
            }}</span>

            <!-- date-uploaded -->
            <span class="text-xs link-dark">{{
              dateFormatted(query.datePosted)
            }}</span>
          </span>
        </div>
      </div>

      <!-- card middle -->
      <div class="p-3">
        <!-- Start:Query Title -->
        <h1>{{ query.title }}</h1>
        <!-- End:Query Title -->

        <!-- Start:Query Description -->
        <div v-html="query.description"></div>
        <!-- End:Query Description -->

        <!-- Start:Query Category -->
        <p
          class="bg-secondary text-white rounded-3 mb-0 text-sm px-2 py-1 d-inline-block"
        >
          {{ query.category.name }}
        </p>
        <!-- End:Query Category -->
      </div>

      <!-- card bottom -->
      <div class="p-3 d-flex justify-content-start gap-5 border-top">
        <!-- Start:Votes -->
        <button
          v-if="isAuthenticated"
          type="button"
          class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
          :class="{ 'text-info': voted }"
          @click="vote"
        >
          <i class="fa fa-thumbs-up" />
          {{ query.vote }}<span class="ms-1" v-if="query.vote == 1">Vote</span
          ><span class="ms-1" v-else>Votes</span>
        </button>

        <button
          v-if="!isAuthenticated"
          type="button"
          class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
        >
          <i class="fa fa-thumbs-up" />
          {{ query.vote }}<span class="ms-1" v-if="query.vote == 1">Vote</span
          ><span class="ms-1" v-else>Votes</span>
        </button>
        <!-- End:Votes -->

        <!-- Start:Answers count-->
        <button
          type="button"
          class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
        >
          <i class="fa fa-comment" />
          {{ queryAnswers.pagination.totalCount
          }}<span class="ms-1" v-if="queryAnswers.pagination.totalCount == 1"
            >Answer</span
          ><span class="ms-1" v-else>Answers</span>
        </button>
        <!-- End:Answers count-->
      </div>
      <!-- Start:Edit Option -->
      <template v-if="isAuthenticated">
        <template v-if="loggedInUser.id == query.authorId">
          <div class="border-top"></div>
          <div class="card-body">
            <NuxtLink
              :to="`/forum/query/edit/${query.slug}`"
              class="btn btn-info"
              >Edit Query</NuxtLink
            >
          </div>
        </template>
      </template>
      <!-- End:Edit Option -->

      <!-- Start:Answers-->
      <div>
        <!-- Start:Add Answer -->
        <ForumAddAnswer :queryId="query.id" v-on:answer-added="getAnswers()" />
        <!-- End:Add Answer -->

        <!-- Answers Meta Data -->
        <ForumTopHeading />

        <!-- Start:Answers List -->
        <template v-if="queryAnswers.pagination.totalCount">
          <div>
            <ForumAnswer
              v-for="answer in queryAnswers.answers"
              :key="answer.id"
              :answer="answer"
            />
          </div>
          <div class="text-center">
            <div
              class="link-primary my-3 d-inline-block cursor-pointer"
              v-if="queryAnswers.pagination.hasNext"
              @click="loadMoreAnswers"
            >
              Load more....
            </div>
          </div>
        </template>
        <!-- End:Answers List -->

        <!-- Start:No Answers Fallback -->
        <template v-else>
          <div class="p-3">
            <p class="text-center text-capitalize">No Answers yet</p>
          </div>
        </template>
        <!-- End:No Answers Fallback -->
      </div>
      <!-- End:Answers-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CompleteQuery',

  props: {
    query: {
      type: Object,
      required: true,
    },

    queryAuthor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: true,
      queryAnswers: {},
      pageNumber: 1,
      voted: false,
    }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },

  methods: {
    dateFormatted(dat) {
      const myDate = new Date(dat)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    vote() {
      var voteData = {
        forumId: this.query.id,
        userId: this.loggedInUser.id,
      }

      this.$axios.$post(`ForumQuery/vote`, voteData).then((res) => {
        if (res.status == 200) {
          this.$axios
            .$get(`ForumQuery/${this.query.id}`)
            .then((qur) => {
              this.query.vote = qur.vote
            })
            .then(() => {
              this.$axios
                .$post(`ForumQuery/vote/status`, voteData)
                .then((stat) => {
                  this.voted = stat.voteExist
                })
            })
        }
      })
    },

    getAnswers() {
      if (!this.loading) {
        this.loading = true
      }

      // fetch Answers of Query
      this.$axios
        .$get(`ForumAnswer?queryId=${this.query.id}`)
        .then((r) => {
          this.queryAnswers = r
        })
        .then(() => {
          this.loading = false
        })
    },

    loadMoreAnswers() {
      this.pageNumber = this.pageNumber + 1
      this.$axios
        .$get(
          `ForumAnswer?pageNumber=${this.pageNumber}&queryId=${this.query.id}`
        )
        .then((res) => {
          this.queryAnswers.answers = this.queryAnswers.answers.concat(
            res.answers
          )
          this.queryAnswers.pagination = res.pagination
        })
    },
  },

  mounted() {
    if (this.isAuthenticated) {
      var voteData = {
        forumId: this.query.id,
        userId: this.loggedInUser.id,
      }

      this.$axios
        .$post(`ForumQuery/vote/status`, voteData)
        .then((stat) => {
          this.voted = stat.voteExist
        })
        .then(() => {
          this.getAnswers()
        })
    } else {
      this.getAnswers()
    }
  },
}
</script>

<style scoped>
.custom-gap {
  gap: 0.15rem !important;
}

.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
