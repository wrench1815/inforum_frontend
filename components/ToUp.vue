<template>
  <div class="position-fixed bottom-0 end-0 me-1 z-index-sticky">
    <div class="d-flex flex-column">
      <a
        class="btn btn-success btn-icon-only rounded-circle"
        @click="pageRefresh"
      >
        <span class="d-flex justify-content-center align-items-center"
          ><i class="fas fa-redo text-white text-lg reload-btn-margin"></i
        ></span>
      </a>
      <a
        class="btn btn-primary btn-icon-only rounded-circle"
        @click="toUp"
        v-show="visible"
      >
        <span class="d-flex justify-content-center align-items-center"
          ><i class="fas fa-chevron-up text-white text-lg mt-n1"></i
        ></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToUp',

  data() {
    return {
      visible: false,
    }
  },

  methods: {
    pageRefresh() {
      location.reload()
    },

    toUp() {
      setTimeout(() => {
        window.scroll(0, 0)
      }, 100)
    },
  },

  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.visible = true
      } else {
        this.visible = false
      }
    })
  },
}
</script>

<style scoped>
.reload-btn-margin {
  margin-top: -0.1rem !important;
}
</style>
