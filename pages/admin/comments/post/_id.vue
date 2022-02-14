<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <!-- Start:Contact Forms -->
      <Loading v-if="loading" />
      <!-- Start:Contact Forms -->
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4 pb-2">Comments</h2>
            <!-- <div class="border-bottom"></div> -->
          </div>
          <div class="col-12 text-center" v-if="comments.length == 0">
            <img
              class="img-fluid w-50"
              src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
            />
            <h3 class="mx-4">No Comments Yet</h3>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive border rounded-3">
                <table class="table align-items-center">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">id</th>
                      <th class="text-uppercase text-center">Comment</th>
                      <th class="text-uppercase text-center">Date Posted</th>
                      <th class="text-uppercase text-center">User</th>
                      <th class="text-uppercase">Sub Comments</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="comment in comments"
                      :key="comment.id"
                    >
                      <td class="text-center">
                        {{ comment.id }}
                      </td>
                      <!-- Start:Full Name -->
                      <td class="text-bold custom-paragraph text-left">
                        <NuxtLink
                          class="link-info"
                          :to="`/admin/comments/preview/${comment.id}`"
                        >
                          {{ comment.description }}
                        </NuxtLink>
                      </td>
                      <!-- End:Full Name -->

                      <!-- Start:Created On -->
                      <td class="text-center">
                        {{ formattedDate(comment.datePosted) }}
                      </td>
                      <!-- End:Created On -->

                      <td class="text-center">
                        <NuxtLink
                          :to="`/admin/users/preview/${comment.userId}`"
                        >
                          <ProfileImage
                            :userId="comment.userId"
                            :isAvatar="true"
                          />
                        </NuxtLink>
                      </td>
                      <td>
                        <div class="d-flex justify-content-evenly">
                          <NuxtLink
                            :to="`/admin/comments/subcomments/${comment.id}`"
                          >
                            <i class="fas fa-comments text-success"></i>
                          </NuxtLink>
                        </div>
                      </td>
                      <!-- Start:Actions -->
                      <td>
                        <div class="d-flex justify-content-center gap-3">
                          <NuxtLink :to="`/admin/comments/edit/${comment.id}`">
                            <i class="fas fa-edit text-warning mx-2"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer mx-2"
                            @click="deleteComment(comment.id)"
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </a>
                        </div>
                      </td>
                      <!-- End:Actions -->
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

          <!-- Start:Add Contact Form Button -->
          <div class="col-12">
            <!-- <div class="border-bottom"></div> -->
            <div class="d-flex justify-content-end mx-4 mt-4">
              <NuxtLink
                class="btn btn-success"
                :to="`/admin/comments/add/${this.$route.params.id}`"
                >Add New Comment</NuxtLink
              >
            </div>
          </div>
          <!-- End:Add Contact Form Button -->
        </div>
      </div>
      <!-- End:Contact Forms -->
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
      comments: [],
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
      const comments = this.$axios.$get(
        `/Comments?postId=${this.$route.params.id}&PageNumber=${pageNumber}&PageSize=${this.pageSize}`
      )

      comments
        .then((res) => {
          this.comments = res.comments
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
          this.$router.go(-1)
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

    // deletes the Contact Form
    deleteComment(id) {
      const customAlert = this.$swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger me-1',
          cancelButton: 'btn btn-success ms-1',
        },
        buttonsStyling: false,
      })

      customAlert
        .fire({
          icon: 'question',
          title: 'Are you sure ?',
          text: `Do you really want to delete this item? This process cannot be undone.`,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$axios
              .$delete(`/Comments/${id}`)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal({
                    icon: 'success',
                    title: 'Item Deleted',
                    text: res.message,
                  }).then(() => {
                    this.comments = this.comments.filter(
                      (item) => item.id != id
                    )

                    let currentPage

                    if (this.comments.length == 0) {
                      currentPage = this.pagination.currentPage - 1
                    } else {
                      currentPage = this.pagination.currentPage
                    }

                    this.getData(currentPage)
                  })
                }
              })
              .catch((err) => {
                this.$swal({
                  icon: 'error',
                  title: 'Error',
                  text: 'Unable to Delete Contact Form',
                })
              })
          }
        })
    },
  },

  mounted() {
    this.getData(1)
  },
}
</script>

<style scoped>
.custom-paragraph {
  max-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
