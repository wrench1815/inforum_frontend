<template>
  <div class="border-top">
    <!-- Comment Heading -->
    <div>
      <div class="d-flex justify-content-between align-items-center p-3">
        <!-- Comments Label -->
        <span class="text-bold">All Comments</span>

        <!-- Comments Filter -->
        <select name="sort" class="form-select ps-2 custom-filter py-1">
          <option value="newest" selected>Newest</option>
          <option value="oldest">Oldest</option>
          <option value="votes">Votes</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentHeading',
}
</script>

<style scoped>
.custom-filter {
  width: max-content;
}
</style>
