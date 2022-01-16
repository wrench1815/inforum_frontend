<template>
  <!-- card -->
  <div class="border border-radius-2xl bg-white mb-3 shadow-lg">
    <!-- card top -->
    <div class="p-3 border-bottom">
      <NuxtLink class="d-flex justify-content-start gap-3" to="/">
        <!-- profile image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img src="https://i.pravatar.cc/100" alt="avatar" />
        </span>

        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- name -->
          <span class="text-bold text-md text-dark"> John Doe </span>

          <!-- date-uploaded -->
          <span class="text-xs link-dark">01/02/2020</span>
        </span>
      </NuxtLink>
    </div>

    <!-- card middle -->
    <div class="p-3">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
        ullam, velit ipsam dolores voluptates enim voluptatum exercitationem
        fugiat a impedit quas. Similique nihil, nesciunt aut recusandae, fugit
        tempore sint sed est vel amet suscipit quod earum ratione repellendus
        fugit tempore sint sed est vel amet suscipit quod earum ratione
        repellendus fugit tempore sint sed est vel amet suscipit quod earum
        ratione repellendus
      </p>
    </div>

    <!-- card bottom -->
    <div class="p-3 d-flex justify-content-start gap-5 border-top">
      <!-- votes -->
      <button
        type="button"
        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
      >
        <i class="fa fa-thumbs-up" />
        10 Votes
      </button>

      <!-- actions-->
      <button
        type="button"
        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
        @click="showComments"
      >
        <i class="fa fa-comment" />
        5 Comments
      </button>
    </div>

    <!-- Comments -->
    <div v-show="isCommentsVisible">
      <!-- Create Comment -->
      <CommentBox />

      <!-- Comments Meta Data -->
      <CommentHeading />

      <!-- Actual Comments -->
      <template v-if="comments.length">
        <div>
          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :content="comment.content"
          />
        </div>
      </template>
      <template v-else>
        <div class="p-3">
          <p class="text-center text-capitalize">No comments yet</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CommentHeading from '~/components/Forum/CommentHeading.vue'
import Comment from '~/components/Forum/Comment.vue'
import CommentBox from '~/components/Forum/CommentBox.vue'
export default {
  name: 'QuestionCard',
  components: {
    CommentHeading,
    Comment,
    CommentBox,
  },
  data() {
    return {
      isCommentsVisible: true,
      comments: [
        {
          id: 1,
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit modi obcaecati id atque. Explicabo fugit quide delectus consectetur! ',
        },
        {
          id: 2,
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit modi obcaecati id atque. Explicabo fugit quide delectus consectetur! ',
        },
        {
          id: 3,
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit modi obcaecati id atque. Explicabo fugit quide delectus consectetur! ',
        },
      ],
    }
  },

  methods: {
    showComments() {
      this.isCommentsVisible = !this.isCommentsVisible
    },
  },
}
</script>

<style scoped>
.custom-gap {
  gap: 0.15rem !important;
}
</style>
