<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <img
          class="img-fluid w-50"
          src="~assets/svg/Empty-amico.svg"
          alt="Feels Empty"
          v-lazy-load
        />
        <h3 class="mx-4" v-if="message">{{ message }}</h3>
        <h3 class="mx-4" v-else>Feels Empty.</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',

  props: {
    message: {
      type: String,
      required: false,
    },
  },
}
</script>

<style></style>
