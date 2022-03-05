<template>
  <div>
    <AdminNavBar />

    <!-- content -->
    <div class="container-fluid py-4">
      <!-- Start: Loading-->
      <Loading v-if="loading" />
      <!-- End: Loading-->
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Site Categories</h2>
          </div>
          <div class="col-12" v-if="categories.length == 0">
            <img
              class="img-fluid w-50"
              src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
              v-lazy-load
            />
            <h3 class="mx-4">No Categories Yet</h3>
          </div>
          <div class="col-12" v-else>
            <div class="mx-4">
              <div class="table-responsive border rounded-3">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">S.No</th>
                      <th class="text-uppercase text-center ps-2">Name</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="(category, index) in categories"
                      :key="category.id"
                    >
                      <td class="text-bold">
                        {{ index + 1 }}
                      </td>
                      <td
                        class="text-capitalize text-center text-info text-bold"
                      >
                        {{ category.name }}
                      </td>
                      <td>
                        <div class="d-flex justify-content-center">
                          <NuxtLink :to="`/admin/category/edit/${category.id}`">
                            <i class="fas fa-edit text-warning mx-2"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer mx-2"
                            @click="deleteCategory(category.id)"
                          >
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
        <div class="col-12">
          <div class="d-flex justify-content-end mx-4 mt-4">
            <NuxtLink class="btn btn-success" to="/admin/category/add"
              >Add Category</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Admin/Utils/Loading.vue'
export default {
  layout: 'admin',

  components: {
    Loading,
  },

  data() {
    return {
      loading: true,
      categories: [],
    }
  },

  created() {
    const categories = this.$axios.$get('/Categories')
    categories
      .then((res) => {
        this.categories = res
        this.loading = false
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to load data',
        })
      })
  },
  methods: {
    // Delete the Category
    deleteCategory(id) {
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
            await this.$axios.$delete(`/Categories/${id}`)

            this.$swal.fire({
              icon: 'success',
              title: 'Item Deleted',
              text: 'Item Deleted Successfully',
            })

            this.categories = this.categories.filter((item) => item.id != id)
          }
        })
    },
  },
}
</script>

<style></style>
