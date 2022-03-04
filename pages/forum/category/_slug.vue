<template>
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>

    <div v-if="!loading">
      <h3 class="card card-body">Forum Queries</h3>

      <NotFound
        :message="`No Forum Post Found for '${categorySlug}' !`"
        v-if="queryList.pagination.totalCount == 0"
      />

      <template v-else>
        <ForumQuestionCard
          v-for="query in queryList.forumQuery"
          :key="query.id"
          :query="query"
        />
        <div class="text-center">
          <div
            class="link-primary my-3 d-inline-block cursor-pointer"
            v-if="queryList.pagination.hasNext"
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
      categorySlug: this.$route.params.slug,
      queryList: {},
      pageNumber: 1,
    }
  },

  methods: {
    loadMoreQueries() {
      this.pageNumber = this.pageNumber + 1

      this.$axios
        .$get(
          `ForumQuery?pageNumber=${this.pageNumber}&categorySlug=${this.categorySlug}`
        )
        .then((res) => {
          this.queryList.forumQuery = this.queryList.forumQuery.concat(
            res.forumQuery
          )
          this.queryList.pagination = res.pagination
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
      .$get(`/ForumQuery?categorySlug=${this.categorySlug}`)
      .then((res) => {
        this.queryList = res
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
