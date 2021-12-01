<template>
  <div>
    <AdminNavBar />
    <!-- Links -->
    <div class="container-fluid py-4">
      <div class="card py-2">
        <div class="row">
          <div class="col-12">
            <ul
              class="d-flex list-unstyled gap-4 ms-4 h-100 align-items-center"
            >
              <li class="badge badge-pill badge-lg bg-gradient-success">
                <NuxtLink class="link-light" to="/admin/blogpost/add"
                  >Add Post</NuxtLink
                >
              </li>
              <li class="badge badge-pill badge-md bg-gradient-warning">
                <NuxtLink class="link-light" to="/admin/blogpost/update"
                  >Update Post</NuxtLink
                >
              </li>
              <li class="badge badge-pill badge-md bg-gradient-danger">
                <NuxtLink class="link-light" to="/admin/blogpost/delete"
                  >Delete Post</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Blog Posts</h2>
          </div>
          <div class="col-12" v-if="blogPosts.length == 0">
            <h1>No posts available</h1>
          </div>
          <!-- create fking table: id , title,author,dateposted,actions:(icons: edit,delete) -->
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">id</th>
                      <th class="text-uppercase text-start ps-2">Title</th>
                      <th class="text-uppercase">Author</th>
                      <th class="text-uppercase">Date Posted</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="post in blogPosts"
                      :key="post.id"
                    >
                      <td class="text-bold">
                        {{ post.id }}
                      </td>
                      <td
                        class="
                          text-capitalize text-start
                          link-info
                          cursor-pointer
                        "
                      >
                        {{ post.title }}
                      </td>
                      <td class="text-capitalize">Hardeep Kumar</td>

                      <td class="text-center">
                        {{ formattedDate(post.datePosted) }}
                      </td>
                      <td>
                        <div class="d-flex justify-content-evenly">
                          <a>
                            <i class="fas fa-edit text-success"></i>
                          </a>
                          <a>
                            <i class="fas fa-trash text-danger"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $config }) {
    const blogPosts = await $axios.$get('/BlogPosts')
    return { blogPosts }
  },
  methods: {
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth()}-${myDate.getFullYear()}`
    },
  },
}
</script>

<style></style>
