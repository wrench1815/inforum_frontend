<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <h1>Blog Post Admin</h1>
        </div>

        <div class="col-12" v-if="blogPosts.length == 0">
          <h1>No posts available</h1>
        </div>
        <!-- create fking table: id , title,author,dateposted,actions:(icons: edit,delete) -->
        <div class="col-12" v-else>
          <div class="card">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="
                        text-uppercase text-secondary text-xxs
                        font-weight-bolder
                        opacity-7
                      "
                    >
                      id
                    </th>
                    <th
                      class="
                        text-uppercase text-secondary text-xxs
                        font-weight-bolder
                        opacity-7
                        ps-2
                      "
                    >
                      Title
                    </th>
                    <th
                      class="
                        text-center text-uppercase text-secondary text-xxs
                        font-weight-bolder
                        opacity-7
                      "
                    >
                      Author
                    </th>
                    <th
                      class="
                        text-center text-uppercase text-secondary text-xxs
                        font-weight-bolder
                        opacity-7
                      "
                    >
                      Date Posted
                    </th>
                    <th
                      class="
                        text-center text-uppercase text-secondary text-xxs
                        font-weight-bolder
                        opacity-7
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post in blogPosts" :key="post.id">
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{{ post.id }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0 text-capitalize">
                        {{ post.title }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs text-center font-weight-bold mb-0">
                        Hardeep Kumar
                      </p>
                    </td>

                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-normal">
                        {{ formattedDate(post.datePosted) }}
                      </span>
                    </td>
                    <td class="align-middle">
                      <div class="d-flex justify-content-around">
                        <a>
                          <i class="fas fa-edit"></i>
                        </a>
                        <a>
                          <i class="fas fa-trash"></i>
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
      return `${myDate.getDate()}-${myDate.getMonth()}-${myDate.getFullYear()}`
    },
  },
}
</script>

<style></style>
