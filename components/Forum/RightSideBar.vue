<template>
  <div class="text-center">
    <h3 class="text-center">Categories</h3>
    <div class="bg-dark mb-1">
      <NuxtLink to="/" class="text-white">
        <p class="text-2xl mb-0 py-2">Content</p>
      </NuxtLink>
    </div>
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
      items: [...Array(20).keys()],
    }
  },
}
</script>

<style scoped></style>
