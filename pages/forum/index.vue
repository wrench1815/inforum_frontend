<template>
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div v-if="!loading">
      <h3 class="card card-body">Recent Queries</h3>
      <NotFound v-if="queries.pagination.totalCount == 0" />
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
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'forum',

  components: {
    Loading,
  },

  data() {
    return {
      loading: true,
      queries: {},
      pageNumber: 1,
    }
  },

  methods: {
    loadMoreQueries() {
      this.pageNumber = this.pageNumber + 1

      this.$axios
        .$get(`ForumQuery?pageNumber=${this.pageNumber}`)
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
      .$get('ForumQuery')
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

<style scoped></style>
