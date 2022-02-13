<template>
  <div class="text-center">
    <h3>Categories</h3>
    <ForumRightSideItem v-for="cat in categories" :key="cat.id" :cat="cat" />
  </div>
</template>

<script>
import RightSideItem from '~/components/Forum/RightSideItem.vue'
export default {
  name: 'RightSideBar',
  components: {
    RightSideItem,
  },
  data() {
    return {
      loading: true,
      categories: {},
    }
  },

  mounted() {
    this.$axios.$get('/Categories').then((res) => {
      this.categories = res
    })
  },
}
</script>

<style scoped></style>
