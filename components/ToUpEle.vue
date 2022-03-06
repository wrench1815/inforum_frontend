<template>
  <div class="d-flex justify-content-end z-index-sticky" v-if="visible">
    <div class="position-fixed bottom-0 me-2">
      <a class="btn btn-primary btn-icon-only rounded-circle" @click="toUp">
        <span class="d-flex justify-content-center align-items-center"
          ><i class="fas fa-chevron-up text-white text-lg mt-n1"></i
        ></span>
      </a>
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
      console.log(scrollEle.scrollTop)
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
