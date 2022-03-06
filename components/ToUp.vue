<template>
  <div
    class="position-fixed bottom-0 end-0 me-2 z-index-sticky"
    v-show="visible"
  >
    <a class="btn btn-primary btn-icon-only rounded-circle" @click="toUp">
      <span class="d-flex justify-content-center align-items-center"
        ><i class="fas fa-chevron-up text-white text-lg mt-n1"></i
      ></span>
    </a>
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

<style scoped></style>
