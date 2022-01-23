<template>
  <div>
    <QuestionCard />
    <QuestionCard />
    <QuestionCard />
    <QuestionCard />
  </div>
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

<style scoped></style>
