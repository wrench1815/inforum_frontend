<template>
  <NuxtLink :to="`/forum/query/${query.slug}`">
    <div class="card p-2 my-3 border shadow-secondary">
      <h6 class="m-0" :class="randomClass">{{ query.title }}</h6>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'PopularQuery',

  props: {
    query: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      popularQueries: {},
      textcols: [
        'text-primary',
        'text-secondary',
        'text-success',
        'text-info',
        'text-warning',
        'text-danger',
        'text-dark',
      ],
      randomClass: '',
    }
  },

  mounted() {
    this.randomClass =
      this.textcols[Math.floor(Math.random() * this.textcols.length)]
  },
}
</script>

<style></style>
