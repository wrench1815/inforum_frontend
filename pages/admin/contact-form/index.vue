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
            <h2 class="mx-4">Contact Forms</h2>
            <!-- <div class="border-bottom"></div> -->
          </div>
          <div class="col-12 text-center" v-if="contactForms.length == 0">
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
                      <th class="text-uppercase">Full Name</th>
                      <th class="text-uppercase text-center ps-2">Email</th>
                      <th class="text-uppercase text-center ps-2">Date</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="form in contactForms"
                      :key="form.id"
                    >
                      <!-- Start:Full Name -->
                      <td class="text-bold">
                        <NuxtLink
                          class="link-info"
                          :to="`/admin/contact-form/preview/${form.id}`"
                        >
                          {{ form.fullName }}
                        </NuxtLink>
                      </td>
                      <!-- End:Full Name -->

                      <!-- Start:Email -->
                      <td class="text-center">
                        {{ form.email }}
                      </td>
                      <!-- End:Email -->

                      <!-- Start:Created On -->
                      <td class="text-center">
                        {{ formattedDate(form.createdOn) }}
                      </td>
                      <!-- End:Created On -->

                      <!-- Start:Actions -->
                      <td>
                        <div class="d-flex justify-content-center">
                          <NuxtLink :to="`/admin/contact-form/edit/${form.id}`">
                            <i class="fas fa-edit text-warning mx-2"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer mx-2"
                            @click="deleteContactForm(form.id)"
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
              <NuxtLink class="btn btn-success" to="/admin/contact-form/add"
                >Add Contact Form</NuxtLink
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
      contactForms: Object,
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
      const forms = this.$axios.$get(
        `/ContactForms?PageNumber=${pageNumber}&PageSize=${this.pageSize}`
      )

      forms
        .then((res) => {
          this.contactForms = res.forms
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

    // deletes the Contact Form
    deleteContactForm(id) {
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
              .$delete(`/ContactForms/${id}`)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal({
                    icon: 'success',
                    title: 'Item Deleted',
                    text: res.message,
                  }).then(() => {
                    this.contactForms = this.contactForms.filter(
                      (item) => item.id != id
                    )

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
  },

  mounted() {
    this.getData(1)
  },
}
</script>

<style scoped></style>
