<template>
  <div>
    <div v-if="loading">
      <h2 class="text-center">Loading.....</h2>
    </div>
    <div v-if="!loading">
      <!-- blur position-sticky top-0 bg- z-index-sticky px-3 border-radius-bottom-end-2xl border-radius-bottom-start-2xl shadow-blur -->
      <h3 class="">Recent Queries</h3>
      <QuestionCard v-for="query in queries" :key="query.id" :query="query" />
    </div>
  </div>
</template>

<script>
import QuestionCard from '~/components/Forum/QuestionCard.vue'
export default {
  layout: 'forum',

  components: {
    QuestionCard,
  },

  data() {
    return {
      loading: true,
      queries: {},
    }
  },

  mounted() {
    this.$axios
      .$get('ForumQuery')
      .then((res) => {
        this.queries = res.forumquery
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
