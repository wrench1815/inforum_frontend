<template>
  <div>
    <div v-if="loading">
      <h2 class="text-center">Loading.....</h2>
    </div>
    <div v-if="!loading">
      <!-- blur position-sticky top-0 bg- z-index-sticky px-3 border-radius-bottom-end-2xl border-radius-bottom-start-2xl shadow-blur -->
      <div class="card card-body">
        <h3 class="">Categories</h3>
        <!-- <div class="text-center"></div> -->
        <div class="p-2">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'forum',

  data() {
    return {
      loading: true,
      categories: {},
    }
  },

  mounted() {
    this.$axios
      .$get('Categories')
      .then((res) => {
        this.categories = res
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
