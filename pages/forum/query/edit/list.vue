<template>
  <div>
    <div v-if="loading">
      <h2 class="text-center">Loading.....</h2>
    </div>

    <div v-if="!loading">
      <h3 class="card card-body flex-row">
        Queries Posted by<span class="ms-2 text-primary">You</span>
      </h3>

      <div
        class="card card-body mt-3"
        v-if="queries.pagination.totalCount == 0"
      >
        <NotFound :message="'No Query Posted Yet.'" />

        <NuxtLink
          to="/forum/query/add"
          class="btn btn-primary mt-2 align-self-center"
          >Add Query</NuxtLink
        >
      </div>

      <template v-else>
        <ForumQuestionCard
          v-for="query in queries.forumQuery"
          :key="query.id"
          :query="query"
        />
        <div class="text-center">
          <div
            class="link-primary my-3 d-inline-block cursor-pointer"
            v-if="queries.pagination.hasNext"
            @click="loadMoreQueries"
          >
            Load more.... <i class="fas fa-"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['auth'],

  layout: 'forum',

  data() {
    return {
      loading: true,
      queries: {},
      pageNumber: 1,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUserRole']),
  },

  methods: {
    loadMoreQueries() {
      this.pageNumber = this.pageNumber + 1

      this.$axios
        .$get(
          `ForumQuery?authorId=${this.loggedInUser.id}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          this.queries.forumQuery = this.queries.forumQuery.concat(
            res.forumQuery
          )
          this.queries.pagination = res.pagination
        })
        .catch((err) => {
          let msg

          try {
            msg = res.message
          } catch (error) {
            msg = 'Unable to fetch Queries.<br/>Please Try Again Later.'
          }

          this.$swal({
            title: 'Error',
            icon: 'error',
            type: 'error',
            html: `${msg}`,
          })
        })
    },
  },

  mounted() {
    this.$axios
      .$get(`ForumQuery?authorId=${this.loggedInUser.id}`)
      .then((res) => {
        this.queries = res
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to fetch Queries.<br/>Please Try Again Later.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          type: 'error',
          html: `${msg}`,
        })
      })
  },
}
</script>

<style></style>
