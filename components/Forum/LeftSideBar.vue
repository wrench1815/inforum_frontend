<template>
  <div
    class="text-center d-flex flex-row flex-md-column justify-content-between bg-white align-items-center rounded-3 px-3 py-2 gap-md-3 shadow-lg"
    id="SideNav"
  >
    <!-- Start:Forum Home Link -->
    <div class="">
      <NuxtLink to="/forum" class="py-2" :active-class="'fix-active-link-bug'">
        <i class="fa fa-home text-2xl" />
      </NuxtLink>
    </div>
    <!-- End:Forum Home Link -->

    <!-- Start:Forum Category List Link -->
    <div class="">
      <NuxtLink to="/forum/category" class="py-2">
        <i class="fas fa-list-ul text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Category List Link -->

    <!-- Start:Forum Add Query Link -->
    <div class="">
      <NuxtLink to="/forum/query/add" class="py-2">
        <i class="fas fa-plus text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Add Query Link -->

    <!-- Start:Forum Add Query Link -->
    <div class="">
      <NuxtLink to="/forum/query/edit/list" class="py-2">
        <i class="fas fa-edit text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Forum Add Query Link -->

    <!-- Start:Logout Link -->
    <div v-if="isAuthenticated">
      <NuxtLink to="/logout" class="text-danger py-2">
        <i class="fas fa-sign-out-alt text-2xl"></i>
      </NuxtLink>
    </div>
    <!-- End:Logout Link -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeftSideBar',

  computed: {
    ...mapGetters(['isAuthenticated']),
  },

  data() {
    return {
      items: [...Array(20).keys()],
    }
  },
}
</script>

<style scoped>
a {
  color: #344767;
}

a:hover {
  color: #344767;
}

#SideNav div .nuxt-link-exact-active {
  color: #e91e63;
}

#SideNav div .nuxt-link-active {
  color: #e91e63;
}
</style>
