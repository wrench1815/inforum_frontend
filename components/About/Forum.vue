<template>
  <section class="bg-gradient-dark mx-0 px-0">
    <div class="page-header forum-bg-image min-vh-75">
      <span class="mask bg-gradient-faded-dark opacity-7"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">Forum System</h1>
            <p class="lead mb-4 text-white opacity-8">
              This Section of the Application allows One to Ask their Questions,
              called Queries, and the others will Answers them.
            </p>
            <p class="lead mb-4 text-white opacity-8">
              Think of it like StackOverflow.
            </p>
            <NuxtLink to="/forum" class="btn bg-white text-dark">
              Forum
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Forum',
}
</script>

<style scoped>
.forum-bg-image {
  background-image: url(@/assets/images/Online-Media.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
