<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <!-- Start: Comments -->
      <Loading v-if="loading" />
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4 pb-2">Blog Posts Comments</h2>
          </div>
          <div class="col-12 text-center" v-if="blogPosts.length == 0">
            <img
              class="img-fluid w-50"
              data-src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
              v-lazy-load
            />
            <h3 class="mx-4">No Blog Post Yet</h3>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive border rounded-3">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">id</th>
                      <th class="text-uppercase text-start ps-2">
                        Blog Post Title
                      </th>
                      <th class="text-uppercase">Date Posted</th>
                      <th class="text-uppercase">Author</th>
                      <th class="text-uppercase">Comments</th>
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
                        class="text-capitalize text-start link-info cursor-pointer"
                      >
                        <NuxtLink
                          class="link-info text-bold"
                          :to="`/admin/blogpost/preview/${post.id}`"
                          >{{ post.title }}</NuxtLink
                        >
                      </td>

                      <td class="text-center">
                        {{ formattedDate(post.datePosted) }}
                      </td>
                      <!-- Author -->
                      <td class="text-center">
                        <NuxtLink :to="`/admin/users/preview/${post.authorId}`">
                          <ProfileImage
                            :userId="post.authorId"
                            :isAvatar="true"
                          />
                        </NuxtLink>
                      </td>

                      <td>
                        <div class="d-flex justify-content-evenly">
                          <NuxtLink :to="`/admin/comments/post/${post.id}`">
                            <i class="fas fa-comments text-success"></i>
                          </NuxtLink>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Start:Pagination -->
              <Pagination
                :pageSize="this.pageSize"
                :pagination="this.pagination"
                :pages="this.pages"
                @getSelectedPage="selectedPage($event)"
                @getNextPage="nextPage"
                @getPreviousPage="previousPage"
                @getFirstPage="firstPage"
                @getLastPage="lastPage"
              />

              <!-- End:Pagination -->
            </div>
          </div>
        </div>
      </div>
      <!-- End:Comments -->
    </div>
  </div>
</template>

<script>
import ProfileImage from '~/components/Admin/ProfileImage.vue'
import Loading from '~/components/Admin/Utils/Loading.vue'
export default {
  layout: 'admin',

  components: {
    ProfileImage,
    Loading,
  },
  data() {
    return {
      blogPosts: [],
      // handle loading state
      loading: true,
      // handle pagination
      pageSize: 10,
      pagination: {},
      pages: [],
    }
  },

  methods: {
    getData(pageNumber) {
      const posts = this.$axios.$get(
        `/Blogposts?PageNumber=${pageNumber}&PageSize=${this.pageSize}`
      )

      posts
        .then((res) => {
          this.blogPosts = res.posts
          this.pagination = res.pagination
          this.pages = [...Array(this.pagination.totalPages).keys()].map(
            (page) => page + 1
          )

          // handle loading state
          if (this.loading) {
            this.loading = false
          }
        })
        // Scroll to top on page change
        .then(() => {
          setTimeout(() => {
            window.scroll(0, 0)
          }, 0)
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Unable to fetch data',
          })
        })
    },
    firstPage() {
      this.getData(1)
    },
    lastPage() {
      this.getData(this.pagination.totalPages)
    },
    nextPage() {
      this.getData(this.pagination.currentPage + 1)
    },
    previousPage() {
      this.getData(this.pagination.currentPage - 1)
    },
    selectedPage(pageNumber) {
      this.getData(pageNumber)
    },

    // formats the date
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },
  },

  mounted() {
    this.getData(1)
  },
}
</script>

<style scoped></style>
