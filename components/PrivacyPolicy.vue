<template>
  <div class="fixed-bottom" v-if="!isAccepted">
    <div class="mb-3 text-center mx-2">
      <div
        class="bg-white p-3 rounded-3 d-inline-flex shadow-lg border border-2 border-success align-items-center"
      >
        <p class="my-0 mx-1 py-0 text-start text-dark">
          By continuing to the application, you accept that you have read the
          <NuxtLink to="/privacy-policy" class="text-primary"
            >Privacy Policy</NuxtLink
          >
          and are well aware of how it effects your stay here.
        </p>
        <div class="d-flex justify-content-end align-items-center m-0 p-0">
          <button class="btn btn-sm btn-success m-0" @click="acceptPrivacy">
            ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PrivacyPolicy',

  computed: {
    isAccepted() {
      return this.$store.state.privacyAccepted
    },
  },

  methods: {
    ...mapMutations({
      acceptPrivacy: 'acceptPrivacy',
    }),
  },

  mounted() {
    this.$store.commit('statusPrivacy')
  },
}
</script>

<style></style>
