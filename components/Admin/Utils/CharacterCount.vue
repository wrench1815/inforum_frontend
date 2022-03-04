<template>
  <p class="text-lg">
    Characters:
    <span :class="isValid() ? 'text-success' : 'text-danger'"
      >{{ data ? data.length : 0 }}
      <template v-if="isValid()">
        <i class="fas fa-check"></i>
      </template>
      <template v-else>
        <i class="fas fa-exclamation-circle"></i>
      </template>
    </span>
  </p>
</template>

<script>
export default {
  name: 'CharacterCount',

  props: ['data', 'minLength', 'maxLength'],

  methods: {
    isValid() {
      if (this.data) {
        const length = this.data.length
        if (this.maxLength) {
          return length >= this.minLength && length <= this.maxLength
        } else {
          return length >= this.minLength
        }
      } else {
        false
      }
    },
  },
}
</script>

<style></style>
