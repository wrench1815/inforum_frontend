<template>
  <div>
    <div class="row">
      <div class="col-12 ms-auto me-auto"><h3>Comments</h3></div>
      <template v-if="loading">
        <section class="col-12 ms-auto me-auto">
          <h3>Loading....</h3>
        </section>
      </template>
      <template v-if="!loading">
        <div class="col-12 ms-auto me-auto">
          <template>
            <!-- Start:Commnet Input Box -->
            <BlogAddComment
              :postId="postId"
              v-on:comment-added="getComments()"
            />
            <!-- End:Commnet Input Box -->

            <template v-for="comment in comments.comments">
              <!-- Start:Blog Comment -->
              <BlogComment :comment="comment" />
              <!-- Start:Blog Comment -->
            </template>
          </template>
        </div>
        <div class="col-12 ms-auto me-auto text-center">
          <div
            class="link-primary cursor-pointer d-inline"
            v-if="comments.pagination.hasNext"
            @click="loadMoreComments()"
          >
            Load more....
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullComment',

  props: {
    postId: Number,
  },

  data() {
    return {
      comments: {},
      loading: true,
      pageNumber: 1,
    }
  },

  methods: {
    getComments() {
      if (!this.loading) {
        this.loading = true
      }
      // Fetch Comments for the Blog Post
      this.$axios
        .$get(`Comments/?postId=${this.postId}`)
        .then((cmts) => {
          this.comments = cmts
        })
        .then(() => {
          this.loading = false
        })
    },

    loadMoreComments() {
      this.pageNumber = this.pageNumber + 1
      this.$axios
        .$get(`Comments/?postId=${this.postId}&pageNumber=${this.pageNumber}`)
        .then((res) => {
          this.comments.comments = this.comments.comments.concat(res.comments)
          this.comments.pagination = res.pagination
        })
    },
  },

  mounted() {
    this.getComments()
  },
}
</script>

<style scoped></style>
