<template>
  <!-- <div class="fixed-top"> -->
  <div class="container mt-7">
    <div class="row">
      <!-- left column  -->
      <div class="d-none d-lg-block col-lg-3 position-relative">
        <div
          class="bg-white border-radius-xl position-fixed custom-width shadow"
        >
          <ul class="list-unstyled text-center">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
      </div>

      <!-- center column -->
      <div class="col">
        <div>
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </div>
      </div>

      <!-- right column -->
      <div class="d-none d-lg-block col-lg-3 position-relative">
        <div
          class="bg-white border-radius-xl position-fixed custom-width shadow text-center"
        >
          Essential Links or Categories
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import QuestionCard from '~/components/Forum/QuestionCard.vue'
export default {
  layout: 'forum',
  components: {
    QuestionCard,
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
