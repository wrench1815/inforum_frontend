<template>
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div v-if="!loading">
      <ForumCompleteQuery :query="query" :queryAuthor="queryAuthor.user" />
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
import Prism from '~/plugins/prism'

export default {
  layout: 'forum',

  components: {
    Loading,
  },

  data() {
    return {
      loading: true,
      query: {},
      queryAuthor: {},
    }
  },
  mounted() {
    const query = this.$axios
      .$get(`/ForumQuery/slug/${this.$route.params.slug}`)
      .then((res) => {
        this.query = res
      })
      .then(() => {
        this.$axios
          .$get(`User/single/${this.query.authorId}`)
          .then((r) => {
            this.queryAuthor = r
          })
          .then(() => {
            this.loading = false
          })
          .then(() => {
            Prism.highlightAll()
          })
      })
      .catch((err) => {
        let msg
        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to fetch Query.<br/>Please Try Again Later.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          type: 'error',
          html: `${msg}`,
        })
      })
  },
  methods: {
    getDatePosted() {
      const myDate = new Date(this.post.datePosted)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },
}
</script>

<style scoped></style>
