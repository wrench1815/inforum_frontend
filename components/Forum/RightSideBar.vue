<template>
  <div class="text-center">
    <RightSideItem v-for="item in items" :key="item" />
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
