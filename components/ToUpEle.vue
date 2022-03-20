<template>
  <div class="d-flex justify-content-end z-index-sticky">
    <div class="position-fixed bottom-0">
      <div class="d-flex flex-column">
        <a
          class="btn btn-success btn-icon-only rounded-circle d-lg-none"
          @click="pageRefresh"
        >
          <span class="d-flex justify-content-center align-items-center"
            ><i class="fas fa-redo text-white text-lg reload-btn-margin"></i
          ></span>
        </a>
        <a
          class="btn btn-primary btn-icon-only rounded-circle"
          @click="toUp"
          v-if="visible"
        >
          <span class="d-flex justify-content-center align-items-center"
            ><i class="fas fa-chevron-up text-white text-lg mt-n1"></i
          ></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToUpEle',

  props: {
    eleId: {
      type: String,
      required: true,
    },
  },

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
        document
          .getElementById(this.eleId)
          .scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    },
  },

  mounted() {
    const scrollEle = document.getElementById(this.eleId)
    scrollEle.addEventListener('scroll', () => {
      if (scrollEle.scrollTop > 100) {
        this.visible = true
      } else {
        this.visible = false
      }
    })
  },
}
</script>

<style></style>
