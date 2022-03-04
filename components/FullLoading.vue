<template>
  <div v-if="loading" class="loading-page">
    <img class="loader" src="~/assets/svg/ball-triangle.svg" alt="Loader" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 100px;
  height: 100px;
}
</style>
