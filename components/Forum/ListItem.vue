<template>
  <NuxtLink
    class="text-bold text-center"
    :class="randomClass"
    :to="`/forum/category/${cat.slug}`"
    >{{ cat.name }}</NuxtLink
  >
</template>

<script>
export default {
  name: 'ListItem',

  props: {
    cat: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      listCols: [
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
      this.listCols[Math.floor(Math.random() * this.listCols.length)]
  },
}
</script>

<style></style>
