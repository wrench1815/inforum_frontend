<template>
  <div>
    <AdminNavBar />
    <div class="container-fluid py-4">
      <!-- Start: Loading-->
      <Loading v-if="loading" />
      <!-- End: Loading-->

      <!-- Content -->
      <div class="card py-4" v-if="!loading">
        <div class="row">
          <div class="col-12">
            <h2 class="mx-4">Home</h2>
          </div>
          <div class="col-12 text-center" v-if="homeData.length == 0">
            <img
              class="img-fluid w-50"
              data-src="~assets/svg/Empty-amico.svg"
              alt="Feels Empty"
              v-lazy-load
            />
            <h3 class="mx-4">No Home Data</h3>
          </div>
          <div class="col-12 mb-4" v-else>
            <div class="mx-4">
              <div class="table-responsive border rounded-3">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr class="text-primary text-center text-md">
                      <th class="text-uppercase">Site Sub Heading</th>
                      <th class="text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle text-center text-dark text-"
                      v-for="home in homeData"
                      :key="home.id"
                      :pkey="home.id"
                    >
                      <td class="link-info cursor-pointer custom-paragraph">
                        <NuxtLink
                          class="link-info text-bold"
                          :to="`/admin/home/preview/${home.id}`"
                          >{{ home.subHeading }}</NuxtLink
                        >
                      </td>
                      <td>
                        <div class="d-flex justify-content-center gap-5">
                          <NuxtLink :to="`/admin/home/edit/${home.id}`">
                            <i class="fas fa-edit text-warning"></i>
                          </NuxtLink>
                          <a
                            class="cursor-pointer"
                            @click="deleteHome(home.id)"
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
        <div class="col-12" v-if="homeData.length == 0">
          <div class="d-flex justify-content-end mx-4 mt-4">
            <NuxtLink class="btn btn-success" to="/admin/home/add"
              >Add Home</NuxtLink
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
      homeData: [],
      loading: true,
    }
  },

  methods: {
    deleteHome(id) {
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
            await this.$axios.$delete(`/Home/${id}`)

            this.$swal.fire({
              icon: 'success',
              title: 'Item Deleted',
              text: 'Item Deleted Successfully',
            })

            this.homeData = this.homeData.filter((item) => item.id != id)
          }
        })
    },
  },

  mounted() {
    const homeData = this.$axios.$get('/home')
    homeData
      .then((res) => {
        this.homeData = res
        // handle loading state
        if (this.loading) {
          this.loading = false
        }
      }) // Scroll to top on page change
      .then(() => {
        setTimeout(() => {
          window.scroll(0, 0)
        }, 0)
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Cannot fetch data',
          text: 'Unable to fetch home data, try refreshing the page',
        })
      })
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
