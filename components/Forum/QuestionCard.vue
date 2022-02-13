<template>
  <!-- card -->
  <div class="border border-radius-2xl bg-white mb-3 shadow-lg">
    <!-- card top -->
    <div class="p-3 border-bottom">
      <div class="d-flex justify-content-start gap-3">
        <!-- profile image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img src="https://i.pravatar.cc/100" alt="avatar" />
        </span>

        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- name -->
          <span class="text-bold text-md text-dark"> John Doe </span>

          <!-- date-uploaded -->
          <span class="text-xs text-dark">{{ query.datePosted }}</span>
        </span>
      </div>
    </div>

    <!-- card middle -->
    <div class="p-3">
      <!-- Start:Query Title -->
      <NuxtLink to="/forum">
        <h3 class="link-primary">{{ query.title }}</h3>
      </NuxtLink>
      <!-- End:Query Title -->
      <p class="custom-paragraph">
        {{ query.description }}
      </p>
      <p
        class="bg-secondary text-white rounded-3 mb-0 text-sm px-2 py-1 d-inline-block"
      >
        {{ query.category.name }}
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
      >
        <i class="fa fa-comment" />
        5 Answers
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

  props: {
    query: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isCommentsVisible: false,
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

.custom-paragraph {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
