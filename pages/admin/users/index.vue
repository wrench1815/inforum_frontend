<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <!-- Start:Contact Forms -->
      <div class="card py-4" v-if="loading">
        <h1 class="text-center">Loading...</h1>
      </div>
      <!-- Start:Contact Forms -->
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Users</h2>
          </div>
          <div class="col-12 text-center" v-if="users.length == 0">
            <img
              class="img-fluid w-50"
              src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
            />
            <h3 class="mx-4">Feels Empty.</h3>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive">
                <table class="table align-items-center">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">Profile Image</th>
                      <th class="text-uppercase">Full Name</th>
                      <th class="text-uppercase">Role</th>
                      <th class="text-uppercase">Gender</th>
                      <th class="text-uppercase text-center ps-2">Email</th>
                      <th class="text-uppercase text-center ps-2">
                        Date Joined
                      </th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="(user, index) in users"
                      :key="user.id"
                    >
                      <!-- Start: profile-->
                      <td class="d-flex align-center justify-content-center">
                        <span
                          class="avatar avatar-md rounded-circle shadow-card"
                        >
                          <img
                            :src="user.profileImage"
                            class="avatar avatar-md rounded-circle img-fit"
                            alt="avatar"
                          />
                        </span>
                      </td>
                      <!-- End: profile-->

                      <!-- Start:Full Name -->
                      <td class="text-bold">
                        <NuxtLink
                          class="link-info"
                          :to="`/admin/users/preview/${user.id}`"
                        >
                          {{ user.firstName + ' ' + user.lastName }}
                        </NuxtLink>
                      </td>
                      <!-- End:Full Name -->

                      <!-- sno start -->
                      <td class="text-center">
                        {{ user.userRole }}
                      </td>
                      <!-- sno end -->

                      <!-- Start: Gender-->
                      <td class="text-center">
                        {{ getGender(user.gender) }}
                      </td>
                      <!-- End: Gender-->

                      <!-- Start:Email -->
                      <td class="text-center">
                        {{ user.email }}
                      </td>
                      <!-- End:Email -->

                      <!-- Start:Created On -->
                      <td class="text-center">
                        {{ formattedDate(user.dateJoined) }}
                      </td>
                      <!-- End:Created On -->

                      <!-- Start:Actions -->
                      <td>
                        <div class="d-flex justify-content-center">
                          <NuxtLink :to="`/admin/users/edit/${user.id}`">
                            <i class="fas fa-edit text-warning mx-2"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer mx-2"
                            @click="deleteUser(user.id)"
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
              <NuxtLink class="btn btn-success" to="/admin/users/add"
                >Add New User</NuxtLink
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
export default {
  layout: 'admin',

  data() {
    return {
      users: [],
      // handle loading state
      loading: true,
      // handle pagination
      pageSize: 8,
      pagination: {},
      pages: [],
    }
  },

  methods: {
    getData(pageNumber) {
      const users = this.$axios.$get(
        `/User/list?PageNumber=${pageNumber}&PageSize=${this.pageSize}`
      )
      users
        .then((res) => {
          this.users = res.users
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

    // deletes the user
    deleteUser(id) {
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
              .$post(`/User/delete/${id}`)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal({
                    icon: 'success',
                    title: 'Item Deleted',
                    text: res.message,
                  }).then(() => {
                    this.users = this.users.filter((item) => item.id != id)

                    let currentPage

                    if (this.contactForms.length == 0) {
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

    getGender(n) {
      let gender = ''
      switch (n) {
        case 0:
          gender = 'Male'
          break

        case 1:
          gender = 'Female'
          break
        case 2:
          gender = 'Unspecified'
          break
        default:
          gender = 'Default'
          break
      }
      return gender
    },
  },

  mounted() {
    this.getData(1)
  },
}
</script>

<style scoped>
.img-fit {
  object-fit: cover;
  object-position: center;
}
</style>
