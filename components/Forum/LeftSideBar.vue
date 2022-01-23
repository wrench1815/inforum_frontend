<template>
  <div class="text-center">
    <LeftSideItem v-for="item in items" :key="item" />
  </div>
</template>

<script>
import LeftSideItem from '~/components/Forum/LeftSideItem.vue'
export default {
  name: 'LeftSideBar',
  components: {
    LeftSideItem,
  },
  data() {
    return {
      items: [...Array(20).keys()],
    }
  },
}
</script>

<style scoped></style>
