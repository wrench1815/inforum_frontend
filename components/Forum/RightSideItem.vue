<template>
  <div class="m-1 btn btn-sm" :class="randomClass">
    <NuxtLink :to="`/forum/category/${cat.slug}`" class="text-white">
      <p class="mb-0">{{ cat.name }}</p>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'RightSideItem',
  props: {
    cat: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      btnCols: [
        'btn-primary',
        'btn-secondary',
        'btn-success',
        'btn-info',
        'btn-warning',
        'btn-danger',
        'btn-dark',
      ],
      randomClass: '',
    }
  },

  mounted() {
    this.randomClass =
      this.btnCols[Math.floor(Math.random() * this.btnCols.length)]
  },
}
</script>

<style scoped></style>
