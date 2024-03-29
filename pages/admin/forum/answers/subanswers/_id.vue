<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <Loading v-if="loading" />

      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4 pb-3">Query Sub Answers</h2>
          </div>
          <div class="col-12 text-center" v-if="answers.length == 0">
            <img
              class="img-fluid w-50"
              data-src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
              v-lazy-load
            />
            <h3 class="mx-4">No Sub Answers Yet</h3>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive border rounded-3">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">Id</th>
                      <th class="text-uppercase text-start ps-2">Answer</th>
                      <th class="text-uppercase">Date Posted</th>
                      <th class="text-uppercase">User</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark"
                      v-for="answer in answers"
                      :key="answer.id"
                    >
                      <td class="text-bold">
                        {{ answer.id }}
                      </td>
                      <td
                        class="text-capitalize text-start link-info cursor-pointer custom-paragraph"
                      >
                        <NuxtLink
                          class="link-info text-bold"
                          :to="`/admin/forum/answers/subanswers/preview/${answer.id}`"
                          >{{ answer.answer }}</NuxtLink
                        >
                      </td>

                      <td class="text-center">
                        {{ formattedDate(answer.datePosted) }}
                      </td>
                      <!-- Author -->
                      <td class="text-center">
                        <NuxtLink :to="`/admin/users/preview/${answer.userId}`">
                          <ProfileImage
                            :userId="answer.userId"
                            :isAvatar="true"
                          />
                        </NuxtLink>
                      </td>
                      <td>
                        <div class="d-flex justify-content-evenly">
                          <NuxtLink
                            :to="`/admin/forum/answers/subanswers/edit/${answer.id}`"
                          >
                            <i class="fas fa-edit text-warning"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer"
                            @click="deleteAnswer(answer.id)"
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </a>
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
          <div class="col-12">
            <div class="d-flex justify-content-end mx-4">
              <NuxtLink
                class="btn btn-success"
                :to="`/admin/forum/answers/subanswers/add/${this.$route.params.id}`"
                >Add Sub Answer</NuxtLink
              >
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
      answers: [],
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
      const answers = this.$axios.$get(
        `/ForumSubAnswers?PageNumber=${pageNumber}&PageSize=${this.pageSize}&queryAnswerId=${this.$route.params.id}`
      )

      answers
        .then((res) => {
          this.answers = res.subAnswers
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
        .catch((error) => {
          let msg

          try {
            msg = res.message
          } catch (error) {
            msg = 'Unable to load Sub Answers <br/>Refresh Page to try Again.'
          }

          this.$swal({
            title: 'Error',
            icon: 'error',
            html: `${msg}`,
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
    formattedDate(inputDate) {
      const myDate = new Date(inputDate)
      return `${myDate.toLocaleString('default', {
        weekday: 'short',
      })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`
    },

    // Delete Blog Post
    deleteAnswer(id) {
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
            await this.$axios.$delete(`/ForumSubAnswers/${id}`)
            this.$swal.fire({
              icon: 'success',
              title: 'Item Deleted',
              text: 'Item Deleted Successfully',
            })
            this.answers = this.answers.filter((item) => item.id != id)
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
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
