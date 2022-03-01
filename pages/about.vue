<template>
  <div>
    <!-- Start:Header -->
    <header class="bg-gradient-dark">
      <div
        class="page-header header-bg-image min-vh-75"
        lazy-background="~/assets/images/3d-render.jpg"
      >
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center mx-auto my-auto">
              <h1 class="text-white mt-7">Join the Thriving Community</h1>
              <p class="lead mb-4 text-white opacity-8">
                Join us, in the community of students, to share your knowledge,
                and to learn from others.
              </p>
              <NuxtLink
                v-if="!isAuthenticated"
                to="/signup"
                class="btn bg-white text-dark"
              >
                Create Account
              </NuxtLink>
              <NuxtLink
                v-if="isAuthenticated"
                to="/forum"
                class="btn bg-white text-dark"
              >
                Explore
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- End:Header -->

    <!-- Start:Body -->
    <div class="card blur shadow-blur mx-3 mx-md-4 mt-n5">
      <section class="py-7">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <h2 class="text-primary">About Inforum</h2>
            </div>
            <div class="col-12 text-dark">
              <p class="text-lg">
                <span class="text-primary text-bold">Inforum</span> is an online
                community of Students, where you can share your knowledge, and
                learn from others.
              </p>
              <p class="text-lg">
                Join many other Students and ask away your Question or Guidance
                on mundane subjects like Internship or Interview Prep etc. Or
                Answer other's Questions and Guide them, helping them turn the
                leaf and become better one step at a time.
              </p>
            </div>

            <div class="col-12 text-dark">
              <p class="text-lg">
                The Idea Behind
                <span class="text-primary text-bold">Inforum</span> was to have
                some sort of Platform, a place where a Student can easily come
                and ask asway they Issues. Apparently there wasn't any such
                Solution in place.
              </p>
              <p class="text-lg">
                Yes, <span class="text-info">Social Media</span> could Work but,
                it is not a great Platform to seek for Guidance. Social Media is
                for Sharing about One's Daily Activities, like what One do or
                where's One traveling to. And thus we came up with the Idea of
                <span class="text-primary text-bold">Inforum</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Start:Forum -->
      <AboutForum />
      <!-- End:Forum -->

      <!-- Start:Blog -->
      <AboutBlog />
      <!-- End:Blog -->

      <!-- Start:Tech Stack -->
      <AboutTechStack class="mt-7" />
      <!-- End:Tech Stack -->

      <!-- Start:Team -->
      <AboutTeam class="mt-6" />
      <!-- Start:Team -->
    </div>
    <!-- End:Body -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
}
</script>

<style scoped>
.header-bg-image {
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
}
</style>
