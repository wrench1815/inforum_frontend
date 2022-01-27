<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <div class="card py-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Contact Forms</h2>
            <div class="border-bottom"></div>
          </div>
          <div class="col-12 text-center" v-if="contactForms.forms.length == 0">
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
                <table class="table align-items-center mb-0">
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
                      v-for="form in contactForms.forms"
                      :key="form.id"
                    >
                      <!-- Start:Full Name -->
                      <td class="text-bold">
                        {{ form.fullName }}
                      </td>
                      <!-- End:Full Name -->

                      <!-- Start:Email -->
                      <td class="text-center text-info text-bold">
                        {{ form.email }}
                      </td>
                      <!-- End:Email -->

                      <!-- Start:Created On -->
                      <td class="text-center text-info text-bold">
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
              <section>
                <div class="container">
                  <div class="row justify-space-between py-2">
                    <div class="col-md-4 mx-auto">
                      <ul class="pagination pagination-primary m-4">
                        <!-- Start:Previous Page Button -->
                        <li class="page-item cursor-pointer">
                          <div
                            class="page-link"
                            aria-label="Previous"
                            @click="toPrevious()"
                          >
                            <span aria-hidden="true"
                              ><i
                                class="fas fa-chevron-left"
                                aria-hidden="true"
                              ></i
                            ></span>
                          </div>
                        </li>
                        <!-- End:Previous Page Button -->

                        <!-- Start:First Page -->
                        <li
                          class="page-item cursor-pointer"
                          v-if="contactForms.pagination.currentPage > 2"
                        >
                          <div class="page-link" @click="toNumber(1)">1</div>
                        </li>
                        <!-- End:First Page -->

                        <!-- Start:Start Dashes -->
                        <li
                          class="page-item"
                          v-if="contactForms.pagination.currentPage != 1"
                        >
                          <div class="d-flex align-items-end m-2">....</div>
                        </li>
                        <!-- End:Start Dashes -->

                        <!-- Start:Current Page -->
                        <li class="page-item active">
                          <div class="page-link text-white">
                            {{ contactForms.pagination.currentPage }}
                          </div>
                        </li>
                        <!-- End:Current Page -->

                        <!-- Start:End Dashes -->
                        <li
                          class="page-item"
                          v-if="
                            contactForms.pagination.currentPage <
                            contactForms.pagination.totalPages
                          "
                        >
                          <div class="d-flex align-items-end m-2">....</div>
                        </li>
                        <!-- End:End Dashes -->

                        <!-- Start:Last Page -->
                        <li
                          class="page-item cursor-pointer"
                          v-if="
                            contactForms.pagination.currentPage <
                            contactForms.pagination.totalPages - 1
                          "
                        >
                          <div
                            class="page-link"
                            @click="
                              toNumber(contactForms.pagination.totalPages)
                            "
                          >
                            {{ contactForms.pagination.totalPages }}
                          </div>
                        </li>
                        <!-- End:Last Page -->

                        <!-- Start:Next Page Button -->
                        <li class="page-item cursor-pointer">
                          <div
                            class="page-link"
                            aria-label="Next"
                            @click="toNext()"
                          >
                            <span aria-hidden="true"
                              ><i
                                class="fas fa-chevron-right"
                                aria-hidden="true"
                              ></i
                            ></span>
                          </div>
                        </li>
                        <!-- End:Next Page Button -->
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <!-- End:Pagination -->
            </div>
          </div>

          <!-- Start:Add Contact Form Button -->
          <div class="col-12">
            <div class="border-bottom"></div>
            <div class="d-flex justify-content-end mx-4 mt-4">
              <NuxtLink class="btn btn-success" to="/admin/contact-form/add"
                >Add Contact Form</NuxtLink
              >
            </div>
          </div>
          <!-- End:Add Contact Form Button -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      contactForms: Object,
    }
  },

  async asyncData({ $axios, $config }) {
    const contactForms = await $axios.$get('/ContactForms')
    return { contactForms }
  },

  methods: {
    // jumps to previous page
    toPrevious() {
      if (this.contactForms.pagination.hasPrevious == true) {
        let prevPage = this.contactForms.pagination.currentPage - 1

        this.getContacts(prevPage).then((r) => {
          this.contactForms = r
          this.toTop()
        })
      }
    },

    // jumps to next page
    toNext() {
      if (this.contactForms.pagination.hasNext == true) {
        let nextPage = this.contactForms.pagination.currentPage + 1

        this.getContacts(nextPage).then((r) => {
          this.contactForms = r
          this.toTop()
        })
      }
    },

    // jumps to a specific page
    toNumber(pageNum) {
      this.getContacts(pageNum).then((r) => {
        this.contactForms = r
        this.toTop()
      })
    },

    // Scrolls to top
    toTop() {
      window.scrollTo(0, 0)
    },

    // fetch new data
    async getContacts(pageNum) {
      let res = await this.$axios.$get(`/ContactForms?PageNumber=${pageNum}`)

      return res
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
                    this.contactForms.forms = this.contactForms.forms.filter(
                      (item) => item.id != id
                    )

                    let currentPage

                    if (this.contactForms.forms.length == 0) {
                      currentPage = this.contactForms.pagination.currentPage - 1
                    } else {
                      currentPage = this.contactForms.pagination.currentPage
                    }

                    this.getContacts(currentPage).then((r) => {
                      this.contactForms = r
                    })
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
}
</script>

<style scoped></style>
