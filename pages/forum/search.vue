<template>
  <div>
    <div v-if="loading">
      <h2 class="text-center">Loading.....</h2>
    </div>

    <div v-if="!loading">
      <div
        class="card card-body mb-3 flex-row gap-2 align-items-center justify-content-center"
      >
        <div class="input-group input-group-outline">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="searchQuery"
          />
        </div>
        <button type="button" class="btn btn-success mb-0 btn-round">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <h3 class="card card-body">Search Results</h3>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'forum',

  data() {
    return {
      loading: true,
      searchQuery: this.$router.currentRoute.params.query,
    }
  },

  mounted() {
    this.loading = false
  },
}
</script>

<style scoped>
.btn-round {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1rem !important;
  border-radius: 50rem !important;
  height: 48px !important;
  width: 48px !important;
  transition: all 0.2s ease-in-out !important;
}

.btn-round:focus {
  outline: none !important;
  box-shadow: none !important;
}

.input-group-outline input {
  border: 2px solid #d2d6da !important;
}

.input-group-outline input:focus {
  border: 2px solid #e91e63 !important;
}
</style>
