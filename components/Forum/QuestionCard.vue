<template>
  <!-- card -->
  <div class="border border-radius-2xl bg-white mb-3 shadow-lg">
    <!-- card top -->
    <div class="p-3 border-bottom">
      <NuxtLink class="d-flex justify-content-start gap-3" to="/">
        <!-- profile image -->
        <span class="avatar avatar-md rounded-circle shadow-card">
          <img src="https://i.pravatar.cc/100" alt="avatar" />
        </span>

        <span class="d-flex flex-column justify-content-center custom-gap">
          <!-- name -->
          <span class="text-bold text-md text-dark"> John Doe </span>

          <!-- date-uploaded -->
          <span class="text-xs link-dark">01/02/2020</span>
        </span>
      </NuxtLink>
    </div>

    <!-- card middle -->
    <div class="p-3">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
        ullam, velit ipsam dolores voluptates enim voluptatum exercitationem
        fugiat a impedit quas. Similique nihil, nesciunt aut recusandae, fugit
        tempore sint sed est vel amet suscipit quod earum ratione repellendus
        mollitia iusto labore perferendis! Fugiat sit quasi ex ratione dolorum
        odio, delectus reiciendis atque doloremque consequatur eligendi, rem
        nisi? Suscipit similique repellat, fugiat aliquid sapiente quod
        doloribus debitis quam illo sequi at ullam aspernatur. Vel facere magni,
        voluptates consequuntur beatae doloribus excepturi!
      </p>
    </div>

    <!-- card bottom -->
    <div class="p-3 d-flex justify-content-start gap-5 border-top">
      <!-- votes -->
      <button
        type="button"
        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
      >
        <i class="fa fa-thumbs-up" />
        10 Votes
      </button>

      <!-- comments -->
      <button
        type="button"
        class="btn bg-gradient-white w-auto m-0 p-0 text-sm"
      >
        <i class="fa fa-comment" />
        5 Comments
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
}
</script>

<style scoped>
.custom-gap {
  gap: 0.15rem !important;
}
</style>
