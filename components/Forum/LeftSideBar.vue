<template>
  <div
    class="text-center d-flex flex-row flex-md-column justify-content-between bg-white align-items-center rounded-3 px-3 py-2 gap-md-3 shadow-lg"
  >
    <!-- Start:Forum Home Link -->
    <div class="">
      <NuxtLink to="/forum" class="text-dark py-2">
        <i class="fa fa-home text-2xl" />
      </NuxtLink>
    </div>
    <!-- End:Forum Home Link -->

    <!-- Start:Forum Category List Link -->
    <div class="">
      <NuxtLink to="/forum/category" class="text-dark py-2">
        <i class="fas fa-list-ul text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Category List Link -->

    <!-- Start:Forum Add Query Link -->
    <div class="">
      <NuxtLink to="/forum/query/add" class="text-dark py-2">
        <i class="fas fa-plus text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Add Query Link -->

    <!-- Start:Forum Add Query Link -->
    <div class="">
      <NuxtLink to="/forum/query/edit/list" class="text-dark py-2">
        <i class="fas fa-edit text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Add Query Link -->

    <!-- Start:Logout Link -->
    <div class="">
      <NuxtLink to="/logout" class="text-danger py-2">
        <i class="fas fa-sign-out-alt text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Logout Link -->
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
