<template>
  <div>
    <div v-if="loading">
      <Loading class="bg-transparent shadow-none" />
    </div>
    <div v-if="!loading">
      <div class="card card-body">
        <h3 class="">Categories</h3>

        <div class="p-2" v-if="categories">
          <div class="row gap-3">
            <div
              class="col-auto border card card-body hover-border"
              v-for="cat in categories"
              :key="cat.id"
            >
              <ForumListItem :cat="cat" />
            </div>
          </div>
        </div>

        <template v-else>
          <NotFound
            class="p-2 border-top"
            :message="'No Categories to Show.'"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'

export default {
  layout: 'forum',

  components: {
    Loading,
  },

  data() {
    return {
      loading: true,
      categories: null,
    }
  },

  mounted() {
    this.$axios
      .$get('Categories')
      .then((res) => {
        if (res.length > 0) {
          this.categories = res
        } else {
          this.categories = null
        }
      })
      .then(() => {
        this.loading = false
      })
      .catch((err) => {
        let msg

        try {
          msg = res.message
        } catch (error) {
          msg = 'Unable to fetch Categories.<br/>Please Try Again Later.'
        }

        this.$swal({
          title: 'Error',
          icon: 'error',
          type: 'error',
          html: `${msg}`,
        })
      })
  },
}
</script>

<style scoped>
.hover-border {
  box-shadow: none;
  transition: all 0.4s ease-in-out;
}

.hover-border:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #dee2e6 !important;
  transform: translateY(-0.3rem);
}
</style>
