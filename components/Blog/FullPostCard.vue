<template>
  <div class="row g-0">
    <div class="col-sm-6 ps-sm-0 d-flex align-items-center">
      <NuxtLink
        :to="`/blog/${post.slug}`"
        class="card-image cursor-pointer h-100 w-100 ratio ratio-16x9 border-radius-top-end-2xl border-radius-top-end-md-0 border-radius-top-start-2xl border-radius-bottom-start-md-2xl img-hover-zoom"
      >
        <img
          class="cover-img"
          :src="
            post.featureImage
              ? post.featureImage
              : 'https://res.cloudinary.com/inforum/image/upload/v1645626004/Defaults/open-book_xtbv4v.jpg'
          "
          :alt="post.title"
          v-lazy-load
        />
      </NuxtLink>
    </div>
    <div
      class="shadow-lg border-radius-bottom-start-2xl border-radius-bottom-start-md-0 border-radius-bottom-end-2xl border-radius-top-end-md-2xl border-radius-top-end-0 border-radius-top-start-0 border-radius-bottom-start-0 col-sm-6 ps-sm-0 card"
    >
      <div class="card-body">
        <p class="card-text">
          <small class="text-info">{{ normalizedDate }}</small>
          <span class="text-primary">|</span>
          <span class="text-info">{{ authorFullName }}</span>
          <span class="text-primary">|</span>
          <span class="text-warning"
            >{{ post.star }}<i class="ms-1 fas fa-star"></i
          ></span>
        </p>
        <NuxtLink class="card-title h3 pb-3" :to="`/blog/${post.slug}`">{{
          post.title
        }}</NuxtLink>
        <p class="card-text custom-paragraph">{{ post.excerpt }}</p>
        <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary"
          >Read More</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullPostCard',
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
