<template>
  <section class="bg-gradient-dark mx-0 px-0">
    <div class="page-header blog-bg-image min-vh-75">
      <span class="mask bg-gradient-faded-dark opacity-7"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">Blogging System</h1>
            <p class="lead mb-4 text-white opacity-8">
              Blogs are a great way to share your knowledge, and to learn from
              as well. Besides, a Site without a Blog is Seldom seen these days.
            </p>
            <NuxtLink to="/blog" class="btn bg-white text-dark">
              Blog
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Blog',
}
</script>

<style scoped>
.blog-bg-image {
  background-image: url(@/assets/images/catalog.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
