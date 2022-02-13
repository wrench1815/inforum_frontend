<template>
  <div class="card border-radius-2xl">
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="card-image border-radius-top-start-2xl border-radius-top-end-2xl cursor-pointer img-hover-zoom"
    >
      <img class="img-fluid" src="@/assets/images/img-1.jpg" alt="" />
    </NuxtLink>
    <div class="card-body">
      <NuxtLink class="card-title h3" :to="`/blog/${post.slug}`">{{
        post.title
      }}</NuxtLink>
      <p class="custom-paragraph">
        {{ post.excerpt }}
      </p>
      <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary"
        >Read More</NuxtLink
      >
      <div class="border-top border-primary mb-1"></div>
      <p class="card-text d-flex justify-content-between">
        <small class="text-info">{{ normalizedDate }}</small>
        <small class="text-info">{{ authorFullName }}</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      authorFullName: '',
      normalizedDate: '',
    }
  },

  methods: {
    getDatePosted(postDate) {
      const myDate = new Date(postDate)
      this.normalizedDate = `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    getAuthor(authorId) {
      this.$axios.$get(`/User/single/${authorId}`).then((res) => {
        var fullName = `${res.user.firstName} ${res.user.lastName}`
        this.authorFullName = fullName
      })
    },
  },

  created() {
    this.getDatePosted(this.post.datePosted)
    this.getAuthor(this.post.authorId)
  },
}
</script>

<style scoped>
.cover-img {
  object-fit: cover;
}

.custom-paragraph {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.img-hover-zoom {
  overflow: hidden;
}

.img-hover-zoom img {
  transition: transform 0.8s ease;
}

.img-hover-zoom:hover img {
  transform: scale(1.2);
}
</style>
