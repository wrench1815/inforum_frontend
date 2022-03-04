<template>
  <!-- card -->
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div
      class="border border-radius-2xl bg-white mb-3 shadow-lg"
      v-if="!loading"
    >
      <!-- card top -->
      <div class="p-3 border-bottom">
        <div class="d-flex justify-content-start gap-3">
          <!-- Start:Profile image -->
          <span class="avatar avatar-md rounded-circle shadow-card">
            <img
              class="avatar avatar-md rounded-circle img-fit"
              :src="author.profileImage"
              alt="avatar"
            />
          </span>
          <!-- End:Profile image -->

          <span class="d-flex flex-column justify-content-center custom-gap">
            <!-- name -->
            <span class="text-bold text-md text-dark">{{
              author.firstName + ' ' + author.lastName
            }}</span>

            <!-- date-uploaded -->
            <span class="text-xs text-dark">{{
              dateFormatted(query.datePosted)
            }}</span>
          </span>
        </div>
      </div>

      <!-- card middle -->
      <div class="p-3">
        <!-- Start:Query Title -->
        <NuxtLink :to="`/forum/query/${query.slug}`">
          <h3 class="link-primary">{{ query.title }}</h3>
        </NuxtLink>
        <!-- End:Query Title -->

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
        <!-- votes -->
        <button
          type="button"
          class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
        >
          <i class="fa fa-thumbs-up" />
          {{ query.vote }}<span class="" v-if="query.vote == 1">Vote</span
          ><span class="ms-1" v-else>Votes</span>
        </button>

        <!-- actions-->
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
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  name: 'QuestionCard',

  components: {
    Loading,
  },

  props: {
    query: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: true,
      author: Object,
      queryAnswers: Object,
    }
  },

  methods: {
    dateFormatted(dat) {
      const myDate = new Date(dat)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    this.$axios
      .$get(`User/single/${this.query.authorId}`)
      .then((res) => {
        this.author = res.user
      })
      .then(() => {
        this.$axios
          .$get(`ForumAnswer?queryId=${this.query.id}`)
          .then((r) => {
            this.queryAnswers = r
          })
          .then(() => {
            this.loading = false
          })
      })
  },
}
</script>

<style scoped>
.custom-gap {
  gap: 0.15rem !important;
}

.custom-paragraph {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
