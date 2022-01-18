<template>
  <!-- <div class="fixed-top"> -->
  <div class="container mt-7">
    <div class="row">
      <!-- left column  -->
      <div class="d-none d-lg-block col-lg-3 position-relative">
        <div
          class="bg-white border-radius-xl position-fixed custom-width shadow"
        >
          Col-1
        </div>
      </div>

      <!-- center column -->
      <div class="col">
        <div>
          <CompleteQuestion />
        </div>
      </div>

      <!-- right column -->
      <div class="d-none d-lg-block col-lg-3 position-relative">
        <div
          class="bg-white border-radius-xl position-fixed custom-width shadow"
        >
          Col-3
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import CompleteQuestion from '~/components/Forum/CompleteQuestion.vue'
export default {
  layout: 'forum',
  components: {
    CompleteQuestion,
  },
}
</script>

<style scoped>
@media (min-width: 992px) {
  .custom-width {
    width: 13.125rem;
  }
}

@media (min-width: 1200px) {
  .custom-width {
    width: 15.93rem;
  }
}

@media (min-width: 1400px) {
  .custom-width {
    width: 300px;
  }
}
</style>
