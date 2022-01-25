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
                      <td
                        class="text-capitalize text-center text-info text-bold"
                      >
                        {{ form.email }}
                      </td>
                      <!-- End:Email -->

                      <!-- Start:Created On -->
                      <td
                        class="text-capitalize text-center text-info text-bold"
                      >
                        {{ form.createdOn }}
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
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="border-bottom"></div>
          <div class="d-flex justify-content-end mx-4 mt-4">
            <NuxtLink class="btn btn-success" to="/admin/contact-form/add"
              >Add Contact Form</NuxtLink
            >
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
    const contactForms = await $axios.$get('/ContactForms')
    return { contactForms }
  },

  methods: {
    // Delete the Contact Form
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
            await this.$axios.$delete(`/ContactForms/${id}`)

            this.$swal.fire({
              icon: 'success',
              title: 'Item Deleted',
              text: 'Item Deleted Successfully',
            })

            this.contactForms.forms = this.contactForms.forms.filter(
              (item) => item.id != id
            )
          }
        })
    },
  },
}
</script>

<style scoped></style>
